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

var gaPlugin = false;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady () {
    document.addEventListener("online", onOnline, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("pause", onPause, false);
    
    app_folder = cordova.file.applicationDirectory.replace('file://', '');
    music_folder = app_folder + "www/data/music/";
    map_folder = app_folder + "www/data/music/";
    console.log (app_folder);
    getPuzzlesFromCache();

    createMap();
    
    setUiEvents();
    
    setMapMarkers();
    
    verifyProgress();
    
    $("#list-of-solved-puzzles a").hide();
    $("#list-of-solved-puzzles br").hide();
    
    gaPlugin = window.plugins.gaPlugin;
    
    gaPlugin.init(gaPluginSucessHandler, gaPluginErrorHandler, "UA-59363254-2", 10);
}

function onOnline () {
}

function onResume () {
    if (gaPlugin === false) {
        gaPlugin = window.plugins.gaPlugin;
        
        gaPlugin.init(gaPluginSucessHandler, gaPluginErrorHandler, "UA-59363254-2", 10);
    }
}

function onPause () {
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#location-page", { } );
    
    if(watchId !== false) { //unfollow user
        unfollowUserPosition();
        setBtnLocationStatus(false);
    }
    
    if (gaPlugin !== false) {
        gaPlugin.exit(gaPluginSucessHandler, gaPluginErrorHandler);
        
        gaPlugin = false;
    }
}

function gaPluginSucessHandler () {
    
}

function gaPluginErrorHandler () {
    
}