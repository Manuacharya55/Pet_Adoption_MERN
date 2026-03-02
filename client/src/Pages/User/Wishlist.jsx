import React from "react";
import Card from "../../Components/Card";
import Loader from "../../Components/Loader";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useDelete, useGet } from "../../hooks/apiRequests";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiHeart, FiTrash2 } from "react-icons/fi";

const Wishlist = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const url = "/auth/wishlist/";

  const fetchPets = async () => {
    setIsLoading(true);
    if (!user?.token) return;
    const response = await useGet(url, user?.token);
    setPets(response.data);
    setIsLoading(false);
  };

  const removePets = async (id) => {
    if (!user?.token) return;
    const response = await useDelete(url + id, user?.token);
    if (response.success) {
      toast.success(response.message);
      setPets(prev => prev.filter(pet => pet?.pet?._id !== id));
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchPets();
    }
  }, [user?.token]);

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
          Your Wishlist
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          Keep track of the pets you love.
        </p>
      </div>

      {isLoading ? (
        <Loader text="Loading wishlist..." />
      ) : pets?.length === 0 || !pets ? (
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-2xl)',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-lg)',
            color: 'var(--text-muted)',
          }}>
            <FiHeart size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>
            Your wishlist is empty
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
            Start browsing to find your new best friend.
          </p>
          <button className="primary-btn" onClick={() => navigate('/pets')}>
            Browse Pets
          </button>
        </div>
      ) : (
        <div className="card-grid">
          {pets?.map((curEle) => (
            <Card heading={curEle?.pet?.name} img={curEle?.pet?.image} key={curEle?.pet?._id}>
              <div className="price-holder">
                <span className="pet-category">{curEle?.pet?.category?.name}</span>
                <span className="price">{curEle?.pet?.price}₹</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="danger-btn"
                  style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                  onClick={() => removePets(curEle.pet._id)}
                >
                  <FiTrash2 size={16} style={{ marginRight: '4px' }} /> Remove
                </button>
                <button
                  className="primary-btn"
                  style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                  onClick={() => navigate(`/pets/${curEle.pet._id}`)}
                >
                  View Details
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
