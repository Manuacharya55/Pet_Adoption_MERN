import React from 'react'
import {Outlet} from "react-router-dom"
import NavBar from "../Components/NavBar"
import Footer from "../Components/Footer"
import { adminNavbar } from '../Utils/Navbar'
const AdminLayout = () => {
  return (
       <>
        <NavBar array={adminNavbar}/>
        <Outlet/>
        <Footer array={adminNavbar}/>
    </>
  )
}

export default AdminLayout