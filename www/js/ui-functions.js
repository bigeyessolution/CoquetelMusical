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
function enableSolvedRows () {
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
}

/**
 * 
 * @param {integer} puzzle
 * @returns {undefined}
 */
function setScorePage (puzzle) {
    if (puzzle > -1 ) {
        $("#img-score").attr("src", "data/images/score." + solvedPuzzles.length + ".png");
        $("#facebook_message").html(appConf.puzzle_data[puzzle].facebook_message);
        $("#facebook_message_content").removeClass("be-invisible");
    } else {
        $('#facebook_message_content').addClass("be-invisible");
        $("#img-score").attr("src", "data/images/score.0.png");
    }
}

function setUiEvents () {
    $("#puzzle-answer").keyup(function () {
        var disabled = $("#puzzle-answer").val().length != $("#puzzle-answer").attr("maxlength");
        $("#btn-answer").attr("disabled", disabled );
    });
    
    $("#puzzle-answer").focusin(function (e) {
        $("#puzzle-content").slideUp(500);
    });
    
    $("#puzzle-answer").focusout(function (e) {
        $("#puzzle-content").slideDown(500);
    });
    
    $("#puzzles-table").click(function () {
        if (enabledPuzzle >  -1) {
            clearPuzzlePage();
            preparePuzzlePage(getPuzzleData());
            
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "#puzzle-page", { } );
        }
    });
    
    $("#btn-answer").click(answerVerifier);
    $("#btn-location").click(btnLocationHandler);
    
    setBtnLocationStatus(false);
    
    $(":mobile-pagecontainer").on("pagecontainershow", function( event, ui ) {
        prevPage = ui.prevPage.attr("id");
        
        if ( intervalId !== false ) {
            clearInterval(intervalId);
            intervalId = false;
        }
        
        if ( devMotionWatchId !== false ) {
            navigator.accelerometer.clearWatch(devMotionWatchId);
            devMotionWatchId = false;
        }
        
        switch (prevPage) {
            case 'puzzle-solved-page':
                if(mediaSolvedPuzzle !== false) {
                    mediaSolvedPuzzle.pause();
                    mediaSolvedPuzzle.release();
                    mediaSolvedPuzzle = false;
                }
            case 'puzzle-page':
                $("#puzzle-answer").val("");
                $("#btn-answer").attr("disabled", true );
                
                if(mediaPuzzle !== false ) {
                    mediaPuzzle.pause();
                    mediaPuzzle.release();
                    mediaPuzzle = false;
                }
                break;
        }
    });
    
    $(":mobile-pagecontainer").on("pagecontainershow", function( event, ui ) {
        if(watchId !== false) { //unfollow user
            unfollowUserPosition();
            setBtnLocationStatus(false);
        }
        
        toPage = ui.toPage.attr("id");
        
        switch(toPage) {
            case 'puzzle-page':
                if (enabledPuzzle > -1) {
                    handlePuzzle();
                } else {
                    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#location-page", { } );
                }
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
    
    $("#puzzle-page .be-puzzle-image").attr("src", "./data/images/" + puzzle.image);
    $("#puzzle-page .be-puzzle-text").html(puzzle.text);
    $("#puzzle-answer").attr("maxlength", puzzle.word.length);
    $("#btn-answer").attr("disabled", true);
}

/**
 * 
 * @param {object} puzzle
 * @returns {undefined}
 */
function preparePuzzleSolvedPage (puzzle) {
    mediaSolvedPuzzle = new Media (music_folder + puzzle.music_solved);
    console.log(puzzle.solved_image);
    $("#puzzle-solved-page .be-puzzle-image").attr("src", "./data/images/" + puzzle.solved_image);
    $("#puzzle-solved-page .be-puzzle-solved-text").html(puzzle.solved_text);
    $("#music-name").html(puzzle.music_name);
    $("#music-author").html(puzzle.music_author);
    $("#music-player").html(puzzle.music_player);
}

/**
 * 
 * @returns {undefined}
 */
function clearPuzzlePage () {
    $("#btn-puzzle-action").addClass("be-invisible");
    $("#img-puzzle-action").addClass("be-invisible");
    $(".be-puzzle-image").removeClass("be-invisible");
    
    $("#puzzle-page .be-puzzle-image").attr("src", "");
    $("#puzzle-page .be-puzzle-text").html("");
    
    $("#img-puzzle-action").empty();
    $("#img-puzzle-action").addClass("be-invisible");
    
    $("#btn-answer").attr("disabled", true);
}

function populateListOfSolvedPuzzles () {
    if (solvedPuzzles.length === 0) return;
    
    $('#list-of-solved-puzzles-wrapper').empty();

    var list_out = '<ul id="list-of-solved-puzzles" data-role="listview" data-inset="true">';
    for (var i = 0; i < solvedPuzzles.length; i++) {
        var puzzle_row = solvedPuzzles[i];
        var puzzle = appConf.puzzle_data[puzzle_row];
        
        list_out += '<li data-icon="false"><a onclick="showPuzzleSolvedPage(' + 
                puzzle_row +')"><h2>' + puzzle.music_name + '</h2><p>' + 
                puzzle.music_player + '</p></a></li>'
        ;
    }
    
    list_out += '</ul>';
    
    $(list_out).appendTo('#list-of-solved-puzzles-wrapper');
}

function shareOnFacebook () {
    var message = $("#facebook_message").html();
    
    window.plugins.socialsharing.share('Oi, estou jogando o Coquetel Digital. Veja só a mensagem que consegui: ' + message);
}