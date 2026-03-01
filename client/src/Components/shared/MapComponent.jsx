import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "../Map/LocationMarker";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ location, setLocation, setValue }) => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    // If a valid location is already provided (e.g. editing an existing address),
    // use it directly instead of fetching geolocation
    if (
      location &&
      Array.isArray(location) &&
      location.length === 2 &&
      !(location[0] === 51.505 && location[1] === -0.09)
    ) {
      setCurrentPosition(location);
      return;
    }

    // Otherwise try to get user's current position via browser geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = [position.coords.latitude, position.coords.longitude];
          setCurrentPosition(pos);
          setLocation(pos);
        },
        (error) => {
          console.error("Error fetching current location", error);
          // Fallback to India center
          setCurrentPosition([20.5937, 78.9629]);
        }
      );
    } else {
      setCurrentPosition([20.5937, 78.9629]);
    }
  }, []);

  if (!currentPosition) return <p>Loading Map...</p>;

  return (
    <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
      <MapContainer
        center={currentPosition}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker
          location={location}
          setLocation={setLocation}
          setValue={setValue}
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;