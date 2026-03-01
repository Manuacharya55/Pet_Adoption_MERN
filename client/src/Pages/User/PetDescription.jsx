import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useAuth } from "../../Context/AuthContext";
import { useGet, usePost } from "../../hooks/apiRequests";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const PetDescription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [pet, setPet] = useState();
  const navigate = useNavigate();
  const url = `/pet/${id}`;
  const { user } = useAuth();

  const fetchPets = async () => {
    setIsLoading(true);
    if (!user?.token) return;
    const response = await useGet(url, user?.token);
    setPet(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPets();
  }, [user?.token]);

  const handleWishlist = async (id) => {
    if (!user?.token) return;
    const response = await usePost(`/auth/wishlist/${id}`, user?.token, {});
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleAdoptionRequest = async (id) => {
    if (!user?.token) return;
    const data = {
      shop: pet?.shop?._id,
      pet: pet?._id,
    };
    const response = await usePost(`/adoption/`, user?.token, data);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-spinner" style={{ minHeight: '100vh' }}>
        <div className="spinner"></div>
        <span>Loading pet details...</span>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingBottom: 'var(--space-2xl)' }}>
      {/* Hero Image */}
      <div style={{
        position: 'relative',
        height: '60vh',
        width: '100%',
        overflow: 'hidden',
      }}>
        <img
          src={pet?.image}
          alt={pet?.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)',
        }} />
        <div style={{ position: 'absolute', top: '100px', left: '24px', zIndex: 10 }}>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back to Pets
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ marginTop: '-120px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-xl)', alignItems: 'start' }}>

          {/* Main Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-xl)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border-light)',
              }}
            >
              <h1 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '800',
                marginBottom: '8px',
                letterSpacing: '-0.02em',
              }}>
                {pet?.name}
              </h1>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '1.05rem',
                lineHeight: '1.7',
                marginBottom: 'var(--space-lg)',
              }}>
                {pet?.description}
              </p>

              {/* Attributes Grid */}
              <div className="attributes-grid">
                {[
                  { label: 'Breed', value: pet?.breed },
                  { label: 'Gender', value: pet?.gender },
                  { label: 'Age', value: `${pet?.age} Years` },
                  { label: 'Category', value: pet?.category?.name },
                ].map((stat) => (
                  <div className="attribute-item" key={stat.label}>
                    <p className="label">{stat.label}</p>
                    <span className="value">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 'var(--space-lg)',
                borderTop: '1px solid var(--border-light)',
                flexWrap: 'wrap',
                gap: 'var(--space-md)',
              }}>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Adoption Fee</span>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--text-primary)',
                  }}>
                    ₹{pet?.price}
                  </div>
                </div>
                <div className="btn-holder" style={{ flex: 'none' }}>
                  <button onClick={() => handleWishlist(id)}>Add to Wishlist</button>
                  <button onClick={() => handleAdoptionRequest(id)}>Adopt Now</button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            {/* Shop Card */}
            {pet?.shop && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="light-card"
                style={{ position: 'sticky', top: '100px' }}
              >
                <img src={pet?.shop.image} alt={pet?.shop?.shopname} id="avatar" />
                <h1>{pet?.shop?.shopname}</h1>
                <div className="contact-info">
                  <p><strong>Phone:</strong> {pet?.shop?.address?.phonenumber}</p>
                  <p><strong>Email:</strong> {pet?.shop?.user?.email}</p>
                </div>
                <button onClick={() => navigate(`/shops/${pet?.shop._id}`)}>
                  Visit Shop
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Map Section */}
        {pet?.shop?.address?.lat && pet?.shop?.address?.lng && (
          <div style={{ marginTop: 'var(--space-xl)' }}>
            <h2 id="heading-secondary">Shop Location</h2>
            <div id="shop-map">
              <MapContainer
                center={[pet?.shop?.address.lat, pet?.shop?.address.lng]}
                zoom={15}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "350px" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[pet?.shop?.address.lat, pet?.shop?.address.lng]}>
                  <Popup>{pet?.shop?.shopname}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PetDescription;
