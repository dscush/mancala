"use strict";

/* global $, BoardModel */

function BoardController(boardLength=14, stonesPerPit=4, quickPlay=false) {
    this.quickPlay = quickPlay;
    this.model = new BoardModel(boardLength, stonesPerPit);
}

BoardController.prototype.startGame = function(humanPlayer) {
    this.p0ai = null;
    this.p1ai = null;
    if (humanPlayer == 0) {
        this.p1ai = new AlphaBetaAI(1);
    } else if (humanPlayer == 1) {
        this.p0ai = new AlphaBetaAI(0);
    }
    new AlphaBetaAI(0)
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
    if (this.model.playerTurn === 1 || this.p0ai) {
        for (var i = 0; i < this.model.boardLength / 2 - 1; i++) {
            $('#' + i).prop("disabled", true);
        }
    } else {
        for (var i = 0; i < this.model.boardLength / 2 - 1; i++) {
            $('#' + i).prop("disabled", false);
        }
    } if (this.model.playerTurn === 0 || this.p1ai) {
        for (var i = this.model.boardLength / 2; i < this.model.boardLength - 1; i++) {
            $('#' + i).prop("disabled", true);
        }
    } else {
        for (var i = this.model.boardLength / 2; i < this.model.boardLength - 1; i++) {
            $('#' + i).prop("disabled", false);
        }
    }
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
