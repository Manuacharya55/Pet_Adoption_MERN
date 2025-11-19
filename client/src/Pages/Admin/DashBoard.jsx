import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { useGet } from "../../hooks/apiRequests";
import { useAuth } from "../../Context/AuthContext";
import Tile from "../../Components/Tile";

const DashBoard = () => {
  const url = `dashboard/admin`;
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
        <h1 id="heading">Latest Activity</h1>
        <div id="tables-holder">
          <table>
            <thead>
              <tr>
                <th>image</th>
                <th>name</th>
                <th>role</th>
              </tr>
            </thead>
            <tbody>
              {data.userList.length == 0
                ? "No pets yet"
                : data.userList.map((curele) => (
                    <tr key={curele._id}>
                      <td>
                        <img src={curele?.avatar || "Bunny.jpg"} alt="" />
                      </td>
                      <td>{curele?.fullname}</td>
                      <td>{curele?.role}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>image</th>
                <th>name</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {data.petList.length == 0
                ? "No pets yet"
                : data.petList.map((curele) => (
                    <tr key={curele._id}>
                      <td>
                        <img src={curele?.image || "Bunny.jpg"} alt="" />
                      </td>
                      <td>{curele?.name}</td>
                      <td>{curele?.price}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>image</th>
                <th>name</th>
                <th>createdAt</th>
              </tr>
            </thead>
            <tbody>
              {data.shopList.length == 0
                ? "No pets yet"
                : data.shopList.map((curele) => (
                    <tr key={curele._id}>
                      <td>
                        <img src={curele?.image || "Bunny.jpg"} alt="" />
                      </td>
                      <td>{curele?.shopname}</td>
                      <td>{curele?.createdAt.split("T")[0]}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
