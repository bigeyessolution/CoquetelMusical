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

var locationIcon = L.icon({
    iconUrl: 'images/btn-icon-map.png',
    iconRetinaUrl: 'images/btn-icon-map@2x.png',
    iconSize: [40, 54],
    iconAnchor: [2.88, 54],
    popupAnchor: [-3, -76],
    shadowUrl: 'images/btn-icon-shadow-map.png',
    shadowRetinaUrl: 'images/btn-icon-shadow-map@2x.png',
    shadowSize: [52, 26],
    shadowAnchor: [4.38, 26]
});

var musicIcon = L.icon({
    iconUrl: 'images/btn-icon-map-music.png',
    iconRetinaUrl: 'images/btn-icon-map-music@2x.png',
    iconSize: [35, 36],
    iconAnchor: [6.63, 36],
    popupAnchor: [-3, -76]
//    shadowUrl: 'images/btn-icon-shadow-map-music.png',
//    shadowRetinaUrl: 'images/btn-icon-shadow-map-music@2x.png',
//    shadowSize: [80, 27],
//    shadowAnchor: [15.47, 24]
});

var userIcon = L.icon({
    iconUrl: 'images/btn-icon-user-map.png',
    iconRetinaUrl: 'images/btn-icon-user-map@2x.png',
    iconSize: [48, 54],
    iconAnchor: [26, 54]
//    popupAnchor: [-3, -76],
//    shadowUrl: 'images/btn-icon-shadow-map-music.png',
//    shadowRetinaUrl: 'images/btn-icon-shadow-map-music@2x.png',
//    shadowSize: [80, 27],
//    shadowAnchor: [15.47, 24]
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
    
    $("#btn-location").on("click", btnLocationHandler);
    
    //setMapMarkers();
    
    $.each(appConf.puzzle_data, function(key, puzzle)
    {
        for (i=0; i < puzzle.coordinates.length; i++) {
            var point = puzzle.coordinates[i];

            marker = L.marker(L.latLng(point.lat, point.lng),{
                icon: musicIcon,
                title: point.place,
                opacity: isPuzzleEnabled(puzzle) ? 1 : 0.5
            }).addTo(map);
            mapMarkers.addLayer(marker);
        }
    });
    
    map.addLayer(mapMarkers);
    
    verifyProgress();
}


function btnLocationHandler() 
{
    //setUserPosition();
    followUserPosition();
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
    
    for (i=0; i < getPuzzleData().coordinates.length; i++) {
        var point = getPuzzleData().coordinates[i];
        
        marker = L.marker(L.latLng(point.lat, point.lng),{
            icon: musicIcon,
            title: point.place,
            opacity: isLastPuzzleEnabled() ? 1 : 0.5
        }).addTo(map);
        mapMarkers.addLayer(marker);
    }
    
    map.addLayer(mapMarkers);
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