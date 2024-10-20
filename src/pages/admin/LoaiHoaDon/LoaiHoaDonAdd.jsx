import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const LoaiHoaDonAdd = () => {
    const [tenLoaiHD, setTenLoaiHD] = useState('');
    const [moTa, setMoTa] = useState('');
    const [trangThaiActive, setTrangThaiActive] = useState('ACTIVE');
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({}); // Thêm state cho lỗi từng trường
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loaiHoaDon = {
            tenLoaiHD,
            moTa,
            trangThaiActive
        };

        try {
            const response = await axios.post(`${API_URL}/addLoaiHoaDon`, loaiHoaDon);
            console.log('Thêm hóa đơn thành công', response.data);
            navigate('/loaihoadon'); // Điều hướng về trang danh sách khách hàng
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi của backend
            if (error.response && error.response.data) {
                const errors = error.response.data.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors); // Cập nhật lỗi cho từng trường
            } else {
                setError('Đã xảy ra lỗi trong quá trình thêm hóa đơn!'); // Đặt thông báo lỗi chung
            }
            console.error('There was an error adding bill!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
             <div className="mb-3">
                 <label className="form-label">Tên loại hóa đơn</label>
                 <input 
                    type="text" 
                    className={`form-control ${fieldErrors.tenLoaiHD ? 'is-invalid' : ''}`}
                    value={tenLoaiHD}
                    onChange={(e) => setTenLoaiHD(e.target.value)}
                    id="tenLoaiHD"
                 />
                 {fieldErrors.tenLoaiHD && <div className="invalid-feedback">{fieldErrors.tenLoaiHD}</div>} {/* Hiển thị thông báo lỗi */}
             </div>
             <div className="mb-3">
                 <label className="form-label">Mô tả</label>
                 <input 
                    type="area-text" 
                    className={`form-control`} 
                    value={moTa}
                    onChange={(e) => setMoTa(e.target.value)}
                    id="moTaLoaiHD"
                 />
             </div>
             <div className="mb-3">
                 <label className="form-label">Trạng thái</label>
                 <select
                    className={`form-control ${fieldErrors.trangThaiActive ? 'is-invalid' : ''}`} 
                    value={trangThaiActive}
                    onChange={(e) => setTrangThaiActive(e.target.value)}
                >
                    <option value="ACTIVE">Kích Hoạt</option>
                    <option value="INACTIVE">Không Kích Hoạt</option>
                </select>
             </div>
             <button type="submit" className="btn btn-primary">Submit</button>
         </form>
    );

}

export default LoaiHoaDonAdd;