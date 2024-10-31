// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useFetchProfile } from '../../utils/useFetchProfile';

// const API_URL = 'http://localhost:8080';

// const BookingCard = ({ booking }) => {
//   return (
//     <div className="booking-card">
//       <h3>Thông tin đặt chỗ</h3>
//       <p>Chuyến bay: {booking.ve.chuyenBay.iataChuyenBay}</p>
//       <p>Ngày bay: {booking.ve.chuyenBay.ngayBay}</p>
//       <p>Giờ khởi hành: {booking.ve.chuyenBay.thoiGianBatDauThucTe}</p>
//       <p>Giờ hạ cánh: {booking.ve.chuyenBay.thoiGianKetThucThucTe}</p>
//       <p>Trạng thái: {booking.ve.trangThai}</p>
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

//     const fetchHoaDonData = async () => {
//       if (profile) {
//         try {
//           const response = await axios.get(`${API_URL}/getHoaDonByField?field=khachHang&input=${accountData?.khachHang?.idKhachHang}`);
//           setHD(response.data.data);
//           console.log("List hoa don: ",hd)
//         } catch (err) {
//           setError('Lỗi khi lấy thông tin hóa đơn');
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     const fetchCTHDData = async () => {
//         if (hd.length > 0) {
//           try {
//             const promises = hd.map(async (hoaDon) => {
//               const response = await fetch(`${API_URL}/getListChiTietHoaDon/${hoaDon.getIdHoaDon}`);
//               if (!response.ok) {
//                 throw new Error('Failed to fetch CTHD');
//               }
//               const data = await response.json();
//               return data.data; // Kiểm tra xem data.data có chứa kết quả không
//             });
            
//             const allCTHD = await Promise.all(promises);
//             console.log("Raw allCTHD data: ", allCTHD); // Log giá trị của allCTHD
//             setCTHD(allCTHD.flat());
//           } catch (err) {
//             setError('Lỗi khi lấy thông tin chi tiết hóa đơn');
//             console.error(err); // Log lỗi ra console
//           }
//         }
//       };

//     fetchCTHDData();
//     fetchHoaDonData();
//   }, [profile], [hd]); // Chỉ gọi khi profile thay đổi

// //   useEffect(() => {
// //     const fetchCTHDData = async () => {
// //       if (hd.length > 0) {
// //         try {
// //           const promises = hd.map(async (hoaDon) => {
// //             const response = await fetch(`${API_URL}/getListChiTietHoaDon/${hoaDon.getIdHoaDon}`);
// //             if (!response.ok) {
// //               throw new Error('Failed to fetch CTHD');
// //             }
// //             const data = await response.json();
// //             return data.data; // Kiểm tra xem data.data có chứa kết quả không
// //           });
          
// //           const allCTHD = await Promise.all(promises);
// //           console.log("Raw allCTHD data: ", allCTHD); // Log giá trị của allCTHD
// //           setCTHD(allCTHD.flat());
// //         } catch (err) {
// //           setError('Lỗi khi lấy thông tin chi tiết hóa đơn');
// //           console.error(err); // Log lỗi ra console
// //         }
// //       }
// //     };
  
// //     fetchCTHDData();
// //   }, [hd]); // Chỉ gọi khi hd thay đổi

//   if (loading || loadingProfile) {
//     return <div>Loading...</div>;
//   }

//   if (error || errorProfile) {
//     return <div>Error: {error || errorProfile}</div>;
//   }

//   return (
//     <div className="check-booking-page">
//       <h1>Danh sách vé đã đặt</h1>
//       <div className="form-profile-customer">
//         <div className="form-group-profile">
//           <p className="user-info-hoten">{profile.data?.khachHang?.hoTen}</p>
//           <p className="user-info-gioitinh">{profile.data?.khachHang?.gioiTinh}</p>
//         </div>
//       </div>
//       <div className="booking-list">
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
    <div className="booking-card">
      <h3>Thông tin đặt chỗ</h3>
      <p>Chuyến bay: {booking.ve.chuyenBay.iataChuyenBay}</p>
      <p>Ngày bay: {booking.ve.chuyenBay.ngayBay}</p>
      <p>Giờ khởi hành: {booking.ve.chuyenBay.thoiGianBatDauDuTinh}</p>
      <p>Giờ hạ cánh: {booking.ve.chuyenBay.thoiGianKetThucDuTinh}</p>
      <p>Trạng thái: {booking.ve.trangThai}</p>
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
      setLoading(true); // Set loading true trước khi gọi API
      try {
        if (profile) {
          // Fetch hóa đơn
          const responseHD = await axios.get(`${API_URL}/getHoaDonByField?field=khachHang&input=${accountData?.khachHang?.idKhachHang}`);
          const hoaDonList = responseHD.data.data;
          setHD(hoaDonList);
          console.log("List hoa don: ", hoaDonList);

          // Fetch chi tiết hóa đơn nếu có hóa đơn
          if (hoaDonList.length > 0) {
            const promises = hoaDonList.map(async (hoaDon) => {
              const responseCTHD = await fetch(`${API_URL}/getListChiTietHoaDon/${hoaDon.idHoaDon}`);
              if (!responseCTHD.ok) {
                throw new Error('Failed to fetch CTHD');
              }
              const data = await responseCTHD.json();
              return data.data; // Kiểm tra xem data.data có chứa kết quả không
            });

            const allCTHD = await Promise.all(promises);
            console.log("Raw allCTHD data: ", allCTHD);
            setCTHD(allCTHD.flat());
          }
        }
      } catch (err) {
        setError('Lỗi khi lấy thông tin hóa đơn hoặc chi tiết hóa đơn');
        console.error(err);
      } finally {
        setLoading(false); // Set loading false sau khi hoàn thành
      }
    };

    fetchData();
  }, [profile]); // Chỉ gọi khi profile thay đổi

  if (loading || loadingProfile) {
    return <div>Loading...</div>;
  }

  if (error || errorProfile) {
    return <div>Error: {error || errorProfile}</div>;
  }

  return (
    <div className="check-booking-page">
      <h1>Danh sách vé đã đặt</h1>
      <div className="form-profile-customer">
        <div className="form-group-profile">
          <p className="user-info-hoten">{profile.data?.khachHang?.hoTen}</p>
          <p className="user-info-gioitinh">{profile.data?.khachHang?.gioiTinh}</p>
        </div>
      </div>
      <div className="booking-list">
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