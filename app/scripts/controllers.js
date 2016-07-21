"use strict";

/* global $, BoardModel */

var boardCtlr = {};
var board = new BoardModel();

boardCtlr.drawBoard = function(board, msg, lastMove) {
    for (var i in board) {
        if (board[i] == 0) {
            $('#' + i).text('');
        } else {
            $('#' + i).text(board[i]);
        }
        $('#' + i).removeClass("last-move");
    }
    $('#' + lastMove).addClass("last-move");
    $('#turn').text(msg)
};

boardCtlr.playMove = function(id) {
    var playerTurn = board.playMove(id);
    var msg;
    if (playerTurn === -1) {
        msg = "Game over - "
        if (board.store[0] > board.store[1]) {
            msg += "bottom player wins!"
        } else if (board.store[0] < board.store[1]) {
            msg += "top player wins!"
        } else {
            msg += "It's a Tie!"
        }
    } else if (playerTurn === 0) {
        msg = "Bottom player's turn"
    } else {
        msg = "Top player's turn"
    }
    boardCtlr.drawBoard(board.board, msg, id);
};

$(document).ready(function(){
    $('button.pit').click(function(){
        boardCtlr.playMove($(this).attr('id'));
    });
    boardCtlr.drawBoard(board.board, "Bottom player's goes first");
});
