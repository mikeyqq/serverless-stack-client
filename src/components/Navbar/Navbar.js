import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="nav-wrapper">
      <div className="nav-container-1">
        <NavLink to="/" className="nav-link">
          <h3>Pocketlist</h3>
        </NavLink>
        <NavLink to="/dashboard" className="nav-link">
          <h3 className="nav-container-1-h3">Dashboard</h3>
        </NavLink>
        <NavLink to="/create" className="nav-link">
          <h3 className="nav-container-1-h3">Create Item</h3>
        </NavLink>
        <NavLink to="/edit" className="nav-link">
          <h3 className="nav-container-1-h3">Edit Item</h3>
        </NavLink>
      </div>

      <div className="nav-container-3">
        <NavLink to="/signup" className="nav-link">
          <h3 className="nav-container-3-h3">Signup</h3>
        </NavLink>
        <NavLink to="/login" className="nav-link">
          <h3 className="nav-container-3-h3">Login</h3>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
