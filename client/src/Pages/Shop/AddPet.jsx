import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGet, usePost } from "../../hooks/apiRequests";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { petSchema } from "../../Schema/PetSchema";
import PetForm from "../../form/PetForm";
import Loader from "../../Components/Loader";

const AddPet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm({ resolver: zodResolver(petSchema) });

  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchCategories = async () => {
    if (!user?.token) return;
    const response = await useGet("/category/", user?.token);
    setCategories(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) fetchCategories();
  }, [user?.token]);

  const onSubmit = async (data) => {
    if (!user?.token) return;
    const response = await usePost("/pet", user?.token, data);
    if (response.success) {
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }
  };

  if (isLoading) return <Loader text="Loading add pet..." />;

  return (
    <div id="container">
      <div id="navigation">
        <button onClick={() => navigate(-1)}>back</button>
      </div>

      <h1 id="heading">Add Pet</h1>
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
          buttonName="add pet"
        />
      </div>
    </div>
  );
};

export default AddPet;
