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

$.getJSON("./data/appconf.json", function (data)
{
    application_conf = data;
});

function verifyProgress () {
    var last_puzzle = getLastPuzzle();
    
    enableLastRow(last_puzzle);
    
    setScorePage(last_puzzle);
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
    return last_puzzle ? parseInt(last_puzzle) : -1;
}

function getPuzzleData (last_puzzle) {
    
}