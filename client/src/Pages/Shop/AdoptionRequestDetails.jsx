import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useGet } from "../../hooks/apiRequests";
import { useEffect } from "react";

const AdoptionRequestDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [pet, setPet] = useState();
  const {user} = useAuth();
  const url = `/adoption/${id}`
  const fetchAdoptionRequestDetails = async () => {
    if(!user?.token) return

    const response = await useGet(url,user?.token);
    console.log(response)
  };

  useEffect(()=>{
    if(user?.token){
      fetchAdoptionRequestDetails()
    }
  },[user?.token])
  return <div>AdoptionRequestDetails</div>;
};

export default AdoptionRequestDetails;
