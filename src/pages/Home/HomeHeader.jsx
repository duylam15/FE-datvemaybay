import React, { useEffect, useState } from 'react';
import { AutoComplete, Input, Spin } from 'antd'; // Import Spin để hiển thị loading
import { useNavigate } from 'react-router-dom';
import {
  getListFlights,
  getListLocations,
} from '../../services/homePageServices';
import axios from 'axios';
import { getListLocationsForHeader } from '../../services/authServeices';

export default function HomeHeader() {
  const navigate = useNavigate();

  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [departureLocation, setDepartureLocation] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState('1');
  const [errorMessage, setErrorMessage] = useState('');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTripChange = (e) => {
    setIsRoundTrip(e.target.value === 'round-trip');
  };

  const handleSelectLocation = (value, option) => {
    setDepartureLocation(`${option.label} `);
  };

  const handleSelectArrivalLocation = (value, option) => {
    setArrivalLocation(`${option.label}`);
  };

  const handleChange = (state, setState) => {
    setState(state);
  };

  // Hàm validate form
  const validateForm = () => {
    if (!departureLocation) {
      setErrorMessage('Vui lòng nhập điểm đi.');
      return false;
    }

    if (!arrivalLocation) {
      setErrorMessage('Vui lòng nhập điểm đến.');
      return false;
    }
    if (departureLocation === arrivalLocation) {
      setErrorMessage(
        'Vui lòng chọn không chọn điểm đến và điểm đi giống nhau.'
      );
      return false;
    }
    if (!departureDate) {
      setErrorMessage('Vui lòng chọn ngày đi.');
      return false;
    }
    if (!numberOfTickets || numberOfTickets < 1) {
      setErrorMessage('Vui lòng nhập số lượng hành khách.');
      return false;
    }
    if (isRoundTrip && !returnDate) {
      setErrorMessage('Vui lòng chọn ngày về cho chuyến khứ hồi.');
      return false;
    }
    setErrorMessage(''); // Xóa thông báo lỗi nếu form hợp lệ
    return true;
  };

  // Hàm submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra form hợp lệ
    // if (!validateForm()) {
    //   return;
    // }


    const url = `http://localhost:8080/admin/chuyenbay/search?departureLocation=${departureLocation.trim()}&arrivalLocation=${arrivalLocation.trim()}&departureDate=${String(
      departureDate
    ).trim()}&returnDate=${String(returnDate).trim()}&numberOfTickets=${String(
      numberOfTickets
    ).trim()}`;

    try {
      const flights = await axios.get(url, {
        validateStatus: () => true, // Accepts all status codes
      });

      if (flights.status === 200) {
        console.log('chuyến bay:', flights.data);
        navigate(`/flightResult`, { state: { flights: flights.data, numberOfTickets: numberOfTickets } });
      } else {
        console.error('Error with API call. Status code:', flights.status);
        setErrorMessage('An error occurred while searching for flights.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server error response:', error.response.data);
        setErrorMessage(
          `Server error: ${error.response.data.message || 'An error occurred.'}`
        );
      } else if (error.request) {
        console.error('No response from server:', error.request);
        setErrorMessage('No response from the server. Please try again.');
      } else {
        console.error('Unknown error:', error.message);
        setErrorMessage(`An error occurred: ${error.message}`);
      }
    }
  };

  // Fetch dữ liệu từ JSON Server
  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true); // Bật trạng thái loading khi bắt đầu fetch dữ liệu locations
      try {
        const response = await getListLocationsForHeader();
        setLocations(
          response.data?.map((location) => ({
            label: `${location.diaChi} `,
            value: `(${location.diaChi})`,
          }))
        );
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu locations:', error);
      } finally {
        setLoading(false); // Tắt trạng thái loading khi fetch xong
      }
    };

    fetchLocations();
  }, []);

  const handleSwapAirport = () => {
    setDepartureLocation(arrivalLocation);
    setArrivalLocation(departureLocation);
  };

  return (
    <div className='home-header'>
      <img
        src='public/images/home.png'
        alt=''
        className='home-header--background'
      />
      <div className='container'>
        <div className='home-header__inner'>
          <form className='booking-form' onSubmit={handleSubmit} noValidate>
            <h2>Đặt vé máy bay</h2>

            {/* Hiển thị thông báo lỗi ngay dưới "Đặt vé máy bay" */}
            {errorMessage && (
              <div className='error-message'>
                <img
                  src='public/icons/warning.svg'
                  alt='Error'
                  style={{ marginRight: '5px' }}
                />
                Aleart:
                <span className='error-message--text'>{errorMessage}</span>
              </div>
            )}

            <div className='trip-type'>
              <label>
                <input
                  type='radio'
                  name='tripType'
                  value='one-way'
                  onChange={handleTripChange}
                  checked={!isRoundTrip}
                />
                Một chiều
              </label>
              <label>
                <input
                  type='radio'
                  name='tripType'
                  value='round-trip'
                  onChange={handleTripChange}
                  checked={isRoundTrip}
                />
                Khứ hồi
              </label>
            </div>

            {/* Hiển thị loading trong quá trình fetch dữ liệu */}
            {loading ? (
              <Spin />
            ) : (
              <div className='input__inner'>
                <div className='input__book'>
                  <div className='input-field'>
                    <label>TỪ:</label>
                    <AutoComplete
                      className='input__form'
                      options={locations}
                      onSelect={handleSelectLocation}
                      filterOption={(inputValue, option) =>
                        option.label
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      }
                      onChange={(value) =>
                        handleChange(value, setDepartureLocation)
                      }
                      value={departureLocation}
                    >
                      <Input />
                    </AutoComplete>
                  </div>

                  <div className='swap__airport' onClick={handleSwapAirport}>
                    <img
                      src='public/icons/swap.svg'
                      alt=''
                      className='swap__img'
                    />
                  </div>

                  <div className='input-field'>
                    <label>ĐẾN:</label>
                    <AutoComplete
                      className='input__form'
                      options={locations}
                      filterOption={(inputValue, option) =>
                        option.label
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      }
                      onSelect={handleSelectArrivalLocation}
                      onChange={(value) =>
                        handleChange(value, setArrivalLocation)
                      }
                      value={arrivalLocation}
                    >
                      <Input />
                    </AutoComplete>
                  </div>

                  <div className='input-field'>
                    <label>NGÀY ĐI</label>
                    <input
                      type='date'
                      className='input__form'
                      name='departureDate'
                      required
                      value={departureDate}
                      onChange={(value) =>
                        handleChange(value.target.value, setDepartureDate)
                      }
                    />
                  </div>

                  {isRoundTrip && (
                    <div className='input-field'>
                      <label>NGÀY VỀ:</label>
                      <input
                        type='date'
                        className='input__form_2'
                        name='returnDate'
                        required
                        value={returnDate}
                        onChange={(value) =>
                          handleChange(value.target.value, setReturnDate)
                        }
                      />
                    </div>
                  )}

                  <div className='input-field'>
                    <label>HÀNH KHÁCH</label>
                    <input
                      type='number'
                      className={
                        isRoundTrip ? 'input__form_2 ' : 'input__form '
                      }
                      name='passengers'
                      min='1'
                      required
                      onChange={(value) =>
                        handleChange(value.target.value, setNumberOfTickets)
                      }
                      style={{ border: 'none' }}
                      value={numberOfTickets}
                    />
                  </div>
                </div>

                <button type='submit'>Tìm chuyến bay</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
