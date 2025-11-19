import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/ui/Button";
import { useState } from "react";
import { handleUpload } from "../../Utils/Appwrite.js";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shopSchema } from "../../Utils/ZodForm.js";
import { useAuth } from "../../Context/AuthContext.jsx";
import { usePost } from "../../hooks/apiRequests.js";
import { toast } from "react-hot-toast";

const BecomeShopKeeper = () => {
  const url = `/shop/register`;
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: zodResolver(shopSchema) });

  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    const response = await handleUpload(e.target.files[0]);
    setValue("image", response);
  };

  const myFunc = async (data) => {
    if (!user?.token) return;

    const response = await usePost(url, user?.token, data);
    if (response.success) {
      toast.success(response.message);
      navigate(`/address/${response.data.address}`);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="auth">
      <div className="auth-image">
        <img src={"auth-image.jpg"} alt="" />
      </div>
      <div className="auth-form">
        <h1 id="title">Become Shopkeeper</h1>

        <form onSubmit={handleSubmit(myFunc)}>
          <input
            type="text"
            name="shopname"
            placeholder="enter your shop name"
            {...register("shopname")}
          />
          {errors?.shopname && (
            <span className="error">{errors.shopname.message}</span>
          )}
          <input
            type="file"
            name="image"
            placeholder="add shop image"
            onChange={handleImageChange}
          />
          {errors?.image && (
            <span className="error">{errors.image.message}</span>
          )}
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
