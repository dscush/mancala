"use strict";

/* global $, BoardController, RandomAI, MinimaxAI, AlphaBetaAI */

var controller = new BoardController(new AlphaBetaAI(0));

$(document).ready(function(){
    $('button.pit').click(function(){
        controller.playMove($(this).attr('id'));
    });
    controller.startGame();
});
