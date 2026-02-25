import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import MapComponent from "../../Components/shared/MapComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "../../hooks/apiRequests";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addressSchema } from "../../Schema/AddressSchema";
import AddressForm from "../../form/AddressForm";

const Address = () => {
  const url = "/address";
  const [location, setLocation] = useState([51.505, -0.09]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: zodResolver(addressSchema) });

  const onSubmit = async (data) => {
    if (!user?.token) return;
    const finalData = { ...data, lat: location[0], lng: location[1] };
    const response = await usePost(url, user?.token, finalData);
    if (response.success) {
      toast.success(response.message);
      navigate("/home");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="address">
      <div className="address-map">
        <MapComponent
          location={location}
          setLocation={setLocation}
          setValue={setValue}
        />
      </div>

      <div className="address-form">
        <h1 id="title">Add Address</h1>
        <AddressForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          buttonName="Add Address"
        />
      </div>
    </div>
  );
};

export default Address;
