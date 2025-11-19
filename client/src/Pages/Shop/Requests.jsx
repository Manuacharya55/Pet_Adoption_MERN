import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { useGet } from "../../hooks/apiRequests";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Card from "../../Components/Card";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  const fetchAdoptionRequest = async () => {
    setIsLoading(true)
    if (!user?.token) return;

    const response = await useGet("/adoption/", user?.token);
    if (response?.success) {
      setPets(response.data);
    } else {
      toast.error(response.message);
    }
    setIsLoading(false)
  };

  useEffect(() => {
    if (user?.token) {
      fetchAdoptionRequest();
    }
  }, [user?.token]);
  return isLoading ? "Loading" : (<>
    <h1 id="heading">Adoption Requests</h1>
    <div id="card-holder">
            {pets?.length === 0
              ? "No Pets Yet"
              : pets?.map((pet) => (
                  <Card heading={pet.name} img={pet.image} key={pet._id}>
                    <div className="btn-holder">
                      <button onClick={() => navigate(`/shopkeeper/request/${pet._id}`)}>
                        more details
                      </button>
                    </div>
                  </Card>
                ))}
          </div>
  </>)
};

export default Requests;
