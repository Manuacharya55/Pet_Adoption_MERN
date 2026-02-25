import { useFetcher, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useAuth } from "../../Context/AuthContext";
import { useGet, usePost } from "../../hooks/apiRequests";
import toast from "react-hot-toast";

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
    console.log(response)
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
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
  };
  return isLoading ? (
    <div className="loading-state">Loading pet details...</div>
  ) : (
    <div id="container">
      <div id="navigation">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      </div>

      <div id="pet-description-card" className="simple-card">
        <div id="pet-image">
          <img src={pet?.image} alt={pet?.name} />
        </div>

        <div id="pet-detail">
          <div id="detail-header">
            <h1 id="pet-name">{pet?.name}</h1>
            <p id="pet-description">{pet?.description}</p>
          </div>

          <div id="detail-actions">
            <div className="price-tag">
              <span id="pet-price">₹{pet?.price}</span>
            </div>
            <div className="btn-holder">
              <button onClick={() => handleWishlist(id)}>
                Add to Wishlist
              </button>
              <button onClick={() => handleAdoptionRequest(id)}>
                Adopt Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="pet-attributes-card" className="attributes-grid">
        <div className="attribute-item">
          <p className="label">Breed</p>
          <span className="value">{pet?.breed}</span>
        </div>

        <div className="attribute-item">
          <p className="label">Gender</p>
          <span className="value">{pet?.gender}</span>
        </div>

        <div className="attribute-item">
          <p className="label">Age</p>
          <span className="value">{pet?.age} Years</span>
        </div>

        <div className="attribute-item">
          <p className="label">Category</p>
          <span className="value">{pet?.category?.name}</span>
        </div>
      </div>

      <h2 id="heading-secondary">Shop Information</h2>
      <div id="shop-description-card">
        <div id="shop-details" className="light-card">
          <img src={pet?.shop.image} alt={pet?.shop?.shopname} id="avatar" />
          <h1>{pet?.shop?.shopname}</h1>
          <div className="contact-info">
            <p><strong>Phone:</strong> {pet?.shop?.address.phonenumber}</p>
            <p><strong>Email:</strong> {pet?.shop?.user.email}</p>
          </div>
          <button onClick={() => navigate(`/shops/${pet?.shop._id}`)}>
            Visit Shop
          </button>
        </div>

        <div id="shop-map">
          <MapContainer
            center={[pet?.shop?.address.lat, pet?.shop?.address.lng]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%", borderRadius: "10px" }}
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
    </div>
  );
};

export default PetDescription;
