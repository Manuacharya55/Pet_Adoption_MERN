import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { useSearchParams } from "react-router-dom";

import { useAuth } from "../../Context/AuthContext";
import { useGet } from "../../hooks/apiRequests";
import Table from "../../Components/shared/Table";
import { userHeader, userKey } from "../../Utils/Table";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();
  const url = `/admin/users?page=${page}`;

  const fetchPets = async () => {
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
        address: { country = "", phonenumber: mobile = "" } = {},
      } = u;

      return {
        name,
        email,
        role,
        country,
        mobile,
      };
    });

    const { currentPage, totalPages } = response.data;

    setData({ users: formatted, currentPage, totalPages });
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
        <h1 id="heading">All Users</h1>
        <Table
          tableHeader={userHeader}
          tableBody={data?.users}
          tableKeys={userKey}
          currentPage={data?.currentPage}
          totalPages={data?.totalPages}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default Users;
