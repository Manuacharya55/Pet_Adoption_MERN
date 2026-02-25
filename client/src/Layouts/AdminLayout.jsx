import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { adminNavbar } from "../Utils/Navbar";
import { useAuth } from "../Context/AuthContext";

const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "admin") {
    const redirectPath = user.role === "shopkeeper" ? "/shopkeeper/dashboard" : "/home";
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <NavBar array={adminNavbar} />
      <Outlet />
      <Footer array={adminNavbar} />
    </>
  );
};

export default AdminLayout;
