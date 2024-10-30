import React from 'react';
import './FlightPopup.scss';
import { MdCancel } from 'react-icons/md';

const FlightPopup = ({
  departure,
  arrival,
  begin,
  duration,
  timeDepart,
  timeArrival,
  airportDepart,
  airportArrival,
  departIata,
  arrivalIata,
  gate,
  flightNumber,
  aircraftType,
  closePopup,
}) => {
  return (
    <div className='container-popup'>
      <div className='flight-popup'>
        <div className='header'>
          <span>
            {departure} - {arrival}
          </span>
          <span style={{ cursor: 'pointer' }} onClick={closePopup}>
            <MdCancel />
          </span>
        </div>
        <div className='content'>
          <div className='header-content' onClick={closePopup}>
            <p>Khởi hành vào {begin}</p>
            <p className='time-info'>Tổng thời gian: {duration}</p>
          </div>

          <div className='info-flight'>
            <div className='info-left'>
              <p>{duration}</p>
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
                <p className='time'>
                  {timeDepart} {departure}
                </p>
                <p className='airport'>
                  Sân bay Quốc tế {airportDepart} ({departIata})
                </p>
                <p className='gate'>Nhà ga {gate}</p>
              </div>

              <div className='location'>
                <p className='time'>
                  {timeArrival} {arrival}
                </p>
                <p className='airport'>
                  Sân bay Quốc tế {airportArrival} ({arrivalIata})
                </p>
                <p className='gate'>Nhà ga {gate}</p>
              </div>
            </div>
          </div>
          <div className='info-footer'>
            <p>
              Số hiệu chuyến bay <span>{flightNumber}</span>
            </p>
            <p>Do Bamboo Airways khai thác</p>
            <p>{aircraftType}</p>
          </div>
        </div>
        <div className='button'>
          <button className='close-btn' onClick={closePopup}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightPopup;
