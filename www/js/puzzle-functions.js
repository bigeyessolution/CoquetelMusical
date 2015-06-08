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

function verifyProgress () {
    var last_puzzle = getLastPuzzle();
    
    enableSovedRows();
    
    setScorePage(last_puzzle);
    
    preparePuzzlePage( getPuzzleData() );
}

function showPageHandler () {
    document.getElementById("puzzle-audio").play();
}

function touchRhythmHandler () {
    
}

function btnAcocharHandler () {
    
}

function showMusicSheetHandler () {
    
}

/**
 * 
 * @param {integer} puzzle
 * @returns {undefined}
 */
function setSolvedPuzzle (puzzle) {
    puzzle = puzzle + 1;
    window.localStorage.setItem('last_puzzle', puzzle);
}

function enabledLastPuzzle () {
    window.localStorage.setItem('last_puzzle_enabled', getLastPuzzle());
}

function getLastPuzzleEnable () {
    var last_puzzle_enabled = window.localStorage.getItem('last_puzzle_enabled');
    return last_puzzle_enabled ? parseInt(last_puzzle_enabled) : -1;
}

function isLastPuzzleEnabled () {
    return true; //TODO: remover
    return getLastPuzzle() == getLastPuzzleEnable();
}

/**
 * Return last open puzzle or 0.
 * @returns {integer}
 */
function getLastPuzzle () {
    var last_puzzle = window.localStorage.getItem('last_puzzle');
    return last_puzzle ? parseInt(last_puzzle) : 0;
}

function getPuzzleData () {
    return appConf.puzzle_data[getLastPuzzle()];
}

function preparePuzzlePage (puzzle_data) {
    $("#puzzle-page .be-puzzle-image").attr("src", "data/images/" + puzzle_data.image);
    $("#puzzle-page .be-puzzle-text").html(puzzle_data.text);
    $("#puzzle-answer").attr("maxlength", puzzle_data.word.length);
    $("#btn-answer").attr("disabled", true);
    $("#puzzle-audio").empty();
    $('<source  src="data/music/' + puzzle_data.music + '" type="audio/mpeg">').appendTo("#puzzle-audio");
    
    $("#puzzle-solved-page .be-puzzle-image").attr("src", "data/images/" + puzzle_data.solved_image);
    $("#puzzle-solved-page .be-puzzle-solved-text").html(puzzle_data.solved_text);
    $("#music-name").html(puzzle_data.music_name);
    $("#music-author").html(puzzle_data.music_author);
    $("#music-player").html(puzzle_data.music_player);
    $("#puzzle-solved-audio").empty();
    $('<source  src="data/music/' + puzzle_data.music_solved + '" type="audio/mpeg">').appendTo("#puzzle-solved-audio");
    
    //set new puzzle and verifyLastPuzzle
}

function answerVerifier () {
    if (getPuzzleData().word.toLowerCase().trim() === $("#puzzle-answer").val().toLowerCase().trim()) {
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#puzzle-solved-page", { transition: "flip" } );
    }
    
    //Resgistrar a resposta se estiver correta
    //
}