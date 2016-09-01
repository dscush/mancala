"use strict";

/* global $, BoardController */

var controller = new BoardController();

$(document).ready(function(){
    $('button.pit').click(function(){
        controller.playMove($(this).attr('id'));
    });
});
