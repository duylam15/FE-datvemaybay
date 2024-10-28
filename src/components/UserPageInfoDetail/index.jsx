import React from "react";
import "./UserPageInfoDetail.scss";
import EmailIcon from "./icon/EmailIcon";
import SearchIcon from "./icon/SearchIcon";

const UserPageInfoDetail = ({ profile, loading, error }) => {
  const accountData = profile?.data; // Lấy data từ profile
  console.log(profile)
  if (accountData) {
    console.log("Account Data:", accountData); // Kiểm tra dữ liệu tài khoản
    // Sử dụng thông tin từ accountData
  } else {
    console.log("No account data available");
  }
  return (
    <div className="user-info-detail">
      <span className="user-info-detail__note">Để thay đổi các thông tin không cho phép người dùng tự thay đổi, vui lòng liên hệ tổng đài 19001133 để nhận được hỗ trợ.</span>
      <span className="user-info-detail__title">Thông tin cá nhân</span>
      <p className="user-info-detail__row">
        <span className="user-info-detail__label">Tên</span>
        <span className="user-info-detail__value">{accountData?.khachHang?.hoTen || ""}</span>
      </p>
      <p className="user-info-detail__row">
        <span className="user-info-detail__label">Ngày sinh</span>
        <span className="user-info-detail__value">
          {accountData?.khachHang?.ngaySinh ? accountData.khachHang.ngaySinh.split('T')[0] : ''}
        </span>
      </p>
      <p className="user-info-detail__row row_bottom">
        <span className="user-info-detail__label">Giới tính</span>
        <span className="user-info-detail__value">{accountData?.khachHang?.gioiTinh == "NAM" ? "MALE" : "FEMALE"}</span>
      </p>
      <span className="user-info-detail__title pt-5">Thông tin liên hệ</span>
      <div className="user-info-detail__contact-info">
        <div className="contact-info__item contact-info__baned">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="contact-info__input email cursor_not_allowed"
            value={accountData?.khachHang?.email || ""}
            readOnly
          />
          <div className="contact-info__item--icon">
            <EmailIcon></EmailIcon>
          </div>
        </div>

        <div className="contact-info__item contact-info__baned">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="tel"
            className="contact-info__input cursor_not_allowed"
            value={accountData?.khachHang?.soDienThoai || ""}
            readOnly
          />
        </div>
      </div>
      <span className="user-info-detail__title pt-10">Địa chỉ hòm thư</span>
      <div className="user-info-detail__contact-info wrap-flex">
        <div className="contact-info__item">
          <label htmlFor="texttinh">Thành phố/ tỉnh</label>
          <input
            type="text"
            id="textting"
            className="contact-info__input"
            placeholder="Thành phố/ tỉnh"
          />
        </div>

        <div className="contact-info__item">
          <label htmlFor="textdiachi">Địa chỉ</label>
          <input
            type="text"
            id="textdiachi"
            className="contact-info__input"
            placeholder="Căn hộ, Số nhà, Tên đường"
          />
        </div>

        <div className="contact-info__item">
          <label htmlFor="textmbd">Mã bưu điện</label>
          <input
            type="text"
            id="textmbd"
            className="contact-info__input"
            placeholder="Mã bưu điện"
          />
        </div>
      </div>
      <span className="user-info-detail__title pt-10">Khác</span>
      <div className="user-info-detail__contact-info wrap-flex">
        <div className="contact-info__item contact-info__baned">
          <label htmlFor="texthc">Hộ chiếu</label>
          <input
            type="text"
            id="texthc"
            className="contact-info__input cursor_not_allowed"
            placeholder="Hộ chiếu"
            readOnly
          />
        </div>

        <div className="contact-info__item contact-info__baned">
          <label htmlFor="textcccd">CCCD</label>
          <input
            type="textcccd"
            id="textcccd"
            className="contact-info__input cursor_not_allowed"
            placeholder="CCCD"
            value={accountData?.khachHang?.cccd || ""}
            readOnly
          />
        </div>
      </div>
      <div className="user-info-detail__action-row">
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

export default UserPageInfoDetail;
