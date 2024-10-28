import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080/khachhang'; // Thay đổi theo URL API của bạn

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
    const [fieldErrors, setFieldErrors] = useState({}); // State để lưu lỗi cho từng trường

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
    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        try {
            const response = await axios.put(`${API_URL}/updateCustomer/${idKhachHang}`, khachHang);
            console.log('Customer updated successfully!', response.data);
            window.location.href = '/admin/customers'; // Chuyển hướng đến danh sách khách hàng
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi của backend
            if (error.response && error.response.data) {
                const errors = error.response.data.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors);
                console.log(errors) // Cập nhật lỗi cho từng trường
            } else {
                setError('There was an error updating the customer!'); // Thông báo lỗi mặc định
            }
            console.error('There was an error updating the customer!', error);
        }
    };

    // Xử lý khi người dùng thay đổi thông tin trong form
    const handleChange = (event) => {
        const { name, value } = event.target;
        setKhachHang({ ...khachHang, [name]: value });
        // Xóa lỗi cho trường đã chỉnh sửa
        setFieldErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
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
                        className={`form-control ${fieldErrors.hoTen ? 'is-invalid' : ''}`} // Thêm lớp is-invalid nếu có lỗi
                        value={khachHang.hoTen}
                        onChange={handleChange}
                    />
                    {fieldErrors.hoTen && <div className="invalid-feedback">{fieldErrors.hoTen}</div>} {/* Hiển thị thông báo lỗi */}
                </div>
                <div className="form-group">
                    <label>Ngày Sinh:</label>
                    <input
                        type="date"
                        name="ngaySinh"
                        className={`form-control ${fieldErrors.ngaySinh ? 'is-invalid' : ''}`}
                        value={khachHang.ngaySinh}
                        onChange={handleChange}
                    />
                    {fieldErrors.ngaySinh && <div className="invalid-feedback">{fieldErrors.ngaySinh}</div>}
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
                        value={khachHang.email}
                        onChange={handleChange}
                    />
                    {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
                </div>
                <div className="form-group">
                    <label>Số Điện Thoại:</label>
                    <input
                        type="text"
                        name="soDienThoai"
                        className={`form-control ${fieldErrors.soDienThoai ? 'is-invalid' : ''}`}
                        value={khachHang.soDienThoai}
                        onChange={handleChange}
                    />
                    {fieldErrors.soDienThoai && <div className="invalid-feedback">{fieldErrors.soDienThoai}</div>}
                </div>
                <div className="form-group">
                    <label>CCCD:</label>
                    <input
                        type="text"
                        name="cccd"
                        className={`form-control ${fieldErrors.cccd ? 'is-invalid' : ''}`}
                        value={khachHang.cccd}
                        onChange={handleChange}
                    />
                    {fieldErrors.cccd && <div className="invalid-feedback">{fieldErrors.cccd}</div>}
                </div>
                <div className="form-group">
                    <label>Giới Tính:</label>
                    <select
                        name="gioiTinhEnum"
                        className={`form-control ${fieldErrors.gioiTinhEnum ? 'is-invalid' : ''}`}
                        value={khachHang.gioiTinhEnum}
                        onChange={handleChange}
                    >
                        <option value="NAM">Nam</option>
                        <option value="NU">Nữ</option>
                    </select>
                    {fieldErrors.gioiTinhEnum && <div className="invalid-feedback">{fieldErrors.gioiTinhEnum}</div>}
                </div>
                <div className="form-group">
                    <label>Trạng Thái:</label>
                    <select
                        name="trangThaiActive"
                        className={`form-control ${fieldErrors.trangThaiActive ? 'is-invalid' : ''}`}
                        value={khachHang.trangThaiActive}
                        onChange={handleChange}
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="IN_ACTIVE">Inactive</option>
                    </select>
                    {fieldErrors.trangThaiActive && <div className="invalid-feedback">{fieldErrors.trangThaiActive}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Cập nhật</button>
            </form>
        </div>
    );
};

export default KhachHangEdit;
