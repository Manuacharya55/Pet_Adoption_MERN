import { useState, useEffect } from "react";
import Card from "../../Components/Card";
import Loader from "../../Components/Loader";
import { useAuth } from "../../Context/AuthContext";
import { useGet, usePost, usePatch } from "../../hooks/apiRequests";
import { categorySchema } from "../../Utils/ZodForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import CategoryForm from "../../Components/Forms/CategoryForm";
import Modal from "../../Components/ui/Modal";
import Button from "../../Components/ui/Button";

const Categories = () => {
  console.log("Categories Component Rendered (New Version)");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", image: "" },
  });

  const { user } = useAuth();
  const url = `/category`;

  const fetchCategories = async () => {
    setIsLoading(true);
    if (!user?.token) return;

    const response = await useGet(url, user?.token);
    if (response.success) {
      setCategories(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [user?.token]);

  const onSubmit = async (data) => {
    if (!user?.token) return;

    const method = selectedCategory ? usePatch : usePost;
    const finalUrl = selectedCategory
      ? `${url}/${selectedCategory._id}`
      : url;

    const response = await method(finalUrl, user?.token, data);
    if (response.success) {
      toast.success(response.message);
      if (selectedCategory) {
        setCategories((prev) =>
          prev.map((cat) => (cat._id === response.data._id ? response.data : cat))
        );
      } else {
        setCategories((prev) => [...prev, response.data]);
      }
      handleCloseModal();
    } else {
      toast.error(response.message);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setValue("name", category.name);
    setValue("image", category.image);
    setIsModalOpen(true);
  };

  const handleDeactivate = async (id) => {
    if (!user?.token) return;
    const response = await usePatch(`${url}/deactivate/${id}`, user?.token);
    if (response.success) {
      toast.success("Status updated");
      setCategories((prev) =>
        prev.map((cat) => (cat._id === id ? { ...cat, isActive: response.data.isActive } : cat))
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    reset({ name: "", image: "" });
  };

  return isLoading ? (
    <Loader text="Loading categories..." />
  ) : (
    <div id="container">
      <div className="header-with-action">
        <h1 id="heading">Categories</h1>
        <Button
          buttonName="Add Category"
          type="main"
          handleClick={() => setIsModalOpen(true)}
          style={{ width: "fit-content" }}
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
              className={!category.isActive ? "deactivated" : ""}
            >
              <div className="btn-holder">
                <button onClick={() => handleEdit(category)}>edit</button>
                <button onClick={() => handleDeactivate(category._id)}>
                  {category.isActive ? "deactivate" : "activate"}
                </button>
              </div>
            </Card>
          ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedCategory ? "Edit Category" : "Add Category"}
      >
        <CategoryForm
          handleSubmit={handleSubmit}
          myFunc={onSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          register={register}
          setValue={setValue}
          defaultValue={selectedCategory}
        />
      </Modal>
    </div>
  );
};

export default Categories;
