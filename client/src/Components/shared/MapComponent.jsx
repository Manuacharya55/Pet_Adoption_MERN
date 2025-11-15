import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import LocationMarker from '../Map/LocationMarker'
import "leaflet/dist/leaflet.css";
const MapComponent = ({location,setLocation,setValue}) => {
  return (
    <MapContainer
          center={location}
          zoom={2}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            location={location}
            setLocation={setLocation}
            setValue={setValue}
          />
        </MapContainer>
  )
}

export default MapComponent