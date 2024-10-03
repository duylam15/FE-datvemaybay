import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn
const KhachHangEdit = () => {
    const { idKhachHang } = useParams();
    const [khachHang, setKhachHang] = useState({
        hoTen: '',
        ngaySinh: '',
        email: '',
        soDienThoai: '',
        cccd: '',
        gioiTinhEnum: '',
        trangThaiActive: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch thông tin khách hàng khi component được mount
    useEffect(() => {
        axios.get(`${API_URL}/getCustomer/${idKhachHang}`)
            .then(response => {
                setKhachHang(response.data.data);
                setLoading(false);
                console.log("Data fetched for khachHang:", response.data.data);
            })
            .catch(error => {
                setError('Failed to fetch customer data');
                setLoading(false);
            });
    }, [idKhachHang]);

    // Xử lý submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`${API_URL}/updateCustomer/${idKhachHang}`, khachHang)
            .then(response => {
                console.log('Customer updated successfully!');
                window.location.href = '/khachhangList';
            })
            .catch(error => {
                console.error('There was an error updating the customer!', error);
            });
    };

    // Xử lý khi người dùng thay đổi thông tin trong form
    const handleChange = (event) => {
        const { name, value } = event.target;
        setKhachHang({ ...khachHang, [name]: value });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container">
            <h2>Chỉnh sửa thông tin khách hàng</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Họ Tên:</label>
                    <input
                        type="text"
                        name="hoTen"
                        className="form-control"
                        value={khachHang.hoTen}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Ngày Sinh:</label>
                    <input
                        type="date"
                        name="ngaySinh"
                        className="form-control"
                        value={khachHang.ngaySinh}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={khachHang.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Số Điện Thoại:</label>
                    <input
                        type="text"
                        name="soDienThoai"
                        className="form-control"
                        value={khachHang.soDienThoai}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>CCCD:</label>
                    <input
                        type="text"
                        name="cccd"
                        className="form-control"
                        value={khachHang.cccd}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Giới Tính:</label>
                    <select
                        name="gioiTinhEnum"
                        className="form-control"
                        value={khachHang.gioiTinhEnum}
                        onChange={handleChange}
                    >
                        <option value="NAM">Nam</option>
                        <option value="NU">Nữ</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Trạng Thái:</label>
                    <select
                        name="trangThaiActive"
                        className="form-control"
                        value={khachHang.trangThaiActive}
                        onChange={handleChange}
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="IN_ACTIVE">Inactive</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Cập nhật</button>
            </form>
        </div>
    );
};

export default KhachHangEdit;
