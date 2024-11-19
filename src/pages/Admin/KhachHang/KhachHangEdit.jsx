import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PermissionEditButton } from '../../../components/Admin/Sidebar';
import './style.css'
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
    const navigate = useNavigate();


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
            navigate('/admin/customers'); // Chuyển hướng đến danh sách khách hàng
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi của backend
            if (error.response && error.response.data) {
                const errors = error.response.data.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors);
                console.log(errors, error) // Cập nhật lỗi cho từng trường
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
                    <div>
                    <input
                        type="text"
                        name="hoTen"
                        className={`form-control ${fieldErrors.hoTen ? 'is-invalid' : ''}`} // Thêm lớp is-invalid nếu có lỗi
                        value={khachHang.hoTen}
                        onChange={handleChange}
                        style={{width: '100vh'}}
                    />
                    {fieldErrors.hoTen && <div className="invalid-feedback">{fieldErrors.hoTen}</div>} {/* Hiển thị thông báo lỗi */}
                </div></div>
                <div className="form-group">
                    <label>Ngày Sinh:</label>
                    <div>
                    <input
                        type="date"
                        name="ngaySinh"
                        className={`form-control ${fieldErrors.ngaySinh ? 'is-invalid' : ''}`}
                        value={khachHang.ngaySinh}
                        onChange={handleChange}
                        style={{width: '100vh'}}
                    />
                    {fieldErrors.ngaySinh && <div className="invalid-feedback">{fieldErrors.ngaySinh}</div>}
                </div></div>
                <div className="form-group">
                    <label>Email:</label>
                    <div>
                    <input
                        type="email"
                        name="email"
                        className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
                        value={khachHang.email}
                        onChange={handleChange}
                        style={{width: '100vh'}}
                    />
                    {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
                </div></div>
                <div className="form-group">
                    <label>Số Điện Thoại:</label>
                    <div>
                    <input
                        type="text"
                        name="soDienThoai"
                        className={`form-control ${fieldErrors.soDienThoai ? 'is-invalid' : ''}`}
                        value={khachHang.soDienThoai}
                        onChange={handleChange}
                        style={{width: '100vh'}}
                    />
                    {fieldErrors.soDienThoai && <div className="invalid-feedback">{fieldErrors.soDienThoai}</div>}
                </div></div>
                <div className="form-group">
                    <label>CCCD:</label>
                    <div>
                    <input
                        type="text"
                        name="cccd"
                        className={`form-control ${fieldErrors.cccd ? 'is-invalid' : ''}`}
                        value={khachHang.cccd}
                        onChange={handleChange}
                        style={{width: '100vh'}}
                    />
                    {fieldErrors.cccd && <div className="invalid-feedback">{fieldErrors.cccd}</div>}
                </div></div>
                <div className="form-group">
                    <label>Giới Tính:</label>
                    <div>
                    <select
                        name="gioiTinhEnum"
                        className={`form-control ${fieldErrors.gioiTinhEnum ? 'is-invalid' : ''}`}
                        value={khachHang.gioiTinhEnum}
                        onChange={handleChange}
                        style={{width: '100vh'}}
                    >
                        <option value="NAM">Nam</option>
                        <option value="NU">Nữ</option>
                    </select>
                    {fieldErrors.gioiTinhEnum && <div className="invalid-feedback">{fieldErrors.gioiTinhEnum}</div>}
                </div></div>
                <div className="form-group">
                    <label>Trạng Thái:</label>
                    <div>
                    <select
                        name="trangThaiActive"
                        className={`form-control ${fieldErrors.trangThaiActive ? 'is-invalid' : ''}`}
                        value={khachHang.trangThaiActive}
                        onChange={handleChange}
                        style={{width: '100vh'}}
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="IN_ACTIVE">Inactive</option>
                    </select>
                    {fieldErrors.trangThaiActive && <div className="invalid-feedback">{fieldErrors.trangThaiActive}</div>}
                </div></div>
                <PermissionEditButton feature="Quản lí khách hàng">
                    <button type="submit" className="btn btn-primary">Cập nhật</button>
                </PermissionEditButton>
            </form>
        </div>
    );
};

export default KhachHangEdit;
