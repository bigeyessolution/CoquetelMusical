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
var mapPuzzlesPoints = [];
var userMarker = false;
var userCircleMarker = false;
var userMarkerLayer = new L.FeatureGroup();
var watchId = false;
var showPuzzleEnabledMessage = false;
var map_folder = false;

var musicPointDisabled = L.icon({
    iconUrl: 'images/map-point-disabled.png',
    iconRetinaUrl: 'images/map-point-disabled@2x.png',
    iconSize: [36, 48],
    iconAnchor: [18, 48]
});

var musicPointEnabled = L.icon({
    iconUrl: 'images/map-point-enabled.png',
    iconRetinaUrl: 'images/map-point-enabled@2x.png',
    iconSize: [36, 48],
    iconAnchor: [18, 48]
});

var musicPointSolved = L.icon({
    iconUrl: 'images/map-point-solved.png',
    iconRetinaUrl: 'images/map-point-solved@2x.png',
    iconSize: [36, 48],
    iconAnchor: [18, 48]
});

var userIcon = L.icon({ //@TODO diminuir
    iconUrl: 'images/map-user.png',
    iconRetinaUrl: 'images/map-user@2x.png',
    iconSize: [84, 65],
    iconAnchor: [39.93, 62]
});


function createMap () 
{
    var mapAttribution = 'Map Data &copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> and Contributors';
    
    centerPoint = appConf.start_position[0];
    
    map = L.map('map', {zoomControl: false}).setView([centerPoint.lat, centerPoint.lng], 18);

    //@TODO: verificar se vai usar offline ou não.
    L.tileLayer('data/map/{z}/{x}/{y}.jpg', {
        attribution: mapAttribution,
        minZoom: 16,
        maxZoom: 18
    }).addTo(map);
    
    //TODO: criar limites
    
    userMarker = L.marker(L.latLng(0, 0),{ icon: userIcon });
    userCircleMarker = L.circleMarker(L.latLng(0, 0), {
        stroke: true, color: '#b35731', weigth: 2, opacity: 0.5,
        fill: true, fillColor: '#dbaf9c', fillOpacity: 0.5
    });
    userCircleMarker.setRadius(20);
    userMarkerLayer.addLayer(userCircleMarker);
    userMarkerLayer.addLayer(userMarker);
    
    map.addLayer(mapMarkers);
}

/**
 * @TODO verificar se a geolocalização está ativada
 * Handler to #btn-location
 * @returns {undefined}
 */
function btnLocationHandler() 
{
    if (watchId !== false) {
        unfollowUserPosition();
        setBtnLocationStatus(false);
    } else {
        setBtnLocationStatus(true);
        followUserPosition();
    }
    
    clearMap();
    setMapMarkers();
}

/**
 * 
 * @param {integer} lat
 * @param {integer} lng
 * @returns {undefined}
 */
function setCenterToLocation (lat, lng) 
{
    map.panTo( L.latLng(lat, lng) );
}

function updateUserMarkerPosition (lat, lng) 
{
    var pos = L.latLng(lat, lng);
    userMarker.setLatLng( pos );
    userCircleMarker.setLatLng( pos );
}

/**
 * 
 * @param {type} position
 * @returns {undefined}
 */
function setUserPosition (position) 
{
    updateUserMarkerPosition(position.coords.latitude, position.coords.longitude);
    setCenterToLocation(position.coords.latitude, position.coords.longitude);
    verifyUserAtPuzzlePosition(position.coords.latitude, position.coords.longitude)
}

function followUserPosition () 
{
    map.addLayer(userMarkerLayer);
    
    watchId = navigator.geolocation.watchPosition(
            setUserPosition, geolocationError,
    {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 5000
    });
}

function unfollowUserPosition ()
{
    var pos = L.latLng(0, 0);
    userMarker.setLatLng( pos );
    userCircleMarker.setLatLng( pos );
    
    navigator.geolocation.clearWatch(watchId);
    watchId = false;
    
    map.removeLayer(userMarkerLayer);
}

function setBtnLocationStatus (status) 
{
    if (status) {
        $('#btn-location').removeClass('btn-location-disabled');
    } else {
        $('#btn-location').addClass('btn-location-disabled');
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
function setMapMarkers () 
{
    $.each(appConf.puzzle_data, function (key, puzzle)
    {
        if (puzzle.row == 10) return true;
        
        var flag_puzzle_enabled = isPuzzleEnabled(puzzle);
        var markerOptions = false;
        
        if (flag_puzzle_enabled) {
            markerOptions = {
                icon: musicPointEnabled,
                clickable: true
            }
        } else if (isPuzzleSolved(puzzle)) {
            markerOptions = {
                icon: musicPointSolved,
                clickable: false
            }
        } else {
            markerOptions = {
                icon: musicPointDisabled,
                clickable: false
            };
        }

        for (j=0; j < puzzle.coordinates.length; j ++) {
            var point = L.latLng(puzzle.coordinates[j].lat,puzzle.coordinates[j].lng);
            var marker = L.marker(point,markerOptions);
            
            if (flag_puzzle_enabled) {
                marker.on("click", function (evt) {
                    clearPuzzlePage();
                    preparePuzzlePage(getPuzzleData());
                    
                    $(":mobile-pagecontainer").pagecontainer( 
                        "change", "#puzzle-page", { transition: "flip" } 
                    );
                });
            }
            
            mapPuzzlesPoints.push({
                row: puzzle.row,
                place: puzzle.coordinates[j].place,
                lat: puzzle.coordinates[j].lat,
                lng: puzzle.coordinates[j].lng,
                marker: marker
            });

            mapMarkers.addLayer(marker);
        }
    });
}


/**
 * 
 * @param {integer} lat
 * @param {integer} lng
 * @returns {undefined}
 */
function verifyUserAtPuzzlePosition (lat, lng) 
{
    var userPoint = L.latLng(lat, lng);
    var distance = 1000000000;
    
    var puzzlePoint = mapPuzzlesPoints[0];
    
    for (var i=0; !isPuzzleEnabled(puzzlePoint) && i < mapPuzzlesPoints.length; i++) {
        puzzlePoint = mapPuzzlesPoints[i];
        var puzzleLatLng = L.latLng(mapPuzzlesPoints[i].lat, mapPuzzlesPoints[i].lng);
        
        //@TODO se row já foi selecionada pular o loop.
        if(isPuzzleSolved(puzzlePoint)) {
            continue;
        }
        
        distance = Math.min(distance, userPoint.distanceTo(puzzleLatLng));
        
        if( userPoint.distanceTo(puzzleLatLng) < 20.0 ) {
            enablePuzzle(puzzlePoint);
            unfollowUserPosition();
            setBtnLocationStatus(false);
//            clearMap();
//            setMapMarkers();
            
//            navigator.notification.vibrate([0, 100, 100, 300]);
            
            navigator.notification.alert(
                "Clique no marcador verde ou na palavra cruzada da aba Desafios para resolvê-lo!",
                function () {
                    $(":mobile-pagecontainer").pagecontainer( 
                        "change", "#puzzles-page", { transition: "flip" } 
                    );
                }, "Desafio habilitado!", "Vamos lá!"
            );
        }
    }
    
    //Se estiver na mesma posicao do puzzle (raio de 2m)
    //Gravar puzzle como habilitado
    //habilitar botão e linha para ir ao puzzle
    
}

function clearMap () 
{
    if (mapPuzzlesPoints.length > 0 ) {
        mapMarkers.clearLayers();
        mapPuzzlesPoints = [];
    }
}

/**
 * 
 * @param {object} puzzle
 * @returns {undefined}
 */
function changeMarkerIcon (puzzle) {
    for (var i=0; i < mapPuzzlesPoints.length; i++) {
        puzzlePoint = mapPuzzlesPoints[i];
    }
}
