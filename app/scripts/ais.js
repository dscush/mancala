"use strict";

/* global $, BoardController */

function RandomAI(player) {
    this.player = player;
    this.playMove = function(boardModel) {
        do {
            var move = Math.floor(Math.random() * (boardModel.boardLength / 2 - 1));
            move += this.player * (boardModel.boardLength / 2);
            console.log("trying to play pit " + move);
        } while (boardModel.board[move] == 0);
        console.log("playing pit " + move);
        return move;
    };
}
