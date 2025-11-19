import { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema } from "../../Utils/ZodForm";
import { useGet, usePost } from "../../hooks/apiRequests";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import PetForm from "../../Components/Forms/PetForm";

const AddPet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({ resolver: zodResolver(petSchema) });

  const navigate = useNavigate();
  const { user } = useAuth();
  const url = `/category/`;

  const fetchCategories = async () => {
    if (!user?.token) return;
    const response = await useGet(url, user?.token);
    setCategories(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) fetchCategories();
  }, [user?.token]);

  const myFunc = async (data) => {
    if (!user?.token) return;
    const response = await usePost("/pet", user?.token, data);
    if (response.success) {
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <div id="container">
        <div id="navigation">
          <button onClick={() => navigate(-1)}>back</button>
        </div>

        <h1 id="heading">Add Pet</h1>
        <div id="form-holder">
          <PetForm
            handleSubmit={handleSubmit}
            myFunc={myFunc}
            errors={errors}
            isSubmitting={isSubmitting}
            register={register}
            setValue={setValue}
            categories={categories}
            buttonName="add pet"
          />
        </div>
      </div>
    </>
  );
};

export default AddPet;
