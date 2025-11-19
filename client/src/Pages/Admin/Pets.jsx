import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAuth } from "../../Context/AuthContext";
import { useGet } from "../../hooks/apiRequests";
import Table from "../../Components/shared/Table";
import { petsHeader, petsKey } from "../../Utils/Table";

const Pets = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();
  const url = `/admin/pets?page=${page}`;

  const fetchPets = async () => {
    setIsLoading(true);
    if (!user?.token) return;
    const response = await useGet(url, user?.token);
    const pets = response?.data?.pets || [];

    // map and safely destructure each user
    const formatted = pets.map((u) => {
      const {
        name,
        gender,
        price,
        age,
        breed,
        category: { name: category } = {},
      } = u;

      return {
        name,
        gender,
        age,
        breed,
        price,
        age,
        category,
      };
    });

    const { currentPage, totalPages } = response.data;

    setData({ pets: formatted, currentPage, totalPages });
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) {
      setParams({ page: page });
      fetchPets();
    }
  }, [page, user?.token]);

  return isLoading ? (
    "Loading..."
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
        />
      </div>
    </>
  );
};

export default Pets;
