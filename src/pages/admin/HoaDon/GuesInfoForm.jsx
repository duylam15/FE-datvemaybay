import React from "react";

const GuestInfoForm = ({ guestInfo, onGuestInfoChange, fieldErrors, index }) => {
  return (
    <div className="guest-info">
      <label style={{ fontSize: "1.1em", fontWeight: "bold", width: "100%" }}>
        Thông tin hành khách
      </label>

      <div className="mb-3 col-4">
        <label className="form-label">Họ tên</label>
        <input
          type="text"
          className="form-control"
          value={guestInfo.hoTen}
          onChange={(e) => onGuestInfoChange("hoTen", e.target.value)}
        />
        {fieldErrors[`hoTen-${index}`] && (
          <div className="text-danger">{fieldErrors[`hoTen-${index}`]}</div>
        )}
      </div>

      <div className="mb-3 col-4">
        <label className="form-label">Email</label>
        <input
          type="text"
          className="form-control"
          value={guestInfo.email}
          onChange={(e) => onGuestInfoChange("email", e.target.value)}
        />
        {fieldErrors[`email-${index}`] && (
          <div className="text-danger">{fieldErrors[`email-${index}`]}</div>
        )}
      </div>

      <div className="mb-3 col-4">
        <label>CMND/CCCD:</label>
        <input
          type="text"
          className="form-control"
          value={guestInfo.cccd}
          onChange={(e) => onGuestInfoChange("cccd", e.target.value)}
        />
        {fieldErrors[`cccd-${index}`] && (
          <div className="text-danger">{fieldErrors[`cccd-${index}`]}</div>
        )}
      </div>

      <div className="mb-3 col-4">
        <label>Hộ chiếu</label>
        <input
          type="text"
          className="form-control"
          value={guestInfo.hoChieu}
          onChange={(e) => onGuestInfoChange("hoChieu", e.target.value)}
        />
        {fieldErrors[`hoChieu-${index}`] && (
          <div className="text-danger">{fieldErrors[`hoChieu-${index}`]}</div>
        )}
      </div>

      <div className="mb-3 col-4">
        <label>Số điện thoại:</label>
        <input
          type="text"
          className="form-control"
          value={guestInfo.soDienThoai}
          onChange={(e) => onGuestInfoChange("soDienThoai", e.target.value)}
        />
        {fieldErrors[`soDienThoai-${index}`] && (
          <div className="text-danger">{fieldErrors[`soDienThoai-${index}`]}</div>
        )}
      </div>

      <div className="mb-3 col-4">
        <label>Giới tính:</label>
        <div className="gioi-tinh">
          <input
            type="radio"
            id={`nam-${index}`}
            name={`gioiTinh-${index}`}
            value="NAM"
            checked={guestInfo.gioiTinhEnum === "NAM"}
            onChange={(e) => onGuestInfoChange("gioiTinhEnum", e.target.value)}
          />
          <label htmlFor={`nam-${index}`}>Nam</label>

          <input
            type="radio"
            id={`nu-${index}`}
            name={`gioiTinh-${index}`}
            value="NU"
            checked={guestInfo.gioiTinhEnum === "NU"}
            onChange={(e) => onGuestInfoChange("gioiTinhEnum", e.target.value)}
          />
          <label htmlFor={`nu-${index}`}>Nữ</label>
        </div>
        {fieldErrors[`gioiTinhEnum-${index}`] && (
          <div className="text-danger">{fieldErrors[`gioiTinhEnum-${index}`]}</div>
        )}
      </div>

      <div className="mb-3 col-4">
        <label>Ngày sinh:</label>
        <input
          type="date"
          className="form-control"
          value={guestInfo.ngaySinh}
          onChange={(e) => onGuestInfoChange("ngaySinh", e.target.value)}
        />
        {fieldErrors[`ngaySinh-${index}`] && (
          <div className="text-danger">{fieldErrors[`ngaySinh-${index}`]}</div>
        )}
      </div>
    </div>
  );
};

export default GuestInfoForm;
