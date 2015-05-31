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

function loadMapsApi () {
//    if (navigator.connection.type === Connection.NONE || (global.google !== undefined && global.google.maps)) {
//        return;
//    }

    apimapskey = 'AIzaSyBjJZDKnqiPOcEF-2tC8sR4mLHdapMcRAo';
    
    $.getScript('https://maps.googleapis.com/maps/api/js?key='+apimapskey+'&sensor=true&callback=onMapsApiLoaded');
}

onMapsApiLoaded = function () {
    // Maps API loaded and ready to be used.
    var mapOptions = {
        zoom:15,
        center: new google.maps.LatLng(40.4979818,-9.4040122)
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
};