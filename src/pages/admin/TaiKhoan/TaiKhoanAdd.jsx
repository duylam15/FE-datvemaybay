import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios-80802';

const API_URL = 'http://localhost:8080';

const TaiKhoanAdd = () => {
    const [tenDangNhap, setTenDangNhap] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [quyen, setQuyen] = useState('');
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
                const responses = await Promise.allSettled([
                    fetch(`${API_URL}/admin/nhanvien/getallnhanvien`),
                    fetch(`${API_URL}/quyen?size=100`),
                    fetch(`${API_URL}/khachhang/getKhachHangChuaCoTaiKhoan`)
                ]);

                const [nhanVienResponse, quyenResponse, khachHangResponse] = responses;

                // Kiểm tra trạng thái từng phản hồi và lấy dữ liệu nếu thành công
                if (nhanVienResponse.status === 'fulfilled' && nhanVienResponse.value.ok) {
                    const nhanVienData = await nhanVienResponse.value.json();
                    setListNhanVien(nhanVienData.data);
                } else {
                    console.error('Error fetching nhanvien:', nhanVienResponse.reason || nhanVienResponse.value.statusText);
                }

                if (quyenResponse.status === 'fulfilled' && quyenResponse.value.ok) {
                    const quyenData = await quyenResponse.value.json();
                    setListQuyen(quyenData.data.content);
                } else {
                    console.error('Error fetching roles:', quyenResponse.reason || quyenResponse.value.statusText);
                }

                if (khachHangResponse.status === 'fulfilled' && khachHangResponse.value.ok) {
                    const khachHangData = await khachHangResponse.value.json();
                    setListKhachHang(khachHangData.data);
                } else {
                    console.error('Error fetching customers:', khachHangResponse.reason || khachHangResponse.value.statusText);
                }

            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            }
        };
        fetchData();
    }, []);

    const [accountType, setAccountType] = useState('employee'); // Thêm state cho loại tài khoản

    const handleAccountTypeChange = (event) => {
        const selectedType = event.target.value
        setAccountType(selectedType); // Cập nhật giá trị accountType
        if (selectedType === 'employee') {
            setKhachHang(null);
        } else {
            setNhanVien(null);
            const selectedQuyen = listQuyen.find(q => q.idQuyen === 2);
            setQuyen(selectedQuyen);
        }
    };

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
            thoiGianTao: new Date().toISOString().split('T')[0],
            trangThaiActive,
        };
        // Kiểm tra nếu trường `nhanVien` bị bỏ trống
        if (accountType === 'employee') {
            if (!nhanVien) {
                setFieldErrors(prevErrors => ({
                    ...prevErrors,
                    nhanVien: "Nhân viên không được bỏ trống!"
                }));
                return; // Dừng lại và không gửi form nếu có lỗi
            }

        } else {
            if (!khachHang) {
                setFieldErrors(prevErrors => ({
                    ...prevErrors,
                    khachHang: "Khách hàng không được bỏ trống!"
                }));
                return; // Dừng lại và không gửi form nếu có lỗi
            }
        }

        try {
            const response = await axios.post(`${API_URL}/taikhoan/addNewTaiKhoan`, taiKhoan);
            console.log("response: ", response);


            if (response.statusCode == 400) {
                const errors = response.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors);
            } else
                message.success('Thêm tài khoản thành công!')
            navigate('/admin/taikhoan');
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi của backend
            if (error.response && error.response.data) {
                const errors = error.response.data.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors); // Cập nhật lỗi cho từng trường
            } else {
                setError('Đã xảy ra lỗi trong quá trình thêm tài khoản!'); // Đặt thông báo lỗi chung
            }
            console.error('There was an error adding account!', error);
        }


    };

    return (
        <div className="add-form taikhoan-add">
            <h1>Tạo Tài Khoản</h1>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        name="accountType"
                        value="employee"
                        onChange={handleAccountTypeChange}
                        defaultChecked
                    />{' '}
                    Nhân viên
                </label>
                <label>
                    <input
                        type="radio"
                        name="accountType"
                        value="customer"
                        onChange={handleAccountTypeChange}
                    />{' '}
                    Khách hàng
                </label>
            </div>

            <form style={{ margin: '20px' }} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên đăng nhập</label>
                    <input
                        type="text"
                        name="tenDangNhap"
                        className={`form-control form-control-lg ${fieldErrors?.tenDangNhap ? 'is-invalid' : ''}`}
                        value={tenDangNhap || ''}
                        onChange={(e) => setTenDangNhap(e.target.value)}
                        id="tenDangNhap"
                    />
                    {fieldErrors?.tenDangNhap && <div className="invalid-feedback">{fieldErrors?.tenDangNhap}</div>} {/* Hiển thị thông báo lỗi */}
                </div>

                <div className="mb-3">
                    <label className="form-label">Mật khẩu</label>
                    <input
                        name="matKhau"
                        type="password"
                        className={`form-control form-control-lg ${fieldErrors?.matKhau ? 'is-invalid' : ''}`}
                        value={matKhau}
                        onChange={(e) => setMatKhau(e.target.value)}
                        id="matKhau"
                    />
                    {fieldErrors?.matKhau && (
                        <div className="invalid-feedback">{fieldErrors?.matKhau}</div>
                    )}
                </div>

                {accountType === 'customer' && (
                    <div className="mb-3">
                        <label className="form-label">Khách hàng</label>
                        <select
                            className={`form-control form-control-lg ${fieldErrors?.khachHang ? 'is-invalid' : ''}`}
                            onChange={handleChange}
                            value={khachHang?.idKhachHang || ''}
                            id="khachHang"
                            name="khachHang"
                        >
                            <option value="">Chọn khách hàng</option>
                            {listKhachHang.map((kh) => (
                                <option value={kh.idKhachHang} key={kh.idKhachHang}>
                                    {kh.idKhachHang} - {kh.hoTen}
                                </option>
                            ))}
                        </select>
                        {fieldErrors?.khachHang && (
                            <div className="invalid-feedback">{fieldErrors?.khachHang}</div>
                        )}
                    </div>
                )}

                {accountType === 'employee' && (
                    <>
                        <div className="mb-3">
                            <label className="form-label">Nhân viên</label>
                            <select
                                className={`form-control form-control-lg ${fieldErrors?.nhanVien ? 'is-invalid' : ''}`}
                                onChange={handleChange}
                                value={nhanVien?.idNhanVien || ''}
                                id="nhanVien"
                                name="nhanVien"
                            >
                                <option value="">Chọn nhân viên</option>
                                {listNhanVien.map((nv) => (
                                    <option value={nv.idNhanVien} key={nv.idNhanVien}>
                                        {nv.idNhanVien} - {nv.hoTen}
                                    </option>
                                ))}
                            </select>
                            {fieldErrors?.nhanVien && (
                                <div className="invalid-feedback">{fieldErrors?.nhanVien}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Quyền</label>
                            <select
                                className={`form-control form-control-lg ${fieldErrors?.quyen ? 'is-invalid' : ''}`}
                                onChange={handleChange}
                                value={quyen?.idQuyen || ''}
                                name="quyen"
                            >
                                <option value="">Chọn quyền</option>
                                {listQuyen.map((quyen) => (
                                    <option value={quyen.idQuyen} key={quyen.idQuyen}>
                                        {quyen.idQuyen} - {quyen.tenQuyen}
                                    </option>
                                ))}
                            </select>
                            {fieldErrors?.quyen && (
                                <div className="invalid-feedback">{fieldErrors?.quyen}</div>
                            )}
                        </div>
                    </>
                )}
                <div className='add-btn-group'>
                    <button type='button' className='btn btn-primary' onClick={() => navigate("/admin/taikhoan")}>Quay lại</button>
                    <button type="submit" className="btn btn-primary">Thêm</button>
                </div>

            </form>

        </div>
    );
};

export default TaiKhoanAdd;