import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/ui/Button";
import { useState } from "react";
import { handleUpload } from "../../Utils/Appwrite.js";
import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTEzNTQxZjQyNThlN2EyNmZhZjI5NzQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2Mjk1NjQ2NX0.4JWD8Lg8zz-Wf5PJc-ufvNpkUdERtmHjiJyHmtemTQk'

const BecomeShopKeeper = () => {
  const [data, setData] = useState({
    image: "",
    shopname: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleImageChange = async (e) => {
    const response = await handleUpload(e.target.files[0]);
    setData((prev) => {
      return { ...prev, image: response };
    });
  };

  const handleSubmit = async(e) =>{
    setIsSubmitting(true)
    e.preventDefault();
    console.log(data)
    if(!token) return

    const response = await axios.post("http://localhost:3000/api/v1/shop/register",data,{
      headers:{
        "Content-Type" : "application/json",
        "token":token
      }
    })

    console.log(response.data)
    navigate(`/address/${response.data.data?.address}`)
    setIsSubmitting(false)
  }

  return (
    <div className="auth">
      <div className="auth-image">
        <img src={"auth-image.jpg"} alt="" />
      </div>
      <div className="auth-form">
        <h1 id="title">Become Shopkeeper</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="shopname"
            placeholder="enter your shop name"
            value={data?.shopname}
            onChange={onInputChange}
          />
          <input
            type="file"
            name="image"
            id=""
            placeholder="add shop image"
            onChange={handleImageChange}
          />
          <Button
            buttonName="become shopkeeper"
            type="main"
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default BecomeShopKeeper;
