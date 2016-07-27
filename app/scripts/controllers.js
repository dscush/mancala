"use strict";

/* global $, BoardModel */

function BoardController(boardLength=14, stonesPerPit=4) {
    this.model = new BoardModel(boardLength, stonesPerPit);
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
        if (this.model.store[0] > this.model.store[1]) {
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
    this.drawBoard(msg, id);
};
