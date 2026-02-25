import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { useSearchParams } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useAuth } from "../../Context/AuthContext";
import Table from "../../Components/shared/Table";
import { shopsHeader, shopsKey } from "../../Utils/Table";
import { useGet } from "../../hooks/apiRequests";

import Modal from "../../Components/ui/Modal";

const Shops = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const url = `/admin/shops?page=${page}`;

  const fetchShops = async () => {
    setIsLoading(true);
    if (!user?.token) return;
    const response = await useGet(url, user?.token);
    const shops = response.data.shops || [];
    const formatted = shops.map((u) => {
      const {
        shopname: name,
        address: { address, country, state, district, phonenumber } = {},
        user: { email } = {},
        image,
        _id
      } = u;

      const total = u.pet.length || 0;
      return {
        name,
        address,
        state,
        country,
        total,
        // Meta for modal
        district,
        phonenumber,
        email,
        image,
        _id
      };
    });

    const { currentPage, totalPages } = response.data;
    setData({ shops: formatted, currentPage, totalPages });
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) {
      fetchShops();
      setParams({ page: page });
    }
  }, [page, user?.token]);

  const handleViewDetails = (item) => {
    setSelectedShop(item);
    setIsModalOpen(true);
  };

  return isLoading ? (
    <div className="loading-container">Loading...</div>
  ) : (
    <>
      <div id="container">
        <h1 id="heading">All Shops</h1>

        <Table
          tableHeader={shopsHeader}
          tableBody={data?.shops}
          tableKeys={shopsKey}
          currentPage={data?.currentPage}
          totalPages={data?.totalPages}
          setPage={setPage}
          onAction={handleViewDetails}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Shop Details"
      >
        {selectedShop && (
          <div className="detail-modal-content">
            <div className="detail-row">
              <div className="detail-image-wrapper">
                <img src={selectedShop.image} alt={selectedShop.name} className="detail-image" />
              </div>
              <div className="detail-info">
                <h3>{selectedShop.name}</h3>
                <div className="info-grid">
                  <p><strong>Owner Email:</strong> {selectedShop.email}</p>
                  <p><strong>Phone:</strong> {selectedShop.phonenumber}</p>
                  <p><strong>Total Pets:</strong> {selectedShop.total}</p>
                </div>
                <div className="info-section">
                  <h4>Address</h4>
                  <p>{selectedShop.address}</p>
                  <p>{selectedShop.district || ""}, {selectedShop.state}</p>
                  <p>{selectedShop.country}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Shops;
