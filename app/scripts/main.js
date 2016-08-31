"use strict";

/* global $, BoardController, RandomAI, MinimaxAI, AlphaBetaAI */

var controller = new BoardController();

$(document).ready(function(){
    $('button.pit').click(function(){
        controller.playMove($(this).attr('id'));
    });
});
