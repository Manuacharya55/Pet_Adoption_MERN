import React from "react";
import { useState } from "react";
import NavBar from "../../Components/NavBar";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Card from "../../Components/Card";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTEzNTQxZjQyNThlN2EyNmZhZjI5NzQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2Mjk1NjQ2NX0.4JWD8Lg8zz-Wf5PJc-ufvNpkUdERtmHjiJyHmtemTQk";

const ShopDescription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [params,setParams] = useSearchParams();

  const navigate = useNavigate();

  const { id } = useParams();
  const fetchData = async () => {
    setIsLoading(true);
    if (!token) return;

    const response = await axios.get(
      `http://localhost:3000/api/v1/shop/${id}?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    console.log(response.data.data);
    setData(response.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    setParams({page:page})
  }, [token, page]);
  
  return isLoading ? (
    "Laoding..."
  ) : (
    <>
      <NavBar />
      <div id="container">
         <div id="navigation">
          <button onClick={() => navigate(-1)}>back</button>
        </div>

        <h1 id="heading">Description</h1>
        <div id="shop-description-card">
          <div id="shop-details">
            <img src={data?.shop.image} alt="" id="avatar" />
            <h1>{data?.shop?.shopname}</h1>
            <span>{data?.shop?.address.phonenumber}</span>
            <span>{data?.shop?.user.email}</span>
            <button
              onClick={() =>
                window.open( `https://www.google.com/maps?q=${data?.shop?.address.lat},${data?.shop?.address.lng}`)
                 
                
              }
            >
              view route
            </button>
          </div>

          <div id="shop-map">
            <MapContainer
              center={[data?.shop?.address.lat, data?.shop?.address.lng]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[data?.shop?.address.lat, data?.shop?.address.lng]}
              >
                <Popup>You are here</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        <h1 id="heading">Pets</h1>
        <div id="card-holder">
          {
            data?.pets?.length === 0 ? "No Pets Yet" : data?.pets.map(pet=><Card heading={pet.name} img={pet.image} key={pet._id}>
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
                  </Card>)
          }
        </div>
      </div>
    </>
  );
};

export default ShopDescription;
