"use strict";

/* global $, BoardController, RandomAI, MinimaxAI */

var controller = new BoardController(new MinimaxAI(0));

$(document).ready(function(){
    $('button.pit').click(function(){
        controller.playMove($(this).attr('id'));
    });
    controller.startGame();
});
