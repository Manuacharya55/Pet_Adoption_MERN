import React from "react";
import Card from "../../Components/Card";
import NavBar from "../../Components/NavBar";

const Pets = () => {
  return (
    <>
      <NavBar></NavBar>
      <div id="container">
        <div id="navigation">
          <button id="add">Add Pets</button>
        </div>

        <h1 id="heading">Your pets</h1>

        <div id="card-holder">
          <Card>
            <div className="price-holder">
              <span className="pet-category">rabbit</span>
              <span className="price">200$</span>
            </div>
            <div className="btn-holder">
              <button>edit</button>
              <button>delete</button>
            </div>
          </Card>
          <Card>
            <div className="price-holder">
              <span className="pet-category">rabbit</span>
              <span className="price">200$</span>
            </div>
            <div className="btn-holder">
              <button>edit</button>
              <button>delete</button>
            </div>
          </Card>
          <Card>
            <div className="price-holder">
              <span className="pet-category">rabbit</span>
              <span className="price">200$</span>
            </div>
            <div className="btn-holder">
              <button>edit</button>
              <button>delete</button>
            </div>
          </Card>
          <Card>
            <div className="price-holder">
              <span className="pet-category">rabbit</span>
              <span className="price">200$</span>
            </div>
            <div className="btn-holder">
              <button>edit</button>
              <button>delete</button>
            </div>
          </Card>
          <Card>
            <div className="price-holder">
              <span className="pet-category">rabbit</span>
              <span className="price">200$</span>
            </div>
            <div className="btn-holder">
              <button>edit</button>
              <button>delete</button>
            </div>
          </Card>
          <Card>
            <div className="price-holder">
              <span className="pet-category">rabbit</span>
              <span className="price">200$</span>
            </div>
            <div className="btn-holder">
              <button>edit</button>
              <button>delete</button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Pets;
