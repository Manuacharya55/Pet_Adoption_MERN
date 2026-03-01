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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      overflowX: 'hidden',
    }}>
      <NavBar array={shopkeeperNavbar} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer array={shopkeeperNavbar} />
    </div>
  );
};

export default ShopKeeperLayout;
