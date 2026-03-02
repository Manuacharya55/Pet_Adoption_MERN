import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { useSearchParams } from "react-router-dom";

import { useAuth } from "../../Context/AuthContext";
import { useGet } from "../../hooks/apiRequests";
import Table from "../../Components/shared/Table";
import { userHeader, userKey } from "../../Utils/Table";

import Modal from "../../Components/ui/Modal";
import Loader from "../../Components/Loader";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const url = `/admin/users?page=${page}`;

  const fetchUsers = async () => {
    setIsLoading(true);
    if (!user?.token) return;

    const response = await useGet(url, user?.token);
    const users = response?.data?.users || [];

    // map and safely destructure each user
    const formatted = users.map((u) => {
      const {
        fullname: name,
        email,
        role,
        address: { country = "", phonenumber: mobile = "", state = "", district = "", address = "" } = {},
        _id
      } = u;

      return {
        name,
        email,
        role,
        country,
        mobile,
        // Meta for modal
        state,
        district,
        address,
        _id
      };
    });

    const { currentPage, totalPages } = response.data;

    setData({ users: formatted, currentPage, totalPages });
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) {
      fetchUsers();
      setParams({ page: page });
    }
  }, [page, user?.token]);

  const handleViewDetails = (item) => {
    setSelectedUser(item);
    setIsModalOpen(true);
  };

  return isLoading ? (
    <Loader text="Loading users..." />
  ) : (
    <>
      <div id="container">
        <h1 id="heading">All Users</h1>
        <Table
          tableHeader={userHeader}
          tableBody={data?.users}
          tableKeys={userKey}
          currentPage={data?.currentPage}
          totalPages={data?.totalPages}
          setPage={setPage}
          onAction={handleViewDetails}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="User Details"
      >
        {selectedUser && (
          <div className="detail-modal-content">
            <div className="user-profile-header">
              <div className="user-avatar-large">
                {selectedUser.name.charAt(0)}
              </div>
              <div className="user-header-info">
                <h3>{selectedUser.name}</h3>
                <span className={`role-badge role-${selectedUser.role}`}>{selectedUser.role}</span>
              </div>
            </div>

            <div className="info-grid mt-4">
              <div className="info-item">
                <label>Email Address</label>
                <p>{selectedUser.email}</p>
              </div>
              <div className="info-item">
                <label>Mobile Number</label>
                <p>{selectedUser.mobile || "N/A"}</p>
              </div>
            </div>

            {selectedUser.address && (
              <div className="info-section mt-4">
                <h4>Address Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Street Address</label>
                    <p>{selectedUser.address}</p>
                  </div>
                  <div className="info-item">
                    <label>Location</label>
                    <p>{selectedUser.district}, {selectedUser.state}</p>
                    <p>{selectedUser.country}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default Users;
