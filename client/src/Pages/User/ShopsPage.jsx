import React from "react";
import Card from "../../Components/Card";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import Input from "../../Components/ui/Input";
import { IoSearch } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTEzNTQxZjQyNThlN2EyNmZhZjI5NzQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2Mjk1NjQ2NX0.4JWD8Lg8zz-Wf5PJc-ufvNpkUdERtmHjiJyHmtemTQk";

const ShopsPage = () => {
  const props = {
    type: "text",
    placeholder: "search shop",
    name: "shop",
  };
  const [params, setParams] = useSearchParams();
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const fetchShops = async () => {
    setIsLoading(true);
    if (!token) return;

    const response = await axios.get(
      `http://localhost:3000/api/v1/shop?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    setIsLoading(false);
    console.log(response.data.data);
    setShops(response.data.data);
  };

  useEffect(() => {
    fetchShops();
    setParams({ page: page });
  }, [token, page]);

  return isLoading ? (
    "Loading...."
  ) : (
    <>
      <NavBar />
      <div id="container">
        <h1 id="heading">Shop by shops</h1>

        <div id="search-holder">
          <Input props={props} />
          <button>
            <IoSearch />
          </button>
        </div>

        <div id="card-holder">
          {shops.shops.length === 0
            ? "No shops yet"
            : shops.shops.map((shop) => (
                <Card heading={shop?.shopname} img={shop?.image} key={shop._id}>
                  <div className="btn-holder">
                    <button onClick={()=> navigate(`/shops/${shop._id}`)}>more details</button>
                  </div>
                </Card>
              ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopsPage;
