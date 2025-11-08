import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from "./Pages/Auth/Register"
import Login from "./Pages/Auth/Login"
import Address from "./Pages/Shared/Address"
import HomePage from "./Pages/User/HomePage"
import Footer from "./Components/Footer"
import PetsPage from "./Pages/User/PetsPage"
import ShopsPage from "./Pages/User/ShopsPage"
import Wishlist from "./Pages/User/Wishlist"
import ProfilePage from "./Pages/Shared/ProfilePage"
import Pets from "./Pages/Shop/Pets"
import AddPet from "./Pages/Shop/AddPet"
import EditPet from "./Pages/Shop/EditPet"


function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/address" element={<Address/>}/>
    <Route path="/edit-address" element={<Address/>}/>
    <Route path="/component" element={<Footer/>}/>
    <Route path="/home" element={<HomePage/>}/>
    <Route path="/pets" element={<PetsPage/>}/>
    <Route path="/shops" element={<ShopsPage/>}/>
    <Route path="/wishlist" element={<Wishlist/>}/>
    <Route path="/profile" element={<ProfilePage/>}/>


    <Route path="/shopkeeper/pets" element={<Pets/>}/>
    <Route path="/shopkeeper/addpet" element={<AddPet/>}/>
    <Route path="/shopkeeper/editpet/:id" element={<EditPet/>}/>
  </Routes>
  </BrowserRouter>
}

export default App
