import React from "react";
import Card from "../../Components/Card";
import Input from "../../Components/ui/Input";
import { IoSearch } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useGet } from "../../hooks/apiRequests";

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
  const { user } = useAuth();
  const url = `/shop?page=${page}`;
  const navigate = useNavigate();

  const fetchShops = async () => {
    setIsLoading(true);
    if (!user?.token) return;

    const response = await useGet(url, user?.token);

    setIsLoading(false);
    setShops(response.data);
  };

  useEffect(() => {
    if (user?.token) {
      fetchShops();
      setParams({ page: page });
    }
  }, [user?.token, page]);

  return isLoading ? (
    "Loading...."
  ) : (
    <>
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
                    <button onClick={() => navigate(`/shops/${shop._id}`)}>
                      more details
                    </button>
                  </div>
                </Card>
              ))}
        </div>
      </div>
    </>
  );
};

export default ShopsPage;
