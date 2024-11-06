import React from "react";
import "./UserPageMenu.scss";
import HumanIcon from "./icon/HumanIcon";
import PlaneIcon from "./icon/PlaneIcon";
import { Link, useLocation } from "react-router-dom";

const UserPageMenu = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="user-menu">
      <div className="user-menu__header">
        <div className="user-menu__avatar">NL</div>
        <div className="user-menu__title">Tài khoản của tôi</div>
      </div>
      <div className="user-menu__list">
        <Link to="account">
          <div
            className={`user-menu__item ${location.pathname === "/my_profile" || location.pathname.includes("/my_profile/account")
                ? "active"
                : ""
              }`}
          >
            <div className="user-menu__item-icon">
              <HumanIcon />
            </div>
            <span className="user-menu__item-title">Thông tin tài khoản</span>
          </div>
        </Link>
        <Link to="lichsubay">
          <div
            className={`user-menu__item ${location.pathname.includes("/my_profile/lichsubay") ? "active" : ""
              }`}
          >
            <div className="user-menu__item-icon">
              <PlaneIcon />
            </div>
            <span className="user-menu__item-title">Hoạt động gần đây</span>
          </div>
        </Link>

        <div className="user-menu__item">
          <div className="user-menu__item-icon">
            <PlaneIcon />
          </div>
          <span className="user-menu__item-title">Lịch sử chuyến bay</span>
        </div>
      </div>
    </div>
  );
};

export default UserPageMenu;