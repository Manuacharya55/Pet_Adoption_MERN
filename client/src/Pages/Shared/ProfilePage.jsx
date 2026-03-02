import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useGet } from "../../hooks/apiRequests";
import toast from "react-hot-toast";
import Loader from "../../Components/Loader";

const ProfilePage = () => {
  const url = `/auth/profile`;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    setIsLoading(true);
    if (!user?.token) return;

    const response = await useGet(url, user?.token);
    if (response.success) {
      setData(response?.data);
    } else {
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) fetchProfile();
  }, [user?.token]);

  return isLoading ? (
    <Loader text="Loading profile..." />
  ) : (
    <div id="container">
      <h1 id="heading">My Profile</h1>

      <div className="profile-dashboard">
        <div className="profile-card glass">
          <div className="profile-hero" style={{padding:"20px"}}>
            <div className="profile-avatar-wrapper">
              <img src={data?.avatar || "/default-avatar.png"} alt={data?.fullname} className="profile-avatar" />
            </div>
            <div className="profile-header-info">
              <h2>{data?.fullname}</h2>
              <span className={`role-badge role-${data?.role}`}>{data?.role}</span>
              <p className="profile-email">{data?.email}</p>
            </div>
          </div>

          <div className="profile-actions" style={{padding:"20px",display:"flex",gap:"20px"}}>
            <button className="btn-secondary" onClick={() => navigate(`/profile/${data?._id}`)}>
              Edit Profile
            </button>
            <button className="btn-secondary" onClick={() => navigate(`/address/${data?.address?._id || data?.address}`)}>
              Edit Address
            </button>
            {data?.role === "user" && (
              <button className="btn-primary" onClick={() => navigate("/become-shopkeeper")}>
                Become Shopkeeper
              </button>
            )}
          </div>
        </div>

        {data?.address && (
          <div className="profile-details-grid">
            <div className="info-card glass">
              <h3>Address Information</h3>
              <div className="info-content">
                <p><strong>Country:</strong> {data.address.country}</p>
                <p><strong>State:</strong> {data.address.state}</p>
                <p><strong>District:</strong> {data.address.district}</p>
                <p><strong>Phone:</strong> {data.address.phonenumber}</p>
                <p className="mt-2 text-muted"><strong>Full Address:</strong><br />{data.address.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
