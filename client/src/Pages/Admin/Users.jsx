import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useAuth } from "../../Context/AuthContext";

const Users = () => {
 const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pets, setPets] = useState();
  const [params, setParams] = useSearchParams();
  const token = "";

  const fetchPets = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `http://localhost:3000/api/v1/admin/users?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    console.log(response.data);
    setPets(response.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPets();
    setParams({ page: page });
  }, [page, token]);

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <NavBar />
      <div id="container">
        <h1 id="heading">All Shops</h1>

        <div id="table-holder">
          <div id="table-option">
            <button
              disabled={pets?.currentPage <= 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              <GrFormPrevious />
            </button>
            <span>
              page : {pets?.currentPage} of {pets?.totalPages}{" "}
            </span>
            <button
              disabled={pets?.currentPage >= pets?.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              <GrFormNext />
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>email</th>
                <th>role</th>
                <th>country</th>
                <th>phone number</th>
                <th>view detail</th>
              </tr>
            </thead>
            <tbody>
              {pets.users.length == 0
                ? "No shops yet"
                : pets.users.map((curele) => (
                    <tr key={curele?._id}>
                      <td>{curele?.fullname}</td>
                      <td>{curele?.email}</td>
                      <td>{curele?.role}</td>
                      <td>{curele?.address?.country}</td>
                      <td>{curele?.address?.phonenumber}</td>
                      <td>
                        <button>view details</button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users