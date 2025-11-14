import React from "react";
import Button from "../ui/Button";
import { handleUpload } from "../../Utils/Appwrite";

const PetForm = ({
  buttonName,
  isSubmitting,
  categories,
  data,
  setData,
  handleSubmit,
}) => {
  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleImageChange = async (e) => {
    const url = await handleUpload(e.target.files[0]);
    setData((prev) => {
      return { ...prev, image: url };
    });
    console.log("uploaded");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="enter pet name"
        onChange={handleChange}
        value={data.name}
      />

      <textarea
        name="description"
        id=""
        placeholder="enter pet description"
        value={data.description}
        onChange={handleChange}
      ></textarea>

      <input type="file" name="image" onChange={handleImageChange} />
      <input
        type="number"
        name="age"
        placeholder="enter pet age"
        onChange={handleChange}
        value={data.age}
      />
      <input
        type="text"
        name="breed"
        placeholder="enter pet breed"
        onChange={handleChange}
        value={data.breed}
      />

      <input
        type="number"
        name="price"
        placeholder="enter pet price"
        onChange={handleChange}
        value={data.price}
      />
      <select name="gender" id="" onChange={handleChange} value={data.gender}>
        <option value="">-- select pet gender --</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>

      <select
        name="category"
        id=""
        onChange={handleChange}
        value={data.category}
      >
        <option value="">-- select pet category --</option>
        {categories?.map((curele) => (
          <option value={curele?._id}>{curele.name}</option>
        ))}
      </select>

      <Button type="main" buttonName={buttonName} isSubmitting={isSubmitting} />
    </form>
  );
};

export default PetForm;
