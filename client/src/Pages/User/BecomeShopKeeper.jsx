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
import { MdStorefront } from "react-icons/md";

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
    <div className="container" style={{
      paddingTop: '120px',
      paddingBottom: 'var(--space-2xl)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '520px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-md)',
            color: 'var(--accent-primary)',
          }}>
            <MdStorefront size={32} />
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: '800',
            marginBottom: '8px',
          }}>
            Become a Shopkeeper
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
          }}>
            Set up your pet shop and start listing pets for adoption.
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-xl)',
          boxShadow: 'var(--shadow-md)',
        }}>
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
              buttonName="Become Shopkeeper"
              type="main"
              isSubmitting={isSubmitting}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeShopKeeper;
