import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LuCircleUserRound } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { TbMenu2 } from "react-icons/tb";
import { adminNavbar, shopkeeperNavbar, userNavbar } from "../Utils/Form";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="navbar">
      <nav>
        <h1 id="logo">The Happy Paws</h1>

        <ul>
          {shopkeeperNavbar.map((route) => (
            <li className="hideonmobile">
              <NavLink to={route.route}>{route.name}</NavLink>
            </li>
          ))}
          <li className="hideonmobile">
            <NavLink to="/profile">
              <div>
                <LuCircleUserRound />
              </div>
            </NavLink>
          </li>

          {/* Hamburger */}
          <li className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {!isOpen ? <TbMenu2 /> : <IoCloseSharp />}
          </li>
        </ul>

        {/* Mobile Menu */}
        <ul id="menu" className={isOpen ? "open" : ""}>
          {userNavbar.map((route) => (
            <li>
              <NavLink to={route.route}>{route.name}</NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/profile">profile</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
