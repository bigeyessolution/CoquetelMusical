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


/**
 * 
 * @param {integer} last_puzzle
 * @returns {undefined}
 */
function enableLastRow (last_puzzle) {
    $("#puzzle-table tr").attr("class", ""); //TODO: remover quando atualizar o index.html
    
    $("#puzzle-table #row-" + last_puzzle).addClass("enabled");
    
    for (row=0; row < last_puzzle; row++ ) {
        $("#puzzle-table #row-" + row).removeClass("enabled").addClass("solved");
    }
}

/**
 * 
 * @param {integer} last_puzzle
 * @returns {undefined}
 */
function setScorePage (last_puzzle) {
    last_puzzle = last_puzzle > -1 ? last_puzzle : 10;
    $("#img-score").attr("src", "./data/images/score." + last_puzzle + ".png");
}

function setUiEvents () {
    $("#btn-go-to-puzzle").hide();
    
    $("#puzzle-table").click(function () 
    {
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#puzzle-page", { } );
    });
}


