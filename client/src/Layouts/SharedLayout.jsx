import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { userNavbar, shopkeeperNavbar, adminNavbar } from "../Utils/Navbar";
import { useAuth } from "../Context/AuthContext";

const SharedLayout = () => {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (!user) return <Navigate to="/login" replace />;

    const navbars = {
        user: userNavbar,
        shopkeeper: shopkeeperNavbar,
        admin: adminNavbar,
    };

    const currentNavbar = navbars[user.role] || userNavbar;

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            overflowX: 'hidden',
        }}>
            <NavBar array={currentNavbar} />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <Footer array={currentNavbar} />
        </div>
    );
};

export default SharedLayout;
