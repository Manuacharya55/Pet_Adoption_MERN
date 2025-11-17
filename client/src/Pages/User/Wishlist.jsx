import React from "react";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import Card from "../../Components/Card";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useDelete, useGet } from "../../hooks/apiRequests";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

  const removePets = async(id)=>{
    if(!user?.token) return

    const response = await useDelete(url+id,user?.token);
    if(response.success){
        toast.success(response.message)
        setPets(prev => prev.filter(pet => pet?.pet?._id !== id));
    }else{
        toast.error(response.message)
    }
  }
  useEffect(() => {
    if (user?.token) {
      fetchPets();
    }
  }, [user?.token]);
  return (
    <>
      <div id="container">
        <h1 id="heading">Your Wishlist</h1>
        <div id="card-holder">
          {pets?.map((curEle) => (
            <Card heading={curEle?.pet?.name} img={curEle?.pet?.image} key={curEle?.pet?._id}>
              <div className="price-holder">
                <span className="pet-category">{curEle?.pet?.category?.name}</span>
                <span className="price">{curEle?.pet?.price}₹</span>
              </div>
              <div className="btn-holder">
                <button onClick={()=> removePets(curEle.pet._id)}>remove</button>
                <button onClick={()=> navigate(`/pets/${curEle.pet._id}`)}>more details</button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
