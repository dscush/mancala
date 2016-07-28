"use strict";

/* global BoardModel */

function RandomAI(player) {
    this.player = player;
    this.playMove = function(boardModel) {
        do {
            var move = Math.floor(Math.random() * (boardModel.boardLength / 2 - 1));
            move += this.player * (boardModel.boardLength / 2);
            console.log("trying to play pit " + move);
        } while (boardModel.board[move] === 0);
        return move;
    };
}

function MinimaxAI(player) {
    this.player = player;
    this.playMove = function(boardModel, depth=0) {
        if (boardModel.playerTurn == -1) {
            return((boardModel.board[boardModel.store[this.player]] - boardModel.board[boardModel.store[(this.player + 1) % 2]]) * 100);
        } else if (depth >= 6) {
            return(boardModel.board[boardModel.store[this.player]] - boardModel.board[boardModel.store[(this.player + 1) % 2]]);
        }
        var move;
        var moveValues = [];
        for (var i = 0; i < boardModel.boardLength / 2 - 1; i++) {
            move = i + boardModel.playerTurn * (boardModel.boardLength / 2);
            if (boardModel.board[move] !== 0) {
                var nextBoard = new BoardModel(boardModel.boardLength, boardModel.stonesPerPit);
                nextBoard.playerTurn = boardModel.playerTurn;
                for (var j in boardModel.board) {
                    nextBoard.board[j] = boardModel.board[j];
                }
                nextBoard.playMove(move);
                try {
                    moveValues[i] = this.playMove(nextBoard, depth + 1);
                } catch (err) {
                    console.log(err);
                    console.log(nextBoard);
                    console.log("playing " + move);
                    console.log("depth: " + depth);
                }
            }
        }
        if (depth > 0) {
            if (boardModel.playerTurn == this.player) { // MAX
                return moveValues.reduce((curMax, curValue, curIndex, array) => curValue > curMax ? curValue : curMax);
            } else { // MIN
                return moveValues.reduce((curMin, curValue, curIndex, array) => curValue < curMin ? curValue : curMin);
            }
        }
        move = moveValues.reduce((curMaxIndex, curValue, curIndex, array) => curValue > array[curMaxIndex] || array[curMaxIndex] === undefined ? curIndex : curMaxIndex, 0);
        console.log(moveValues);
        console.log("Max val: " + moveValues.reduce((curMax, curValue, curIndex, array) => curValue > curMax ? curValue : curMax));
        console.log("Max ind: " + moveValues.reduce((curMaxIndex, curValue, curIndex, array) => curValue > array[curMaxIndex] || array[curMaxIndex] === undefined ? curIndex : curMaxIndex, 0));
        console.log("playing pit " + move);
        return move;
    };
}
