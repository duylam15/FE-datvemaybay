// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useFetchProfile } from '../../utils/useFetchProfile';
// import '../UserPage/CheckBooking.scss';

// const API_URL = 'http://localhost:8080';

// const BookingCard = ({ booking }) => {
//   return (
//     <div class="ticket-item">
//       <h3>Thông tin đặt chỗ</h3>
//       <div className={`status ${booking.hoaDon.status}`}>{booking.hoaDon.status}</div>
//       <p>Hành khách: {booking.ve.hanhKhach.hoTen}</p>
//       <p>Giới tính: {booking.ve.hanhKhach.gioiTinhEnum}</p>
//       <p>Vé: {booking.ve.maVe}</p>
//       <p>Chuyến bay: {booking.ve.chuyenBay.iataChuyenBay}</p>
//       <p>Ngày bay: {booking.ve.chuyenBay.ngayBay}</p>
//       <p>Giờ khởi hành: {booking.ve.chuyenBay.thoiGianBatDauThucTe}</p>
//       <p>Giờ hạ cánh: {booking.ve.chuyenBay.thoiGianKetThucThucTe}</p>
//     </div>
//   );
// };

// const CheckBookingPage = () => {
//   const [hd, setHD] = useState([]);
//   const [cthd, setCTHD] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { profile, loading: loadingProfile, error: errorProfile } = useFetchProfile();
//   const accountData = profile?.data;

//   useEffect(() => {
//     const fetchData = async () => {
//         setLoading(true);
//         try {
//           if (profile) {
//               // Fetch hóa đơn
//               const responseHD = await axios.get(`${API_URL}/getHoaDonByField?field=khachHang&input=${accountData?.khachHang?.idKhachHang}`);
      
//               if (responseHD.status === 204 || !responseHD.data?.data) {  
//                   setHD([]);
//                   setCTHD([]);
//               } else {
//                   const hoaDonList = responseHD.data.data;
//                   setHD(hoaDonList);
//                   console.log("List hoa don: ", hoaDonList);
      
//                   if (hoaDonList.length > 0) {
//                       const promises = hoaDonList.map(async (hoaDon) => {
//                           const responseCTHD = await axios.get(`${API_URL}/getListChiTietHoaDon/${hoaDon.idHoaDon}`);
                          
//                           if (!responseCTHD.data || !responseCTHD.data.data) {  
//                               return [];
//                           }
//                           return responseCTHD.data.data; // Lấy `data.data` nếu có
//                       });
      
//                       const allCTHD = await Promise.all(promises);
//                       console.log("Raw allCTHD data: ", allCTHD);
//                       setCTHD(allCTHD.flat());
//                   }
//               }
//             }
//           } catch (err) {
//               setError(`Lỗi khi lấy thông tin hóa đơn hoặc chi tiết hóa đơn: ${err.message}`);
//               console.error(err);
//           } finally {
//               setLoading(false);
//           }
      
//     };

//     fetchData();
// }, [profile]); // Chỉ gọi khi profile thay đổi

//   if (loading || loadingProfile) {
//     return <div>Loading...</div>;
//   }

//   if (error || errorProfile) {
//     return <div>Error: {error || errorProfile}</div>;
//   }

//   return (
//     <div className="check-booking-page">
//       <h1>Danh sách vé đã đặt</h1>
//       {/* <div className="form-profile-customer">
//         <div className="form-group-profile">
//           <p className="user-info-hoten">{profile.data?.khachHang?.hoTen}</p>
//           <p className="user-info-gioitinh">{profile.data?.khachHang?.gioiTinh}</p>
//         </div>
//       </div> */}
//       <div class="ticket-list">
//         {cthd.length > 0 ? (
//           cthd.map((booking, index) => (
//             <BookingCard key={index} booking={booking} />
//           ))
//         ) : (
//           <p>Chưa có vé nào được đặt.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CheckBookingPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFetchProfile } from '../../utils/useFetchProfile';
import '../UserPage/CheckBooking.scss';

const API_URL = 'http://localhost:8080';

const BookingCard = ({ booking }) => {
  return (
    <div className="ticket-item">
      <h3>Thông tin đặt chỗ</h3>
      <div className={`status ${booking.hoaDon.status}`}>{booking.hoaDon.status}</div>
      <p>Hành khách: {booking.ve?.hanhKhach?.hoTen || "Không có thông tin"}</p>
      <p>Giới tính: {booking.ve?.hanhKhach?.gioiTinhEnum || "Không có thông tin"}</p>
      <p>Vé: {booking.ve.maVe}</p>
      <p>Chuyến bay: {booking.ve.chuyenBay.iataChuyenBay}</p>
      <p>Ngày bay: {booking.ve.chuyenBay.ngayBay}</p>
      <p>Giờ khởi hành: {booking.ve.chuyenBay.thoiGianBatDauThucTe}</p>
      <p>Giờ hạ cánh: {booking.ve.chuyenBay.thoiGianKetThucThucTe}</p>
    </div>
  );
};

const CheckBookingPage = () => {
  const [hd, setHD] = useState([]);
  const [cthd, setCTHD] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { profile, loading: loadingProfile, error: errorProfile } = useFetchProfile();
  const accountData = profile?.data;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (profile) {
          // Fetch hóa đơn
          const responseHD = await axios.get(`${API_URL}/getHoaDonByField?field=khachHang&input=${accountData?.khachHang?.idKhachHang}`);

          if (responseHD.status === 204 || !responseHD.data?.data) {
            setHD([]);
            setCTHD([]);
          } else {
            const hoaDonList = responseHD.data.data;
            setHD(hoaDonList);
            console.log("List hóa đơn: ", hoaDonList);

            if (hoaDonList.length > 0) {
              const promises = hoaDonList.map(async (hoaDon) => {
                const responseCTHD = await axios.get(`${API_URL}/getListChiTietHoaDon/${hoaDon.idHoaDon}`);
                
                if (!responseCTHD.data || !responseCTHD.data.data) {
                  return [];
                }
                return responseCTHD.data.data;
              });

              const allCTHD = await Promise.all(promises);
              console.log("Raw allCTHD data: ", allCTHD);
              setCTHD(allCTHD.flat());
            }
          }
        }
      } catch (err) {
        setError(`Lỗi khi lấy thông tin hóa đơn hoặc chi tiết hóa đơn: ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [profile]);

  if (loading || loadingProfile) {
    return <div>Loading...</div>;
  }

  if (error || errorProfile) {
    return <div>Error: {error || errorProfile}</div>;
  }

  return (
    <div className="check-booking-page">
      <h1>Danh sách vé đã đặt</h1>
      <div className="ticket-list">
        {cthd.length > 0 ? (
          cthd.map((booking, index) => (
            <BookingCard key={index} booking={booking} />
          ))
        ) : (
          <p>Chưa có vé nào được đặt.</p>
        )}
      </div>
    </div>
  );
};

export default CheckBookingPage;