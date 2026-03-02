import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAuth } from "../../Context/AuthContext";
import { useGet } from "../../hooks/apiRequests";
import Table from "../../Components/shared/Table";
import { petsHeader, petsKey } from "../../Utils/Table";
import Loader from "../../Components/Loader";
import Modal from "../../Components/ui/Modal";

const Pets = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const url = `/admin/pets?page=${page}`;

  const fetchAllPets = async () => {
    setIsLoading(true);
    if (!user?.token) return;
    const response = await useGet(url, user?.token);
    const pets = response?.data?.pets || [];

    // map and safely destructure each pet
    const formatted = pets.map((u) => {
      const {
        name,
        gender,
        price,
        age,
        breed,
        category: { name: category } = {},
        description,
        image,
        _id
      } = u;

      return {
        name,
        gender,
        age,
        breed,
        price,
        category,
        // Meta for modal
        description,
        image,
        _id
      };
    });

    const { currentPage, totalPages } = response.data;

    setData({ pets: formatted, currentPage, totalPages });
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) {
      setParams({ page: page });
      fetchAllPets();
    }
  }, [page, user?.token]);

  const handleViewDetails = (item) => {
    setSelectedPet(item);
    setIsModalOpen(true);
  };

  return isLoading ? (
    <Loader text="Loading pets..." />
  ) : (
    <>
      <div id="container">
        <h1 id="heading">All Pets</h1>
        <Table
          tableHeader={petsHeader}
          tableBody={data?.pets}
          tableKeys={petsKey}
          currentPage={data?.currentPage}
          totalPages={data?.totalPages}
          setPage={setPage}
          onAction={handleViewDetails}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Pet Details"
      >
        {selectedPet && (
          <div className="detail-modal-content">
            <div className="detail-row">
              <div className="detail-image-wrapper">
                <img src={selectedPet.image} alt={selectedPet.name} className="detail-image" />
              </div>
              <div className="detail-info">
                <h3>{selectedPet.name}</h3>
                <div className="info-grid">
                  <p><strong>Breed:</strong> {selectedPet.breed}</p>
                  <p><strong>Age:</strong> {selectedPet.age} years</p>
                  <p><strong>Gender:</strong> {selectedPet.gender}</p>
                  <p><strong>Category:</strong> {selectedPet.category}</p>
                  <p><strong>Price:</strong> ₹{selectedPet.price}</p>
                </div>
                <div className="info-section">
                  <h4>Description</h4>
                  <p>{selectedPet.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Pets;
