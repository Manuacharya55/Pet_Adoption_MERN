import { useState } from "react";
import NavBar from "../../Components/NavBar";
import Button from "../../Components/ui/Button";
import axios from "axios";
import { useEffect } from "react";
import { handleUpload } from "../../Utils/Appwrite";
import Card from "../../Components/Card";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTEzNTQxZjQyNThlN2EyNmZhZjI5NzQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2Mjk1NjQ2NX0.4JWD8Lg8zz-Wf5PJc-ufvNpkUdERtmHjiJyHmtemTQk";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const fetchCategories = async () => {
    setIsLoading(true);
    if (!token) return;

    const response = await axios.get(
      "http://localhost:3000/api/v1/category/",

      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    setCategories(response.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  const addCategory = async (e) => {
    setIsSubmitting(true)
    e.preventDefault();
    if (!token) return;

    console.log(data)
    const response = await axios.post(
      "http://localhost:3000/api/v1/category",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          token:token,
        },
      }
    );

    console.log(response.data);
    setCategories((prev) => [...prev, response.data.data]);
    setIsSubmitting(false)
  };

  const handleChange = (e) => {
    console.log(e.target.name , e.target.value)
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleImageChange = async (e) => {
    const image = await handleUpload(e.target.files[0]);
    setData((prev) => {
      return { ...prev, image: image };
    });
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <NavBar />
      <div id="container">
        <h1 id="heading">categories</h1>
        <div id="form-holder">
          <form onSubmit={addCategory}>
          <input
            type="text"
            placeholder="Enter category name"
            name="name"
            value={data?.name}
            onChange={handleChange}
          />
          <input type="file" name="image" id="" onChange={handleImageChange} />
          <Button
            type="main"
            buttonName="add category"
            isSubmitting={isSubmitting}
          />
        </form>
        </div>

        <div id="card-holder">
          {categories.length === 0
            ? "No Categories yet"
            : categories.map((category) => (
                <Card heading={category.name} img={category.image}>
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
