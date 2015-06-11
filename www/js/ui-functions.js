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
    $("#puzzles-table").click( null );
    
    for (row=0; row < 10; row++ ) {
        if (solvedPuzzles.indexOf(row) > -1) {
            $("#puzzles-table #row-" + row).removeClass("enabled").addClass("solved");
        }
    }
}

/**
 * 
 * @param {object} puzzle
 * @returns {undefined}
 */
function enablePuzzleRow (puzzle) {
    $("#puzzles-table #row-" + puzzle.row).addClass("enabled");
    
    $("#puzzles-table").click(function () {
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#puzzle-page", { } );
    });
}

/**
 * 
 * @param {object} puzzle
 * @returns {undefined}
 */
function setScorePage (puzzle) {
    $("#img-score").attr("src", "./data/images/score." + solvedPuzzles.length + ".png");
    $(".facebook_message").html(puzzle.facebook_message);
}

function setUiEvents () {
    //$("#btn-go-to-puzzle").hide();
    
    $("#puzzle-answer").keyup(function () {
        var disabled = $("#puzzle-answer").val().length != $("#puzzle-answer").attr("maxlength");
        $("#btn-answer").attr("disabled", disabled );
    });
    
    $("#btn-answer").click(answerVerifier);
    $("#btn-location").click(btnLocationHandler);
    
    setBtnLocationStatus(false);
    
    $(":mobile-pagecontainer").on("pagecontainershow", function( event, ui ) {
        toPage = ui.toPage.attr("id");
        prevPage = ui.prevPage.attr("id");
        
        switch(prevPage) {
            case 'puzzle-page':
            case 'puzzle-solved-page':
//                $("audio").load();
                    if (media) {
                        media.stop();
                        media.release();
                        media = false;
                    }
                break;
        }
        
        switch(toPage) {
            case 'puzzle-page':
                handlePuzzle();
                break;
            case 'puzzle-solved-page':
                handleSolvedPuzzle();
                break;
            default:
                break;
        }
    });
}

/**
 * 
 * @param {object} puzzle
 * @returns {undefined}
 */
function preparePuzzlePage (puzzle) {
    var music_folder = cordova.file.applicationDirectory.replace('file://', '') + "www/data/music/";
    
    $("#puzzle-page .be-puzzle-image").attr("src", "data/images/" + puzzle.image);
    $("#puzzle-page .be-puzzle-text").html(puzzle.text);
    $("#puzzle-answer").attr("maxlength", puzzle.word.length);
    $("#btn-answer").attr("disabled", true);
    $("#puzzle-audio").empty();
    $('<source src="' + music_folder + puzzle.music + '" type="audio/mpeg">').appendTo("#puzzle-audio");
    
    $("#puzzle-solved-page .be-puzzle-image").attr("src", "data/images/" + puzzle.solved_image);
    $("#puzzle-solved-page .be-puzzle-solved-text").html(puzzle.solved_text);
    $("#music-name").html(puzzle.music_name);
    $("#music-author").html(puzzle.music_author);
    $("#music-player").html(puzzle.music_player);
    $("#puzzle-solved-audio").empty();
    $('<source src="' + music_folder + puzzle.music_solved + '" type="audio/mpeg">').appendTo("#puzzle-solved-audio");
}