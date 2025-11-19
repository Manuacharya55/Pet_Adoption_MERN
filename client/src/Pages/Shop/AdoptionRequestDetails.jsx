import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useGet, usePatch } from "../../hooks/apiRequests";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AdoptionRequestDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [pet, setPet] = useState();
  const [adoption, setAdoption] = useState();
  const { user } = useAuth();
  const url = `/adoption/${id}`;
  const navigate = useNavigate();

  const fetchAdoptionRequestDetails = async () => {
    setIsLoading(true);
    if (!user?.token) return;

    const response = await useGet(url, user?.token);
    setPet(response.data.pet);
    setAdoption(response.data.request);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) {
      fetchAdoptionRequestDetails();
    }
  }, [user?.token]);


  const handleChange = async (value, adoptionId) => {
  const payload = { adoptionId, status: value };
  const response = await usePatch(url, user?.token, payload);

  if (!response?.success) return;

  toast.success(response.message);

  setAdoption(prev =>
    prev.map(req => {
      if (req._id === adoptionId) {
        return { ...req, status: value };
      }

      // if approved → everyone else becomes rejected
      if (value === "approved") {
        return { ...req, status: "rejected" };
      }

      // if rejected → others unchanged
      return req;
    })
  );
};

  return isLoading ? (
    "Loading...."
  ) : (
    <>
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

        <h1 id="heading">All Requests</h1>

        <div id="card-holder">
          {adoption?.length === 0
            ? "No Request yet"
            : adoption?.map((request) => (
                <div className="adoption-card" key={request?._id}>
                  <img
                    src={
                      request?.user?.avatar ||
                      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                    }
                    alt=""
                    id="avatar"
                  />
                  <h1>{request?.user?.fullname}</h1>
                  <span>{request?.user?.address?.phonenumber}</span>
                  <span>{request?.user?.email}</span>
                  <select
                    name="status"
                    id=""
                    style={{ textAlign: "center", marginTop: "20px" }}
                    value={request?.status}
                    onChange={(e)=>handleChange(e.target.value,request?._id)}
                  >
                    <option value="pending">pending</option>
                    <option value="rejected">rejected</option>
                    <option value="approved">approved</option>
                  </select>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default AdoptionRequestDetails;
