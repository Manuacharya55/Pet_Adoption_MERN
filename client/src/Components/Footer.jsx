import React from "react";
import { userNavbar } from "../Utils/Form";
import { NavLink } from "react-router-dom";

const Footer = ({ array }) => {
  return (
      <footer>
        <div id="footer-header">
          <h1 id="logo">The Happy paws</h1>
          <ul>
            {userNavbar.map((route,idx) => (
              <li key={idx}>
                <NavLink to={route.route}>{route.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div id="footer-bottom">
          <span>Copyrights 2025 The Happy Paws . All Rights Reserved.</span>
        </div>
      </footer>
  );
};

export default Footer;
