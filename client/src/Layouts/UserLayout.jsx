import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { userNavbar } from "../Utils/Navbar";
import { useAuth } from "../Context/AuthContext";

const UserLayout = () => {
  const { user } = useAuth(); // assuming you have 

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "user") return <Navigate to="/login" replace />;

  return (
    <>
      <NavBar array={userNavbar} />
      <Outlet />
      <Footer array={userNavbar} />
    </>
  );
};

export default UserLayout;
