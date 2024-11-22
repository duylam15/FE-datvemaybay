import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios-80802';
import { message } from 'antd';

const API_URL = 'http://localhost:8080';

const TaiKhoanEdit = () => {
    const { idTaiKhoan } = useParams();
    const [taiKhoan, setTaiKhoan] = useState({
        tenDangNhap: '',
        matKhau: '',
        quyen: null,
        khachHang: null,
        nhanVien: null,
        thoiGianTao: '',
        trangThaiActive: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const [listNhanVien, setListNhanVien] = useState([]);
    const [listQuyen, setListQuyen] = useState([]);
    const [listKhachHang, setListKhachHang] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchTaiKhoan = async () => {
            setLoading(true); // Thiết lập loading trước khi bắt đầu fetch
            try {
                const response = await axios.get(`${API_URL}/taikhoan/${idTaiKhoan}`);
                if (response.data && response.data.data) {
                    setTaiKhoan(response.data.data);
                    console.log("Data fetched for account:", response.data.data);
                } else {
                    throw new Error('No account data found');
                }
            } catch (error) {
                setError('Failed to fetch account data');
                console.error('Error fetching account data:', error); // Log lỗi chi tiết
            } finally {
                setLoading(false); // Đảm bảo loading được thiết lập lại ở cuối
            }
        };

        if (idTaiKhoan) { // Kiểm tra xem idTaiKhoan có giá trị không
            fetchTaiKhoan();
        }
    }, [idTaiKhoan]);

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

                const nhanVienData = nhanVienResponse.status === 204 ? { data: { content: [] } } : await nhanVienResponse.json();
                const quyenData = quyenResponse.status === 204 ? { data: { content: [] } } : await quyenResponse.json();
                const khachHangData = khachHangResponse.status === 204 ? { data: { content: [] } } : await khachHangResponse.json();

                console.log(khachHangData);

                setListNhanVien(nhanVienData.data.content || []);
                setListQuyen(quyenData.data.content || []);
                setListKhachHang(khachHangData.data || []);

            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err); // Log lỗi ra console để kiểm tra
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${API_URL}/taikhoan/updateTaiKhoan/${idTaiKhoan}`, taiKhoan);
            console.log("response: ", response);
            
            
            if (response.statusCode == 400) {
                const errors = response.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors);
            } else
                message.success('Sửa tài khoản thành công!');
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'nhanVien') {
            const selectedNhanVien = listNhanVien.find(nv => nv.idNhanVien === parseInt(value, 10));
            setTaiKhoan({ ...taiKhoan, nhanVien: selectedNhanVien });
        } else if (name === 'quyen') {
            const selectedQuyen = listQuyen.find(q => q.idQuyen === parseInt(value, 10));
            setTaiKhoan({ ...taiKhoan, quyen: selectedQuyen });
        } else if (name === 'khachHang') {
            const selectedKhachHang = listKhachHang.find(kh => kh.idKhachHang === parseInt(value, 10));
            setTaiKhoan({ ...taiKhoan, khachHang: selectedKhachHang });
        } else {
            setTaiKhoan({ ...taiKhoan, [name]: value });
        }
        setFieldErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="edit-form">
            <h1>Chỉnh sửa thông tin tài khoản</h1>
            <form style={{ margin: '20px' }} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên đăng nhập</label>
                    <input
                        type="text"
                        name='tenDangNhap'
                        className={`form-control form-control-lg ${fieldErrors?.tenDangNhap ? 'is-invalid' : ''}`}
                        value={taiKhoan.tenDangNhap}
                        onChange={handleChange}
                        id="tenDangNhap"
                    />
                    {fieldErrors?.tenDangNhap && <div className="invalid-feedback">{fieldErrors?.tenDangNhap}</div>} {/* Hiển thị thông báo lỗi */}
                    </div>

                {taiKhoan.khachHang ? (
                    <div className="mb-3">
                        <label className="form-label">Khách hàng</label>
                        <select
                            className={`form-control form-control-lg ${fieldErrors?.khachHang ? 'is-invalid' : ''}`}
                            onChange={handleChange}
                            value={taiKhoan.khachHang?.idKhachHang || ''} // Sử dụng '' làm giá trị mặc định
                            id="khachHang"
                            name="khachHang"
                        >
                            <option value={taiKhoan.khachHang.idKhachHang}>{taiKhoan.khachHang.hoTen}</option>
                            {listKhachHang.leng > 0 ?
                                (listKhachHang.map((kh) => (
                                    <option value={kh.idKhachHang} key={kh.idKhachHang}>
                                        {kh.idKhachHang} - {kh.hoTen}
                                    </option>
                                ))
                                ) : ""}
                        </select>
                        {fieldErrors?.khachHang && <div className="invalid-feedback">{fieldErrors?.khachHang}</div>} {/* Hiển thị thông báo lỗi */}
                    </div>
                ) : (
                    <>
                        <div className="mb-3">
                            <label className="form-label">Nhân viên</label>
                            <select
                                className={`form-control form-control-lg ${fieldErrors?.nhanVien ? 'is-invalid' : ''}`}
                                onChange={handleChange}
                                value={taiKhoan.nhanVien?.idNhanVien || ''}
                                id="nhanVien"
                                name="nhanVien"
                            >
                                <option value={taiKhoan.nhanVien.idNhanVien} key={taiKhoan.nhanVien.idNhanVien}>
                                    {taiKhoan.nhanVien.idNhanVien} - {taiKhoan.nhanVien.hoTen}
                                </option>
                            </select>
                        {fieldErrors?.nhanVien && <div className="invalid-feedback">{fieldErrors?.nhanVien}</div>} {/* Hiển thị thông báo lỗi */}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Quyền</label>
                            <select                                 
                                className={`form-control form-control-lg ${fieldErrors?.quyen ? 'is-invalid' : ''}`}
                                onChange={handleChange}
                                value={taiKhoan.quyen?.idQuyen || ''}
                                id="quyen"
                                name='quyen'
                            >
                                <option value="">Chọn quyền</option>
                                {listQuyen.map(q => (
                                    <option value={q.idQuyen} key={q.idQuyen}>
                                        {q.idQuyen} - {q.tenQuyen}
                                    </option>
                                ))}
                            </select>
                            {fieldErrors?.quyen && <div className="invalid-feedback">{fieldErrors?.quyen}</div>} {/* Hiển thị thông báo lỗi */}
                        </div>
                    </>
                )}


                <div className="mb-3">
                    <label className="form-label">Thời gian tạo</label>
                    <input
                        name='thoiGianTao'
                        type="date"
                        className={`form-control form-control-lg`}
                        value={taiKhoan.thoiGianTao}
                        onChange={handleChange}
                        id="thoiGianTao"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Trạng thái</label>
                    <select
                        name='trangThaiActive'
                        className={`form-control form-control-lg`}
                        value={taiKhoan.trangThaiActive}
                        onChange={handleChange}
                    >
                        <option value="ACTIVE">Kích Hoạt</option>
                        <option value="IN_ACTIVE">Không Kích Hoạt</option>
                    </select>
                </div>
                <div className='add-btn-group'>
                    <button type='button' className='btn btn-primary' onClick={() => navigate("/admin/taikhoan")}>Quay lại</button>
                    <button type="submit" className="btn btn-primary">Cập nhật</button>
                </div>
            </form>
        </div>
    );
};

export default TaiKhoanEdit;
