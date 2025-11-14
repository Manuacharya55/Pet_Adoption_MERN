import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import NavBar from "../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTEzNTQxZjQyNThlN2EyNmZhZjI5NzQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2Mjk1NjQ2NX0.4JWD8Lg8zz-Wf5PJc-ufvNpkUdERtmHjiJyHmtemTQk";

const Pets = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);

  const fetchPets = async () => {
    setIsLoading(true);
    if (!token) return;

    const response = await axios.get(
      "http://localhost:3000/api/v1/pet/mypets",

      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    console.log(response);
    setPets(response.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div id="container">
        <div id="navigation">
          <button id="add" onClick={() => navigate("/shopkeeper/addpet")}>
            Add Pets
          </button>
        </div>

        <h1 id="heading">Your pets</h1>

        <div id="card-holder">
          {pets.length === 0 ? "No pets yet": pets.map((pet) => (
            <Card heading={pet.name} img={pet.image} key={pet._id}>
              <div className="price-holder">
                <span className="pet-category">{pet.category.name}</span>
                <span className="price">{pet.price}₹</span>
              </div>
              <div className="btn-holder">
                <button
                onClick={()=> navigate(`/shopkeeper/editpet/${pet._id}`)}
                >edit</button>
                <button>delete</button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pets;
