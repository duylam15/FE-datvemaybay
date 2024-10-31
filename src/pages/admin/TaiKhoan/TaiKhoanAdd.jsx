import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const TaiKhoanAddForm = () => {
    const [tenDangNhap, setTenDangNhap] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [quyen, setQuyen] = useState(null);
    const [khachHang, setKhachHang] = useState(null);
    const [nhanVien, setNhanVien] = useState(null);
    const [thoiGianTao, setThoiGianTao] = useState('');
    const [trangThaiActive, setTrangThaiActive] = useState('ACTIVE');
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    const [listNhanVien, setListNhanVien] = useState([]);
    const [listQuyen, setListQuyen] = useState([]);
    const [listKhachHang, setListKhachHang] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [nhanVienResponse, quyenResponse, khachHangResponse] = await Promise.all([
                    fetch(`${API_URL}/admin/nhanvien/getallnhanvien`),
                    fetch(`${API_URL}/quyen`),
                    fetch(`${API_URL}/khachhang/getKhachHangChuaCoTaiKhoan`)
                ]);

                if (!nhanVienResponse.ok) throw new Error('Failed to fetch nhanvien');
                if (!quyenResponse.ok) throw new Error('Failed to fetch roles');
                if (!khachHangResponse.ok) throw new Error('Failed to fetch customers');

                const nhanVienData = await nhanVienResponse.json();
                const quyenData = await quyenResponse.json();
                const khachHangData = await khachHangResponse.json();

                setListNhanVien(nhanVienData.data);
                setListQuyen(quyenData.data.content);
                setListKhachHang(khachHangData.data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'nhanVien') {
            const selectedNhanVien = listNhanVien.find(nv => nv.idNhanVien === parseInt(value, 10));
            setNhanVien(selectedNhanVien);
        } else if (name === 'quyen') {
            const selectedQuyen = listQuyen.find(q => q.idQuyen === parseInt(value, 10));
            setQuyen(selectedQuyen);
        } else if (name === 'khachHang') {
            const selectedKhachHang = listKhachHang.find(kh => kh.idKhachHang === parseInt(value, 10));
            setKhachHang(selectedKhachHang);
        }

        setFieldErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentTime = new Date().toISOString(); // Hoặc sử dụng Date.now() nếu bạn muốn dạng timestamp
        setThoiGianTao(currentTime);
        const taiKhoan = {
            tenDangNhap,
            matKhau,
            quyen,
            khachHang,
            nhanVien,
            thoiGianTao: currentTime,
            trangThaiActive,
        };
        try {
            const response = await axios.post(`${API_URL}/taikhoan/addNewTaiKhoan`, taiKhoan);
            console.log('Thêm tài khoản thành công', response.data);
            navigate('/admin/taikhoan');
        } catch (error) {
            console.log("Tai khoan can them: ", taiKhoan)
            if (error.response && error.response.data) {
                const errors = error.response.data.data;
                console.log(errors);
                setFieldErrors(errors);
            } else {
                setError('Đã xảy ra lỗi trong quá trình thêm tài khoản!');
            }
            console.error('There was an error adding account!', error);
        }
    };

    return (
        <div className="edit-form">
            <h2>Thêm thông tin tài khoản</h2>
            <form style={{ margin: '20px' }} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên đăng nhập</label>
                    <input 
                        type="text" 
                        name='tenDangNhap'
                        className={`form-control form-control-lg ${fieldErrors.tenDangNhap ? 'is-invalid' : ''}`}
                        value={tenDangNhap || ''} // Sử dụng giá trị mặc định
                        onChange={(e) => setTenDangNhap(e.target.value)}
                        id="tenDangNhap"
                        required
                    />
                    {fieldErrors.tenDangNhap && <div className="invalid-feedback">{fieldErrors.tenDangNhap}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Mật khẩu</label>
                    <input 
                        name='matKhau'
                        type="password" 
                        className={`form-control form-control-lg ${fieldErrors.matKhau ? 'is-invalid' : ''}`} 
                        value={matKhau}
                        onChange={(e) => setMatKhau(e.target.value)}
                        id="matKhau"
                        required
                    />
                    {fieldErrors.matKhau && <div className="invalid-feedback">{fieldErrors.matKhau}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Khách hàng</label>
                    <select className={`form-control form-control-lg`} 
                            onChange={handleChange} 
                            value={khachHang?.idKhachHang || ''} 
                            id="khachHang"
                            name='khachHang'
                    >
                        <option value="">Chọn khách hàng</option>
                        {listKhachHang.map(kh => (
                            <option value={kh.idKhachHang} key={kh.idKhachHang}>
                                {kh.idKhachHang} - {kh.hoTen}
                            </option>
                        ))}
                    </select>
                    {fieldErrors.khachHang && <div className="invalid-feedback">{fieldErrors.khachHang}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Nhân viên</label>
                    <select className={`form-control form-control-lg`} 
                            onChange={handleChange} 
                            value={nhanVien?.idNhanVien || ''} 
                            id="nhanVien"
                            name='nhanVien'
                    >
                        <option value="">Chọn nhân viên</option>
                        {listNhanVien.map(nv => (
                            <option value={nv.idNhanVien} key={nv.idNhanVien}>
                                {nv.idNhanVien} - {nv.hoTen}
                            </option>
                        ))}
                    </select>
                    {fieldErrors.nhanVien && <div className="invalid-feedback">{fieldErrors.nhanVien}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Quyền</label>
                    <select className={`form-control form-control-lg ${fieldErrors.quyen ? 'is-invalid' : ''}`} 
                            onChange={handleChange} 
                            value={quyen?.idQuyen || ''} 
                            id="quyen" 
                            name='quyen'
                            required
                    >
                        <option value="">Chọn quyền</option>
                        {listQuyen.map(q => (
                            <option value={q.idQuyen} key={q.idQuyen}>
                                {q.idQuyen} - {q.tenQuyen}
                            </option>
                        ))}
                    </select>
                    {fieldErrors.quyen && <div className="invalid-feedback">{fieldErrors.quyen}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Trạng thái</label>
                    <select
                        name='trangThaiActive'
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
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default TaiKhoanAddForm;