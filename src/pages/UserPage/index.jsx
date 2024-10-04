// UsersPage.jsx
import React from "react";
import { useFetchUsers } from "../../utils/useFetchUsers";
import "./UserPage.scss";
import UserPageMenu from "../../components/UserPageMenu";
import UserPageInfoBasic from "../../components/UserPageInfoBasic";
import UserPageInfoDetail from "../../components/UserPageInfoDetail";
import UserPageInfoPassword from "../../components/UserPageInfoPassword";
import HomeIcon from "./icon/HomeIcon";
import { IoMdHome } from "react-icons/io";
const UsersPage = () => {
  const { users } = useFetchUsers();

  return (
    <div className="users-page">
      <div className="container">
        <div className="users-page__body">
          <div className="users-page__body--left">
            <UserPageMenu></UserPageMenu>
          </div>
          <div className="users-page__body--right">
            <div className="row">
              <div className="icon-home">
              <IoMdHome />
              </div>
              <span className="row-title">Thông tin tài khoản</span>
            </div>
            <h1 className="users-page__body--right title">TÀI KHOẢN</h1>
            <UserPageInfoBasic></UserPageInfoBasic>
            <h2 className="users-page__body--right title title_2">Thông tin tài khoản</h2>
            <UserPageInfoDetail></UserPageInfoDetail>
            <h2 className="users-page__body--right title title_2">Thay đổi mật khẩu</h2>
            <UserPageInfoPassword></UserPageInfoPassword>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
