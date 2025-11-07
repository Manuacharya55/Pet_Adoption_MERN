import React from "react";
import NavBar from "../../Components/NavBar";
import Tile from "../../Components/Tile";
import Corousal from "../../Components/Corousal";
import Footer from "../../Components/Footer";

const HomePage = () => {
  return (
    <>
      <NavBar></NavBar>
      <div id="container">
        <div id="banner-image">
          <img src={"home-page.jpg"} alt="" />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <Tile />
          <Tile />
          <Tile />
        </div>

        <div>
            <h1 id="heading">Categories</h1>

            {/* <Corousal></Corousal> */}
        </div>

      </div>
      <Footer/>
    </>
  );
};

export default HomePage;
