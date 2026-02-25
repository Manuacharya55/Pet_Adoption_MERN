import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Button from "../../Components/ui/Button";
import { useAuth } from "../../Context/AuthContext";
import { useGet, usePatch, usePost } from "../../hooks/apiRequests";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../../Schema/ProfileSchema";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ImageInput from "../../Components/ui/ImageInput";

const EditProfile = () => {
  const url = `/auth/profile`;
  const [isLoading, setIsLoading] = useState(true);
  const [currentAvatar, setCurrentAvatar] = useState("");
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
      Object.entries(response?.data || {}).forEach(([key, value]) => {
        setValue(key, value);
        if (key === "avatar") setCurrentAvatar(value);
      });
    } else {

    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) fetchProfile();
  }, [user?.token]);


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
          <form onSubmit={handleSubmit(myFunc)} className="form-grid" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ImageInput
              name="avatar"
              setValue={setValue}
              error={errors.avatar}
              defaultValue={currentAvatar}
              label="Profile Picture"
            />

            <div className="form-group full-width">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("fullname")}
                className={errors.fullname ? "error-border" : ""}
              />
              {errors?.fullname && <span className="error-text">{errors.fullname.message}</span>}
            </div>

            <div className="form-group full-width">
              <label>Email Address</label>
              <input
                type="text"
                placeholder="Enter your email"
                {...register("email")}
                className={errors.email ? "error-border" : ""}
              />
              {errors?.email && <span className="error-text">{errors.email.message}</span>}
            </div>

            <div className="full-width">
              <Button
                type="main"
                buttonName={"Update Profile"}
                isSubmitting={isSubmitting}
              />
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default EditProfile;
