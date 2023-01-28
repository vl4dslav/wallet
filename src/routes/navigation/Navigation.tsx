import React, { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navigation.scss";

const Navigation: FC = () => {
  return (
    <>
      <nav className="container">
        <h1 className="title">
          <Link className="nav-link" to="/home">
            Wallet
          </Link>
        </h1>
        <ul>
          <li>
            <Link className="nav-link" to="/settings">
              Settings
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/stats">
              Stats
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
