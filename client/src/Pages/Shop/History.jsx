import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useEffect } from "react";
import { useGet } from "../../hooks/apiRequests";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Table from "../../Components/shared/Table";
import { historyHeader, historyKey } from "../../Utils/Table";
import { useSearchParams } from "react-router-dom";

import Modal from "../../Components/ui/Modal";

const History = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const url = `/adoption/history?page=${page}`;

  const fetchHistory = async () => {
    setIsLoading(true);
    if (!user?.token) return;

    const response = await useGet(url, user?.token);
    const data = response.data.history;

    const formatted = data.map((u) => {
      let {
        pet: { name: petName, price, image, breed, age, description },
        user: { fullname: name },
        status,
        createdAt,
        _id
      } = u;

      return {
        petName,
        price,
        name,
        status,
        createdAt: createdAt.split("T")[0],
        // Meta data for modal
        _id,
        image,
        breed,
        age,
        description
      };
    });

    const { currentPage, totalPages } = response.data;
    setHistory({ history: formatted, currentPage, totalPages });
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) {
      fetchHistory();
      setParams({ page: page });
    }
  }, [user?.token, page]);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <div id="container">
      <h1 id="heading">History</h1>

      <Table
        tableHeader={historyHeader}
        tableBody={history?.history || []}
        tableKeys={historyKey}
        currentPage={history?.currentPage}
        totalPages={history?.totalPages}
        setPage={setPage}
        onAction={handleViewDetails}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adoption Details"
      >
        {selectedItem && (
          <div className="detail-modal-content">
            <div className="detail-row">
              <img src={selectedItem.image} alt={selectedItem.petName} className="detail-image" />
              <div className="detail-info">
                <h3>{selectedItem.petName}</h3>
                <p><strong>Breed:</strong> {selectedItem.breed}</p>
                <p><strong>Age:</strong> {selectedItem.age} years</p>
                <p><strong>Price:</strong> ₹{selectedItem.price}</p>
                <p><strong>Requested By:</strong> {selectedItem.name}</p>
                <p><strong>Status:</strong> <span className={`badge badge-${selectedItem.status === 'approved' ? 'success' : 'pending'}`}>{selectedItem.status}</span></p>
                <p><strong>Date:</strong> {selectedItem.createdAt}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default History;
