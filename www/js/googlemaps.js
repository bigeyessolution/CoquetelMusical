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
var map_markers = [];

function loadMapsApi () {
//    if (navigator.connection.type === Connection.NONE || (google !== undefined && google.maps)) {
//        return;
//    }

    apimapskey = 'AIzaSyBjJZDKnqiPOcEF-2tC8sR4mLHdapMcRAo';
    
    $.getScript('https://maps.googleapis.com/maps/api/js?key='+apimapskey+'&sensor=true&callback=onMapsApiLoaded');
}


function btnLocationHandler() 
{
    navigator.geolocation.getCurrentPosition(function (position) {
        setCenterToLocation(position.coords.latitude, position.coords.longitude);
    });
}

function setCenterToLocation (lat, lng) 
{
    var pos = google.maps.LatLng(lat, lng);
   
    map.panTo(pos);
}

onMapsApiLoaded = function () {
    // Maps API loaded and ready to be used.
    var mapOptions = {
        zoom:17,
        disableDefaultUI: true,
        center: new google.maps.LatLng(
                application_conf.start_position.lat,
                application_conf.start_position.lng)
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    $("#btn-location").on("click", btnLocationHandler);
    
    verifyProgress();
};

/**
 * 
 * @param {array} points_list
 * @returns {undefined}
 */
function setMapMarkers (points_list) {
    clearMarkers();
    
    for (i=0; i < points_list.length; i++) {
        var point = points_list[i];
        
        maker = new google.maps.Marker({
            position: google.maps.LatLng(point.lat, point.lng),
            title: point.place,
            icon: 'images/btn-icon-map.png'
        });
        
        maker.setMap(map);
        
        map_markers.push();
    }
}

function clearMarkers () {
    for (index=0; index < map_markers.length; index ++) {
        map_markers[index].setMap(null);
    }
    
    map_markers = [];
}

function verifyUserAtPuzzlePosition () {
    //Se estiver na mesma posicao do puzzle (raio de 2m)
    //Gravar puzzle como habilitado
    //habilitar botão e linha para ir ao puzzle
}