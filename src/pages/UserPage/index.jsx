// UsersPage.jsx
import React from "react";
import "./UserPage.scss";
import UserPageMenu from "../../components/UserPageMenu";
import { Outlet } from "react-router-dom";

const UsersPage = () => {

  return (
    <div className="users-page">
      <div className="container">
        <div className="users-page__body">
          <div className="users-page__body--left">
            <UserPageMenu></UserPageMenu>
          </div>
          <div className="users-page__body--right">
              <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
