/* 
 * Copyright (C) 2015 laudivan
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */


/**
 * 
 * @returns {undefined}
 */
function enableSovedRows () {
    last_puzzle = getLastPuzzle();
    
    $("#puzzles-table").click( null );
    
    if (isLastPuzzleEnabled()) {
        enablePuzzleRow(last_puzzle);
    }
    
    for (row=0; row < last_puzzle; row++ ) {
        $("#puzzles-table #row-" + row).removeClass("enabled").addClass("solved");
    }
}

function enablePuzzleRow (puzzle) {
    $("#puzzles-table #row-" + puzzle).addClass("enabled");
    
    $("#puzzles-table").click(function () 
    {
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#puzzle-page", { } );
    });
}

/**
 * 
 * @param {integer} last_puzzle
 * @returns {undefined}
 */
function setScorePage (last_puzzle) {
    $("#img-score").attr("src", "./data/images/score." + last_puzzle + ".png");
    $(".facebook_message").html(getPuzzleData().facebook_message);
}

function setUiEvents () {
    //$("#btn-go-to-puzzle").hide();
    
    $("#puzzle-answer").keyup(function ()
    {
        var disabled = $("#puzzle-answer").val().length != $("#puzzle-answer").attr("maxlength");
        
        $("#btn-answer").attr("disabled", disabled );
    });
    
    $("#btn-answer").click(answerVerifier);
    
    $("#btn-location").on("click", btnLocationHandler);
    
    $(":mobile-pagecontainer").on("pagecontainershow", function( event, ui ) 
    {
        toPage = ui.toPage.attr("id");
        prevPage = ui.prevPage.attr("id");
        
        switch(prevPage) {
            case 'puzzle-page':
            case 'puzzle-solved-page':
                $("audio").load();
                break;
        }
        
        switch(toPage) {
            case 'puzzle-page':
                eval(getPuzzleData().puzzle_handler + "()");
                break;
            case 'puzzle-solved-page':
                document.getElementById("puzzle-solved-audio").play();
                break;
            default:
                break;
        }
    });
}


