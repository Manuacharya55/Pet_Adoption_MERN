import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import Loader from "../../Components/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useGet, usePost } from "../../hooks/apiRequests";
import { toast } from "react-hot-toast";
import { FiSearch } from "react-icons/fi";

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
    await Promise.all([fetchPets(), fetchCategory()]);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    <div className="container" style={{
      paddingTop: '120px',
      paddingBottom: 'var(--space-2xl)',
      minHeight: '100vh',
    }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '800',
          letterSpacing: '-0.02em',
          marginBottom: '12px',
        }}>
          Find Your Companion
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          maxWidth: '550px',
          margin: '0 auto',
        }}>
          Browse through our list of adorable pets waiting for a loving home.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="search" style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--text-muted)',
          }}>Search by Name</label>
          <div style={{ position: 'relative' }}>
            <FiSearch style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }} size={18} />
            <input
              type="text"
              name="name"
              id="search"
              placeholder="Search pets..."
              value={query.name}
              onChange={handleChange}
              style={{
                paddingLeft: '42px',
              }}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="gender" style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--text-muted)',
          }}>Gender</label>
          <select name="gender" id="gender" value={query.gender} onChange={handleChange}>
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="category" style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--text-muted)',
          }}>Category</label>
          <select name="category" id="category" value={query.category} onChange={handleChange}>
            <option value="all">All Categories</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Pet Grid */}
      {isLoading ? (
        <Loader text="Loading pets..." />
      ) : (
        <div className="card-grid">
          {pets?.pet?.length === 0 ? (
            <div className="empty-state">
              <h3>No pets found</h3>
              <p>Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            pets?.pet?.map((pet) => (
              <Card heading={pet.name} img={pet.image} key={pet._id}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--space-md)',
                }}>
                  <span className="pet-category">
                    {pet?.category?.name}
                  </span>
                  <span style={{
                    fontSize: '1.25rem',
                    fontWeight: '800',
                    color: 'var(--accent-success)',
                    fontFamily: 'var(--font-heading)',
                  }}>
                    ₹{pet?.price}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="outline-btn"
                    style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                    onClick={() => handleWishlist(pet?._id)}
                  >
                    Wishlist
                  </button>
                  <button
                    className="primary-btn"
                    style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                    onClick={() => navigate(`/pets/${pet._id}`)}
                  >
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
