import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { useSearchParams } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useAuth } from "../../Context/AuthContext";
import Table from "../../Components/shared/Table";
import { shopsHeader, shopsKey } from "../../Utils/Table";
import { useGet } from "../../hooks/apiRequests";

const Shops = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();
  const url = `/admin/shops?page=${page}`;

  const fetchPets = async () => {
    setIsLoading(true);
    if (!user?.token) return;
    const response = await useGet(url, user?.token);
    const shops = response.data.shops || [];
    const formatted = shops.map((u) => {
      const {
        shopname : name,
        address: { address, country,state },
      } = u;

      const total = u.pet.length || 0
      return {name,address,state,country,total}
    });

     const { currentPage, totalPages } = response.data;
    setData({ shops: formatted, currentPage, totalPages });
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) {
      fetchPets();
      setParams({ page: page });
    }
  }, [page, user?.token]);

  return isLoading ? (
    "Loading..."
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
        />
        
      </div>
    </>
  );
};

export default Shops;
