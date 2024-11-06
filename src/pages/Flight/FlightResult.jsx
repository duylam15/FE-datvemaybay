import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FlightResults.scss';
import axios from 'axios';
import watch from '../../assets/images/watch.png';
import plane from '../../assets/images/flight.png';
import logo from '../../assets/images/LogoBamboo.png';
import tag from '../../assets/images/tag.png';
import chevron from '../../assets/images/chevron.png';
import FlightPopup from './FlightPopup';
import Carousel from '../../components/Carousel';

const FlightResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState({}); // Đổi state thành đối tượng
  const [classTickets, setClassTickets] = useState([]);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const flights = location.state?.flights?.data?.chuyenbaydi?.data || [];
  const departureLocation = location.state?.departureLocation;
  const arrivalLocation = location.state?.arrivalLocation;
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  const numberOfTicketsToDetail = location.state.numberOfTickets || {};
  console.log('numberOfTicketsnumberOfTickets', location.state.numberOfTickets);

  const handleViewDetails = (flightId) => {
    setSelectedFlightId(flightId);
  };

  const handleClosePopup = () => {
    setSelectedFlightId(null);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [airportResponse, classTicketResponse] = await Promise.all([
          axios.get('http://localhost:8080/admin/sanbay/getAllAirport'),
          axios.get('http://localhost:8080/admin/hangve/getAllHangVe'),
        ]);

        // Cập nhật state với dữ liệu sân bay và loại vé
        setAirports(airportResponse.data.data);
        setClassTickets(classTicketResponse.data.data);

        // Lấy vé cho tất cả các chuyến bay
        const ticketsPromises = flights.map((flight) =>
          axios.get(`http://localhost:8080/ve/chuyenbay/${flight.idChuyenBay}`)
        );

        const ticketResponses = await Promise.all(ticketsPromises);

        // Gộp vé theo từng chuyến bay
        const allTickets = ticketResponses.reduce((acc, response, index) => {
          const flightId = flights[index].idChuyenBay; // Lấy id chuyến bay tương ứng
          acc[flightId] = response.data.data.content; // Lưu vé vào mảng theo id chuyến bay
          return acc;
        }, {});

        setTickets(allTickets); // Cập nhật state tickets
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [flights]);

  const handleSelectFlight = (index, ticketType) => {
    // console.error('vị trí btn', index);
    // console.error('loại btn', ticketType);
    if (selectedTicketType === ticketType) {
      setSelectedTicketType(null);
    } else {
      setSelectedTicketType(ticketType); // Cập nhật loại vé
    }
  };

  const handleRadioChange = (classTicketId, flightId) => {
    setSelectedTicket({ classTicketId, flightId });
  };

  const uniqueRadioName = (flightId, ticketType) =>
    `ticket-${flightId}-${ticketType}`;

  function getTimeFromDateTime(dateTime) {
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }
  function formatTime(minutes) {
    // Tính số giờ và số phút
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    // Chuyển đổi định dạng
    return `${hours}h ${mins}min`;
  }

  function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN');
  }

  const getAirportName = (id) => {
    const airport = airports.find((a) => a.idSanBay === id);
    return airport ? airport.tenSanBay : 'Không tìm thấy';
  };

  const getAirportAddress = (id) => {
    const airport = airports.find((a) => a.idSanBay === id);
    return airport ? airport.diaChi : 'Không tìm thấy';
  };

  const getAirportIATA = (id) => {
    const airport = airports.find((a) => a.idSanBay === id);
    return airport ? airport.iataSanBay : 'Không tìm thấy';
  };

  const handleContinue = () => {
    if (selectedTicket) {
      console.log('selectedTicket from flight result', selectedTicket);

      navigate('/flightDetails', {
        state: {
          selectedTicket,
          numberOfTicketsToDetail,
        },
      });
    } else {
      alert('Vui lòng chọn chuyến bay và loại vé trước khi tiếp tục.');
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Hiển thị thông báo khi đang tải dữ liệu
  }

  // Get total number of empty tickets for a specific class and flight
  const totalEmptyTickets = (classId, flightId) => {
    const flightTickets = tickets[flightId] || []; // Get tickets for the flight

    // Filter tickets that are empty and match the specified class
    const emptyTickets = flightTickets.filter(
      (ticket) =>
        ticket.trangThai === 'EMPTY' && ticket.hangVe.idHangVe === classId
    );

    return emptyTickets.length; // Return the count of empty tickets
  };

  // Get the lowest price for a specific class and flight
  const leastPrice = (classId, flightId) => {
    const flightTickets = tickets[flightId] || []; // Get tickets for the flight

    // Extract prices for tickets that match the specified class
    const prices = flightTickets
      .filter((ticket) => ticket.hangVe.idHangVe === classId && ticket.giaVe)
      .map((ticket) => ticket.giaVe);

    // Return the lowest price or null if there are no matching prices
    return prices.length > 0 ? Math.min(...prices) : 'Không có giá phù hợp';
  };

  function formatDate(dateString) {
    // Chuyển đổi chuỗi ngày thành đối tượng Date
    const date = new Date(dateString);

    // Các ngày trong tuần
    const daysOfWeek = [
      'Chủ Nhật',
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];

    // Lấy ngày, tháng và năm
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng tính từ 0, nên +1
    const year = date.getFullYear();

    // Trả về chuỗi định dạng
    return `${dayOfWeek}, ${day} tháng ${month}, ${year}`;
  }

  const MyComponent = ({ content }) => {
    return <div>{content ? <div>{content}</div> : null}</div>;
  };

  // console.error(flights);
  // console.error(tickets);
  // console.error(classTickets);
  // console.error(selectedTicket);
  // console.error(airports);
  console.error(departureLocation);

  // Sử dụng hàm
  console.log({ tickets });
  // Kết quả: Thứ Tư, 09 tháng 10, 2024
  return (
    <div className='container'>
      <div className='ticket-section flex-collum'>
        <div className='section-visible'>
          <div className='container-carousel'>
            <Carousel
              departureLocation={departureLocation}
              arrivalLocation={arrivalLocation}
              message={
                flights.length === 0
                  ? 'Không tìm thấy chuyến bay'
                  : 'Vui lòng chọn chuyến bay'
              }
            />
          </div>
          {flights.map((flight) => (
            <div key={flight.idChuyenBay}>
              <div className='card-ticket'>
                <div className='seat-empty'>
                  {classTickets.map((classTicket, index) => (
                    <div key={index}>
                      {totalEmptyTickets(
                        classTicket.idHangVe,
                        flight.idChuyenBay
                      ) > 0 && (
                        <button
                          className={`remaining-seats ${
                            classTicket.idHangVe === 1
                              ? 'seat-green'
                              : classTicket.idHangVe === 2
                              ? 'seat-blue'
                              : classTicket.idHangVe === 3
                              ? 'seat-red'
                              : ''
                          }`}
                        >
                          Còn lại{' '}
                          {totalEmptyTickets(
                            classTicket.idHangVe,
                            flight.idChuyenBay
                          )}
                          chỗ
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className='flight-results'>
                  <div className='flight-info'>
                    <div className='card-flight-right'>
                      <div className='flight-detail'>
                        <div className='flex-row'>
                          <div className='flex-collum'>
                            <span className='time '>
                              {getTimeFromDateTime(flight.thoiGianBatDauDuTinh)}
                            </span>
                            <span className='airport'>
                              {getAirportName(flight.tuyenBay.idSanBayBatDau)}
                            </span>
                          </div>
                          <div className='flex-collum flex-center'>
                            <span className='status'>Bay thẳng</span>
                            <span>
                              ................................................
                            </span>
                          </div>
                          <div className='flex-collum textR'>
                            <span className='time '>
                              {getTimeFromDateTime(
                                flight.thoiGianKetThucDuTinh
                              )}
                            </span>
                            <span className='airport '>
                              {getAirportName(flight.tuyenBay.idSanBayKetThuc)}
                            </span>
                          </div>
                        </div>
                        <div className='flex-row justify-content-between'>
                          <div className='gate-info'>
                            Nhà ga {flight.cong.tenCong}
                          </div>
                          <div className='gate-info'>
                            Nhà ga {flight.cong.tenCong}
                          </div>
                        </div>
                      </div>
                      <div className='flight-duration'>
                        <div className='flex-row'>
                          <img src={watch} width={12} height={12} alt='watch' />
                          <p>
                            Thời gian bay:{' '}
                            {formatTime(flight.tuyenBay.thoiGianChuyenBay)}
                          </p>
                        </div>
                        <div className='flex-row'>
                          <img src={plane} width={12} height={12} alt='plane' />
                          <p>
                            {flight.mayBay.soHieu} được Bamboo Airways khai
                            thác.
                          </p>
                          <img src={logo} width={12} height={12} alt='logo' />
                        </div>

                        <button
                          className='details-link'
                          onClick={() => handleViewDetails(flight.idChuyenBay)}
                        >
                          Xem chi tiết hành trình
                        </button>

                        {/* Hiển thị FlightPopup nếu có selectedFlightId */}
                        {selectedFlightId === flight.idChuyenBay && (
                          <>
                            <div
                              className='overlay'
                              onClick={handleClosePopup}
                            />{' '}
                            {/* Overlay để chặn tương tác */}
                            <FlightPopup
                              departure={getAirportAddress(
                                flight.tuyenBay.idSanBayBatDau
                              )}
                              arrival={getAirportAddress(
                                flight.tuyenBay.idSanBayKetThuc
                              )}
                              begin={formatDate(flight.thoiGianBatDauDuTinh)}
                              duration={formatTime(
                                flight.tuyenBay.thoiGianChuyenBay
                              )}
                              timeDepart={getTimeFromDateTime(
                                flight.thoiGianBatDauDuTinh
                              )}
                              timeArrival={getAirportName(
                                flight.tuyenBay.idSanBayKetThuc
                              )}
                              airportDepart={getAirportName(
                                flight.tuyenBay.idSanBayBatDau
                              )}
                              airportArrival={getAirportName(
                                flight.tuyenBay.idSanBayKetThuc
                              )}
                              departIata={getAirportIATA(
                                flight.tuyenBay.idSanBayBatDau
                              )}
                              arrivalIata={getAirportIATA(
                                flight.tuyenBay.idSanBayKetThuc
                              )}
                              gate={flight.cong.tenCong}
                              flightNumber={flight.mayBay.soHieu}
                              aircraftType={flight.mayBay.tenMayBay}
                              closePopup={handleClosePopup}
                              className='flight-popup' // Thêm class cho popup
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='card-flight-left '>
                    {classTickets.map((classTicket, index) => (
                      <div key={index}>
                        {totalEmptyTickets(
                          classTicket.idHangVe,
                          flight.idChuyenBay
                        ) > 0 && (
                          <button
                            className={`flex-collum ${
                              classTicket.idHangVe === 1
                                ? 'btn-green'
                                : classTicket.idHangVe === 2
                                ? 'btn-blue'
                                : classTicket.idHangVe === 3
                                ? 'btn-red'
                                : ''
                            }`}
                            onClick={() =>
                              handleSelectFlight(index, classTicket.tenHangVe)
                            }
                          >
                            <span>
                              <div className='title'>
                                {classTicket.tenHangVe}
                              </div>
                              <img src={tag} className='imgtop' alt='tag' />
                              <div className='flight-price-section flex-collum'>
                                <span>từ</span>
                                <p className='money26'>
                                  {formatCurrency(
                                    leastPrice(
                                      classTicket.idHangVe,
                                      flight.idChuyenBay
                                    )
                                  )}
                                </p>
                                <span> VND</span>
                                <img
                                  src={chevron}
                                  className='imgbottom'
                                  alt='chevron'
                                />
                              </div>
                            </span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Conditionally render ticket selection */}

                  {selectedTicketType === 'Economy' && (
                    <div className='ticket-selection ticket-green'>
                      <h2>Chọn hạng vé Economy</h2>
                      <p>Tiện ích với mỗi hành khách.</p>
                      <div className='ticket-options'>
                        {classTickets
                          .filter(
                            (classTicket) => classTicket.tenHangVe === 'Economy'
                          )
                          .map((classTicket, ticketIndex) => (
                            <div key={ticketIndex}>
                              <div
                                className={`ticket economy-smart ${
                                  selectedTicket?.classTicketId ===
                                    classTicket.idHangVe &&
                                  selectedTicket?.flightId?.idChuyenBay ===
                                    flight.idChuyenBay
                                    ? 'selected'
                                    : ''
                                }`}
                              >
                                <div className='top-ticket'>
                                  <input
                                    type='radio'
                                    name={uniqueRadioName(
                                      flight.idChuyenBay,
                                      classTicket.tenHangVe
                                    )}
                                    checked={
                                      selectedTicket?.classTicketId ===
                                        classTicket.idHangVe &&
                                      selectedTicket?.flightId?.idChuyenBay ===
                                        flight.idChuyenBay
                                    }
                                    onChange={() =>
                                      handleRadioChange(
                                        classTicket.idHangVe,
                                        flight
                                      )
                                    }
                                  />
                                  <h3>
                                    <span>
                                      {formatCurrency(
                                        leastPrice(
                                          classTicket.idHangVe,
                                          flight.idChuyenBay
                                        )
                                      )}
                                      <span> VND</span>
                                    </span>
                                  </h3>
                                  <p>{classTicket.tenHangVe}</p>{' '}
                                  {/* Changed this to Economy */}
                                </div>
                                <div className='bottom-ticket'>
                                  <ul>
                                    <li>Hành lý xách tay:</li>
                                    <li>Hành lý ký gửi:</li>
                                    <li>
                                      Hoàn/huỷ trước giờ khởi hành: 300.000 VND
                                    </li>
                                    <li>
                                      Hoàn/huỷ sau giờ khởi hành: 300.000 VND
                                    </li>
                                    <li>Thay đổi miễn phí</li>
                                    <li>Hệ số cộng điểm Bamboo Club: 1.0</li>
                                    <li>Chọn ghế miễn phí</li>
                                    <li>Đổi chuyến tại sân bay miễn phí</li>
                                  </ul>
                                  <p className='details-link'>
                                    (*) Xem chi tiết
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className='action-buttons'>
                        <button className='next-step' onClick={handleContinue}>
                          Xác nhận và tiếp tục.
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedTicketType === 'Business' && (
                    <div className='ticket-selection ticket-blue'>
                      <h2>Chọn hạng vé Business</h2>
                      <p>Tiện ích với mỗi hành khách.</p>
                      <div className='ticket-options'>
                        {classTickets
                          .filter(
                            (classTicket) =>
                              classTicket.tenHangVe === 'Business'
                          )
                          .map((classTicket, ticketIndex) => (
                            <div key={ticketIndex}>
                              <div
                                className={`ticket economy-smart ${
                                  selectedTicket?.classTicketId ===
                                    classTicket.idHangVe &&
                                  selectedTicket?.flightId?.idChuyenBay ===
                                    flight.idChuyenBay
                                    ? 'selected'
                                    : ''
                                }`}
                              >
                                <div className='top-ticket'>
                                  <input
                                    type='radio'
                                    name={uniqueRadioName(
                                      flight.idChuyenBay,
                                      classTicket.tenHangVe
                                    )}
                                    checked={
                                      selectedTicket?.classTicketId ===
                                        classTicket.idHangVe &&
                                      selectedTicket?.flightId?.idChuyenBay ===
                                        flight.idChuyenBay
                                    }
                                    onChange={() =>
                                      handleRadioChange(
                                        classTicket.idHangVe,
                                        flight
                                      )
                                    }
                                  />
                                  <h3>
                                    <span>
                                      {formatCurrency(
                                        leastPrice(
                                          classTicket.idHangVe,
                                          flight.idChuyenBay
                                        )
                                      )}
                                      <span> VND</span>
                                    </span>
                                  </h3>
                                  <p>{classTicket.tenHangVe}</p>
                                </div>
                                <div className='bottom-ticket'>
                                  <ul>
                                    <li>Hành lý xách tay:</li>
                                    <li>Hành lý ký gửi:</li>
                                    <li>
                                      Hoàn/huỷ trước giờ khởi hành: 300.000 VND
                                    </li>
                                    <li>
                                      Hoàn/huỷ sau giờ khởi hành: 300.000 VND
                                    </li>
                                    <li>Thay đổi miễn phí</li>
                                    <li>Hệ số cộng điểm Bamboo Club: 1.0</li>
                                    <li>Chọn ghế miễn phí</li>
                                    <li>Đổi chuyến tại sân bay miễn phí</li>
                                  </ul>
                                  <p className='details-link'>
                                    (*) Xem chi tiết
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className='action-buttons'>
                        <button className='next-step' onClick={handleContinue}>
                          Xác nhận và tiếp tục.
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Conditionally render ticket selection */}
                  {selectedTicketType === 'First' && (
                    <div className='ticket-selection ticket-red'>
                      <h2>Chọn hạng vé First</h2>
                      <p>Tiện ích với mỗi hành khách.</p>
                      <div className='ticket-options'>
                        {classTickets
                          .filter(
                            (classTicket) => classTicket.tenHangVe === 'First'
                          )
                          .map((classTicket, ticketIndex) => (
                            <div key={ticketIndex}>
                              <div
                                className={`ticket economy-smart ${
                                  selectedTicket?.classTicketId ===
                                    classTicket.idHangVe &&
                                  selectedTicket?.flightId?.idChuyenBay ===
                                    flight.idChuyenBay
                                    ? 'selected'
                                    : ''
                                }`}
                              >
                                <div className='top-ticket'>
                                  <input
                                    type='radio'
                                    name={uniqueRadioName(
                                      flight.idChuyenBay,
                                      classTicket.tenHangVe
                                    )}
                                    checked={
                                      selectedTicket?.classTicketId ===
                                        classTicket.idHangVe &&
                                      selectedTicket?.flightId?.idChuyenBay ===
                                        flight.idChuyenBay
                                    }
                                    onChange={() =>
                                      handleRadioChange(
                                        classTicket.idHangVe,
                                        flight
                                      )
                                    }
                                  />
                                  <h3>
                                    <span>
                                      {formatCurrency(
                                        leastPrice(
                                          classTicket.idHangVe,
                                          flight.idChuyenBay
                                        )
                                      )}
                                      <span> VND</span>
                                    </span>
                                  </h3>
                                  <p>{classTicket.tenHangVe}</p>
                                </div>
                                <div className='bottom-ticket'>
                                  <ul>
                                    <li>Hành lý xách tay:</li>
                                    <li>Hành lý ký gửi:</li>
                                    <li>
                                      Hoàn/huỷ trước giờ khởi hành: 300.000 VND
                                    </li>
                                    <li>
                                      Hoàn/huỷ sau giờ khởi hành: 300.000 VND
                                    </li>
                                    <li>Thay đổi miễn phí</li>
                                    <li>Hệ số cộng điểm Bamboo Club: 1.0</li>
                                    <li>Chọn ghế miễn phí</li>
                                    <li>Đổi chuyến tại sân bay miễn phí</li>
                                  </ul>
                                  <p className='details-link'>
                                    (*) Xem chi tiết
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className='action-buttons'>
                        <button className='next-step' onClick={handleContinue}>
                          Xác nhận và tiếp tục.
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightResult;
