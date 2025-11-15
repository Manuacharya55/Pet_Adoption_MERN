import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import z from "zod";
import MapComponent from "../../Components/shared/MapComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "../../hooks/apiRequests";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddressForm from "../../Components/Forms/AddressForm";

const addressSchema = z.object({
  phonenumber: z.string().length(10, "Phone number must be 10 digits"),
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  country: z.string().min(1, "Country is required"),
});

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


  const myFunc = async (data) => {
    if (!user?.token) return;
    data = { ...data, lat: location[0], lng: location[1] };
    const response = await usePost(url, user?.token, data);
    if (response.success) {
      toast.success(response.message);
      navigate("/homepage");
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
          handleSubmit={handleSubmit}
          myFunc={myFunc}
          errors={errors}
          isSubmitting={isSubmitting}
          register={register}
        />
      </div>
    </div>
  );
};

export default Address;
