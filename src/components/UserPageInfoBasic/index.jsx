import React from "react";
import "./UserPageInfoBasic.scss";
import LinkIcon from "./icon/LinkIcon";

const UserPageInfoBasic = ({ profile, loading, error }) => {
  console.log("profile: ", profile);
  const accountData = profile?.data; // Lấy data từ profile

  if (accountData) {
    console.log("Account Data:", accountData); // Kiểm tra dữ liệu tài khoản
    // Sử dụng thông tin từ accountData
  } else {
    console.log("No account data available");
  }
  return (
    <div>
      <div className="user-info">
        <div className="user-info__avatar">
          <span className="user-info__avatar-initials">NL</span>
        </div>
        <div className="user-info__details">
          <span className="user-info__gender">{accountData?.khachHang?.gioiTinh == "NAM" ? "MR" : "MRS"}</span>
          <p className="user-info__name">{accountData?.khachHang?.hoTen}</p>
          <p className="user-info__row">
            <span className="user-info__label">Số hội viên:</span>
            <span className="user-info__value">123456</span>
          </p>
          <p className="user-info__row">
            <span className="user-info__label">Hạng thẻ hiện tại:</span>
            <span className="user-info__value">REGISTER</span>
          </p>
          <p className="user-info__row">
            <span className="user-info__label">Ngày hết hạn hạng thẻ:</span>
            <span className="user-info__value">N/A</span>
          </p>
        </div>
        <div className="user-info__details">
          <p className="user-info__row">
            <span className="user-info__label">Điểm thưởng:</span>
            <span className="user-info__value">500</span>
          </p>
          <p className="user-info__row">
            <span className="user-info__label">Điểm xét hạng: </span>
            <span className="user-info__value">0</span>
          </p>
        </div>
        <div className="user-info__action">
          <div className="user-info__button">
            <span className="user-info__content">Hoạt động</span>
            <div className="user-info__iconlink">
              <LinkIcon></LinkIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPageInfoBasic;
