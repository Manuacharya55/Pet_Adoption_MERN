import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { userNavbar } from "../Utils/Navbar";
import { useAuth } from "../Context/AuthContext";

const UserLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "user") {
    const redirectPath = user.role === "admin" ? "/admin/dashboard" : "/shopkeeper/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <NavBar array={userNavbar} />
      <Outlet />
      <Footer array={userNavbar} />
    </>
  );
};

export default UserLayout;
