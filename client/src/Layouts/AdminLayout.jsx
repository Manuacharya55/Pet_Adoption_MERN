import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { adminNavbar } from "../Utils/Navbar";
import { useAuth } from "../Context/AuthContext";

const AdminLayout = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "admin") return <Navigate to="/login" replace />;

  return (
    <>
      <NavBar array={adminNavbar} />
      <Outlet />
      <Footer array={adminNavbar} />
    </>
  );
};

export default AdminLayout;
