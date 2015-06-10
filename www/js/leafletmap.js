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

var map = false;
var mapMarkers = new L.FeatureGroup();
var userMaker = false;
var watchId = false;

var musicPointDisabled = L.icon({
    iconUrl: 'images/map-point-disabled.png',
    iconRetinaUrl: 'images/map-point-disabled@2x.png',
    iconSize: [36, 48],
    iconAnchor: [17.90, 48]
});

var musicPointEnabled = L.icon({
    iconUrl: 'images/map-point-enabled.png',
    iconRetinaUrl: 'images/map-point-enabled@2x.png',
    iconSize: [36, 48],
    iconAnchor: [17.90, 48]
});

var musicPointSolved = L.icon({
    iconUrl: 'images/map-point-solved.png',
    iconRetinaUrl: 'images/map-point-solved@2x.png',
    iconSize: [36, 48],
    iconAnchor: [17.90, 48]
});

var userIcon = L.icon({
    iconUrl: 'images/map-user.png',
    iconRetinaUrl: 'images/map-user@2x.png',
    iconSize: [84, 65],
    iconAnchor: [40, 63]
});


function createMap () {
    var mapAttribution = 'Map Data &copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> and Contributors';
    
    centerPoint = appConf.start_position[1];
    
    map = L.map('map', {zoomControl: false}).setView([centerPoint.lat, centerPoint.lng], 18);

    L.tileLayer('data/map/{z}/{x}/{y}.jpg', {
        attribution: mapAttribution,
        minZoom: 16,
        maxZoom: 18
    }).addTo(map);
    
    //TODO: criar limites
    
    setBtnLocationStatus();
    
    setMapMarkers();
    
    verifyProgress();
}

/**
 * Handler to #btn-location
 * @returns {undefined}
 */
function btnLocationHandler() 
{
    if (userMaker !== false) {
        map.removeLayer(userMaker);
        userMaker = false;
        setBtnLocationStatus();
    } else {
        followUserPosition();
    }
}

function setCenterToLocation (lat, lng) 
{
    var pos = L.latLng(lat, lng);
   
    map.panTo(pos);
}

function updateUserMarkerPosition (lat, lng) {
    var pos = L.latLng(lat, lng);
    
    if (userMaker) {
        userMaker.setLatLng(pos);
    } else {
        userMaker = L.marker(pos,{
            icon: userIcon
        }).addTo(map);
    }
}


function setUserPosition (position) {
    updateUserMarkerPosition(position.coords.latitude, position.coords.longitude);
    setCenterToLocation(position.coords.latitude, position.coords.longitude);
}

function followUserPosition () {
    return navigator.geolocation.watchPosition(
            geolocationSuccess, geolocationError,
    {
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 1000
    });
}

function setBtnLocationStatus () {
    if (userMaker === false) {
        $('#btn-location').addClass('btn-location-disabled');
    } else {
        $('#btn-location').removeClass('btn-location-disabled');
    }
}

function geolocationSuccess (position) 
{
    setUserPosition(position);
}

function geolocationError (error)
{
    
}

/**
 * 
 * @returns {undefined}
 */
function setMapMarkers () {
    clearMap();
    
    $.each(appConf.puzzle_data, addPuzzkeMaker);
    
    map.addLayer(mapMarkers);
}

function addPuzzkeMaker (key, puzzle) {
    var pointIcon = isPuzzleEnabled(puzzle) ? musicPointEnabled : musicPointDisabled;
    
    for (i=0; i < puzzle.coordinates.length; i ++) {
        var point = puzzle.coordinates[i];
        
        mapMarkers.addLayer(
            L.marker(L.latLng(point.lat, point.lng),{
                icon: pointIcon,
                title: point.place
            })
        );
    }
}

function verifyUserAtPuzzlePosition () {
    //Se estiver na mesma posicao do puzzle (raio de 2m)
    //Gravar puzzle como habilitado
    //habilitar botão e linha para ir ao puzzle
}

function clearMap () {
    map.removeLayer(userMaker);
    userMaker = false;
    
    map.removeLayer(mapMarkers);
}

function getDistance (point1, point2) {
    dist_lat = point1.lat - point2.lat;
    dist_lng = point1.lng - point2.lng;
    
    return Math.sqrt(dist_lat * dist_lat + dist_lng * dist_lng );
}