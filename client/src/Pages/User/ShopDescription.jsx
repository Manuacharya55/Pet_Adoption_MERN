import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Card from "../../Components/Card";
import { useAuth } from "../../Context/AuthContext";
import { useGet } from "../../hooks/apiRequests";

const ShopDescription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { id } = useParams();
  const url = `/shop/${id}?page=${page}`;

  const fetchData = async () => {
    setIsLoading(true);
    if (!user?.token) return;
    const response = await useGet(url, user?.token, user?.token);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) {
      fetchData();
      setParams({ page: page });
    }
  }, [user?.token, page]);

  if (isLoading) {
    return (
      <div className="loading-spinner" style={{ minHeight: '100vh' }}>
        <div className="spinner"></div>
        <span>Loading shop and pets...</span>
      </div>
    );
  }

  return (
    <div className="container" style={{
      paddingTop: '120px',
      paddingBottom: 'var(--space-2xl)',
      minHeight: '100vh',
    }}>
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      </div>

      {/* Page Header */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '800',
          letterSpacing: '-0.02em',
          marginBottom: '8px',
        }}>
          About the Shop
        </h1>
      </div>

      {/* Shop Info + Map */}
      <div id="shop-description-card">
        <div className="light-card">
          <img src={data?.shop?.image} alt={data?.shop?.shopname} id="avatar" />
          <h1>{data?.shop?.shopname}</h1>
          <div className="contact-info">
            <p><strong>Phone:</strong> {data?.shop?.address?.phonenumber}</p>
            <p><strong>Email:</strong> {data?.shop?.user?.email}</p>
          </div>
          <button
            onClick={() =>
              window.open(`https://www.google.com/maps?q=${data?.shop?.address?.lat},${data?.shop?.address?.lng}`)
            }
          >
            Get Directions
          </button>
        </div>

        {data?.shop?.address?.lat && data?.shop?.address?.lng && (
          <div id="shop-map">
            <MapContainer
              center={[data?.shop?.address.lat, data?.shop?.address.lng]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ width: "100%", height: "100%", borderRadius: "16px", minHeight: "350px" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[data?.shop?.address.lat, data?.shop?.address.lng]}>
                <Popup>{data?.shop?.shopname}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>

      {/* Available Pets */}
      <div style={{ marginTop: 'var(--space-2xl)' }}>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          fontWeight: '800',
          letterSpacing: '-0.02em',
          marginBottom: 'var(--space-lg)',
        }}>
          Available Pets
        </h2>

        {data?.pets?.length === 0 ? (
          <div className="empty-state">
            <h3>No pets available</h3>
            <p>This shop hasn't listed any pets yet.</p>
          </div>
        ) : (
          <div className="card-grid">
            {data?.pets?.map((pet) => (
              <Card heading={pet.name} img={pet.image} key={pet._id}>
                <div className="price-holder">
                  <span className="pet-category">{pet?.category?.name}</span>
                  <span className="price">₹{pet?.price}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="outline-btn"
                    style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                    onClick={() => navigate(`/pets/${pet._id}`)}
                  >
                    Wishlist
                  </button>
                  <button
                    className="primary-btn"
                    style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                    onClick={() => navigate(`/pets/${pet._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopDescription;
