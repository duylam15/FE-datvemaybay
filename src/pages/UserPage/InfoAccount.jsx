import React from 'react';
import { IoMdHome } from "react-icons/io";
import UserPageInfoBasic from "../../components/UserPageInfoBasic";
import UserPageInfoDetail from "../../components/UserPageInfoDetail";
import UserPageInfoPassword from "../../components/UserPageInfoPassword";
import { useFetchProfile } from "../../utils/useFetchProfile";

const InfoAccount = () => {
  const { profile, loading, error } = useFetchProfile(); // Sử dụng custom hook
    return (
        <>
            <div className="my_container">
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
        </>
    );
};

export default InfoAccount;