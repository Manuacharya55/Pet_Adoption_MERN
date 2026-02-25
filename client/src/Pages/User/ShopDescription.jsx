import React from "react";
import { useState } from "react";
import axios from "axios";
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
  const url = `/shop/${id}?page=${page}`

  const fetchData = async () => {
    setIsLoading(true);
    if (!user?.token) return;

    const response = await useGet(url, user?.token, user?.token)
    console.log(response)
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) {
      fetchData();
      setParams({ page: page })
    }
  }, [user?.token, page]);

  return isLoading ? (
    <div className="loading-state">Loading shop and pets...</div>
  ) : (
    <div id="container">
      <div id="navigation">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      </div>

      <h1 id="heading">About the Shop</h1>
      <div id="shop-description-card">
        <div id="shop-details" className="light-card">
          <img src={data?.shop.image} alt={data?.shop?.shopname} id="avatar" />
          <h1>{data?.shop?.shopname}</h1>
          <div className="contact-info">
            <p><strong>Phone:</strong> {data?.shop?.address.phonenumber}</p>
            <p><strong>Email:</strong> {data?.shop?.user.email}</p>
          </div>
          <button
            onClick={() =>
              window.open(`https://www.google.com/maps?q=${data?.shop?.address.lat},${data?.shop?.address.lng}`)
            }
          >
            Get Directions
          </button>
        </div>

        <div id="shop-map">
          <MapContainer
            center={[data?.shop?.address.lat, data?.shop?.address.lng]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%", borderRadius: "10px" }}
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
      </div>

      <h1 id="heading">Available Pets</h1>
      <div id="card-holder">
        {data?.pets?.length === 0 ? (
          <div className="no-data-state">No pets available at this shop yet.</div>
        ) : (
          data?.pets.map((pet) => (
            <Card heading={pet.name} img={pet.image} key={pet._id}>
              <div className="price-holder">
                <span className="pet-category">{pet?.category?.name}</span>
                <span className="price">₹{pet?.price}</span>
              </div>
              <div className="btn-holder">
                <button onClick={() => navigate(`/pets/${pet._id}`)}>Wishlist</button>
                <button onClick={() => navigate(`/pets/${pet._id}`)}>
                  View Details
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ShopDescription;
