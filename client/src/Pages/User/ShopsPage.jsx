import React from "react";
import Card from "../../Components/Card";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import Input from "../../Components/ui/Input";
import { IoSearch } from "react-icons/io5";

const ShopsPage = () => {
  const props = {
    type: "text",
    placeholder: "search shop",
    name: "shop",
  };
  return (
    <>
      <NavBar />
      <div id="container">
                <h1 id="heading">Shop by shops</h1>
                
        <div id="search-holder">
          <Input props={props} />
          <button>
            <IoSearch />
          </button>
        </div>


        <div id="card-holder">
          <Card>
            <div className="btn-holder">
              <button>more details</button>
            </div>
          </Card>
          <Card>
            <div className="btn-holder">
              <button>more details</button>
            </div>
          </Card>
          <Card>
            <div className="btn-holder">
              <button>more details</button>
            </div>
          </Card>
          <Card>
            <div className="btn-holder">
              <button>more details</button>
            </div>
          </Card>
          <Card>
            <div className="btn-holder">
              <button>more details</button>
            </div>
          </Card>
          <Card>
            <div className="btn-holder">
              <button>more details</button>
            </div>
          </Card>
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopsPage;
