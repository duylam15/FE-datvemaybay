import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import "./Sidebar.css";
import { MdSpaceDashboard } from "react-icons/md";
import { GiSoccerField } from "react-icons/gi";
import { FaPlane } from "react-icons/fa6";
import { FaCriticalRole } from "react-icons/fa";
import React from 'react';
import DropdownSidebar from "../Dropdown/DropdownSidebar";

const Sidebar = () => {
  const location = useLocation();
  return (
    <>
      <nav className="col-md-3 col-lg-2 d-md-block sidebar">
        <img
          src="https://www.bambooairways.com/o/wpbav-home-theme/css/assets/logo.png"
          alt=""
          className="logo"
        />
        <div className="position-sticky">
          <div className="nav flex-column">
            <Link
              className={`nav-link ${
                location.pathname === "/admin/dashboard" ? "active" : ""
              }`}
              to="/admin/dashboard"
            >
              <div
                className={`nav-item row ${
                  location.pathname === "/admin/dashboard" ? "active" : ""
                }`}
              >
                <MdSpaceDashboard />
                Dashboard
              </div>
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/admin/quyen" ? "active" : ""
              }`}
              to="/admin/quyen"
            >
              <div
                className={`nav-item row ${
                  location.pathname === "/admin/quyen" ? "active" : ""
                }`}
              >
                <FaCriticalRole/>
                Nhóm quyền
              </div>
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/admin/maybay" ? "active" : ""
              }`}
              to="/admin/maybay"
            >
              <div
                className={`nav-item row ${
                  location.pathname === "/admin/maybay" ? "active" : ""
                }`}
              >
                <FaPlane></FaPlane>
                 Máy bay
              </div>
            </Link>
            <DropdownSidebar></DropdownSidebar>
            <Link
              className={`nav-link ${
                location.pathname === "/admin/maybay" ? "active" : ""
              }`}
              to="/admin/maybay"
            >
              <div
                className={`nav-item row ${
                  location.pathname === "/admin/maybay" ? "active" : ""
                }`}
              >
                <FaPlane></FaPlane>
                 Máy bay
              </div>
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/admin/maybay" ? "active" : ""
              }`}
              to="/admin/maybay"
            >
              <div
                className={`nav-item row ${
                  location.pathname === "/admin/maybay" ? "active" : ""
                }`}
              >
                <FaPlane></FaPlane>
                 Máy bay
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
