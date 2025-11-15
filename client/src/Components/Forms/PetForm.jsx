import React from "react";
import Button from "../ui/Button";
import { handleUpload } from "../../Utils/Appwrite";
import toast from "react-hot-toast";

const PetForm = ({
  handleSubmit,
  myFunc,
  errors,
  isSubmitting,
  register,
  setValue,
  categories,
  buttonName,
}) => {
  const handleImageChange = async (e) => {
    const url = await handleUpload(e.target.files[0]);
    setValue("image", url);
    toast.success("image uploaded successfully");
  };

  return (
    <form onSubmit={handleSubmit(myFunc)}>
      <input
        type="text"
        name="name"
        placeholder="enter pet name"
        {...register("name")}
      />
      {errors?.name && <span className="error">{errors.name.message}</span>}

      <textarea
        name="description"
        id=""
        placeholder="enter pet description"
        {...register("description")}
      ></textarea>
      {errors?.description && (
        <span className="error">{errors.description.message}</span>
      )}

      <input type="file" name="image" onChange={handleImageChange} />
      {errors?.image && <span className="error">{errors.image.message}</span>}

      <input
        type="number"
        name="age"
        placeholder="enter pet age"
        {...register("age")}
      />
      {errors?.age && <span className="error">{errors.age.message}</span>}

      <input
        type="text"
        name="breed"
        placeholder="enter pet breed"
        {...register("breed")}
      />
      {errors?.breed && <span className="error">{errors.breed.message}</span>}

      <input
        type="number"
        name="price"
        placeholder="enter pet price"
        {...register("price")}
      />
      {errors?.price && <span className="error">{errors.price.message}</span>}

      <select name="gender" id="" {...register("gender")}>
        <option value="">-- select pet gender --</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      {errors?.gender && <span className="error">{errors.gender.message}</span>}

      <select name="category" {...register("category")}>
        <option value="">-- select pet category --</option>
        {categories?.map((curele) => (
          <option value={curele?._id} key={curele?._id}>{curele.name}</option>
        ))}
      </select>
      {errors?.category && (
        <span className="error">{errors.category.message}</span>
      )}

      <Button type="main" buttonName={buttonName} isSubmitting={isSubmitting} />
    </form>
  );
};

export default PetForm;
