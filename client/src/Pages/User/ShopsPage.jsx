import React from "react";
import Card from "../../Components/Card";
import { FiSearch } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useGet } from "../../hooks/apiRequests";

const ShopsPage = () => {
  const [params, setParams] = useSearchParams();
  const [shops, setShops] = useState({ shops: [], count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchShops = async (shopSearch = "") => {
    setIsLoading(true);
    if (!user?.token) return;

    const url = `/shop?page=${page}&shopname=${shopSearch}`;
    const response = await useGet(url, user?.token);

    setIsLoading(false);
    setShops(response.data);
  };

  useEffect(() => {
    if (user?.token) {
      fetchShops(search);
      setParams({ page: page, shopname: search });
    }
  }, [user?.token, page]);

  const handleSearch = () => {
    if (page === 1) {
      fetchShops(search);
    } else {
      setPage(1);
    }
    setParams({ page: 1, shopname: search });
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
          Discover Shops
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          Find trusted pet shops and shelters near you.
        </p>
      </div>

      {/* Search Bar */}
      <div style={{
        display: 'flex',
        gap: '12px',
        padding: 'var(--space-lg)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-2xl)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: 'var(--space-xl)',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
      }}>
        <div className="form-group" style={{ flex: 1, marginBottom: 0, minWidth: '200px' }}>
          <label htmlFor="shop-search" style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--text-muted)',
          }}>Search by Shop Name</label>
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
              id="shop-search"
              placeholder="Enter shop name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{ paddingLeft: '42px' }}
            />
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="primary-btn"
          style={{ padding: '14px 28px', marginBottom: '0' }}
        >
          Search
        </button>
      </div>

      {/* Shops Grid */}
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <span>Loading shops...</span>
        </div>
      ) : (
        <div className="card-grid">
          {shops?.shops?.length === 0 ? (
            <div className="empty-state">
              <h3>No shops found</h3>
              <p>Try adjusting your search.</p>
            </div>
          ) : (
            shops?.shops?.map((shop) => (
              <Card heading={shop?.shopname} img={shop?.image} key={shop._id}>
                <div style={{ marginTop: 'var(--space-sm)' }}>
                  <button
                    className="primary-btn"
                    style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
                    onClick={() => navigate(`/shops/${shop._id}`)}
                  >
                    View Details
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

export default ShopsPage;
