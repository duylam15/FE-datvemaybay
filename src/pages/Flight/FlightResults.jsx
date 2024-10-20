import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FlightResults.scss';
import watch from '../../assets/images/watch.png';
import plane from '../../assets/images/flight.png';
import logo from '../../assets/images/LogoBamboo.png';
import tag from '../../assets/images/tag.png';
import chevron from '../../assets/images/chevron.png';

const FlightResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flights = location.state?.flights.data?.chuyenbaydi?.data || [];
  console.error('Dữ liệu chuyến bay đi:', flights);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
  const [selectedTicketType, setSelectedTicketType] = useState(null);

  const handleSelectFlight = (index, ticketType) => {
    if (selectedFlightIndex === index) {
      // Deselect flight
      setSelectedFlightIndex(null);
      setSelectedTicketType(null); // Reset ticket type when deselected
    } else {
      setSelectedFlightIndex(index);
      setSelectedTicketType(ticketType); // Set the ticket type based on the button clicked
    }
  };

  const handleRadioChange = (ticketType) => {
    setSelectedTicket(ticketType);
  };

  //để kết hợp dữ liệu từ API
  // useEffect(() => {
  //   fetch('http://localhost:8080/api/chuyenbay/search?departureLocation=HAN&arrivalLocation=SGN&departureDate=2024-10-20&numberOfTickets=1')
  //     .then(response => response.json())
  //     .then(async (data) => {
  //       const flights = data.data.chuyenbaydi.data;

  //       // Gọi API để lấy thông tin chi tiết máy bay cho từng idMayBay
  //       const flightDetails = await Promise.all(flights.map(async (flight) => {
  //         const planeDetails = await fetchPlaneDetails(flight.idMayBay);
  //         return {
  //           ...flight,
  //           tenMayBay: planeDetails.tenMayBay // Thêm tên máy bay vào thông tin chuyến bay
  //         };
  //       }));

  //       setFlights(flightDetails);
  //     });
  // }, []);

  const handleContinue = () => {
    if (selectedTicket && selectedFlightIndex !== null) {
      // Lấy thông tin của chuyến bay đã chọn
      const selectedFlight = flights[selectedFlightIndex];

      // Điều hướng đến trang checkout với thông tin vé và chuyến bay đã chọn
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

  return (
    <div className='container'>
      <div className='ticket-section flex-collum'>
        <div className='section-visible'>
          <div className='card-ticket'>
            <div className='flight-results'>
              {flights.length > 0 ? (
                flights.map((flight, index) => (
                  <div key={index}>
                    <button className='remaining-seats'>Còn lại 5 chỗ</button>
                    <div className='flight-info'>
                      <div className='card-flight-right'>
                        <div className='flight-detail'>
                          <div className='flex-row'>
                            <div className='flex-collum'>
                              <span className='time'>
                                {flight.departureTime}
                              </span>
                              <span className='airport textL'>
                                {flight.departureAirport}
                              </span>
                            </div>
                            <div className='flex-collum flex-center'>
                              <span className='status'>Bay thẳng</span>
                              <span>
                                ......................................................
                              </span>
                            </div>
                            <div className='flex-collum'>
                              <span className='time'>{flight.arrivalTime}</span>
                              <span className='airport textR'>
                                {flight.arrivalAirport}
                              </span>
                            </div>
                          </div>
                          <div className='flex-row justify-content-between'>
                            <div className='gate-info'>
                              <span>Nhà ga 1</span>
                            </div>
                            <div className='gate-info'>
                              <span>Nhà ga 1</span>
                            </div>
                          </div>
                        </div>
                        <div className='flight-duration'>
                          <div className='flex-row'>
                            <img
                              src={watch}
                              width={12}
                              height={12}
                              alt='watch'
                            />
                            <p>Thời gian bay: {flight.duration}</p>
                          </div>
                          <div className='flex-row'>
                            <img
                              src={plane}
                              width={12}
                              height={12}
                              alt='plane'
                            />
                            <p>
                              {flight.idMayBay} được Bamboo Airways khai thác.
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
                              <p>1.738.500</p>
                              <span>VND</span>
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
                          onClick={() =>
                            handleSelectFlight(index, 'ticket-blue')
                          }
                        >
                          <span>
                            <div className='title'>Economy</div>
                            <img src={tag} className='imgtop' alt='tag' />
                            <div className='flight-price-section flex-collum'>
                              <span>từ</span>
                              <p>1.738.500</p>
                              <span>VND</span>
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
                                    handleRadioChange('economy-smart')
                                  }
                                />
                                <h3>
                                  <span>
                                    //giá vé
                                    {}
                                  </span>
                                  VND
                                </h3>

                                <p>//tên vé</p>
                              </div>
                              <div className='bottom-ticket'>
                                <ul>
                                  <li>Hành lý xách tay: </li>
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
                                <p className='details-link'>(*) Xem chi tiết</p>
                              </div>
                            </div>

                            <div
                              className={`ticket economy-flex ${
                                selectedTicket === 'economy-flex'
                                  ? 'selected'
                                  : ''
                              }`}
                            >
                              <div className='top-ticket'>
                                <input
                                  type='radio'
                                  name={`ticket-${index}`}
                                  id={`radio-economy-flex-${index}`}
                                  checked={selectedTicket === 'economy-flex'}
                                  onChange={() =>
                                    handleRadioChange('economy-flex')
                                  }
                                />
                                <h3>
                                  <span>//giá vé</span>
                                  VND
                                </h3>
                                <p>//tên vé</p>
                              </div>
                              <div className='bottom-ticket'>
                                <ul>
                                  <li>Hành lý xách tay: </li>
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
                                <p className='details-link'>(*) Xem chi tiết</p>
                              </div>
                            </div>
                          </div>
                          <button
                            className='next-step'
                            onClick={handleContinue}
                          >
                            Xác nhận và tiếp tục
                          </button>
                        </div>
                      )}
                    {/* Conditionally render ticket selection */}
                    {selectedFlightIndex === index &&
                      selectedTicketType === 'ticket-blue' && (
                        <div className='ticket-selection ticket-blue'>
                          <h2>Chọn hạng vé</h2>
                          <p>Tiện ích với mỗi hành khách.</p>
                          <div className='ticket-options'>
                            <div
                              className={`ticket business-smart ${
                                selectedTicket === 'business-smart'
                                  ? 'selected'
                                  : ''
                              }`}
                            >
                              <div className='top-ticket'>
                                <input
                                  type='radio'
                                  name={`ticket-${index}`}
                                  id={`radio-business-smart-${index}`}
                                  checked={selectedTicket === 'business-smart'}
                                  onChange={() =>
                                    handleRadioChange('business-smart')
                                  }
                                />
                                <h3>
                                  <span>//giá vé</span> VND
                                </h3>
                                <p>//tên vé</p>
                              </div>
                              <div className='bottom-ticket'>
                                <ul>
                                  <li>Hành lý xách tay: </li>
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
                                <p className='details-link'>(*) Xem chi tiết</p>
                              </div>
                            </div>

                            <div
                              className={`ticket business-flex ${
                                selectedTicket === 'business-flex'
                                  ? 'selected'
                                  : ''
                              }`}
                            >
                              <div className='top-ticket'>
                                <input
                                  type='radio'
                                  name={`ticket-${index}`}
                                  id={`radio-business-flex-${index}`}
                                  checked={selectedTicket === 'business-flex'}
                                  onChange={() =>
                                    handleRadioChange('business-flex')
                                  }
                                />
                                <h3>
                                  <span>//giá vé</span> VND
                                </h3>
                                <p>//giá vé</p>
                              </div>
                              <div className='bottom-ticket'>
                                <ul>
                                  <li>Hành lý xách tay: </li>
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
                                <p className='details-link'>(*) Xem chi tiết</p>
                              </div>
                            </div>
                          </div>
                          <button
                            className='next-step'
                            onClick={handleContinue}
                          >
                            Xác nhận và tiếp tục
                          </button>
                        </div>
                      )}
                  </div>
                ))
              ) : (
                <p>Không có chuyến bay nào. </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightResult;
