import React from "react";
import "./UserPageInfoDetail.scss";
import EmailIcon from "./icon/EmailIcon";
import SearchIcon from "./icon/SearchIcon";

const UserPageInfoDetail = ({ profile, loading, error }) => {
  console.log("12345")
  console.log(profile)
  const accountData = profile?.data; // Lấy data từ profile
  const isKhachHang = accountData?.khachHang;

  // Hàm tiện ích để lấy dữ liệu theo loại tài khoản
  const getAccountField = (field) =>
    isKhachHang ? accountData?.khachHang?.[field] : accountData?.nhanVien?.[field];

  // Xử lý trạng thái loading và error
  if (loading) return <div>Đang tải thông tin...</div>;
  if (error) return <div>Có lỗi xảy ra: {error.message}</div>;
  if (!accountData) return <div>Không có dữ liệu người dùng.</div>;

  return (
    <div className="user-info-detail">
      <span className="user-info-detail__note">
        Để thay đổi các thông tin không cho phép người dùng tự thay đổi, vui lòng liên hệ tổng đài 19001133 để nhận được hỗ trợ.
      </span>
      <span className="user-info-detail__title">Thông tin cá nhân</span>

      {/* Thông tin cá nhân */}
      <p className="user-info-detail__row">
        <span className="user-info-detail__label">Tên</span>
        <span className="user-info-detail__value">{getAccountField("hoTen") || "Chưa cập nhật"}</span>
      </p>
      <p className="user-info-detail__row">
        <span className="user-info-detail__label">Ngày sinh</span>
        <span className="user-info-detail__value">
          {getAccountField("ngaySinh")?.split("T")[0] || "Chưa cập nhật"}
        </span>
      </p>
      <p className="user-info-detail__row row_bottom">
        <span className="user-info-detail__label">Giới tính</span>
        <span className="user-info-detail__value">{getAccountField("gioiTinhEnum") || "Không xác định"}</span>
      </p>

      <span className="user-info-detail__title pt-5">Thông tin liên hệ</span>

      {/* Thông tin liên hệ */}
      <div className="user-info-detail__contact-info">
        <div className="contact-info__item contact-info__baned">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="contact-info__input email cursor_not_allowed"
            value={getAccountField("email") || ""}
            readOnly
          />
          <div className="contact-info__item--icon">
            <EmailIcon />
          </div>
        </div>

        <div className="contact-info__item contact-info__baned">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="tel"
            className="contact-info__input cursor_not_allowed"
            value={getAccountField("soDienThoai") || ""}
            readOnly
          />
        </div>
      </div>

      <span className="user-info-detail__title pt-10">Địa chỉ hòm thư</span>

      {/* Địa chỉ */}
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

      {/* Các trường thông tin khác */}
      <div className="user-info-detail__contact-info wrap-flex">
        <div className="contact-info__item contact-info__baned">
          <label htmlFor="textcccd">CCCD</label>
          <input
            type="text"
            id="textcccd"
            className="contact-info__input cursor_not_allowed"
            placeholder="CCCD"
            value={getAccountField("cccd") || ""}
            readOnly
          />
        </div>
      </div>

      {/* Hành động */}
      {/* <div className="user-info-detail__action-row">
        <button className="user-info-detail__button user-info-detail__button--cancel">
          Loại bỏ thay đổi
        </button>
        <button className="user-info-detail__button user-info-detail__button--confirm">
          Lưu thay đổi
        </button>
      </div> */}
    </div>
  );
};

export default UserPageInfoDetail;