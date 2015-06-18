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
var intervalId = false;

var music_folder = false;

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
    $("#btn-puzzle-action").addClass("be-invisible");
    $("#img-puzzle-action").addClass("be-invisible");
    
    $(".be-puzzle-image").removeClass("be-invisible");
    
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
        case 'shakeToPlayHandler':
            shakeToPlayHandler();
            break;
    }
}

/**
 * 
 * @returns {undefined}
 */
function handleSolvedPuzzle () {
    if (getLastSolvedPuzzle() > -1) {
        var lastSolvedPuzzle = appConf.puzzle_data[getLastSolvedPuzzle()];
        
        mediaSolvedPuzzle = new Media (music_folder + lastSolvedPuzzle.music_solved);
        mediaSolvedPuzzle.play();
    }
}

function showPageHandler () {
    mediaPuzzle = new Media (music_folder + getPuzzleData().music);
    
    intervalId = setInterval(
    function () {
        if(_mediaStatus == Media.MEDIA_PAUSED) {
            mediaPuzzle.play();
            _mediaStatus = Media.MEDIA_RUNNING;
        }
        
        mediaPuzzle.getCurrentPosition(function(position) {
            if( position > mediaPuzzle.getDuration() - 1 ) {
                mediaPuzzle.pause();
                _mediaStatus = Media.MEDIA_PAUSED;
                mediaPuzzle.seekTo(0);
            }
        }); 
    }, 100);
    
    mediaPuzzle.play(); //    document.getElementById("puzzle-audio").play();
}

var _timer = 0;
var _mediaStatus = 0;

function touchRhythmHandler () {
    $("#btn-puzzle-action").removeClass("be-invisible");
    $("#btn-puzzle-action").on("click", function () {
        _timer = _timer < 3 ? _timer + 1 : _timer;
    });
    
    mediaPuzzle = new Media (music_folder + getPuzzleData().music);
    //mediaPuzzle.play(); //    document.getElementById("puzzle-audio").play();
    
    _timer = 0;
    
    intervalId = setInterval(
    function () {
        if (_timer > 0) {
            _timer --;
            
            if(_mediaStatus == Media.MEDIA_PAUSED) {
                mediaPuzzle.play();
                _mediaStatus = Media.MEDIA_RUNNING;
            }
        } else {
            mediaPuzzle.pause();
            _mediaStatus = Media.MEDIA_PAUSED;
        }
        
        mediaPuzzle.getCurrentPosition(function(position) {
            if( position > mediaPuzzle.getDuration() - 1 ) {
                mediaPuzzle.pause();
                _mediaStatus = Media.MEDIA_PAUSED;
                mediaPuzzle.seekTo(0);
            }
        }); 
    }, 1000);
}

var _margin = 0;
var _maxMargin = 0;

function btnAcocharHandler () {
    $(".be-puzzle-image").addClass("be-invisible");
    
    $("#img-puzzle-action").removeClass("be-invisible");
    $('<img id="img-puzzle-man" src="data/images/' + getPuzzleData().image_1 + '">').appendTo("#img-puzzle-action");
    $('<img id="img-puzzle-woman" src="data/images/' + getPuzzleData().image_2 + '">').appendTo("#img-puzzle-action");
    
    $("#btn-puzzle-action").removeClass("be-invisible");
    
    var divSize = parseInt( $("#img-puzzle-action").css("width").replace("px","") );
    var imgSize = parseInt( $("#img-puzzle-man").css("width").replace("px","") );
    var negativeMargin = parseInt( $("#img-puzzle-man").css("margin-right").replace("px","") );

    maxMargin = Math.floor((divSize - imgSize)/2);
    
    $("#btn-puzzle-action").on("click", function (){
        
        if(_margin < maxMargin) {
            _margin = _margin + 5;
            
            $("#img-puzzle-man").css("margin-left", _margin + "px");
            $("#img-puzzle-woman").css("margin-right", _margin + "px");
        }
        
    });
    
    mediaPuzzle = new Media (music_folder + getPuzzleData().music);
    
    intervalId = setInterval(
    function () {
        _margin = _margin - 5;
        
        if (_margin > 0) {
            $("#img-puzzle-man").css("margin-left", _margin + "px");
            $("#img-puzzle-woman").css("margin-right", _margin + "px");
        }
        
        if(_mediaStatus == Media.MEDIA_PAUSED) {
            mediaPuzzle.play();
            _mediaStatus = Media.MEDIA_RUNNING;
        }
        
        mediaPuzzle.getCurrentPosition(function(position) {
            if( position > mediaPuzzle.getDuration() - 1 ) {
                mediaPuzzle.pause();
                _mediaStatus = Media.MEDIA_PAUSED;
                mediaPuzzle.seekTo(0);
            }
        });
    }, 2000);
    
    mediaPuzzle.play();
}

function showMusicSheetHandler () {
    console.log("Showing music sheet");
}

var devMotionWatchId = false;
function shakeToPlayHandler () {
    
    _mediaStatus = Media.MEDIA_PAUSED;
    
    mediaPuzzle = new Media (music_folder + getPuzzleData().music);
    
    _timer = 0;    
    
    var previous = false;
    devMotionWatchId = navigator.accelerometer.watchAcceleration(
    function (acceleration) {
        var x = acceleration.x;
        var y = acceleration.y;
        var z = acceleration.z;
        var t = false;
        
        if (previous){
            if (isShaking(previous, acceleration, 5)){
                _timer = _timer < 2 ? _timer + 1 : _timer;
            } else {
                _timer = _timer > 0 ? _timer - 1 : _timer;
            }
            
            if (_timer > 0) {
                mediaPuzzle.play();
                
                if(_mediaStatus == Media.MEDIA_PAUSED) {
                    
                    _mediaStatus = Media.MEDIA_RUNNING;
                }
            } else {
                mediaPuzzle.pause();
                _mediaStatus = Media.MEDIA_PAUSED;
            }
            
            mediaPuzzle.getCurrentPosition(function(position) {
                if( position > mediaPuzzle.getDuration()-1 ) {
                    mediaPuzzle.pause();
                    _mediaStatus = Media.MEDIA_PAUSED;
                    mediaPuzzle.seekTo(0);
                }
            });
        }

        previous = acceleration;
    },
    function (error) {}, { frequency: 1000 });
}

function isShaking(last, current, threshold) {
    var deltaX = Math.abs(last.x - current.x),
        deltaY = Math.abs(last.y - current.y),
        deltaZ = Math.abs(last.z - current.z);

    return ((deltaX > threshold && deltaY > threshold) ||
        (deltaX > threshold && deltaZ > threshold) ||
        (deltaY > threshold && deltaZ > threshold) || deltaX > threshold);   
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
    var enabled = "4";//window.localStorage.getItem('enabledPuzzle');
    
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
    return (enabledPuzzle == puzzle.row);
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
        }, "Não foi desta vez", "Simbora!");
    }
}
