import axios from "axios";
import React from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

const fetchLocationDetail = async (lat, lng) => {
  try {
    const apiKey = import.meta.env.VITE_OPEN_CAGE_DATA_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
    const response = await axios.get(url);
    return response.data.results[0].components;
  } catch (error) {
    throw error
  }
};

const LocationMarker = ({ location, setLocation, setValue }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setLocation([lat, lng]);
      const { country, state, state_district, town } =
        await fetchLocationDetail(lat, lng);

      setValue("country",country,{ shouldValidate: true })
      setValue("state",state,{ shouldValidate: true })
      setValue("district",state_district,{ shouldValidate: true })
      // setValue("town",town,{ shouldValidate: true })
    },
  });

  return location === null ? null : (
    <Marker position={location}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default LocationMarker;
