var GoogleMapsLoader = require('google-maps')
import React from 'react'

GoogleMapsLoader.KEY=""
GoogleMapsLoader.REGION='us'
GoogleMapsLoader.LIBRARIES=['places']


const MapComp = (coords)=>{
  GoogleMapsLoader.load((google)=>{
    new google.maps.Map(document.getElementById('map'), {
      zoom: 8,  
      center: {lat: coords.lati, lng: coords.long}
    })
  })
  return(
    <div id='map'>
    </div>
  )
}

module.exports = MapComp

