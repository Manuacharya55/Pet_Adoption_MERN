import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Form from "../../Components/Form";
import { pet } from "../../Utils/Form";
import PetForm from "../../Components/Forms/PetForm";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useGet, usePatch } from "../../hooks/apiRequests";
import { useAuth } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema } from "../../Utils/ZodForm";
import toast from "react-hot-toast";


const EditPet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const url = `/pet/${id}`;
  const category_url = `/category/`;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: zodResolver(petSchema) });


  const fetchPet = async () => {
    setIsLoading(true);
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

    const response = await useGet(category_url,user?.token)
    setCategories(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPet();
    fetchCategories();
  }, [user?.token]);

  const myFunc = async (data) => {
    if (!user?.token) {
      return;
    }

    const response = await usePatch(url,user?.token,data)
    if(response.success){
      toast.success(response.message)
      navigate("/shopkeeper/pets");
    }else{
      toast.error(response.message)
    }
  };

  return isLoading ? (
    "loading..."
  ) : (
    <>
      <div id="container">
        <div id="navigation">
          <button onClick={() => navigate(-1)}>back</button>
        </div>
        <div id="form-holder">
          <PetForm
            handleSubmit={handleSubmit}
            myFunc={myFunc}
            errors={errors}
            isSubmitting={isSubmitting}
            register={register}
            setValue={setValue}
            categories={categories}
            buttonName="edit pet"
          />
        </div>
      </div>
    </>
  );
};
export default EditPet;
