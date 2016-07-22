"use strict";

/* global $, boardCtlr */

function WrongTurnError(message) {
    this.name = "WrongTurnError";
    this.message = (message || "It's not that player's turn right now.");
}
WrongTurnError.prototype = Error.prototype;

function PlayStoreError(message) {
    this.name = "PlayStoreError";
    this.message = (message || "You cannot play from the stores.");
}
PlayStoreError.prototype = Error.prototype;

function PlayEmptyPitError(message) {
    this.name = "PlayEmptyPitError";
    this.message = (message || "You cannot play an empty pit.");
}
PlayEmptyPitError.prototype = Error.prototype;

function BoardModel(boardLength=14, stonesPerPit=4) {
    this.boardLength = boardLength;
    this.stonesPerPit = stonesPerPit;
    this.board = [];
    for (var i = 0; i < this.boardLength; i++) {
        this.board[i] = this.stonesPerPit;
    }
    this.board[boardLength / 2 - 1] = 0;
    this.board[boardLength - 1] = 0;
    this.playerTurn = 0;
    this.store = [this.boardLength / 2 - 1, this.boardLength - 1]
}

BoardModel.prototype.isGameOver = function() {
    var p0done = true, p1done = true;
    for (var i = 0; i < this.store[0]; i++) {
        if (this.board[i] > 0) {
            p0done = false;
        }
    }
    for (var i = this.store[0] + 1; i < this.store[1]; i++) {
        if (this.board[i] > 0) {
            p1done = false;
        }
    }
    return p0done || p1done;
}

BoardModel.prototype.isPitOnCurrentPlayersSide = function(pit) {
    return this.playerTurn === 0 && pit < this.boardLength / 2 ||
        this.playerTurn === 1 && pit >= this.boardLength / 2;
}

BoardModel.prototype.oppositePit = function(pit) {
    if (this.store.indexOf(pit) !== -1) {
        throw new ReferenceError("There are no opposite pits for the stores");
    }
    return this.boardLength - 2 - pit;
}

BoardModel.prototype.playMove = function(pit) {
    var currentSpot, i;
    if (this.isGameOver()) {
        throw new WrongTurnError("The game is over - no more turns.");
    }
    if (!this.isPitOnCurrentPlayersSide(pit)) {
        throw new WrongTurnError("Pit number " + pit + " belongs to player " + (this.playerTurn + 1) % 2 + ", but it's not their turn.");
    }
    if (pit === this.boardLength / 2 - 1 || pit === this.boardLength - 1) {
        throw new PlayStoreError();
    }
    if (+this.board[pit] === 0) {
        throw new PlayEmptyPitError();
    }
    currentSpot = +pit;
    i = this.board[pit];
    this.board[pit] = 0;
    while (i > 0) {
        currentSpot = (currentSpot + 1) % this.boardLength;
        if (currentSpot !== this.store[(this.playerTurn + 1) % 2]) {
            this.board[currentSpot] += 1;
            i -= 1;
        }
    }
    if (currentSpot !== this.store[this.playerTurn]) {
        if (this.board[currentSpot] === 1 && this.isPitOnCurrentPlayersSide(currentSpot)) {
            this.board[this.store[this.playerTurn]] += this.board[this.oppositePit(currentSpot)];
            this.board[this.store[this.playerTurn]] += this.board[currentSpot];
            this.board[this.oppositePit(currentSpot)] = 0;
            this.board[currentSpot] = 0;
        }
        this.playerTurn = (this.playerTurn + 1) % 2;
    }
    if (this.isGameOver()) {
        this.playerTurn = -1;
    }
    return this.playerTurn;
}