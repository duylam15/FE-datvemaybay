import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SoundTwoTone } from '@ant-design/icons';

const API_URL = 'http://localhost:8080';

const TaiKhoanAddForm = () => {
    const [tenDangNhap, setTenDangNhap] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [quyen, setQuyen] = useState('');
    const [nhanVien, setNhanVien] = useState('');
    const [thoiGianTao, setThoiGianTao] = useState('');
    const [trangThaiActive, setTrangThaiActive] = useState('ACTIVE');
    const [error, setError] = useState(null); 
    const [fieldErrors, setFieldErrors] = useState({}); // Thêm state cho lỗi từng trường
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const now = new Date();
        const currentTime = now.toLocaleTimeString();
        setThoiGianTao(currentTime);
        console.log(tenDangNhap);
        const taiKhoan = {
            tenDangNhap,
            matKhau,
            quyen,
            nhanVien,
            thoiGianTao,
            trangThaiActive,
        };

        try {
            const response = await axios.post(`${API_URL}/taikhoan/addTaiKhoan`, taiKhoan);
            console.log('Thêm tài khoản thành công', response.data);
            navigate('/admin/taikhoan'); // Điều hướng về trang danh sách khách hàng
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi của backend
            if (error.response && error.response.data) {
                const errors = error.response.data.data; // Lấy danh sách lỗi từ phản hồi
                console.log(errors);
                setFieldErrors(errors); // Cập nhật lỗi cho từng trường
            } else {
                setError('Đã xảy ra lỗi trong quá trình thêm tài khoản!'); // Đặt thông báo lỗi chung
            }
            console.error('There was an error adding account!', error);
        }
    };

    return (
        <div className="add-form">
            <h2>Thêm tài khoản</h2>
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
             <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        
    );
};

export default TaiKhoanAddForm;