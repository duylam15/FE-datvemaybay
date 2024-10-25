import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import "./layoutAdmin.css";
import Sidebar from "../../../components/Admin/Sidebar";

const LayoutAdmin = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Sidebar></Sidebar>
          <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 content-admin">
              <Outlet></Outlet>
          </main>
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
