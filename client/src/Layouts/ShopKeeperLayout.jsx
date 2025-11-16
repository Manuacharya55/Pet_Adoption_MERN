import React from 'react'
import {Outlet} from "react-router-dom"
import NavBar from "../Components/NavBar"
import Footer from "../Components/Footer"
import { shopkeeperNavbar } from '../Utils/Navbar'
const ShopKeeperLayout = () => {
  return (
        <>
        <NavBar array={shopkeeperNavbar}/>
        <Outlet/>
        <Footer array={shopkeeperNavbar}/>
    </>
  )
}

export default ShopKeeperLayout