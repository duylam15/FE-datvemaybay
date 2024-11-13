import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFetchProfile } from '../../utils/useFetchProfile';
import '../UserPage/CheckBooking.scss';

const API_URL = 'http://localhost:8080';

const BookingCard = ({ booking }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewContent, setReviewContent] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date().toISOString();
    
    // Tính toán giá trị sao và trạng thái active ngay tại đây
    let starValue = '';
    switch(starRating) {
      case 1:
        starValue = 'ONE';
        break;
      case 2:
        starValue = 'TWO';
        break;
      case 3:
        starValue = 'THREE';
        break;
      case 4:
        starValue = 'FOUR';
        break;
      case 5:
        starValue = 'FIVE';
        break;
      default:
        break;
    }
    
    const activeStatus = 'ACTIVE';
  
    const danhgia = {
      hangBay: booking.ve.choNgoi.mayBay.hangBay,
      khachHang: booking.hoaDon.khachHang,
      sao: starValue, 
      noiDung: reviewContent,
      thoiGianTao: currentTime,
      trangThaiActive: activeStatus 
    };
  
    try {
      console.log(danhgia);
      const response = await axios.post('http://localhost:8080/admin/danhgia/addNewReview', danhgia);
      const response2 = await axios.put(`http://localhost:8080/markDanhGia/${booking.hoaDon.idHoaDon}`);
      setSuccess('Đánh giá đã được gửi thành công!');
      setReviewContent('');
      setStarRating(0);
      setShowReviewForm(false);
    } catch (err) {
      setError('Có lỗi xảy ra khi gửi đánh giá.');
      console.error(err);
    }
  };

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
      
      {booking.ve.trangThai === 'USED' && booking.hoaDon.danhGia === false ? (
        <div>
          <p className='p-add' onClick={() => setShowReviewForm(!showReviewForm)}>
            Đánh giá trải nghiệm của bạn sau chuyến bay
          </p>
          {showReviewForm && (
            <form onSubmit={handleSubmit} className='form-add-review'>
              {success && <p className="success-message">{success}</p>}
              {error && <p className="error-message">{error}</p>}
              <input 
                className='text-content'
                value={reviewContent} 
                onChange={(e) => setReviewContent(e.target.value)} 
                placeholder="Nội dung đánh giá" 
                required 
              />
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star}
                    className={`star ${starRating >= star ? 'filled' : ''}`}
                    onClick={() => setStarRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button type="submit">Gửi đánh giá</button>
            </form>
          )}
        </div>
      ) : null}
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
  console.log("accountData", accountData?.idTaiKhoan)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (profile) {
          // Fetch hóa đơn
          console.log("idTaiKhoanidTaiKhoan",accountData)
          const responseHD = await axios.get(`${API_URL}/getHoaDonByField?field=khachHang&input=${accountData?.idTaiKhoan}`);

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