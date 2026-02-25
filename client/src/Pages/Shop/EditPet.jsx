import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGet, usePatch } from "../../hooks/apiRequests";
import { useAuth } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema } from "../../Schema/PetSchema";
import toast from "react-hot-toast";
import PetForm from "../../form/PetForm";

const EditPet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const url = `/pet/${id}`;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({ resolver: zodResolver(petSchema) });

  const fetchPet = async () => {
    if (!user?.token) return;
    const response = await useGet(url, user?.token);
    const details = response.data;

    Object.entries(details || {}).forEach(([key, value]) => {
      setValue(key, value);
    });
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    if (!user?.token) return;
    const response = await useGet(`/category/`, user?.token);
    setCategories(response.data);
  };

  useEffect(() => {
    if (user?.token) {
      fetchPet();
      fetchCategories();
    }
  }, [user?.token]);

  const onSubmit = async (data) => {
    if (!user?.token) return;
    const response = await usePatch(url, user?.token, data);
    if (response.success) {
      toast.success(response.message);
      navigate("/shopkeeper/pets");
    } else {
      toast.error(response.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div id="container">
      <div id="navigation">
        <button onClick={() => navigate(-1)}>back</button>
      </div>
      <div id="form-holder">
        <PetForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          setValue={setValue}
          watch={watch}
          categories={categories}
          buttonName="edit pet"
        />
      </div>
    </div>
  );
};

export default EditPet;
