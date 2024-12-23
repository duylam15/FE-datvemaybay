import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { message } from "antd";
import "./UserPageInfoPassword.scss";
import { updatePassword } from "../../services/myProfileService";

const UserPageInfoPassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMatKhau, setErrorMatKhau] = useState("");
  const [errorNewMatKhau, setErrorNewMatkhau] = useState("");
  const [errorReNewMatKhau, setErrorReNewMatkhau] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");

  // Toggle visibility for passwords
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
    setErrorMatKhau("");
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setErrorNewMatkhau("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrorReNewMatkhau("");
  };

  const handleCancelUpdate = () => {
    setErrorMatKhau("");
    setErrorNewMatkhau("");
    setErrorReNewMatkhau("");
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
  };

  const handleUpdatePassword = async () => {
    setErrorMatKhau("");
    setErrorNewMatkhau("");
    setErrorReNewMatkhau("");
    setError("");

    if (newPassword.length < 6) {
      setErrorNewMatkhau("Mật khẩu mới phải có ít nhất 6 kí tự");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorReNewMatkhau("Mật khẩu nhập lại không khớp");
      return;
    }

    try {
      let accessTokenWillBeSent = localStorage.getItem("access_token");
      const response = await updatePassword({
        accessToken: accessTokenWillBeSent,
        matKhauCu: currentPassword,
        matKhau: newPassword,
        reMatKhau: confirmPassword,
      });

      if (response?.statusCode === 200) {
        // Hiển thị thông báo thành công
        message.success("Mật khẩu đã được cập nhật thành công!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else if (response?.statusCode === 409) {
        setErrorMatKhau("Mật khẩu cũ không chính xác");
        message.error("Mật khẩu cũ không chính xác. Vui lòng kiểm tra lại!");
      }
    } catch (err) {
      message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
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
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
        />
        <div
          className="user-info-password__icon"
          onClick={toggleCurrentPasswordVisibility}
        >
          {showCurrentPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </div>
        {errorMatKhau && (
          <div className="user-info-password__error">{errorMatKhau}</div>
        )}
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
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <div
            className="user-info-password__icon"
            onClick={toggleNewPasswordVisibility}
          >
            {showNewPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </div>
          {errorNewMatKhau && (
            <div className="user-info-password__error">{errorNewMatKhau}</div>
          )}
        </div>
        <div className="user-info-password__item">
          <label
            htmlFor="password-confirm"
            className="user-info-password__label"
          >
            Xác nhận mật khẩu mới
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="password-confirm"
            className="user-info-password__input"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <div
            className="user-info-password__icon"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </div>
          {errorReNewMatKhau && (
            <div className="user-info-password__error">{errorReNewMatKhau}</div>
          )}
        </div>
      </div>
      <div className="user-info-password__action-row">
        <button
          className="user-info-detail__button user-info-detail__button--cancel"
          onClick={handleCancelUpdate}
        >
          Loại bỏ thay đổi
        </button>
        <button
          className="user-info-detail__button user-info-detail__button--confirm"
          onClick={handleUpdatePassword}
        >
          Lưu thay đổi
        </button>
      </div>
      {error && <div className="user-info-password__error">{error}</div>}
    </div>
  );
};

export default UserPageInfoPassword;