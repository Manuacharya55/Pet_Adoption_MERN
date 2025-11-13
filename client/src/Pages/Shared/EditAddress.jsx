import React, { useEffect, useState } from "react";
import Form from "../../Components/Form";
import { address } from "../../Utils/Form";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Button from "../../Components/ui/Button";
import { useParams } from "react-router-dom";

// function that will set marker position
// better to keep it seperate because of click event
function LocationMarker({ location, setLocation, setAddress }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      console.log(lat, lng);
      setLocation([lat, lng]);
      const { country, state, state_district, town } =
        await fetchLocationDetail(lat, lng);

      setAddress((prev) => {
        return {
          ...prev,
          country: country,
          state: state,
          district: state_district,
          town: town,
        };
      });
    },
  });
  return location === null ? null : (
    <Marker position={location}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

// function to reverse api call to get detailed information about the lat and lng
const fetchLocationDetail = async (lat, lng) => {
  const apiKey = "4a043d588f21411ea9b57becdfc12c74";
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

  const response = await axios.get(url);
  return response.data.results[0].components;

  // country,state,state_district,town
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTEzNTQxZjQyNThlN2EyNmZhZjI5NzQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2Mjk1NjQ2NX0.4JWD8Lg8zz-Wf5PJc-ufvNpkUdERtmHjiJyHmtemTQk'

const EditAddress = () => {
  const {id} = useParams()
  const [location, setLocation] = useState([51.505, -0.09]);
  const [isLoading,setIsLoading] = useState(true)
  const [address, setAddress] = useState({
    phonenumber: "",
    address: "",
    state: "",
    district: "",
    country: "",
  });

  const handleChange = (e) => {
    setAddress((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      phonenumber: address.phonenumber,
      address: address.address,
      state: address.state,
      district: address.district,
      country: address.country,
      lat: location[0],
      lng: location[1],
    };

    const response = await axios.patch(
      `http://localhost:3000/api/v1/address/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTEzNTQxZjQyNThlN2EyNmZhZjI5NzQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2Mjk1NjQ2NX0.4JWD8Lg8zz-Wf5PJc-ufvNpkUdERtmHjiJyHmtemTQk"
        },
      }
    );

    console.log(response.data)
  };


  const fetchAddress = async()=>{
    setIsLoading(true)
    if(!id) return

    const response = await axios.get(`http://localhost:3000/api/v1/address/${id}`,{
      headers:{
        "Content-Type" : "application/json",
        "token":token
      }
    })

    const {phonenumber,address,state,district,country,lat,lng} = response.data.data;
    setLocation([lat,lng])
    setAddress({phonenumber,address,state,district,country})
    console.log(response.data.data)
    setIsLoading(false)
  }

  useEffect(()=>{
    fetchAddress()
  },[id])
  return isLoading ? "Loading..." : (
    <div className="address">
      <div className="address-map">
        <MapContainer
          center={location}
          zoom={8}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            location={location}
            setLocation={setLocation}
            setAddress={setAddress}
          />
        </MapContainer>
      </div>

      <div className="address-form">
        <h1 id="title">Update Address</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="enter your phone number"
            value={address?.phonenumber}
            name="phonenumber"
            onChange={handleChange}
          />
          <textarea
            id=""
            placeholder="enter your address"
            value={address?.address}
            name="address"
            onChange={handleChange}
          ></textarea>
          <input
            type="text"
            placeholder="your state"
            disabled
            value={address?.state}
          />
          <input
            type="text"
            placeholder="your district"
            disabled
            value={address?.district}
          />
          <input
            type="text"
            placeholder="your country"
            disabled
            value={address?.country}
          />
          <Button buttonName="update address" type="main" />
        </form>
      </div>
    </div>
  );
};

export default EditAddress;
