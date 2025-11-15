import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import NavBar from "../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useGet } from "../../hooks/apiRequests";

const Pets = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const url = `/pet/mypets`;
  const { user } = useAuth();

  const fetchPets = async () => {
    setIsLoading(true);
    if (!user?.token) return;

    const response = await useGet(url, user?.token);
    setPets(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPets();
  }, [user?.token]);

  return isLoading ? "Loading..." : (
    <>
      <NavBar></NavBar>
      <div id="container">
        <div id="navigation">
          <button id="add" onClick={() => navigate("/shopkeeper/addpet")}>
            Add Pets
          </button>
        </div>

        <h1 id="heading">Your pets</h1>

        <div id="card-holder">
          {pets.length === 0
            ? "No pets yet"
            : pets.map((pet) => (
                <Card heading={pet.name} img={pet.image} key={pet._id}>
                  <div className="price-holder">
                    <span className="pet-category">{pet.category.name}</span>
                    <span className="price">{pet.price}₹</span>
                  </div>
                  <div className="btn-holder">
                    <button
                      onClick={() => navigate(`/shopkeeper/editpet/${pet._id}`)}
                    >
                      edit
                    </button>
                    <button>delete</button>
                  </div>
                </Card>
              ))}
        </div>
      </div>
    </>
  );
};

export default Pets;
