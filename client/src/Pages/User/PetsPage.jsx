import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useGet, usePost } from "../../hooks/apiRequests";
import { toast } from "react-hot-toast";

const PetsPage = () => {
  const [params, setParams] = useSearchParams();
  const [pets, setPets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryUrl = `/category`;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState({
    gender: "all",
    category: "all",
  });

  const url = `/pet?gender=${query?.gender}&category=${query?.category}`;
  
  const fetchPets = async () => {
    setIsLoading(true);
    if (!user?.token) return;
    const response = await useGet(url, user?.token);
    setPets(response.data);
    setIsLoading(false);
  };

  const fetchCategory = async () => {
    if (!user?.token) return;
    const response = await useGet(categoryUrl, user?.token);
    setCategories(response.data);
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
  };

  useEffect(() => {
    fetchAll();
  }, [user?.token]);

  useEffect(() => {
    setParams(query);
    fetchPets();
  }, [query]);

  const handleWishlist = async (id) => {
    if (!user?.token) return;

    const response = await usePost(`/auth/wishlist/${id}`, user?.token, {});

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <>
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
            {pets?.pet?.length === 0
              ? "No Pets Yet"
              : pets?.pet?.map((pet) => (
                  <Card heading={pet.name} img={pet.image} key={pet._id}>
                    <div className="price-holder">
                      <span className="pet-category">
                        {pet?.category?.name}
                      </span>
                      <span className="price">{pet?.price}₹</span>
                    </div>
                    <div className="btn-holder">
                      <button onClick={() => handleWishlist(pet?._id)}>
                        add to wishlist
                      </button>
                      <button onClick={() => navigate(`/pets/${pet._id}`)}>
                        more details
                      </button>
                    </div>
                  </Card>
                ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PetsPage;
