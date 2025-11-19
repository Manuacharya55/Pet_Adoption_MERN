import React from "react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useEffect } from "react";
import { useGet } from "../../hooks/apiRequests";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Table from "../../Components/shared/Table";
import { historyHeader, historyKey } from "../../Utils/Table";
import { useSearchParams } from "react-router-dom";

const History = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();
  const url = `/adoption/history?page=${page}`;

  const fetchHistory = async () => {
    setIsLoading(true);
    if (!user?.token) return;

    const response = await useGet(url, user?.token);
    const data = response.data.history;
    const formatted = data.map((u) => {
      let {
        pet: { name: petName, price },
        user: { fullname: name },
        status,
        createdAt,
      } = u;

      return {
        petName,
        price,
        name,
        status,
        createdAt: createdAt.split("T")[0],
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
  }, [user?.token,page]);

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <div id="container">
        <h1 id="heading">History</h1>

        <Table
          tableHeader={historyHeader}
          tableBody={history?.history}
          tableKeys={historyKey}
          currentPage={history?.currentPage}
          totalPages={history?.totalPages}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default History;
