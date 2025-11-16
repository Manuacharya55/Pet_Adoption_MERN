import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useAuth } from "../../Context/AuthContext";
import { useGet } from "../../hooks/apiRequests";

const Pets = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pets, setPets] = useState();
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();
  const url = `/admin/pets?page=${page}`;

  const fetchPets = async () => {
    setIsLoading(true);
    if (!user?.token) return;
    const response = await useGet(url, user?.token);
    setPets(response.data);
    console.log(response.data)
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
                <th>gender</th>
                <th>age</th>
                <th>price</th>
                <th>category</th>
                <th>view details</th>
              </tr>
            </thead>
            <tbody>
              {pets.length == 0
                ? "No pets yet"
                : pets.pets.map((curele) => (
                    <tr key={curele?._id}>
                      <td>{curele?.name}</td>
                      <td>{curele?.gender}</td>
                      <td>{curele?.age}</td>
                      <td>{curele?.price} rs</td>
                      <td>{curele?.category?.name}</td>
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

export default Pets;
