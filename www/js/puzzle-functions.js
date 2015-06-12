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
    mediaSolvedPuzzle = new Media ($("#puzzle-solved-audio source").attr("src"));
    mediaSolvedPuzzle.play();
}

function showPageHandler () {
    mediaPuzzle = new Media ($("#puzzle-audio source").attr("src"),
        function () {}, function () {}, function (status) {
            if( status==Media.MEDIA_STOPPED && enabledPuzzle > -1 ) {
                mediaPuzzle.play();
            }
        }
    );
    
    mediaPuzzle.play(); //    document.getElementById("puzzle-audio").play();
}

var _timer = 0;
var _mediaStatus = 0;

function touchRhythmHandler () {
    $("#btn-puzzle-action").removeClass("be-invisible");
    $("#btn-puzzle-action").on("click", function () {
        _timer = _timer < 3 ? _timer + 1 : _timer;
    });
    
    mediaPuzzle = new Media ($("#puzzle-audio source").attr("src"));
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
            if( position > mediaPuzzle.getDuration()-1 ) {
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
    $('<img id="img-puzzle-man" src="data/images/puzzle.2.man.png">').appendTo("#img-puzzle-action");
    $('<img id="img-puzzle-woman" src="data/images/puzzle.2.woman.png">').appendTo("#img-puzzle-action");
    
    $("#btn-puzzle-action").removeClass("be-invisible");
    
    var divSize = parseInt( $("#img-puzzle-action").css("width").replace("px","") );
    var imgSize = parseInt( $("#img-puzzle-man").css("width").replace("px","") );
    var negativeMargin = parseInt( $("#img-puzzle-man").css("margin-right").replace("px","") );

    maxMargin = (divSize - imgSize - 10)/2;
    
    $("#btn-puzzle-action").on("click", function (){
        
        if(_margin < maxMargin) {
            _margin = _margin + 5;
            
            $("#img-puzzle-man").css("margin-left", _margin + "px");
            $("#img-puzzle-woman").css("margin-right", _margin + "px");
        }
        
    });
    
    intervalId = setInterval(
    function () {
        _margin = _margin - 5;
        
        if (_margin > 0) {
            $("#img-puzzle-man").css("margin-left", _margin + "px");
            $("#img-puzzle-woman").css("margin-right", _margin + "px");
        }
    }, 2000);
    
    mediaPuzzle = new Media ($("#puzzle-audio source").attr("src"),
        function () {}, function () {}, function (status) {
            if( status==Media.MEDIA_STOPPED && enabledPuzzle > -1 ) {
                mediaPuzzle.play();
            }
        }
    );
    
    mediaPuzzle.play();
}

function showMusicSheetHandler () {
    navigator.notification.alert("Função de Handler não definida");
}

var devMotionWatchId = false;
var previousAcceleration = false;
function shakeToPlayHandler () {
    previousAcceleration = { x: null, y: null, z: null };
    
    _mediaStatus = Media.MEDIA_PAUSED;
    
    mediaPuzzle = new Media ($("#puzzle-audio source").attr("src"),
        function () {}, function () {}, function (status) {
            if( status==Media.MEDIA_STOPPED && enabledPuzzle > -1 ) {
                mediaPuzzle.play();
            }
        }
    );
    
    _timer = 0;    
    
    devMotionWatchId = navigator.accelerometer.watchAcceleration(
    function (acceleration) {
        var accelerationChange = {};
        if (previousAcceleration.x !== null) {
            accelerationChange.x = Math.abs(previousAcceleration.x - acceleration.x);
            accelerationChange.y = Math.abs(previousAcceleration.y - acceleration.y);
            accelerationChange.z = Math.abs(previousAcceleration.z - acceleration.z);
        }

        previousAcceleration = {
            x: acceleration.x,
            y: acceleration.y,
            z: acceleration.z
        };

        if (accelerationChange.x + accelerationChange.y + accelerationChange.z > 5) {
            _timer = _timer < 5 ? _timer + 1: _timer;
        } else if(_timer > 0) {
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
            if( position > mediaPuzzle.getDuration()-1 ) {
                mediaPuzzle.pause();
                _mediaStatus = Media.MEDIA_PAUSED;
                mediaPuzzle.seekTo(0);
            }
        });
        
    },
    function (error) {}, { frequency: 1000 });
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
    var enabled = "8";//window.localStorage.getItem('enabledPuzzle');
    
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
        if(intervalId !== false) {
            clearInterval(intervalId);
        }
        
        if(devMotionWatchId !== false) {
            navigator.accelerometer.clearWatch(devMotionWatchId);
            
            devMotionWatchId = false;
        }
        
        if(previousAcceleration !== false) {
            previousAcceleration = false;
        }
        
        addSolvedPuzzle(getPuzzleData());
        clearMap();
        setMapMarkers();
        verifyProgress();
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#puzzle-solved-page", { transition: "flip" } );
    } else {
        navigator.notification.alert("Se aveche não que num foi desta vez! Vamos tentar denovo?", 
        function () {
//            mediaPuzzle.stop();
//            mediaPuzzle.play(); 
        }, "Não foi desta vez", "Simbora!");
    }
}
