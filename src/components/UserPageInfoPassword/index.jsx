import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import "./UserPageInfoPassword.scss";

const UserPageInfoPassword = () => {
  // State để quản lý việc hiển thị mật khẩu hiện tại và mật khẩu mới
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="user-info-password">
      <div className="user-info-password__item">
        <label htmlFor="password-now" className="user-info-password__label">
          Mật khẩu hiện tại
        </label>
        <input
          type={showCurrentPassword ? "text" : "password"}
          id="password-now"
          className="user-info-password__input"
          placeholder="Mật khẩu của bạn"
        />
        <div className="user-info-password__icon" onClick={toggleCurrentPasswordVisibility}>
          {showCurrentPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </div>
        <div className="user-info-password__error">This is the error</div>
      </div>
      <div className="user-info-password__row">
        <div className="user-info-password__item">
          <label htmlFor="password-new" className="user-info-password__label">
            Mật khẩu mới
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            id="password-new"
            className="user-info-password__input"
            placeholder="Mật khẩu mới"
          />
          <div className="user-info-password__icon" onClick={toggleNewPasswordVisibility}>
            {showNewPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </div>
          <div className="user-info-password__error">This is the error</div>
        </div>
        <div className="user-info-password__item">
          <label htmlFor="password-confirm" className="user-info-password__label">
            Xác nhận mật khẩu mới
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="password-confirm"
            className="user-info-password__input"
            placeholder="Nhập lại mật khẩu"
          />
          <div className="user-info-password__icon" onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </div>
          <div className="user-info-password__error">This is the error</div>
        </div>
      </div>
      <div className="user-info-password__action-row">
        <button className="user-info-detail__button user-info-detail__button--cancel">
          Loại bỏ thay đổi
        </button>
        <button className="user-info-detail__button user-info-detail__button--confirm">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default UserPageInfoPassword;
