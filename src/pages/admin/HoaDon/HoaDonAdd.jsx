import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getHoaDon } from '../../../services/hoaDonService';

const API_URL = 'http://localhost:8080';

const HoaDonAdd = () => {
    const [khachHang, setKhachHang] = useState();
    const [nhanVien, setNhanVien] = useState('');
    const [soLuongVe, setSoLuongVe] = useState('');
    const [loaiHoaDon, setLoaiHoaDon] = useState('');
    const [phuongThucThanhToan, setPhuongThucThanhToan] = useState('');
    const [tongTien, setTongTien] = useState('');
    const [thoiGianLap, setThoiGianLap] = useState('');
    const [trangThaiActive, setTrangThaiActive] = useState('ACTIVE');
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({}); // Thêm state cho lỗi từng trường
    const navigate = useNavigate();
    const [khachHangList, setKhachHangList] = useState([]);
    const [loaiHoaDonList, setLoaiHoaDonList] = useState([]);
    const [phuongThucThanhToanList, setPhuongThucThanhToanList] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const hoaDon = {
            khachHang,
            nhanVien,
            soLuongVe,
            loaiHoaDon,
            phuongThucThanhToan,
            tongTien,
            thoiGianLap,
            trangThaiActive
        };

        try {
            const response = await axios.post(`${API_URL}/addHoaDon`, hoaDon);
            console.log('Thêm hóa đơn thành công', response.data);
            navigate('/hoadon'); // Điều hướng về trang danh sách khách hàng
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi của backend
            if (error.response && error.response.data) {
                const errors = error.response.data.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors); // Cập nhật lỗi cho từng trường
            } else {
                setError('Đã xảy ra lỗi trong quá trình thêm hóa đơn!'); // Đặt thông báo lỗi chung
            }
            console.error('There was an error adding bill!', error);
        }
    };


    useEffect(() => {
        fetchKhachHang();
        fetchLoaiHoaDonList();
        fetchPTTTList();
    }, []);
    
    const fetchKhachHang = async () => {
        try {
            const response = await fetch(`${API_URL}/getAllCustomer`);
            const data = await response.json();
            setKhachHangList(data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách khách hàng:', error);
        }
    };

    const fetchLoaiHoaDonList = async () => {
        try {
            const response = await fetch(`${API_URL}/getAllLoaiHD`);
            const data = await response.json();
            setLoaiHoaDonList(data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách loại hóa đơn:', error);
        }
    };

    const fetchPTTTList = async () => {
        try {
            const response = await fetch(`${API_URL}/getAllPTTT`);
            const data = await response.json();
            setPhuongThucThanhToanList(data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách phương thức thanh toán:', error);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
             <div className="mb-3">
                 <label className="form-label">Khách hàng</label>
                 <select
                    className={`form-control ${fieldErrors.khachHang ? 'is-invalid' : ''}`}
                    value={khachHang}
                    onChange={(e) => setKhachHang(e.target.value)}
                >
                    <option value="" selected>Chọn khách hàng</option>
                    {khachHangList.map((kh) => (
                        <option key={kh.idKhachHang} value={kh.idKhachHang}>
                            {kh.hoTen}
                        </option>
                    ))}
                </select>
                 {fieldErrors.khachHang && <div className="invalid-feedback">{fieldErrors.khachHang}</div>} {/* Hiển thị thông báo lỗi */}
             </div>
             <div className="mb-3">
                 <label className="form-label">Nhân viên</label>
                 <select
                    className={`form-control ${fieldErrors.nhanVien ? 'is-invalid' : ''}`}
                    value={nhanVien}
                    onChange={(e) => setNhanVien(e.target.value)}
                >
                    <option value="">Chọn nhân viên</option> {/*lấy tạm danh sách khách hàng*/}
                    {khachHangList.map((kh) => (
                        <option key={kh.idKhachHang} value={kh.idKhachHang}>
                            {kh.hoTen}
                        </option>
                    ))}
                </select>
                 {fieldErrors.nhanVien && <div className="invalid-feedback">{fieldErrors.nhanVien}</div>} {/* Hiển thị thông báo lỗi */}
             </div>
             <div className="mb-3">
                 <label className="form-label">Số lượng vé</label>
                 <input 
                    type="text" 
                    className={`form-control`} 
                    value={soLuongVe}
                    onChange={(e) => setSoLuongVe(e.target.value)}
                 />
                 {fieldErrors.soLuongVe && <div className="invalid-feedback">{fieldErrors.soLuongVe}</div>} {/* Hiển thị thông báo lỗi */}
             </div>
             <div className="mb-3">
                 <label className="form-label">Loại hóa đơn</label>
                 <select
                    className={`form-control ${fieldErrors.loaiHoaDon ? 'is-invalid' : ''}`}
                    value={loaiHoaDon}
                    onChange={(e) => setLoaiHoaDon(e.target.value)}
                >
                    <option value="">Chọn loại hóa đơn</option>
                    {loaiHoaDonList.map((lhd) => (
                        <option key={lhd.idLoaiHD} value={lhd.idLoaiHD}>
                            {lhd.tenLoaiHD}
                        </option>
                    ))}
                </select>
                 {fieldErrors.loaiHoaDon && <div className="invalid-feedback">{fieldErrors.loaiHoaDon}</div>} {/* Hiển thị thông báo lỗi */}
             </div>
             <div className="mb-3">
                 <label className="form-label">Phương thức thanh toán</label>
                 <select
                    className={`form-control ${fieldErrors.loaiHoaDon ? 'is-invalid' : ''}`}
                    value={phuongThucThanhToan}
                    onChange={(e) => setPhuongThucThanhToan(e.target.value)}
                >
                    <option value="">Chọn phương thức thanh toán</option>
                    {phuongThucThanhToanList.map((pttt) => (
                        <option key={pttt.idPTTT} value={pttt.idPTTT}>
                            {pttt.tenPTTT}
                        </option>
                    ))}
                </select>
                 {fieldErrors.phuongThucThanhToan && <div className="invalid-feedback">{fieldErrors.phuongThucThanhToan}</div>} {/* Hiển thị thông báo lỗi */}
             </div>
             <div className="mb-3">
                 <label className="form-label">Tổng tiền</label>
                 <input 
                    type="text" 
                    className={`form-control`} 
                    value={tongTien}
                    onChange={(e) => setTongTien(e.target.value)}
                    disabled="true"
                 />
                 {fieldErrors.tongTien && <div className="invalid-feedback">{fieldErrors.tongTien}</div>} {/* Hiển thị thông báo lỗi */}
             </div>
             <div className="mb-3">
                 <label className="form-label">Trạng thái</label>
                 <select
                    className={`form-control ${fieldErrors.trangThaiActive ? 'is-invalid' : ''}`} 
                    value={trangThaiActive}
                    onChange={(e) => setTrangThaiActive(e.target.value)}
                >
                    <option value="ACTIVE">Kích Hoạt</option>
                    <option value="INACTIVE">Không Kích Hoạt</option>
                </select>
             </div>
             <button type="submit" className="btn btn-primary">Submit</button>
         </form>
    );

}

export default HoaDonAdd;