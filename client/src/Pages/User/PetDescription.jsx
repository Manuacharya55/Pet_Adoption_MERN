import { useFetcher, useNavigate, useParams } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Footer from "../../Components/Footer";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTEzNTQxZjQyNThlN2EyNmZhZjI5NzQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2Mjk1NjQ2NX0.4JWD8Lg8zz-Wf5PJc-ufvNpkUdERtmHjiJyHmtemTQk";

const PetDescription = () => {
  const [isLoading,setIsLoading] = useState(true)
  const { id } = useParams();
  const [pet, setPet] = useState();
const navigate = useNavigate()
  const fetchPets = async () => {
    setIsLoading(true);
    if (!token) return;
    const response = await axios.get(`http://localhost:3000/api/v1/pet/${id}`, {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    console.log(response.data.data);
    setPet(response.data.data);
    // setPets(response.data.data);
    setIsLoading(false)
  };

  useEffect(() => {
    fetchPets();
  }, [token]);
  return isLoading ? "Loading..." : (
    <>
      <NavBar />
      <div id="container">
        <div id="navigation">
          <button onClick={() => navigate(-1)}>back</button>
        </div>

        <h1 id="heading">Description</h1>

        <div id="pet-description-card">
          <div id="pet-image">
            <img src={pet?.image} alt="" />
          </div>

          <div id="pet-detail">
            <div id="detail-header">
              <span id="pet-name">{pet?.name}</span>
              <p id="pet-description">{pet?.description}</p>
            </div>

            <div id="detail-footer">
              <p id="category">category : {pet?.category.name}</p>
              <span id="pet-price">{pet?.price}₹</span>
              <button>adopt</button>
            </div>
          </div>
        </div>

        <div id="pet-attributes-card">
          <div className="attributes">
            <p className="attribute">breed</p>
            <span className="attribute-value">{pet?.breed}</span>
          </div>

          <div className="attributes">
            <p className="attribute">gender</p>
            <span className="attribute-value">{pet?.gender}</span>
          </div>

          <div className="attributes">
            <p className="attribute">age</p>
            <span className="attribute-value">{pet?.age}</span>
          </div>

          <div className="attributes">
            <p className="attribute">breed</p>
            <span className="attribute-value">{pet?.breed}</span>
          </div>
        </div>

        <div id="shop-description-card">
          <div id="shop-details">
            <img src={pet?.shop.image} alt="" id="avatar" />
            <h1>{pet?.shop?.shopname}</h1>
            <span>{pet?.shop?.address.phonenumber}</span>
            <span>{pet?.shop?.user.email}</span>
            <button onClick={()=>navigate(`/shops/${pet?.shop._id}`)}>view details</button>
          </div>


          <div id="shop-map">
            <MapContainer
              center={[pet?.shop?.address.lat, pet?.shop?.address.lng]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[pet?.shop?.address.lat, pet?.shop?.address.lng]}>
                <Popup>You are here</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default PetDescription;
