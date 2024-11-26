import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FlightTimeLine({
  selectedTicket,
  numberOfTicketsToDetail,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sanBayBatDau, setSanBayBatDau] = useState(null);
  const [sanBayKetThuc, setSanBayKetThuc] = useState(null);
  const [error, setError] = useState(null);

  const handleFareClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchAirport = async () => {
      try {
        const sanBayBatDau = await axios.get(
          `http://localhost:8080/admin/sanbay/getAirport/${selectedTicket.flightId.tuyenBay.idSanBayBatDau}`
        );
        const sanBayKetThuc = await axios.get(
          `http://localhost:8080/admin/sanbay/getAirport/${selectedTicket.flightId.tuyenBay.idSanBayKetThuc}`
        );
        setSanBayBatDau(sanBayBatDau);
        setSanBayKetThuc(sanBayKetThuc);
        // console.log("sanBayBatDau", sanBayBatDau)
        // console.log("sanBayKetThuc", sanBayKetThuc)
      } catch (err) {
        setError(
          err.response ? err.response.data.message : 'Error fetching airport'
        );
      }
    };

    fetchAirport();
  }, []);

  const flightData = [
    {
      journeyDetails: {
        timeline: '13 giờ 30 phút',
        departureTime: '18:30',
        departureCity: 'TP. Hồ Chí Minh',
        departureAirport: 'Sân bay Tân Sơn Nhất, Việt Nam',
        terminal: 'Nhà ga 2',
        flightNumber: 'VN 98',
        operatedBy: 'Vietnam Airlines',
        planeModel: 'AIRBUS A350-900',
        stopover: {
          timeline: '15 giờ 21 phút',
          location: 'Sân bay San Francisco, Hoa Kỳ',
          stops: 1,
        },
      },
    },
    // Thêm chuyến bay thứ hai
    {
      journeyDetails: {
        timeline: '10 giờ 45 phút',
        departureTime: '14:15',
        departureCity: 'Hà Nội',
        departureAirport: 'Sân bay Nội Bài, Việt Nam',
        terminal: 'Nhà ga 1',
        flightNumber: 'VN 123',
        operatedBy: 'Vietnam Airlines',
        planeModel: 'BOEING 787-9',
        stopover: null,
      },
    },
  ];
  const fareDetails = [
    {
      class: 'Phổ Thông Tiết Kiệm',
      changeFee: '1.500.000 VND',
      refundFee: '2.500.000 VND',
      checkedLuggage: '1 x 23 kg',
      handLuggage: '1 túi',
      mileage: '⭐Tích lũy 50% số dặm',
    },
  ];

  function convertDate(inputDate) {
    const daysOfWeek = [
      'Chủ Nhật',
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
    ];
    const months = [
      'tháng 1',
      'tháng 2',
      'tháng 3',
      'tháng 4',
      'tháng 5',
      'tháng 6',
      'tháng 7',
      'tháng 8',
      'tháng 9',
      'tháng 10',
      'tháng 11',
      'tháng 12',
    ];

    // Chuyển đổi chuỗi ngày thành đối tượng Date
    const date = new Date(inputDate);

    // Lấy ngày, tháng, năm và thứ
    const day = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const dateNumber = date.getDate();
    const year = date.getFullYear();

    // Tạo chuỗi định dạng mong muốn
    return `${day}, ${dateNumber} ${month} ${year}`;
  }

  function convertToTime(inputDateTime) {
    // Tạo đối tượng Date từ chuỗi đầu vào
    const date = new Date(inputDateTime);

    // Lấy giờ và phút
    const hours = String(date.getHours()).padStart(2, '0'); // Đảm bảo có 2 chữ số
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Đảm bảo có 2 chữ số

    // Tạo chuỗi thời gian định dạng mong muốn
    return `${hours}:${minutes}`;
  }

  function calculateFlightDuration(startTime, endTime) {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const durationMilliseconds = endDate - startDate;
    const hours = Math.floor((durationMilliseconds / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((durationMilliseconds / (1000 * 60)) % 60);
    return { hours, minutes };
  }
  // Tính toán và in kết quả
  const flightDuration = calculateFlightDuration(
    selectedTicket.flightId.thoiGianBatDauDuTinh,
    selectedTicket.flightId.thoiGianKetThucDuTinh
  );

  return (
    <div>
      <div className='flightDetail'>
        <div className={`container ${isExpanded ? 'expanded' : ''}`}>
          <h2 className='book--heading'>Các chuyến bay</h2>
          <div
            className={`flightDetail__inner ${isExpanded ? 'expanded' : ''}`}
          >
            <div
              className={`flightDetail__flight ${isExpanded ? 'expanded' : ''}`}
            >
              <div className='flightDetail__flight--bound-information'>
                <div className='flightDetail__flight--text'>
                  {sanBayBatDau?.data.data.diaChi} đến{' '}
                  {sanBayKetThuc?.data.data.diaChi}
                </div>
                <div className='flightDetail__flight--time'>
                  {convertDate(selectedTicket?.flightId?.ngayBay)}
                </div>
              </div>
              <div className='flightDetail__flight--bound'>
                <div className='flightDetail__flight--bound-timeline'>
                  <div className='flightDetail__flight--bound-timeline-from'>
                    <div className='flightDetail__flight--bound-timeline-time'>
                      {convertToTime(
                        selectedTicket.flightId.thoiGianBatDauDuTinh
                      )}
                    </div>
                    <div className='flightDetail__flight--bound-timeline-airport'>
                      {sanBayBatDau?.data.data.iataSanBay}
                    </div>
                    <div className='flightDetail__flight--bound-timeline-gas'>
                      Nhà ga {selectedTicket.flightId.tuyenBay.idSanBayBatDau}
                    </div>
                  </div>
                  <div className='flightDetail__flight--bound-timeline-transport'>
                    ---------------------------------------------------------------
                    {flightData ? (
                      <p>Bay thẳng</p>
                    ) : (
                      <div className='flightDetail__flight--bound-timeline-transport-wrap'>
                        <div className='flightDetail__flight--bound-timeline-transport-number'>
                          1
                        </div>
                        <div className='flightDetail__flight--bound-timeline-transport-code'>
                          SFO
                        </div>
                        <div className='flightDetail__flight--bound-timeline-transport-time'>
                          15 giờ 21 phút
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='flightDetail__flight--bound-timeline-to'>
                    <div className='flightDetail__flight--bound-timeline-time'>
                      {convertToTime(
                        selectedTicket.flightId.thoiGianKetThucDuTinh
                      )}
                    </div>
                    <div className='flightDetail__flight--bound-timeline-airport'>
                      {sanBayKetThuc?.data.data.iataSanBay}
                    </div>
                    <div className='flightDetail__flight--bound-timeline-gas'>
                      Nhà ga {selectedTicket.flightId.tuyenBay.idSanBayKetThuc}
                    </div>
                  </div>
                </div>
                <div className='flightDetail__flight--wrap'>
                  <div className='flightDetail__flight--bound-details'>
                    <div className='flightDetail__flight--bound-details-wrap'>
                      <div className='flightDetail__flight--bound-details-sect'>
                        <img
                          src='public/icons/clock-ui-web-svgrepo-com.svg'
                          alt=''
                          className='flightDetail__flight--bound-details-icon'
                        />
                        <div className='flightDetail__flight--bound-details-text'>
                          {`Thời gian bay ${flightDuration.hours}h ${flightDuration.minutes}min`}
                        </div>
                      </div>
                      <div className='flightDetail__flight--bound-details-sect'>
                        <img
                          src='public/icons/plane-taking-off-svgrepo-com.svg'
                          alt=''
                          className='flightDetail__flight--bound-details-icon'
                        />
                        <div className='flightDetail__flight--bound-details-text'>
                          {selectedTicket.flightId.mayBay.icaoMayBay} được
                          Bamboo Airways khai thác.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className='flightDetail__flight--bound-fare'
                    onClick={handleFareClick}
                  >
                    Economy Flex
                    {isExpanded ? (
                      <img
                        src='public/icons/down-chevron-svgrepo-com (1).svg'
                        alt=''
                        className='flightDetail__flight--bound-fare-icon'
                      />
                    ) : (
                      <img
                        src='public/icons/down-chevron-svgrepo-com.svg'
                        alt=''
                        className='flightDetail__flight--bound-fare-icon'
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='flightDetail__flight--breakdown'>
              <div className='flightDetail__flight--breakdown-details-list'>
                <h4 className='flightDetail__flight--breakdown-details-title'>
                  Chi tiết hành trình
                </h4>
                <div className='flightDetail__flight--breakdown-details'>
                  <div className='flightDetail__flight--breakdown-details-wrap'>
                    <div className='flightDetail__flight--breakdown-details-timeline'>
                      {`${flightDuration.hours} giờ ${flightDuration.minutes} phút`}
                    </div>
                    <div className='flightDetail__flight--breakdown-details-places-wrap'>
                      <div className='flightDetail__flight--breakdown-details-places'>
                        <div className='flightDetail__flight--breakdown-details-time'>
                          {convertToTime(
                            selectedTicket.flightId.thoiGianBatDauDuTinh
                          )}{' '}
                          {sanBayBatDau?.data.data.diaChi}
                        </div>
                        <div className='flightDetail__flight--breakdown-details-location'>
                          Sân bay {sanBayBatDau?.data.data.tenSanBay},{' '}
                          {sanBayBatDau?.data.data.thanhPho.quocGia.tenQuocGia}
                        </div>
                        <div className='flightDetail__flight--breakdown-details-gas'>
                          Nhà ga{' '}
                          {selectedTicket.flightId.tuyenBay.idSanBayBatDau}
                        </div>
                      </div>
                      <div className='flightDetail__flight--breakdown-details-places'>
                        <div className='flightDetail__flight--breakdown-details-time'>
                          {convertToTime(
                            selectedTicket.flightId.thoiGianKetThucDuTinh
                          )}{' '}
                          {sanBayKetThuc?.data.data.diaChi}
                        </div>
                        <div className='flightDetail__flight--breakdown-details-location'>
                          Sân bay {sanBayKetThuc?.data.data.tenSanBay},{' '}
                          {sanBayKetThuc?.data.data.thanhPho.quocGia.tenQuocGia}
                        </div>
                        <div className='flightDetail__flight--breakdown-details-gas'>
                          Nhà ga{' '}
                          {selectedTicket.flightId.tuyenBay.idSanBayKetThuc}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flightDetail__flight--breakdown-details-plane'>
                    <div className='flightDetail__flight--breakdown-details-number'>
                      Số hiệu chuyến bay:{' '}
                      {selectedTicket.flightId.mayBay.soHieu}
                    </div>
                    <div className='flightDetail__flight--breakdown-details-exploit'>
                      Khai thác bởi: Bamboo Airways
                    </div>
                    <div className='flightDetail__flight--breakdown-details-code'>
                      Mẫu máy bay: {selectedTicket.flightId.mayBay.icaoMayBay}
                    </div>
                  </div>
                </div>
              </div>

              <div className='flightDetail__flight--breakdown-fare'>
                <h4 className='flightDetail__flight--breakdown-details-title'>
                  Giá vé của Quý khách
                </h4>
                {fareDetails.map((flight, index) => (
                  <div key={index}>
                    <div className='flightDetail__flight--breakdown-fare-price-list'>
                      <div className='flightDetail__flight--breakdown-fare-text'>
                        <img
                          src='public/icons/tick-svgrepo-com.svg'
                          alt=''
                          className='flightDetail__flight--breakdown-fare-icon'
                        />
                        Thay đổi vé Phí đổi tối đa {flight.changeFee} mỗi hành
                        khách cho toàn bộ vé
                      </div>
                      <div className='flightDetail__flight--breakdown-fare-text'>
                        <img
                          src='public/icons/tick-svgrepo-com.svg'
                          alt=''
                          className='flightDetail__flight--breakdown-fare-icon'
                        />
                        Hoàn vé Phí hoàn tối đa {flight.refundFee} mỗi hành
                        khách cho toàn bộ vé
                      </div>
                      <div className='flightDetail__flight--breakdown-fare-text'>
                        <img
                          src='public/icons/tick-svgrepo-com.svg'
                          alt=''
                          className='flightDetail__flight--breakdown-fare-icon'
                        />
                        Hành lý ký gửi {flight.checkedLuggage}
                      </div>
                      <div className='flightDetail__flight--breakdown-fare-text'>
                        <img
                          src='public/icons/tick-svgrepo-com.svg'
                          alt=''
                          className='flightDetail__flight--breakdown-fare-icon'
                        />
                        Hành lý xách tay {flight.handLuggage}
                      </div>
                      <div className='flightDetail__flight--breakdown-fare-text'>
                        <img
                          src='public/icons/tick-svgrepo-com.svg'
                          alt=''
                          className='flightDetail__flight--breakdown-fare-icon'
                        />
                        Số dặm tích được {flight.mileage}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h2 className='book--heading'>Hành khách</h2>
        </div>
      </div>
    </div>
  );
}
