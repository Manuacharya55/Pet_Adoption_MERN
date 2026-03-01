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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      overflowX: 'hidden',
    }}>
      <NavBar array={userNavbar} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer array={userNavbar} />
    </div>
  );
};

export default UserLayout;
