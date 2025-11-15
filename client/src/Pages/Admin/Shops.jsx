import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useAuth } from "../../Context/AuthContext";

const Shops = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pets, setPets] = useState();
  const [params, setParams] = useSearchParams();
  const token = "";

  const {user} = useAuth();
  const fetchPets = async () => {
    console.log(user)
    setIsLoading(true);
    const response = await axios.get(
      `http://localhost:3000/api/v1/admin/shops?page=${page}`,
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
                <th>address</th>
                <th>state</th>
                <th>country</th>
                <th>total pets</th>
              
                <th>view details</th>
              </tr>
            </thead>
            <tbody>
              {pets.shops.length == 0
                ? "No shops yet"
                : pets.shops.map((curele) => (
                    <tr key={curele?._id}>
                      <td>{curele?.shopname}</td>
                      <td>{curele?.address?.address}</td>
                      <td>{curele?.address?.state}</td>
                      <td>{curele?.address?.country}</td>
                      <td>{curele?.pet?.length || 0}</td>
                      
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
};

export default Shops;
