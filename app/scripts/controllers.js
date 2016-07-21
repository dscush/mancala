"use strict";

/* global $, BoardModel */

var boardCtlr = {};
var board = new BoardModel();

boardCtlr.drawBoard = function(board) {
    for (var i in board) {
        if (board[i] == 0) {
            $('#' + i).text('');
        } else {
            $('#' + i).text(board[i]);
        }
    }
};
boardCtlr.playMove = function(id) {
    board.playMove(id);
    boardCtlr.drawBoard(board.board);
}

$(document).ready(function(){
    $('button.pit').click(function(){
        boardCtlr.playMove($(this).attr('id'));
    });
    boardCtlr.drawBoard(board.board);
});
