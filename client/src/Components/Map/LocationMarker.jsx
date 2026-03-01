import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet marker icon issue
const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationMarker = ({ location, setLocation, setValue }) => {
  const [markerPosition, setMarkerPosition] = useState(location);

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      setLocation([lat, lng]);

      // Reverse geocode using Nominatim (free, no API key needed)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();

        setValue("country", data.address?.country || "", { shouldValidate: true });
        setValue("state", data.address?.state || "", { shouldValidate: true });
        setValue("district", data.address?.state_district || "", { shouldValidate: true });
      } catch (error) {
        console.error("Error fetching location data", error);
      }
    },
  });

  return markerPosition ? (
    <Marker position={markerPosition} icon={markerIcon} />
  ) : null;
};

export default LocationMarker;
