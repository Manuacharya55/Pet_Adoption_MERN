import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Form from "../../Components/Form";
import { pet } from "../../Utils/Form";
import { useNavigate } from "react-router-dom";
import PetForm from "../../Components/shop/PetForm";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTEzNTQxZjQyNThlN2EyNmZhZjI5NzQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2Mjk1NjQ2NX0.4JWD8Lg8zz-Wf5PJc-ufvNpkUdERtmHjiJyHmtemTQk";

const AddPet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
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

  const navigate = useNavigate();

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
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("hiii");
    if (!token) return;

    const response = await axios.post(
      "http://localhost:3000/api/v1/pet/",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    console.log(response.data.data);
  };
  return isLoading ? (
    "Loading..."
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
            buttonName="add pet"
            data={data}
            setData={setData}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default AddPet;
