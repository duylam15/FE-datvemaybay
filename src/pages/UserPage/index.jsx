// UsersPage.jsx
import React from "react";
import { useFetchUsers } from "../../utils/useFetchUsers";
import "./UserPage.scss";
import UserPageMenu from "../../components/UserPageMenu";
import UserPageInfoBasic from "../../components/UserPageInfoBasic";
import UserPageInfoDetail from "../../components/UserPageInfoDetail";
import UserPageInfoPassword from "../../components/UserPageInfoPassword";
import { IoMdHome } from "react-icons/io";
import { useFetchProfile } from "../../utils/useFetchProfile";

const UsersPage = () => {
  const token = localStorage.getItem('access_token'); // Lấy token từ localStorage
  console.log(token)
  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcyODQzNDc2MiwiZXhwIjoxNzI5MDM5NTYyfQ.HyW3mNDUpcn5tCQiR5ddZS7c0aNm3uYx08y8m6e8LfA"
  const { profile, loading, error } = useFetchProfile(token); // Sử dụng custom hook

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
            <UserPageInfoBasic profile={profile} loading={loading} error={error}></UserPageInfoBasic>
            <h2 className="users-page__body--right title title_2">Thông tin tài khoản</h2>
            <UserPageInfoDetail profile={profile} loading={loading} error={error}></UserPageInfoDetail>
            <h2 className="users-page__body--right title title_2">Thay đổi mật khẩu</h2>
            <UserPageInfoPassword profile={profile} loading={loading} error={error}></UserPageInfoPassword>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
