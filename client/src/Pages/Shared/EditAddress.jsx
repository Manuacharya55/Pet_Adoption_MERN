import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MapComponent from "../../Components/shared/MapComponent";
import { useGet, usePatch } from "../../hooks/apiRequests";
import toast from "react-hot-toast";
import { addressSchema } from "../../Schema/AddressSchema";
import AddressForm from "../../form/AddressForm";
import Loader from "../../Components/Loader";

const EditAddress = () => {
  const { id } = useParams();
  const url = `/address/${id}`;
  const [location, setLocation] = useState([51.505, -0.09]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: zodResolver(addressSchema) });

  const onSubmit = async (data) => {
    if (!user?.token) return;

    const finalData = {
      ...data,
      lat: location[0],
      lng: location[1],
    };

    const response = await usePatch(url, user?.token, finalData);
    if (response.success) {
      toast.success(response.message);
      navigate("/profile");
    } else {
      toast.error(response.message);
    }
  };

  const fetchAddress = async () => {
    if (!id || !user?.token) return;

    const response = await useGet(url, user?.token);
    if (response.success) {
      const { phonenumber, address, state, district, country, lat, lng } =
        response.data;
      setLocation([lat, lng]);

      setValue("phonenumber", phonenumber.toString());
      setValue("address", address);
      setValue("state", state);
      setValue("district", district);
      setValue("country", country);
    } else {
      toast.error("Error fetching address");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) fetchAddress();
  }, [id, user?.token]);

  if (isLoading) return <Loader text="Loading address..." />;

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
        <h1 id="title">Update Address</h1>
        <AddressForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          buttonName="Update Address"
        />
      </div>
    </div>
  );
};

export default EditAddress;
