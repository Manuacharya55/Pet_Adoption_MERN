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
  const [params, setParams] = useSearchParams();
  const [shops, setShops] = useState({ shops: [], count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchShops = async (shopSearch = "") => {
    setIsLoading(true);
    if (!user?.token) return;

    const url = `/shop?page=${page}&shopname=${shopSearch}`;
    const response = await useGet(url, user?.token);

    setIsLoading(false);
    setShops(response.data);
  };

  useEffect(() => {
    if (user?.token) {
      fetchShops(search);
      setParams({ page: page, shopname: search });
    }
  }, [user?.token, page]);

  const handleSearch = () => {
    if (page === 1) {
      fetchShops(search);
    } else {
      setPage(1);
    }
    setParams({ page: 1, shopname: search });
  };

  return (
    <div id="container">
      <h1 id="heading">Discover Shops</h1>

      <div id="search-holder" className="clean-filters">
        <div className="filter-group" style={{ flex: 1 }}>
          <label htmlFor="shop-search">Search by Shop Name</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              id="shop-search"
              placeholder="Enter shop name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="search-input"
            />
            <button onClick={handleSearch} className="main-btn" style={{ width: 'auto' }}>
              <IoSearch />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">Loading shops...</div>
      ) : (
        <div id="card-holder">
          {shops?.shops?.length === 0 ? (
            <div className="no-data-state">No shops found matching your search.</div>
          ) : (
            shops?.shops?.map((shop) => (
              <Card heading={shop?.shopname} img={shop?.image} key={shop._id}>
                <div className="btn-holder">
                  <button onClick={() => navigate(`/shops/${shop._id}`)}>
                    View Details
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ShopsPage;
