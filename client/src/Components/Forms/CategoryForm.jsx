import React from "react";
import Button from "../ui/Button";

const CategoryForm = ({
  handleSubmit,
  myFunc,
  errors,
  isSubmitting,
  register,
  handleImageChange,
}) => {
  return (
    <form onSubmit={handleSubmit(myFunc)}>
      <input
        type="text"
        placeholder="Enter category name"
        name="name"
        {...register("name")}
      />
      {errors.name && <span className="error">{errors.name.message}</span>}
      <input type="file" name="image" id="" onChange={handleImageChange} />
      {errors.image && <span className="error">{errors.image.message}</span>}
      <Button
        type="main"
        buttonName="add category"
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default CategoryForm;
