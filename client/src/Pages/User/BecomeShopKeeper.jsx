import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shopSchema } from "../../Schema/ShopSchema.js";
import { useAuth } from "../../Context/AuthContext.jsx";
import { usePost } from "../../hooks/apiRequests.js";
import { toast } from "react-hot-toast";
import ImageInput from "../../Components/ui/ImageInput";
import Button from "../../Components/ui/Button.jsx";

const BecomeShopKeeper = () => {
  const url = `/shop/register`;
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      shopname: "",
      image: ""
    }
  });

  const navigate = useNavigate();


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
          <div className="form-group">
            <label>Shop Name</label>
            <input
              type="text"
              placeholder="Enter your shop name"
              {...register("shopname")}
              className={errors.shopname ? "error-border" : ""}
            />
            {errors?.shopname && (
              <span className="error-text">{errors.shopname.message}</span>
            )}
          </div>

          <ImageInput
            name="image"
            setValue={setValue}
            error={errors.image}
            label="Shop Image"
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
