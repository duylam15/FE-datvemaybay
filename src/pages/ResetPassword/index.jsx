import React, { useState } from "react";
import SuccessToast from "../../components/SuccessToast";
import { resetPassword } from "../../services/taiKhoanService";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import "./resetPassword.css";
import FailToast from "../../components/FailToast";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [errorReNewPassword, setErrorReNewPassword] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [showFailToast, setShowFailToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleRePasswordVisibility = () => {
    setShowRePassword((prevShowRePassword) => !prevShowRePassword);
  };

 const handleSubmit = async () => {
    if (!newPassword) {
      setErrorNewPassword("Không bỏ trống ô mật khẩu");
      return;
    }

    if (newPassword.length < 6) {
      setErrorNewPassword("Mật khẩu phải từ 6 kí tự trở lên");
      return;
    }

    if (!reNewPassword) {
      setErrorReNewPassword("Không bỏ trống ô nhập lại mật khẩu");
      return;
    }

    if (newPassword !== reNewPassword) {
      setErrorReNewPassword("Mật khẩu nhập lại không hợp lệ");
      return;
    }

    setErrorNewPassword("");
    setErrorReNewPassword("");
    setLoading(true);

    try {
      const urlParams = new URLSearchParams(window.location.search);
    //   const refreshPasswordToken = "1234"; // Hoặc từ urlParams
	  const refreshPasswordToken = urlParams.get("token");

      const data = await resetPassword({
        refreshPasswordToken,
        newPassword,
        reNewPassword,
      });

      console.log("123243");
      console.log(data);

      if (data?.statusCode === 200) {
        setShowToast(true);
        // setShowFailToast(false);
      }
	  if(data?.statusCode == 400) {
		setShowFailToast(true);
        setShowToast(false);
		setErrorNewPassword("Link het han")
	  }
    } catch (err) {
      console.log("Lỗi:", err); // In ra toàn bộ lỗi

      if (err.response) {
        // Nếu phản hồi tồn tại, nghĩa là máy chủ đã phản hồi với một mã trạng thái
        console.log("Status:", err.response.status); // In ra mã trạng thái
        console.log("Data:", err.response.data); // In ra dữ liệu phản hồi từ máy chủ

        if (err.response.status === 400) {
          setShowFailToast(true);
          setShowToast(false);
		  setErrorNewPassword("Link het han")
        }
      } else {
        // Nếu không có phản hồi, xử lý lỗi khác (ví dụ: vấn đề mạng)
        console.log("Lỗi khác:", err.message);
      }
    } finally {
      setLoading(false);
    }
};;

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (errorNewPassword) setErrorNewPassword("");
  };

  const handleReNewPasswordChange = (e) => {
    setReNewPassword(e.target.value);
    if (errorReNewPassword) setErrorReNewPassword("");
  };

  return (
    <div className="loginForm">
      <div className="container">
        <div className="loginForm__inner">
          <section className="wrapper">
            <div className="heading">
              <img src="/icons/logo.svg" alt="Logo" className="heading__img" />
              <h2 className="heading__text">Đặt lại mật khẩu</h2>

              <div className="block_email">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`inputt ${errorNewPassword ? "has_error" : ""}`}
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                <div className={`error ${errorNewPassword ? "has_error" : ""}`}>
                  {errorNewPassword}
                </div>
                <div
                  className="block_iconn"
                  style={{ right: "11px", cursor: "pointer" }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </div>
              </div>

              <div className="block_email">
                <input
                  type={showRePassword ? "text" : "password"}
                  className={`inputt ${errorReNewPassword ? "has_error" : ""}`}
                  placeholder="Nhập lại mật khẩu mới"
                  value={reNewPassword}
                  onChange={handleReNewPasswordChange}
                />
                <div
                  className={`error ${errorReNewPassword ? "has_error" : ""}`}
                >
                  {errorReNewPassword}
                </div>
                <div
                  className="block_iconn"
                  style={{ right: "11px", cursor: "pointer" }}
                  onClick={toggleRePasswordVisibility}
                >
                  {showRePassword ? <IoMdEyeOff /> : <IoMdEye />}
                </div>
              </div>

              <div className="row_btn">
                <button
                  className="btn btn_cancel"
                  onClick={() => {
                    setNewPassword("");
                    setReNewPassword("");
                    setErrorNewPassword("");
                    setErrorReNewPassword("");
                  }}
                >
                  Huỷ
                </button>
                <button
                  className={`btn btn_submit ${loading ? "has_loading" : ""}`}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <div className="loading"></div> : "Submit"}
                </button>
              </div>
            </div>
            <SuccessToast
              message="Mật khẩu cập nhật thành công"
              show={showToast}
			  onClose={() => {
				setShowToast(false);
				setShowFailToast(false); // Reset the fail toast as well
			  }}
              duration={3000}
            />
            <FailToast
              message="Link reset mật khẩu đã hết hạn, vui lòng lấy link khác"
              show={showFailToast}
              onClose={() => setShowToast(false)}
              duration={3000}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
