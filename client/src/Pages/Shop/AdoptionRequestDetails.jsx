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
    <div className="loading-state">Loading request details...</div>
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

      <h2 id="heading-secondary">Adoption Inquiries</h2>
      <div id="card-holder">
        {adoption?.length === 0 ? (
          <div className="no-data-state">No inquiries for this pet yet.</div>
        ) : (
          adoption?.map((request) => (
            <div className="light-card profile-card" key={request?._id}>
              <img
                src={request?.user?.avatar || "https://ui-avatars.com/api/?name=" + request?.user?.fullname}
                alt=""
                id="avatar"
              />
              <h1>{request?.user?.fullname}</h1>
              <div className="contact-info">
                <p><strong>Phone:</strong> {request?.user?.address?.phonenumber}</p>
                <p><strong>Email:</strong> {request?.user?.email}</p>
              </div>
              <div className="status-selector">
                <label>Update Status</label>
                <select
                  value={request?.status}
                  onChange={(e) => handleChange(e.target.value, request?._id)}
                  className={`status-select ${request.status}`}
                >
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                  <option value="approved">Approved</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdoptionRequestDetails;
