"use strict";

/* global $, BoardModel */

function BoardController(p0ai=null, p1ai=null, boardLength=14, stonesPerPit=4, quickPlay=false) {
    this.p0ai = p0ai;
    this.p1ai = p1ai;
    this.quickPlay = quickPlay;
    this.model = new BoardModel(boardLength, stonesPerPit);
}

BoardController.prototype.startGame = function() {
    this.drawBoard("Bottom player goes first");
    if (this.p0ai) {
        this.playMove(this.p0ai.playMove(this.model));
    }
}

BoardController.prototype.drawBoard = function(msg, lastMove) {
    for (var i in this.model.board) {
        if (this.model.board[i] == 0) {
            $('#' + i).text('');
        } else {
            $('#' + i).text(this.model.board[i]);
        }
        $('#' + i).removeClass("last-move");
    }
    $('#' + lastMove).addClass("last-move");
    $('#turn').text(msg);
};

BoardController.prototype.playMove = function(id) {
    var playerTurn = this.model.playMove(id);
    var msg;
    if (playerTurn === -1) {
        msg = "Game over - ";
        if (this.model.board[this.model.store[0]] > this.model.board[this.model.store[1]]) {
            msg += "bottom player wins!";
        } else if (this.model.store[0] < this.model.store[1]) {
            msg += "top player wins!";
        } else {
            msg += "It's a Tie!";
        }
    } else if (playerTurn === 0) {
        msg = "Bottom player's turn";
    } else {
        msg = "Top player's turn";
    }
    if (!this.quickPlay || !this.p0ai || !this.p1ai) {
        this.drawBoard(msg, id);
    }
    if (playerTurn === 0 && this.p0ai) {
        this.playMove(this.p0ai.playMove(this.model));
    } else if (playerTurn === 1 && this.p1ai) {
        this.playMove(this.p1ai.playMove(this.model));
    }
};
