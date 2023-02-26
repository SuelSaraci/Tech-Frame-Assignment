import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./styles/Navbar.css";

const Navbar = ({ basketItems }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        My Store
      </Link>
      <Link to="/cart">
        <div className="basket">
          <i className="fas fa-shopping-cart basket-icon">
            <ShoppingCartIcon />
          </i>
          <span className="basket-count">{basketItems.length}</span>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
