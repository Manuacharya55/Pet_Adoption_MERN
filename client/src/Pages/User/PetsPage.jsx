import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useGet, usePost } from "../../hooks/apiRequests";
import { toast } from "react-hot-toast";

const PetsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pets, setPets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryUrl = `/category`;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState({
    gender: searchParams.get("gender") || "all",
    category: searchParams.get("category") || "all",
    name: searchParams.get("name") || "",
  });

  const url = `/pet?gender=${query?.gender}&category=${query?.category}&name=${query?.name}`;

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
    setSearchParams(query);
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
    <div id="container">
      <div id="filter-holder" className="clean-filters">
        <div className="filter-group" style={{ flex: 1 }}>
          <label htmlFor="search">Search by Name</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              name="name"
              id="search"
              placeholder="Search pets..."
              value={query.name}
              onChange={handleChange}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" value={query.gender} onChange={handleChange}>
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select name="category" id="category" value={query.category} onChange={handleChange}>
            <option value="all">All Categories</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <h1 id="heading">Discover Your New Friend</h1>

      {isLoading ? (
        <div className="loading-state">Loading pets...</div>
      ) : (
        <div id="card-holder">
          {pets?.pet?.length === 0 ? (
            <div className="no-data-state">No pets found matching your criteria.</div>
          ) : (
            pets?.pet?.map((pet) => (
              <Card heading={pet.name} img={pet.image} key={pet._id}>
                <div className="price-holder">
                  <span className="pet-category">{pet?.category?.name}</span>
                  <span className="price">₹{pet?.price}</span>
                </div>
                <div className="btn-holder">
                  <button onClick={() => handleWishlist(pet?._id)}>
                    Wishlist
                  </button>
                  <button onClick={() => navigate(`/pets/${pet._id}`)}>
                    Details
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PetsPage;
