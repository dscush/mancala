"use strict";

/* global $, BoardController, RandomAI */

var controller = new BoardController(null, new RandomAI(1));

$(document).ready(function(){
    $('button.pit').click(function(){
        controller.playMove($(this).attr('id'));
    });
    controller.startGame();
});
