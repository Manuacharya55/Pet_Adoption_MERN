import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { useGet } from "../../hooks/apiRequests";
import { useAuth } from "../../Context/AuthContext";
import Tile from "../../Components/Tile";

const DashBoard = () => {
  const url = `dashboard/shopkeeper`;
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const fetchDashboard = async () => {
    setIsLoading(true);
    if (!user?.token) return;

    const response = await useGet(url, user?.token);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.token) fetchDashboard();
  }, [user?.token]);

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <div id="container">
        <h1 id="heading">Dashboard</h1>
        <div id="tile-holder">
          {data?.count.map((curEle, index) => (
            <Tile name={curEle.name} count={curEle.count} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DashBoard;
