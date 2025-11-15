import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Select from "../../Components/ui/Select";
import Card from "../../Components/Card";
import Footer from "../../Components/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTEzNTQxZjQyNThlN2EyNmZhZjI5NzQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2Mjk1NjQ2NX0.4JWD8Lg8zz-Wf5PJc-ufvNpkUdERtmHjiJyHmtemTQk";

const PetsPage = () => {
  const [params, setParams] = useSearchParams();
  const [pets, setPets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const [query, setQuery] = useState({
    gender: "all",
    category: "all",
  });

  const fetchPets = async () => {
    setIsLoading(true)
    if (!token) return;
    const response = await axios.get(
      `http://localhost:3000/api/v1/pet?gender=${query?.gender}&category=${query?.category}`,
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    console.log(response.data.data)
    setPets(response.data.data);
    setIsLoading(false)
  };

  const fetchCategory = async () => {
    if (!token) return;
    const response = await axios.get(`http://localhost:3000/api/v1/category/`, {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    setCategories(response.data.data);
  };

  const fetchAll = async () => {
    setIsLoading(true);
    const [pets, category] = await Promise.all([fetchPets(), fetchCategory()]);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setQuery((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log("call")
  };

  useEffect(() => {
    fetchAll();
  }, [token]);

  useEffect(() => {
    setParams(query);
    fetchPets();
  }, [query]);

  return (
    <>
      <NavBar />
      <div id="container">
        <div id="filter-holder">
          <select name="gender" id="" onChange={handleChange}>
            <option value="">all</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>

          <select name="category" id="" onChange={handleChange}>
            <option value="">all</option>
            {categories?.map((curele) => (
              <option value={curele._id}>{curele.name}</option>
            ))}
          </select>
        </div>

        <h1 id="heading">Shop by pets</h1>
        {isLoading ? (
          "Loading..."
        ) : (
          <div id="card-holder">
            {pets.pet.length === 0
              ? "No Pets Yet"
              : pets?.pet.map((pet) => (
                  <Card heading={pet.name} img={pet.image} key={pet._id}>
                    <div className="price-holder">
                      <span className="pet-category">
                        {pet?.category?.name}
                      </span>
                      <span className="price">{pet?.price}₹</span>
                    </div>
                    <div className="btn-holder">
                      <button>add to wishlist</button>
                      <button onClick={() => navigate(`/pets/${pet._id}`)}>
                        more details
                      </button>
                    </div>
                  </Card>
                ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PetsPage;
