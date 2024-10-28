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
  const [classTickets, setClassTickets] = useState([]);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const flights = location.state?.flights?.data?.chuyenbaydi?.data;

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Dùng Promise.all để gọi API đồng thời
        const [airportResponse, classTicketResponse, ticketResponse] =
          await Promise.all([
            axios.get('http://localhost:8080/admin/sanbay/getAllAirport'),
            axios.get('http://localhost:8080/admin/hangve/getAllHangVe'),
            axios.get(
              `http://localhost:8080/ve/chuyenbay/${flights[0]?.idChuyenBay}`
            ),
          ]);

        // Cập nhật state khi các API trả về kết quả thành công
        setAirports(airportResponse.data.data);
        setClassTickets(classTicketResponse.data.data);
        setTickets(ticketResponse.data.data.content);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [flights]);

  const handleSelectFlight = (index, ticketType) => {
    console.error('vị trí btn', index);
    console.error('loại btn', ticketType);
    if (selectedTicketType === ticketType) {
      setSelectedTicketType(null);
    } else {
      setSelectedTicketType(ticketType); // Cập nhật loại vé
    }
  };

  const handleRadioChange = (classTicketId) => {
    setSelectedTicket(classTicketId);
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
    if (selectedTicket) {
      navigate('/checkout', {
        state: {
          selectedTicket,
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
  console.error(classTickets);
  console.error(selectedTicket);
  console.error(airports);

  const totalEmptyTickets1 = tickets.filter(
    (ticket) => ticket.trangThai === 'EMPTY' && ticket.hangVe.idHangVe === 1
  ).length;
  const totalEmptyTickets2 = tickets.filter(
    (ticket) => ticket.trangThai === 'EMPTY' && ticket.hangVe.idHangVe === 2
  ).length;
  const totalEmptyTickets3 = tickets.filter(
    (ticket) => ticket.trangThai === 'EMPTY' && ticket.hangVe.idHangVe === 3
  ).length;

  const leastPrice = (hangVe) =>
    Math.min(
      ...tickets
        .filter((ticket) => ticket.hangVe.idHangVe === hangVe)
        .map((ticket) => ticket.giaVe)
        .filter((giaVe) => giaVe)
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
                    Còn lại {totalEmptyTickets1} chỗ
                  </button>
                  <button className='remaining-seats seat-blue'>
                    Còn lại {totalEmptyTickets2} chỗ
                  </button>
                  <button className='remaining-seats seat-grey'>
                    Còn lại {totalEmptyTickets3} chỗ
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

                    <div className='card-flight-left '>
                      {classTickets.map((classTicket, index) => (
                        <div key={index}>
                          <button
                            className='flex-collum '
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
                                <p>
                                  {formatCurrency(
                                    leastPrice(classTicket.idHangVe)
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
                        </div>
                      ))}

                      {/* <button
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
                      </button> */}
                    </div>
                  </div>
                  {/* Conditionally render ticket selection */}

                  {selectedTicketType === 'Economy' && (
                    <div className='ticket-selection ticket-green'>
                      <h2>Chọn hạng vé Economy</h2>
                      <p>Tiện ích với mỗi hành khách.</p>
                      <div className='ticket-options'>
                        {classTickets.map((classTicket, ticketIndex) => (
                          <div key={ticketIndex}>
                            <div
                              className={`ticket economy-smart ${
                                selectedTicket === classTicket.idHangVe
                                  ? 'selected'
                                  : ''
                              }`}
                            >
                              <div className='top-ticket'>
                                <input
                                  type='radio'
                                  name={`ticket-${index}`}
                                  id={`radio-economy-${ticketIndex}`} // Updated ID for clarity
                                  checked={
                                    selectedTicket === classTicket.idHangVe
                                  }
                                  onChange={() =>
                                    handleRadioChange(classTicket.idHangVe)
                                  }
                                />
                                <h3>
                                  <span>
                                    {/* {formatCurrency(ticket.giaVe)} */}
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
                                <p className='details-link'>(*) Xem chi tiết</p>
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
                        {classTickets.map((classTicket, ticketIndex) => (
                          <div key={ticketIndex}>
                            <div
                              className={`ticket economy-smart ${
                                selectedTicket === classTicket.idHangVe
                                  ? 'selected'
                                  : ''
                              }`}
                            >
                              <div className='top-ticket'>
                                <input
                                  type='radio'
                                  name={`ticket-${index}`}
                                  id={`radio-economy-${ticketIndex}`} // Updated ID for clarity
                                  checked={
                                    selectedTicket === classTicket.idHangVe
                                  }
                                  onChange={() =>
                                    handleRadioChange(classTicket.idHangVe)
                                  }
                                />
                                <h3>
                                  <span>
                                    {/* {formatCurrency(ticket.giaVe)} */}
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
                                <p className='details-link'>(*) Xem chi tiết</p>
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
                    <div className='ticket-selection ticket-blue'>
                      <h2>Chọn hạng vé First</h2>
                      <p>Tiện ích với mỗi hành khách.</p>
                      <div className='ticket-options'>
                        {classTickets.map((classTicket, ticketIndex) => (
                          <div key={ticketIndex}>
                            <div
                              className={`ticket economy-smart ${
                                selectedTicket === classTicket.idHangVe
                                  ? 'selected'
                                  : ''
                              }`}
                            >
                              <div className='top-ticket'>
                                <input
                                  type='radio'
                                  name={`ticket-${index}`}
                                  id={`radio-economy-${ticketIndex}`} // Updated ID for clarity
                                  checked={
                                    selectedTicket === classTicket.idHangVe
                                  }
                                  onChange={() =>
                                    handleRadioChange(classTicket.idHangVe)
                                  }
                                />
                                <h3>
                                  <span>
                                    {/* {formatCurrency(ticket.giaVe)} */}
                                    <span> VND</span>
                                  </span>
                                </h3>
                                <p>{classTicket.tenHangVe}</p>
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
                                <p className='details-link'>(*) Xem chi tiết</p>
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
