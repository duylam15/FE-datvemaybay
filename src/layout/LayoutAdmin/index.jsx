import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import "./layoutAdmin.css";
import Sidebar from "../../components/Admin/Sidebar";
import { useSelector } from "react-redux";

const LayoutAdmin = () => {
  // const isAdminRoute = window.location.pathname.startsWith('/admin');
  // const user = useSelector(state => state.account.user);
  // const userRole = user?.data?.quyen?.tenQuyen;
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* {isAdminRoute && userRole === 'admin' ?  : <></>} */}
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 content-admin">
            <Outlet></Outlet>
          </main>
        </div>
      </div>
    </>
  );
};


export default LayoutAdmin;
