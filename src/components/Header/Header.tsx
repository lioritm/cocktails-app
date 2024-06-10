import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";
import Logo from "../../images/logo.png";
import BackToPrev from "../BackToPrev/BackToPrev";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={Logo} alt="cocktails" />
      </Link>
      {pathname !== "/" && <BackToPrev />}
    </header>
  );
};

export default Header;
