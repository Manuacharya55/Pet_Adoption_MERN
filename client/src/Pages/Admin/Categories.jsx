import { useState } from "react";
import NavBar from "../../Components/NavBar";
import { useEffect } from "react";
import { handleUpload } from "../../Utils/Appwrite";
import Card from "../../Components/Card";
import { useAuth } from "../../Context/AuthContext";
import { useGet, usePost } from "../../hooks/apiRequests";
import { categorySchema } from "../../Utils/ZodForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import CategoryForm from "../../Components/Forms/CategoryForm";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({ resolver: zodResolver(categorySchema) });

  const { user } = useAuth();
  const url = `/category`;

  const fetchCategories = async () => {
    setIsLoading(true);
    if (!user?.token) return;

    const response = await useGet(url, user?.token);
    setCategories(response.data);
    console.log(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [user?.token]);

  const myFunc = async (data) => {
    if (!user?.token) return;

    const response = await usePost(url, user?.token, data);
    if (response.success) {
      toast.success(response.message);
      setCategories((prev) => [...prev, response.data]);
      reset();
    } else {
      toast.error(response.message);
    }
  };

  const handleImageChange = async (e) => {
    const image = await handleUpload(e.target.files[0]);
    toast.success("image uploaded successfully");
    setValue("image", image);
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <div id="container">
        <h1 id="heading">categories</h1>
        <div id="form-holder">
          <CategoryForm
            handleSubmit={handleSubmit}
            myFunc={myFunc}
            errors={errors}
            isSubmitting={isSubmitting}
            register={register}
            handleImageChange={handleImageChange}
          />
        </div>

        <div id="card-holder">
          {categories.length === 0
            ? "No Categories yet"
            : categories.map((category) => (
                <Card
                  heading={category.name}
                  img={category.image}
                  key={category?._id}
                >
                  <div className="btn-holder">
                    <button>edit</button>
                    <button>deactivate</button>
                  </div>
                </Card>
              ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
