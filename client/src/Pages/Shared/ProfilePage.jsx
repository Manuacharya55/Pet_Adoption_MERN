import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useGet } from "../../hooks/apiRequests";

const ProfilePage = () => {
  const url = `/auth/profile`;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const navigate = useNavigate();

  const fetchProfile = async () => {
    setIsLoading(true);

    if (!user?.token) return;

    const response = await useGet(url, user?.token);
    console.log(response)
    if (response.success) {
      setData(response?.data);
    } else {
      console.log(response);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) fetchProfile();
  }, [user?.token]);

  return isLoading ? (
    "...Loading"
  ) : (
    <>
      <div id="container">
        <h1 id="heading">Your Profile</h1>

        <div id="profile-holder">
          <img src="puppy.jpg" alt="" />
          <span id="user-name">{data?.fullname}</span>
          <button
            onClick={() => {
              navigate(`/profile/${data?._id}`);
            }}
          >
            edit profile
          </button>
          <button
            onClick={() => {
              navigate(`/address/${data?.address}`);
            }}
          >
            edit address
          </button>
          {data?.role === "user" && <button
            onClick={() => {
              navigate("/become-shopkeeper");
            }}
          >
            become shopkeeper
          </button>}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
