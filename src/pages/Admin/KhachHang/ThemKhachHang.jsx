import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = 'http://localhost:8080';

const AddKhachHangForm = () => {
    const [hoTen, setHoTen] = useState('');
    const [email, setEmail] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [cccd, setCccd] = useState('');
    const [gioiTinhEnum, setGioiTinhEnum] = useState('NAM');
    const [trangThaiActive, setTrangThaiActive] = useState('ACTIVE');
    const [error, setError] = useState(null); 
    const [fieldErrors, setFieldErrors] = useState({}); // Thêm state cho lỗi từng trường
    const navigate = useNavigate();

    // Xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault();
        const khachHang = {
            hoTen,
            email,
            soDienThoai,
            ngaySinh,
            cccd,
            gioiTinhEnum,
            trangThaiActive
        };

        try {
            const response = await axios.post(`${API_URL}/khachhang/addCustomer`, khachHang);
            // console.log('Customer added successfully!', response.data);
            if (response.statusCode == 400) {
                const errors = response.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors);
            } else
                navigate('/admin/customers');
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi của backend
            if (error.response && error.response.data) {
                const errors = error.response.data.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors); // Cập nhật lỗi cho từng trường
            } else {
                setError('Đã xảy ra lỗi trong quá trình thêm khách hàng!'); // Đặt thông báo lỗi chung
            }
            console.error('There was an error adding the customer!', error);
        }
    };

    return (
        <>
            <h1 style={{
                fontWeight: 'bold',       // In đậm
                textAlign: 'center',      // Nằm giữa trang
                fontSize: '24px',         // Cỡ chữ lớn
                margin: '20px 0'          // Khoảng cách trên dưới
            }}>Danh sách Khách hàng</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Họ Tên</label>
                <div>
                <input
                    type="text"
                    className={`form-control ${fieldErrors.hoTen ? 'is-invalid' : ''}`} 
                    value={hoTen}
                    onChange={(e) => setHoTen(e.target.value)}
                    required
                    style={{width: '100vh'}}
                />
                {fieldErrors.hoTen && <div className="invalid-feedback">{fieldErrors.hoTen}</div>}
            </div></div>
            <div className="form-group">
                <label>Email</label>
                <div>
                <input
                    type="email"
                    className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`} 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{width: '100vh'}}
                /></div>
                {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
            </div>
            <div className="form-group">
                <label>Số Điện Thoại</label>
                <div>
                <input
                    type="text"
                    className={`form-control ${fieldErrors.soDienThoai ? 'is-invalid' : ''}`} 
                    value={soDienThoai}
                    onChange={(e) => setSoDienThoai(e.target.value)}
                    required
                    style={{width: '100vh'}}
                />
                {fieldErrors.soDienThoai && <div className="invalid-feedback">{fieldErrors.soDienThoai}</div>}
            </div></div>
            <div className="form-group">
                <label>Ngày Sinh</label>
                <div>
                <input
                    type="date"
                    className={`form-control ${fieldErrors.ngaySinh ? 'is-invalid' : ''}`} 
                    value={ngaySinh}
                    onChange={(e) => setNgaySinh(e.target.value)}
                    required
                    style={{width: '100vh'}}
                />
                {fieldErrors.ngaySinh && <div className="invalid-feedback">{fieldErrors.ngaySinh}</div>}
            </div></div>
            <div className="form-group">
                <label>CCCD</label>
                <div>
                <input
                    type="text"
                    className={`form-control ${fieldErrors.cccd ? 'is-invalid' : ''}`} 
                    value={cccd}
                    onChange={(e) => setCccd(e.target.value)}
                    required
                    style={{width: '100vh'}}
                />
                {fieldErrors.cccd && <div className="invalid-feedback">{fieldErrors.cccd}</div>}
            </div></div>
            <div className="form-group">
                <label>Giới Tính</label>
                <div>
                <select
                    className={`form-control ${fieldErrors.gioiTinhEnum ? 'is-invalid' : ''}`} 
                    value={gioiTinhEnum}
                    onChange={(e) => setGioiTinhEnum(e.target.value)}
                    style={{width: '100vh'}}
                >
                    <option value="NAM">Nam</option>
                    <option value="NU">Nữ</option>
                </select>
                {fieldErrors.gioiTinhEnum && <div className="invalid-feedback">{fieldErrors.gioiTinhEnum}</div>}
            </div></div>
            <div className="form-group">
                <label>Trạng Thái</label>
                <div>
                <select
                    className={`form-control ${fieldErrors.trangThaiActive ? 'is-invalid' : ''}`} 
                    value={trangThaiActive}
                    onChange={(e) => setTrangThaiActive(e.target.value)}
                    style={{width: '100vh'}}
                >
                    <option value="ACTIVE">Kích Hoạt</option>
                    <option value="INACTIVE">Không Kích Hoạt</option>
                </select>
                {fieldErrors.trangThaiActive && <div className="invalid-feedback">{fieldErrors.trangThaiActive}</div>}
            </div></div>
            {error && <div className="alert alert-danger">{error}</div>} 
            <button type="submit" className="btn btn-primary">Thêm Khách Hàng</button>
        </form>
        </>
    );
};

export default AddKhachHangForm;
