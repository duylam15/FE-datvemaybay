import React from "react";
import "./UserPageMenu.scss";
import HumanIcon from "./icon/HumanIcon";
import PlaneIcon from "./icon/PlaneIcon";

const UserPageMenu = () => {
  return (
    <div className="user-menu">
      <div className="user-menu__header">
        <div className="user-menu__avatar">NL</div>
        <div className="user-menu__title">Tài khoản của tôi</div>
      </div>
      <div className="user-menu__list">
        <div className="user-menu__item">
          <div className="user-menu__item-icon">
            <HumanIcon />
          </div>
          <span className="user-menu__item-title">Thông tin tài khoản</span>
        </div>
        <div className="user-menu__item">
          <div className="user-menu__item-icon">
            <PlaneIcon />
          </div>
          <span className="user-menu__item-title">Hoạt động gần đây</span>
        </div>
        {/* <div className="user-menu__item">
          <PlaneIcon></PlaneIcon>
          Lịch sử chuyến bay
        </div> */}
      </div>
    </div>
  );
};

export default UserPageMenu;