import {Outlet} from "react-router-dom"
import NavBar from "../Components/NavBar"
import Footer from "../Components/Footer"
import { userNavbar } from "../Utils/Navbar"

const UserLayout = () => {
  return (
    <>
        <NavBar array={userNavbar}/>
        <Outlet/>
        <Footer array={userNavbar}/>
    </>
  )
}

export default UserLayout