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

var solvedPuzzles = [];
var enabledPuzzle = -1;
var enabledPuzzleData = false;
var mediaPuzzle = false;
var mediaSolvedPuzzle = false;

/**
 * 
 * @returns {undefined}
 */
function verifyProgress () {
    var lastSolvedPuzzle = getLastSolvedPuzzle();
    
    if (lastSolvedPuzzle > -1) {
        setScorePage(lastSolvedPuzzle);
    }
    
    enableSolvedRows();
}

/**
 * 
 * @returns {undefined}
 */
function handlePuzzle () {
    switch (getPuzzleData().puzzle_handler) {
        case 'showPageHandler':
            showPageHandler();
            break;
        case 'touchRhythmHandler':
            touchRhythmHandler();
            break;
        case 'btnAcocharHandler':
            btnAcocharHandler();
            break;
        case 'showMusicSheetHandler':
            showMusicSheetHandler();
            break;
    }
}

/**
 * 
 * @returns {undefined}
 */
function handleSolvedPuzzle () {
    mediaSolvedPuzzle = new Media ($("#puzzle-solved-audio source").attr("src"));
    mediaSolvedPuzzle.play();
}

function showPageHandler () {
    mediaPuzzle = new Media ($("#puzzle-audio source").attr("src"));
    mediaPuzzle.play(); //    document.getElementById("puzzle-audio").play();
}

function touchRhythmHandler () {
    navigator.notification.alert("Função de Handler não definida");
}

function btnAcocharHandler () {
    navigator.notification.alert("Função de Handler não definida");
}

function showMusicSheetHandler () {
    navigator.notification.alert("Função de Handler não definida");
}

/**
 * 
 * @param {object} puzzle
 * @returns {undefined}
 */
function addSolvedPuzzle (puzzle) {
    enablePuzzle(false);
    
    if (solvedPuzzles.indexOf(puzzle.row) < 0) {
        window.localStorage.setItem('lastSolvedPuzzle', puzzle.row);
        
        solvedPuzzles.push(puzzle.row);
        solvedPuzzles.sort();
        window.localStorage.setItem('solvedPuzzles', JSON.stringify(solvedPuzzles));
    }
}

/**
 * 
 * @returns {Array|solvedPuzzles}
 */
function getPuzzlesFromCache () {
    var puzzles = window.localStorage.getItem('solvedPuzzles');
    var enabled = window.localStorage.getItem('enabledPuzzle');
    
    enabledPuzzle = enabled ? parseInt(enabled): -1;
    
    solvedPuzzles = [];
    
    if (puzzles) {
        puzzles = JSON.parse(puzzles);
        
        for (i=0; i<puzzles.length; i++) {
            solvedPuzzles.push(parseInt(puzzles[i]));
        }
    }
    
    return solvedPuzzles;
}

/**
 * 
 * @param {object} puzzle
 * @returns {undefined}
 */
function enablePuzzle (puzzle) {
    enabledPuzzleData = puzzle;
    enabledPuzzle = puzzle === false ? -1 : puzzle.row;
    window.localStorage.setItem("enabledPuzzle", puzzle.row);
}

/**
 * 
 * @param {object} puzzle_row
 * @returns {Boolean}
 */
function isPuzzleEnabled (puzzle) {
    return (enabledPuzzle == puzzle.row) && ! isPuzzleSolved(puzzle);
}

/**
 * 
 * @param {object} puzzle_row
 * @returns {Boolean}
 */
function isPuzzleSolved (puzzle) {
    return solvedPuzzles.indexOf(puzzle.row) > -1;
}

/**
 * Return last open puzzle or 0.
 * @returns {integer}
 */
function getLastSolvedPuzzle () {
    var lastSolvedPuzzle = window.localStorage.getItem('lastSolvedPuzzle');
    return lastSolvedPuzzle ? parseInt(lastSolvedPuzzle) : -1;
}

/**
 * 
 * @returns {object}
 */
function getPuzzleData () {
    return appConf.puzzle_data[enabledPuzzle];
}

function answerVerifier () {
    if (getPuzzleData().word.toLowerCase().trim() === $("#puzzle-answer").val().toLowerCase().trim()) {
        addSolvedPuzzle(getPuzzleData());
        clearMap();
        setMapMarkers();
        verifyProgress();
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#puzzle-solved-page", { transition: "flip" } );
    } else {
        navigator.notification.alert("Se aveche não que num foi desta vez! Vamos tentar denovo?", 
        function () {
            mediaPuzzle.stop();
            mediaPuzzle.play(); 
        }, "Não foi desta vez", "Simbora!");
    }
}