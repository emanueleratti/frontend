import "./NavLinks.css";
import { navLinks } from "../../../data/navdata";
import React from "react";
import { Link } from "react-router-dom";

export const NavLinks = () => {
  return (
    <div className="nav-links d-flex justify-content-end gap-3">
      {navLinks.map((link, index) => (
        <Link key={`menu-${index}`} to={link.href} className="w-bold">
          {link.text}
        </Link>
      ))}
    </div>
  );
};
