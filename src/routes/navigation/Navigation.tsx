import React, { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navigation.scss";

const Navigation: FC = (str) => {
  return (
    <>
      <nav className="container">
        <div className="title">Wallet</div>
        <ul>
          <li>
            <Link className="nav-link" to="/info">
              Info
            </Link>
          </li>
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
