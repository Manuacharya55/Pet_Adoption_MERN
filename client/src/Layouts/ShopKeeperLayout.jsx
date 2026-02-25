import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { shopkeeperNavbar } from '../Utils/Navbar';
import { useAuth } from "../Context/AuthContext";

const ShopKeeperLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "shopkeeper") {
    const redirectPath = user.role === "admin" ? "/admin/dashboard" : "/home";
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <NavBar array={shopkeeperNavbar} />
      <Outlet />
      <Footer array={shopkeeperNavbar} />
    </>
  );
};

export default ShopKeeperLayout;
