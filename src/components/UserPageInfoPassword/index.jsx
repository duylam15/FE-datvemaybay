import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import "./UserPageInfoPassword.scss";
import { updatePassword } from "../../services/myProfileService";
import SuccessToast from "../SuccessToast";

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

  // State quản lý thông báo thành công
  const [showToast, setShowToast] = useState(false);

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
      const response = await updatePassword({
        matKhauCu: currentPassword,
        matKhau: newPassword,
        reMatKhau: confirmPassword,
      });

      if (response?.statusCode === 200) {
        // Hiển thị thông báo thành công
        setShowToast(true);
      } else if (response?.statusCode === 409) {
        setErrorMatKhau("Mật khẩu cũ không chính xác");
        return;
      }

      // Reset password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
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
            <div className="user-info-password__error">{errorReNewMatkhau}</div>
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

      {/* Thêm SuccessToast ở đây */}
      <SuccessToast
        message="Đổi mật khẩu thành công!"
        show={showToast}
        onClose={() => setShowToast(false)}
        duration={3000}
      />
    </div>
  );
};

export default UserPageInfoPassword;