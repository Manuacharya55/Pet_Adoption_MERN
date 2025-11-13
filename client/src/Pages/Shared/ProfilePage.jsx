import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTEzNTQxZjQyNThlN2EyNmZhZjI5NzQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2Mjk1NjQ2NX0.4JWD8Lg8zz-Wf5PJc-ufvNpkUdERtmHjiJyHmtemTQk'

const ProfilePage = () => {
  const [data,setData] = useState([]);
  const [isLoading,setIsLoading] = useState(true)

  const navigate = useNavigate();

  const fetchProfile = async()=>{
    setIsLoading(true);

    if(!token) return

    const response = await axios.get(
      "http://localhost:3000/api/v1/auth/profile",
      {
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
      }
    );

    setData(response.data.data)
    setIsLoading(false)
  }

  useEffect(()=>{
    if(token) fetchProfile()
  },[token])


  return isLoading ? "...Loading" : (
    <>
      <NavBar />
      <div id="container">
        <h1 id="heading">Your Profile</h1>

        <div id="profile-holder">
          <img src="puppy.jpg" alt="" />
          <span id="user-name">{data?.fullname}</span>
          <button
          onClick={()=>{
            navigate(`/profile/${data?._id}`)
          }}
          >edit profile</button>
          <button
          onClick={()=>{
            navigate(`/address/${data?.address}`)
          }}
          >edit address</button>
          <button
          onClick={()=>{
            navigate("/become-shopkeeper")
          }}

          >become shopkeeper</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
