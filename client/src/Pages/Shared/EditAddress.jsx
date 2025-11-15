import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "../../Utils/ZodForm";
import MapComponent from "../../Components/shared/MapComponent";
import AddressForm from "../../Components/Forms/AddressForm";
import { useGet, usePatch } from "../../hooks/apiRequests";
import toast from "react-hot-toast";

const EditAddress = () => {
  const { id } = useParams();
  const url = `/address/${id}`;
  const [location, setLocation] = useState([51.505, -0.09]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({ resolver: zodResolver(addressSchema) });

  const myFunc = async (data) => {
    if (!user?.token) return;

    data = {
      ...data,
      lat: location[0],
      lng: location[1],
    };

    const response = await usePatch(url, user?.token, data);
    if (response.success) {
      toast.success(response.message);
      navigate("/profile");
    } else {
      toast.error(response.message);
    }
  };

  const fetchAddress = async () => {
    setIsLoading(true);
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
      alert("error");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) fetchAddress();
  }, [id, user?.token]);

  return isLoading ? (
    "Loading..."
  ) : (
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

export default EditAddress;
