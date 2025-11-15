import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Form from "../../Components/Form";
import { pet } from "../../Utils/Form";
import PetForm from "../../Components/Forms/PetForm";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTEzNTQxZjQyNThlN2EyNmZhZjI5NzQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2Mjk1NjQ2NX0.4JWD8Lg8zz-Wf5PJc-ufvNpkUdERtmHjiJyHmtemTQk";

const EditPet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    description: "",
    image: "",
    age: "",
    breed: "",
    price: "",
    gender: "",
    category: "",
  });

  const fetchPet = async () => {
    setIsLoading(true);
    if (!token) return;

    const response = await axios.get(
      `http://localhost:3000/api/v1/pet/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    console.log(response);
    const details = response.data.data;
    setData({
      name: details?.name,
      description: details?.description,
      image: details?.image,
      age: details?.age,
      breed: details?.breed,
      price: details?.price,
      gender: details?.gender,
      category: details?.category,
    });
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    if (!token) return;

    const response = await axios.get(
      "http://localhost:3000/api/v1/category/",

      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    console.log(response);
    setCategories(response.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPet();
    fetchCategories();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("hiii");
    if (!token) {
      console.log("hhihi")
      return;
    }

    console.log("heyyy")
    const response = await axios.patch(
      `http://localhost:3000/api/v1/pet/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    console.log(response.data.data);
    navigate("/shopkeeper/pets")
  };

  return isLoading ? (
    "loading..."
  ) : (
    <>
      <NavBar />
      <div id="container">
        <div id="navigation">
          <button onClick={()=> navigate(-1)}>back</button>
        </div>
        <div id="form-holder">
          <PetForm
            isSubmitting={isSubmitting}
            categories={categories}
            buttonName="update pet"
            data={data}
            setData={setData}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};
export default EditPet;
