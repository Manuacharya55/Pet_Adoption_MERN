import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Address from "./Pages/Shared/Address";
import HomePage from "./Pages/User/HomePage";
import Footer from "./Components/Footer";
import PetsPage from "./Pages/User/PetsPage";
import ShopsPage from "./Pages/User/ShopsPage";
import Wishlist from "./Pages/User/Wishlist";
import ProfilePage from "./Pages/Shared/ProfilePage";
import Pets from "./Pages/Shop/Pets";
import AddPet from "./Pages/Shop/AddPet";
import EditPet from "./Pages/Shop/EditPet";
import EditProfile from "./Pages/Shared/EditProfile";
import EditAddress from "./Pages/Shared/EditAddress";
import BecomeShopKeeper from "./Pages/User/BecomeShopKeeper";
import DashBoard from "./Pages/Admin/DashBoard";
import Categories from "./Pages/Admin/Categories";
import Users from "./Pages/Admin/Users";
import Shops from "./Pages/Admin/Shops";
import Dashboard from "./Pages/Shop/Dashboard";
import Requests from "./Pages/Shop/Requests";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/component" element={<Footer />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="/shops" element={<ShopsPage />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:id" element={<EditProfile />} />

        <Route path="/add-address" element={<Address />} />
        <Route path="/become-shopkeeper" element={<BecomeShopKeeper />} />
        <Route path="/address/:id" element={<EditAddress />} />

{/* shopkeeper routes */}
        <Route path="/shopkeeper/dashboard" element={<Dashboard />} />
        <Route path="/shopkeeper/pets" element={<Pets />} />
        <Route path="/shopkeeper/request" element={<Requests />} />
        <Route path="/shopkeeper/addpet" element={<AddPet />} />
        <Route path="/shopkeeper/editpet/:id" element={<EditPet />} />

        {/* admin routes */}
        <Route path="/admin/dashboard" element={<DashBoard />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/pets" element={<Pets />} />
        <Route path="/admin/shops" element={<Shops />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
