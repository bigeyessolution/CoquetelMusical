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
 * @returns {undefined}
 */
function enableEnabledPuzzleRow () {
    for (row=0; row < appConf.puzzle_data.length; row++ ) {
        var puzzle = appConf.puzzle_data[row];
        
        if ( isPuzzleEnabled(puzzle) ) {
            enablePuzzleRow(puzzle);
            
            return;
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
 * @returns {undefined}
 */
function setScorePage () {
    $("#img-score").attr("src", "data/images/score." + solvedPuzzles.length + ".png");
    
    if (lastSolvedPuzzle > -1 ) {
        $("#facebook_message").html(appConf.puzzle_data[lastSolvedPuzzle].facebook_message);
        $("#facebook_message_content").removeClass("be-invisible");
    } else {
        $('#facebook_message_content').addClass("be-invisible");
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
    $("#btn-puzzle-help").click(function () {
        navigator.notification.alert("GPS Coquetel Musical mistura game, " +
            "palavras-cruzadas, georeferenciamento, cultura e música " + 
            "regional. Para jogar, você precisa estar fisicamente próximo " + 
            "dos pontos indicados no mapa e conectado ao app instalado no " + 
            "seu celular. Quando o ícone mudar de cor, você pode acessar " + 
            "pistas para tentar resolver o diagrama acima.",
            function () {}, "Ajuda do puzzle"
        );
    });
    
    setBtnLocationStatus(false);
    
    $(":mobile-pagecontainer").on("pagecontainershow", function( event, ui ) {
        var toPage = ui.toPage.attr("id");
        
        if ( intervalId !== false ) {
            clearInterval(intervalId);
            intervalId = false;
        }
        
        if ( devMotionWatchId !== false ) {
            navigator.accelerometer.clearWatch(devMotionWatchId);
            devMotionWatchId = false;
        }
        
        if(watchId !== false) { //unfollow user
            unfollowUserPosition();
            setBtnLocationStatus(false);
        }
        
        switch(toPage) {
            case 'location-page':
                clearMap();
                setMapMarkers();
                
                map.invalidateSize();
                break;
            case 'puzzles-page':
                clearPuzzlePage();
                enableSolvedRows();
                enableEnabledPuzzleRow();
                break;
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
            case 'score-page':
                verifyProgress();
                setScorePage();
                populateListOfSolvedPuzzles ();
                
                setTimeout(function(){ window.scrollTo(0,0); }, 1000)
                
                break;
            default:
                break;
        }
        
        if (gaPlugin) {
            gaPlugin.trackPage( gaPluginSucessHandler, gaPluginErrorHandler, toPage);
        }
    });
    
    $(":mobile-pagecontainer").on("pagecontainerbeforechange", function( event, ui ) {
        var prevPage = ui.prevPage.attr("id");
        
        switch (prevPage) {
            case 'puzzle-page':
                $("#puzzle-answer").val("");
                $("#btn-answer").attr("disabled", true );
                
                if(mediaPuzzle !== false ) {
                    mediaPuzzle.stop();
                    mediaPuzzle.release();
                    mediaPuzzle = false;
                }
                break;
            case 'puzzle-solved-page':
                if(mediaSolvedPuzzle !== false) {
                    mediaSolvedPuzzle.stop();
                    mediaSolvedPuzzle.release();
                    mediaSolvedPuzzle = false;
                }
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
    
    $('#list-of-solved-puzzles').show();

    for (var i = 0; i < solvedPuzzles.length; i++) {
        var puzzle_row = solvedPuzzles[i];
        
        $("#puzzle-" + puzzle_row).show();
    }
}

function shareOnFacebook () {
    var message = $("#facebook_message").html();
    
    window.plugins.socialsharing.share('Oi, estou jogando o Coquetel Digital. Veja só a mensagem que consegui: ' + message);
}