import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { shopkeeperNavbar } from '../Utils/Navbar';
import { useAuth } from "../Context/AuthContext";

const ShopKeeperLayout = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "shopkeeper") return <Navigate to="/login" replace />;

  return (
    <>
      <NavBar array={shopkeeperNavbar} />
      <Outlet />
      <Footer array={shopkeeperNavbar} />
    </>
  );
};

export default ShopKeeperLayout;
