import React from "react";

import { NavLink } from "react-router-dom";

const Footer = ({ array }) => {
  return (
      <footer>
        <div id="footer-header">
          <h1 id="logo">The Happy paws</h1>
          <ul>
            {array.map((route,idx) => (
              <li key={idx}>
                <NavLink to={route.route}>{route.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div id="footer-bottom">
          <span>© 2025 The Happy Paws .
          All Rights Reserved.</span>
        </div>
      </footer>
  );
};

export default Footer;
