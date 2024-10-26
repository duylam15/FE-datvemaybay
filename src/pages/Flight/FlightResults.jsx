import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FlightResults.scss';
import axios from 'axios';
import watch from '../../assets/images/watch.png';
import plane from '../../assets/images/flight.png';
import logo from '../../assets/images/LogoBamboo.png';
import tag from '../../assets/images/tag.png';
import chevron from '../../assets/images/chevron.png';

const FlightResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [airports, setAirports] = useState([]);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const flights = location.state?.flights?.data?.chuyenbaydi?.data;

  console.error(flights);

  useEffect(() => {
    const fetchData = async () => {
      if (flights && flights.length > 0) {
        try {
          // Gọi tất cả API đồng thời
          const [airportResponse, seatResponse, ticketResponse] =
            await Promise.all([
              axios.get('http://localhost:8080/getAllAirport'),
              axios.get('http://localhost:8080/admin/chongoi/getallchongoi'),
              axios.get(
                `http://localhost:8080/ve/chuyenbay/${flights[0]?.idChuyenBay}`
              ),
            ]);

          // Kiểm tra phản hồi và cập nhật state
          if (airportResponse.status === 200) {
            setAirports(airportResponse.data.data);
          }

          if (seatResponse.status === 200) {
            setSeats(seatResponse.data.data);
          }

          if (ticketResponse.status === 200) {
            const ticketsData = ticketResponse.data.data.content.flat();
            setTickets(ticketsData);
          }
        } catch (error) {
          console.error('Error loading data:', error);
        } finally {
          setLoading(false); // Đặt loading thành false sau khi hoàn thành
        }
      } else {
        setLoading(false); // Nếu không có chuyến bay, đặt loading thành false
      }
    };

    fetchData();
  }, [flights]);

  const handleSelectFlight = (index, ticketType) => {
    if (selectedFlightIndex === index) {
      setSelectedFlightIndex(null);
      setSelectedTicketType(null);
    } else {
      setSelectedFlightIndex(index);
      setSelectedTicketType(ticketType);
    }
  };

  const handleRadioChange = (ticketId) => {
    setSelectedTicket(ticketId); // Lưu ID của vé đã chọn
  };

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

  const handleContinue = () => {
    if (selectedTicket && selectedFlightIndex !== null) {
      const selectedFlight = flights[selectedFlightIndex];
      navigate('/checkout', {
        state: {
          selectedTicket,
          selectedFlight,
        },
      });
    } else {
      alert('Vui lòng chọn chuyến bay và loại vé trước khi tiếp tục.');
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Hiển thị thông báo khi đang tải dữ liệu
  }
  console.error(flights);
  console.error(tickets);
  console.error(seats);
  console.error(selectedTicket);

  const totalEmptyTickets = tickets.filter(
    (ticket) => ticket.trangThai === 'EMPTY'
  ).length;

  const leastPrice = Math.min(
    ...tickets.map((ticket) => ticket.giaVe).filter((giaVe) => giaVe)
  );

  return (
    <div className='container'>
      <div className='ticket-section flex-collum'>
        <div className='section-visible'>
          {flights.map((flight, index) => (
            <div key={index}>
              <div className='card-ticket'>
                <div className='flight-results'>
                  <button className='remaining-seats seat-green'>
                    Còn lại {totalEmptyTickets} chỗ
                  </button>
                  <button className='remaining-seats seat-blue'>
                    Còn lại {totalEmptyTickets} chỗ
                  </button>
                  <div className='flight-info'>
                    <div className='card-flight-right'>
                      <div className='flight-detail'>
                        <div className='flex-row'>
                          <div className='flex-collum'>
                            <span className='time'>
                              {getTimeFromDateTime(
                                flight.thoiGianKetThucDuTinh
                              )}
                            </span>
                            <span className='airport textL'>
                              {getAirportName(flight.tuyenBay.idSanBayBatDau)}
                            </span>
                          </div>
                          <div className='flex-collum flex-center'>
                            <span className='status'>Bay thẳng</span>
                            <span>
                              ......................................................
                            </span>
                          </div>
                          <div className='flex-collum'>
                            <span className='time'>
                              {getTimeFromDateTime(
                                flight.thoiGianKetThucDuTinh
                              )}
                            </span>
                            <span className='airport textR'>
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
                            {flight.mayBay.tenMayBay} được Bamboo Airways khai
                            thác.
                          </p>
                          <img src={logo} width={12} height={12} alt='logo' />
                        </div>
                        <a href='#' className='details-link'>
                          Xem chi tiết hành trình
                        </a>
                      </div>
                    </div>

                    <div className='card-flight-left flex-row'>
                      <button
                        className='flex-collum btn-green'
                        onClick={() =>
                          handleSelectFlight(index, 'ticket-green')
                        }
                      >
                        <span>
                          <div className='title'>Economy</div>
                          <img src={tag} className='imgtop' alt='tag' />
                          <div className='flight-price-section flex-collum'>
                            <span>từ</span>
                            <p>{formatCurrency(leastPrice)}</p>
                            <span> VND</span>
                            <img
                              src={chevron}
                              className='imgbottom'
                              alt='chevron'
                            />
                          </div>
                        </span>
                      </button>

                      <button
                        className='flex-collum btn-blue'
                        onClick={() => handleSelectFlight(index, 'ticket-blue')}
                      >
                        <span>
                          <div className='title'>Business</div>
                          <img src={tag} className='imgtop' alt='tag' />
                          <div className='flight-price-section flex-collum'>
                            <span>từ</span>
                            <p>{formatCurrency(leastPrice)}</p>
                            <span> VND</span>
                            <img
                              src={chevron}
                              className='imgbottom'
                              alt='chevron'
                            />
                          </div>
                        </span>
                      </button>
                    </div>
                  </div>
                  {/* Conditionally render ticket selection */}

                  {selectedFlightIndex === index &&
                    selectedTicketType === 'ticket-green' && (
                      <div className='ticket-selection ticket-green'>
                        <h2>Chọn hạng vé</h2>
                        <p>Tiện ích với mỗi hành khách.</p>
                        <div className='ticket-options'>
                          {tickets.map((ticket, index) => (
                            <div key={index}>
                              <div
                                className={`ticket economy-smart ${
                                  selectedTicket === 'economy-smart'
                                    ? 'selected'
                                    : ''
                                }`}
                              >
                                <div className='top-ticket'>
                                  <input
                                    type='radio'
                                    name={`ticket-${index}`}
                                    id={`radio-economy-smart-${index}`}
                                    checked={selectedTicket === 'economy-smart'}
                                    onChange={() =>
                                      handleRadioChange(ticket.idVe)
                                    }
                                  />
                                  <h3>
                                    <span>
                                      {formatCurrency(ticket.giaVe)}
                                      <span> VND</span>
                                    </span>
                                  </h3>
                                  <p>Economy Smart</p>
                                </div>
                                <div className='bottom-ticket'>
                                  <ul>
                                    <li>Hành lý xách tay: 7kg</li>
                                    <li>Hành lý ký gửi: </li>
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
                          <button
                            className='next-step'
                            onClick={handleContinue}
                          >
                            Xác nhận và tiếp tục.
                          </button>
                        </div>
                      </div>
                    )}

                  {/* Conditionally render ticket selection */}
                  {selectedFlightIndex === index &&
                    selectedTicketType === 'ticket-blue' && (
                      <div className='ticket-selection ticket-blue'>
                        <h2>Chọn hạng vé</h2>
                        <p>Tiện ích với mỗi hành khách.</p>
                        <div className='ticket-options'>
                          {tickets.map((ticket, ticketIndex) => (
                            <div key={ticketIndex}>
                              <div
                                className={`ticket economy-smart ${
                                  selectedTicket === 'economy-smart'
                                    ? 'selected'
                                    : ''
                                }`}
                              >
                                <div className='top-ticket'>
                                  <input
                                    type='radio'
                                    name={`ticket-${index}`}
                                    id={`radio-economy-smart-${index}`}
                                    checked={selectedTicket === 'economy-smart'}
                                    onChange={() =>
                                      handleRadioChange(ticket.idVe)
                                    }
                                  />
                                  <h3>
                                    <span>
                                      {formatCurrency(ticket.giaVe)}
                                      <span> VND</span>
                                    </span>
                                  </h3>
                                  <p>Business</p>
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
                          <button
                            className='next-step'
                            onClick={handleContinue}
                          >
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
