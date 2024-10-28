import React, { useState } from "react";
import "./forgotPassword.css";
import { MdOutlineMail } from "react-icons/md";
import { forgotPassword } from "../../services/taiKhoanService";
import SuccessToast from "../../components/SuccessToast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // State quản lý thông báo thành công
  const [showToast, setShowToast] = useState(false);

  // Function to validate email format
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return regex.test(email);
  };

  const handleSubmit = async () => {
    if (!email) {
      setError("Không bỏ trống địa chỉ email");
      return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
      setError("Địa chỉ email không hợp lệ");
      return;
    }
    if (!email) {
      setError("Vui lòng nhập địa chỉ email hợp lệ");
      return;
    }

    setError(""); // Clear any previous error message

    try {
      const data = await forgotPassword({ email });

      if (data?.statusCode === 200) {
        setShowToast(true)
      } else if (data?.statusCode === 404) {
        setError("Không tìm thấy tài khoản với địa chỉ email này.");
      } else {
        setError("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } catch (err) {
      // Assuming the error message comes back as a response and may need translation
      if (err.response?.status === 404) {
        setError("Không tìm thấy tài khoản với địa chỉ email này.");
      } else {
        setError(err.message || "Không thể gửi email đặt lại mật khẩu.");
      }
    }
  };

  // Function to clear error when typing
  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError(""); // Clear error when user starts typing
    }
  };
  const handleChange = (e) => {
    if (error) {
      setError(""); // Clear error when user starts typing
    }
  };

  return (
    <div className="loginForm">
      <div className="container">
        <div className="loginForm__inner">
          <section className="wrapper">
            <div className="heading">
              <img src="/icons/logo.svg" alt="Logo" className="heading__img" />
              <h2 className="heading__text">Quên mật khẩu</h2>
              <div className="block_email">
                <input
                  type="text"
                  className={`input ${error ? "has_error" : ""}`}
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={handleInputChange}
                  onFocus={handleChange}
                />
                <div className={`block_icon ${error ? "has_error" : ""}`}>
                  <MdOutlineMail />
                </div>
                <div className={`error ${error ? "has_error" : ""}`}>
                  {" "}
                  {error}
                </div>
              </div>
              <div className="row_btn">
                <button className="btn btn_cancel" onClick={() => setEmail("")}>
                  Huỷ
                </button>
                <button className="btn btn_submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
            <SuccessToast
              message="Đã gửi link cập nhật lại mật khẩu đến email của bạn!"
              show={showToast}
              onClose={() => setShowToast(false)}
              duration={3000}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
