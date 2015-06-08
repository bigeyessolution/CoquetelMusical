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

var map = {
    mapObj: false,
    mapOptions: { 
        center: [getAppConf().start_position.lat, getAppConf().start_position.lng],
        zoom: 18,
        attributionControl: true,
        zoomControl: true
    },
    init: function ()
    {
//        this.mapObj = L.map('map', this.mapOptions);
//        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//        }).addTo(map);
        
        this.mapObj = new ol.Map({
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          target: 'map',
          controls: ol.control.defaults({
            attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
              collapsible: false
            })
          }),
          view: new ol.View({
            center: ol.proj.transform([getAppConf().start_position.lng,getAppConf().start_position.lat], 'EPSG:4326', 'EPSG:3857'),
            zoom: 18
          })
        });
    },
    centerTo: function (latitude, longitude)
    {
        
    }
}

