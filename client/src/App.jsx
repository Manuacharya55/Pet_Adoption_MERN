import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from "./Pages/Auth/Register"
import Login from "./Pages/Auth/Login"
import Address from "./Pages/Auth/Address"
import NavBar from "./Components/NavBar"
import HomePage from "./Pages/User/HomePage"
import Footer from "./Components/Footer"
import PetsPage from "./Pages/User/PetsPage"
import ShopsPage from "./Pages/User/ShopsPage"
import Wishlist from "./Pages/User/Wishlist"
import ProfilePage from "./Pages/Shared/ProfilePage"


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


    
  </Routes>
  </BrowserRouter>
}

export default App
