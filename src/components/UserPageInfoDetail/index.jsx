import React from "react";
import "./UserPageInfoDetail.scss";
import EmailIcon from "./icon/EmailIcon";
import SearchIcon from "./icon/SearchIcon";

const UserPageInfoDetail = () => {
  return (
    <div className="user-info-detail">
      <span className="user-info-detail__title">Thông tin cá nhân</span>
      <p className="user-info-detail__row">
        <span className="user-info-detail__label">Tên</span>
        <span className="user-info-detail__value">NGUYEN HUU LOC</span>
      </p>
      <p className="user-info-detail__row">
        <span className="user-info-detail__label">Ngày sinh</span>
        <span className="user-info-detail__value">23/09/2004</span>
      </p>
      <p className="user-info-detail__row row_bottom">
        <span className="user-info-detail__label">Giới tính</span>
        <span className="user-info-detail__value">Male</span>
      </p>
      <span className="user-info-detail__title pt-5">Thông tin liên hệ</span>
      <div class="user-info-detail__contact-info">
        <div class="contact-info__item">
          <label for="email">Email</label>
          <input
            type="email"
            class="contact-info__input email"
            value="lockbkbang@gmail.com"
            readonly
          />
          <div className="contact-info__item--icon">
            <EmailIcon></EmailIcon>
          </div>
        </div>

        <div class="contact-info__item">
          <label for="phone">Số điện thoại</label>
          <input
            type="tel"
            class="contact-info__input"
            value="0397845443"
            readonly
          />
        </div>
      </div>
      <span className="user-info-detail__title pt-10">Địa chỉ hòm thư</span>
      <div class="user-info-detail__contact-info wrap-flex">
        {/* <div class="contact-info__item">
          <label for="textQuocGia">Quốc gia</label>
          <input
            id="textQuocGia"
            type="text"
            class="contact-info__input"
            placeholder="Quốc gia của bạn"
          />
          <div className="contact-info__item--icon">
            <SearchIcon></SearchIcon>
          </div>
        </div> */}

        <div class="contact-info__item">
          <label for="texttinh">Thành phố/ tỉnh</label>
          <input
            type="text"
            id="textting"
            class="contact-info__input"
            placeholder="Thành phố/ tỉnh"
          />
        </div>

        <div class="contact-info__item">
          <label for="textdiachi">Địa chỉ</label>
          <input
            type="text"
            id="textdiachi"
            class="contact-info__input"
            placeholder="Căn hộ, Số nhà, Tên đường"
          />
        </div>

        <div class="contact-info__item">
          <label for="textmbd">Mã bưu điện</label>
          <input
            type="text"
            id="textmbd"
            class="contact-info__input"
            placeholder="Mã bưu điện"
          />
        </div>
      </div>
      <span className="user-info-detail__title pt-10">Khác</span>
      <div class="user-info-detail__contact-info wrap-flex">
        <div class="contact-info__item">
          <label for="texthc">Hộ chiếu</label>
          <input
            type="text"
            id="texthc"
            class="contact-info__input"
            placeholder="Hộ chiếu"
          />
        </div>

        <div class="contact-info__item">
          <label for="textcccd">CCCD</label>
          <input
            type="textcccd"
            id="textcccd"
            class="contact-info__input"
            placeholder="CCCD"
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
