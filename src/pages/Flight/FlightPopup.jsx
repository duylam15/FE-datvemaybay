import React from 'react';
import './FlightPopup.scss';

const FlightPopup = () => {
  return (
    <div className='container-popup'>
      <div className='flight-popup'>
        <div className='header'>
          <span>Hà Nội - TP. Hồ Chí Minh</span>
          <span onClick={onClose} style={{ cursor: 'pointer' }}>
            ✖
          </span>
        </div>
        <div className='content'>
          <div className='header-content'>
            <p>Khởi hành vào Thứ Năm, 31 tháng 10, 2024</p>
            <p className='time-info'>Tổng thời gian: 2 h 10 phút</p>
          </div>

          <div className='info-flight'>
            <div className='info-left'>
              <p>2h 10min</p>
            </div>
            <div className='info-center'>
              <div className='timeline'>
                <span className='dot'></span>
                <span className='line'></span>
                <span className='dot'></span>
              </div>
            </div>
            <div className='info-right'>
              <div className='location'>
                <p className='time'>06:35 Hà Nội</p>
                <p className='airport'>Sân bay Quốc tế Nội Bài (HAN)</p>
                <p className='gate'>Nhà ga 1</p>
              </div>

              <div className='location'>
                <p className='time'>08:45 TP. Hồ Chí Minh</p>
                <p className='airport'>Sân bay Quốc tế Tân Sơn Nhất (SGN)</p>
                <p className='gate'>Nhà ga 1</p>
              </div>
            </div>
          </div>
          <p>
            Số hiệu chuyến bay <span>AVN 344</span>
          </p>
          <p>Do Bamboo Airways khai thác</p>
          <p>AIRBUS A321</p>
        </div>
        <div className='button'>
          <button className='close-btn' onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightPopup;
