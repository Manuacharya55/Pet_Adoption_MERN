import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Button from "../../Components/ui/Button";
import { useAuth } from "../../Context/AuthContext";
import { useGet, usePatch, usePost } from "../../hooks/apiRequests";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../../Utils/ZodForm";
import toast from "react-hot-toast";
import { handleUpload } from "../../Utils/Appwrite";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const url = `/auth/profile`;
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm(zodResolver(profileSchema));

  const fetchProfile = async () => {
    setIsLoading(true);

    if (!user?.token) return;

    const response = await useGet(url, user?.token);
    if (response.success) {
      Object.entries(response?.data || {}).forEach(([keyof, value]) =>
        setValue(keyof, value)
      );
    } else {

    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) fetchProfile();
  }, [user?.token]);

  const handleImageChange = async (e) => {
    const url = await handleUpload(e.target.files[0]);
    setValue("avatar", url);
    toast.success("image uploaded successfully");
  };

  const myFunc = async (data) => {
    if (!user?.token) return;
    const response = await usePatch(url, user?.token, data);
    if (response.success) {
      toast.success(response.message);
      navigate("/profile")
    } else {
      toast.error(response.message);
    }
  };
  return (
    <>
      <div id="container">
        <div id="navigation">
          <button onClick={() => navigate(-1)}>back</button>
        </div>
        <h1 id="heading">Edit Profile</h1>
        {isLoading ? (
          "Loading..."
        ) : (
          <form onSubmit={handleSubmit(myFunc)}>
            <input type="file" name="" id="" onChange={handleImageChange} />
            {errors?.avatar && <span className="error">{errors.avatar.message}</span>}
            <input
              type="text"
              name="fullname"
              placeholder="Enter your name"
              {...register("fullname")}
            />
            {errors?.fullname && <span className="error">{errors.fullname.message}</span>}
            <input
              type="text"
              name="email"
              id=""
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors?.email && <span className="error">{errors.email.message}</span>}
            <Button
              type="main"
              buttonName={"update profile"}
              isSubmitting={isSubmitting}
            />
          </form>
        )}
      </div>
    </>
  );
};

export default EditProfile;
