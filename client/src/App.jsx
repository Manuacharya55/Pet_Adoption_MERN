import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Address from "./Pages/Shared/Address";
import HomePage from "./Pages/User/HomePage";
import PetsPage from "./Pages/User/PetsPage";
import ShopsPage from "./Pages/User/ShopsPage";
import Wishlist from "./Pages/User/Wishlist";
import ProfilePage from "./Pages/Shared/ProfilePage";
import Pets from "./Pages/Shop/Pets";
import AllPets from "./Pages/Admin/Pets";
import EditProfile from "./Pages/Shared/EditProfile";
import EditAddress from "./Pages/Shared/EditAddress";
import BecomeShopKeeper from "./Pages/User/BecomeShopKeeper";
import DashBoard from "./Pages/Admin/DashBoard";
import Categories from "./Pages/Admin/Categories";
import Users from "./Pages/Admin/Users";
import Shops from "./Pages/Admin/Shops";
import Dashboard from "./Pages/Shop/Dashboard";
import Requests from "./Pages/Shop/Requests";
import ShopDescription from "./Pages/User/ShopDescription";
import PetDescription from "./Pages/User/PetDescription";
import UserLayout from "./Layouts/UserLayout";
import ShopKeeperLayout from "./Layouts/ShopKeeperLayout";
import AdminLayout from "./Layouts/AdminLayout";
import SharedLayout from "./Layouts/SharedLayout";
import AdoptionRequestDetails from "./Pages/Shop/AdoptionRequestDetails";
import History from "./Pages/Shop/History";

import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

const AuthRouteRedirect = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) {
    if (sessionStorage.getItem("justRegistered") === "true") {
      sessionStorage.removeItem("justRegistered");
      return <Navigate to="/add-address" replace />;
    }
    const paths = {
      admin: "/admin/dashboard",
      shopkeeper: "/shopkeeper/dashboard",
      user: "/home",
    };
    return <Navigate to={paths[user.role] || "/home"} replace />;
  }
  return children;
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRouteRedirect>
              <Navigate to="/login" />
            </AuthRouteRedirect>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRouteRedirect>
              <Login />
            </AuthRouteRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRouteRedirect>
              <Register />
            </AuthRouteRedirect>
          }
        />

        <Route element={<UserLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/pets/:id" element={<PetDescription />} />
          <Route path="/shops" element={<ShopsPage />} />
          <Route path="/shops/:id" element={<ShopDescription />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/become-shopkeeper" element={<BecomeShopKeeper />} />
        </Route>

        {/* Protected Shared Routes */}
        <Route element={<SharedLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:id" element={<EditProfile />} />
          <Route path="/add-address" element={<Address />} />
          <Route path="/address/:id" element={<EditAddress />} />
        </Route>

        {/* shopkeeper routes */}
        <Route element={<ShopKeeperLayout />}>
          <Route path="/shopkeeper/dashboard" element={<Dashboard />} />
          <Route path="/shopkeeper/pets" element={<Pets />} />
          <Route path="/shopkeeper/request" element={<Requests />} />
          <Route
            path="/shopkeeper/request/:id"
            element={<AdoptionRequestDetails />}
          />
          <Route path="/shopkeeper/history" element={<History />} />
        </Route>

        {/* admin routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<DashBoard />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/pets" element={<AllPets />} />
          <Route path="/admin/shops" element={<Shops />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
