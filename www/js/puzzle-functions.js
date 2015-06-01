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

var application_conf = false;

function verifyProgress () {
    var last_puzzle = getLastPuzzle();
    
    enableLastRow(last_puzzle);
    
    setScorePage(last_puzzle);
    
    if (last_puzzle < 10 && google !== undefined && google.maps !== undefined) {
        
        last_puzzle = last_puzzle < 0 ? 0 : last_puzzle;
        
        preparePuzzlePage( getPuzzleData() );
        
        setMapMarkers( getPuzzleData(last_puzzle).coordinates );
    }
}

function showPageHandler () {
    
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

/**
 * Return last open puzzle or 0.
 * @returns {integer}
 */
function getLastPuzzle () {
    var last_puzzle = window.localStorage.getItem('last_puzzle');
    return last_puzzle ? parseInt(last_puzzle) : 0;
}

function getPuzzleData () {
    return application_conf.puzzle_data[getLastPuzzle()];
}

function preparePuzzlePage (puzzle_data) {
    $("#puzzle-page .be-puzzle-image").attr("src", "data/images/" + puzzle_data.image);
    $("#puzzle-page .be-puzzle-text").html(puzzle_data.text);
    $("#puzzle-answer").attr("maxlength", puzzle_data.word.length);
    $("#puzzle-audio source").attr("src", "data/music/" + puzzle_data.music);
    $("#btn-answer").attr("disabled", true);
    
    $("#puzzle-solved-page .be-puzzle-image").attr("src", "data/images/" + puzzle_data.solved_image);
    $("#puzzle-solved-audio source").attr("src", "data/music/" + puzzle_data.music_solved);
    $("#puzzle-solved-page .be-puzzle-text").html(puzzle_data.solved_text);
    $("#music-name").html();
    $("#music-author").html();
    $("#music-player").html();
    
    //set new puzzle and verifyLastPuzzle
}

function answerVerifier () {
    if (getPuzzleData().word.toLowerCase().trim() === $("#puzzle-answer").val().toLowerCase().trim()) {
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#puzzle-solved-page", { transition: "flip" } );
    }
}