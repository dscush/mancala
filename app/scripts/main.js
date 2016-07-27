"use strict";

/* global $, BoardModel, BoardController */

var controller = new BoardController();

$(document).ready(function(){
    $('button.pit').click(function(){
        controller.playMove($(this).attr('id'));
    });
    controller.drawBoard("Bottom player goes first");
});
