import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

const TaiKhoanEdit = () => {
    const { idTaiKhoan } = useParams();
    const [taiKhoan, setTaiKhoan] = useState({
        tenDangNhap: '',
        matKhau: '',
        quyen: '',
        nhanVien: '',
        thoiGianTao: '',
        trangThaiActive: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({}); // State để lưu lỗi cho từng trường

    const params = useParams();
    console.log("Params:", params); // Kiểm tra toàn bộ đối tượng params

    // Fetch thông tin khách hàng khi component được mount
    useEffect(() => {
        axios.get(`${API_URL}/taikhoan/${idTaiKhoan}`)
            .then(response => {
                setPhuongThucTT(response.data.data);
                setLoading(false);
                console.log("Data fetched for account:", response.data.data);
            })
            .catch(error => {
                setError('Failed to fetch account data');
                setLoading(false);
            });
    }, [idTaiKhoan]);

    // Xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        try {
            const response = await axios.put(`${API_URL}/updateTaiKhoan/${idTaiKhoan}`, taiKhoan);
            console.log('Customer updated successfully!', response.data);
            window.location.href = '/admin/taikhoan'; // Chuyển hướng đến danh sách khách hàng
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
        setTaiKhoan({ ...taiKhoan, [name]: value });
        // Xóa lỗi cho trường đã chỉnh sửa
        setFieldErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="edit-form">
            <h2>Chỉnh sửa thông tin tài khoản</h2>
            <form style={{margin: '20px'}} onSubmit={handleSubmit}>
                <div className="mb-3">
                 <label className="form-label">Tên đăng nhập</label>
                 <input 
                    type="text" 
                    className={`form-control form-control-lg ${fieldErrors.tenDangNhap ? 'is-invalid' : ''}`}
                    value={tenDangNhap}
                    onChange={(e) => setTenDangNhap(e.target.value)}
                    id="tenDangNhap"
                 />
                 {fieldErrors.tenDangNhap && <div className="invalid-feedback">{fieldErrors.tenDangNhap}</div>} {/* Hiển thị thông báo lỗi */}
                </div>
                <div className="mb-3">
                    <label className="form-label">Mật khẩu</label>
                    <input 
                        type="password" 
                        className={`form-control form-control-lg`} 
                        value={matKhau}
                        onChange={(e) => setMatKhau(e.target.value)}
                        id="matKhau"
                    />
                </div>
                    {fieldErrors.matKhau && <div className="invalid-feedback">{fieldErrors.matKhau}</div>} {/* Hiển thị thông báo lỗi */}
                <div className="mb-3">
                    <label className="form-label">Nhân viên</label>
                    <select className="form-select" onChange={(e) => setNhanVien(e.target.value)} value={nhanVien.hoTen} id="nhanVien">
                        <option >Open this select menu</option>
                    </select>
                </div>
                    {fieldErrors.nhanVien && <div className="invalid-feedback">{fieldErrors.nhanVien}</div>} {/* Hiển thị thông báo lỗi */}
                <div className="mb-3">
                    <label className="form-label">Quyền</label>
                    <select className="form-select" onChange={(e) => setQuyen(e.target.value)} value={quyen.tenQuyen} id="quyen" defaultValue="3">
                        <option >Open this select menu</option>
                    </select>
                </div>
                    {fieldErrors.quyen && <div className="invalid-feedback">{fieldErrors.quyen}</div>} {/* Hiển thị thông báo lỗi */}
                <div className="mb-3">
                    <label className="form-label">Trạng thái</label>
                    <select
                        className={`form-control form-control-lg ${fieldErrors.trangThaiActive ? 'is-invalid' : ''}`} 
                        value={trangThaiActive}
                        onChange={(e) => setTrangThaiActive(e.target.value)}
                    >
                        <option value="ACTIVE">Kích Hoạt</option>
                        <option value="INACTIVE">Không Kích Hoạt</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Cập nhật</button>
            </form>
        </div>
    );
};

export default TaiKhoanEdit;
