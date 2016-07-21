"use strict";

/* global $ */
var drawBoard = function(board) {
    for (var i in board) {
        $('#' + i).text(board[i]);
    }
};
