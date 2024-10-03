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
    const [error, setError] = useState(null); // Thêm state để quản lý lỗi
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
            const response = await axios.post(`${API_URL}/addCustomer`, khachHang);
            console.log('Customer added successfully!', response.data);
            navigate('/khachhangList'); // Điều hướng về trang danh sách khách hàng
        } catch (error) {
            console.error('There was an error adding the customer!', error);
            setError('Đã xảy ra lỗi trong quá trình thêm khách hàng!'); // Đặt thông báo lỗi
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Họ Tên</label>
                <input
                    type="text"
                    className="form-control"
                    value={hoTen}
                    onChange={(e) => setHoTen(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Số Điện Thoại</label>
                <input
                    type="text"
                    className="form-control"
                    value={soDienThoai}
                    onChange={(e) => setSoDienThoai(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Ngày Sinh</label>
                <input
                    type="date"
                    className="form-control"
                    value={ngaySinh}
                    onChange={(e) => setNgaySinh(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>CCCD</label>
                <input
                    type="text"
                    className="form-control"
                    value={cccd}
                    onChange={(e) => setCccd(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Giới Tính</label>
                <select
                    className="form-control"
                    value={gioiTinhEnum}
                    onChange={(e) => setGioiTinhEnum(e.target.value)}
                >
                    <option value="NAM">Nam</option>
                    <option value="NU">Nữ</option>
                </select>
            </div>
            <div className="form-group">
                <label>Trạng Thái</label>
                <select
                    className="form-control"
                    value={trangThaiActive}
                    onChange={(e) => setTrangThaiActive(e.target.value)}
                >
                    <option value="ACTIVE">Kích Hoạt</option>
                    <option value="INACTIVE">Không Kích Hoạt</option>
                </select>
            </div>
            {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị thông báo lỗi */}
            <button type="submit" className="btn btn-primary">Thêm Khách Hàng</button>
        </form>
    );
};

export default AddKhachHangForm;
