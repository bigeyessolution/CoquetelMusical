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

var solved_puzzles = [];

function verifyProgress () {    
    enableSovedRows();
    
    setScorePage(solved_puzzles.length);
    
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
function addSolvedPuzzle (puzzle) {
    if (solved_puzzles.indexOf(puzzle) < 0) {
        solved_puzzles.push(puzzle);
        solved_puzzles.sort();
        window.localStorage.setItem('solved_puzzles', JSON.stringify(solved_puzzles));
    }
}

/**
 * 
 * @returns {Array|solved_puzzles}
 */
function getSolvedPuzzlesFromCache () {
    var puzzles = window.localStorage.getItem('solved_puzzles');
    solved_puzzles = [];
    
    if (puzzles) {
        puzzles = JSON.parse(puzzles);
        
        for (i=0; i<puzzles.length; i++) {
            solved_puzzles.push(parseInt(puzzles[i]));
        }
    }
    
    return solved_puzzles;
}

/**
 * 
 * @param {integer} puzzle_row
 * @returns {Boolean}
 */
function isPuzzleEnabled (puzzle_row) {
    return solved_puzzles.indexOf(puzzle_row) > -1;
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
    var music_folder = cordova.file.applicationDirectory.replace('file://', '') + "www/data/music/";
//    var music_folder = "data/music/";
    
    $("#puzzle-page .be-puzzle-image").attr("src", "data/images/" + puzzle_data.image);
    $("#puzzle-page .be-puzzle-text").html(puzzle_data.text);
    $("#puzzle-answer").attr("maxlength", puzzle_data.word.length);
    $("#btn-answer").attr("disabled", true);
    $("#puzzle-audio").empty();
    $('<source  src="' + music_folder + puzzle_data.music + '" type="audio/mpeg">').appendTo("#puzzle-audio");
    
    $("#puzzle-solved-page .be-puzzle-image").attr("src", "data/images/" + puzzle_data.solved_image);
    $("#puzzle-solved-page .be-puzzle-solved-text").html(puzzle_data.solved_text);
    $("#music-name").html(puzzle_data.music_name);
    $("#music-author").html(puzzle_data.music_author);
    $("#music-player").html(puzzle_data.music_player);
    $("#puzzle-solved-audio").empty();
    $('<source  src="' + music_folder + puzzle_data.music_solved + '" type="audio/mpeg">').appendTo("#puzzle-solved-audio");
    
    //set new puzzle and verifyLastPuzzle
}

function answerVerifier () {
    if (getPuzzleData().word.toLowerCase().trim() === $("#puzzle-answer").val().toLowerCase().trim()) {
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#puzzle-solved-page", { transition: "flip" } );
    }
    
    //Resgistrar a resposta se estiver correta
    //
}