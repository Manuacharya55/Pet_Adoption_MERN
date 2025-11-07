import React from "react";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";

const ProfilePage = () => {
  return (
    <>
      <NavBar />
      <div id="container">
        <h1 id="heading">Your Profile</h1>

        <div id="profile-holder">
          <img src="puppy.jpg" alt="" />
          <span id="user-name">Jhon Doe</span>
          <button>edit profile</button>
          <button>edit address</button>
          <button>become shopkeeper</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
