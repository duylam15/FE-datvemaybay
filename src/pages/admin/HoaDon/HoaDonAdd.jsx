import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getHoaDon } from '../../../services/hoaDonService';

const API_URL = 'http://localhost:8080';

const HoaDonAdd = () => {
    const [khachHang, setKhachHang] = useState();
    const [nhanVien, setNhanVien] = useState('');
    const [loaiHoaDon, setLoaiHoaDon] = useState('');
    const [phuongThucThanhToan, setPhuongThucThanhToan] = useState('');
    const [tongTien, setTongTien] = useState('');
    const [trangThaiActive, setTrangThaiActive] = useState('PENDING');

    const [loaiHangHoa, setLoaiHangHoa] = useState('');
    const [tenHangHoa, setTenHangHoa] = useState('');
    const [taiTrong, setTaiTrong] = useState('');
    const [giaPhatSinh, setGiaPhatSinh] = useState('');

    const [idHangHoa, setIdHangHoa] = useState('');
    const [soTien, setSoTien] = useState('');
    
    const [ve, setVe] = useState('');

    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({}); // Thêm state cho lỗi từng trường
    const navigate = useNavigate();

    const [khachHangList, setKhachHangList] = useState([]);
    const [nhanVienList, setNhanVienList] = useState([]);
    const [loaiHoaDonList, setLoaiHoaDonList] = useState([]);
    const [phuongThucThanhToanList, setPhuongThucThanhToanList] = useState([]);
    const [veList, setVeList] = useState([]);

    const [showVeDropdown, setShowVeDropdown] = useState(false);

    const handleLoaiHoaDonChange = (e) => {
        const selectedLoaiHoaDon = parseInt(e.target.value, 10);
        setLoaiHoaDon({ ...loaiHoaDon, idLoaiHoaDon: selectedLoaiHoaDon });
        console.log(veList);
        // Kiểm tra nếu loại hóa đơn có id = 1 thì hiển thị dropdown Vé
        setShowVeDropdown(selectedLoaiHoaDon === 1);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const hangHoa = 
            {
                tenHangHoa,
                idLoaiHangHoa: 3,
                taiTrong,
                giaPhatSinh,
                trangThaiActive: 'ACTIVE',
            }
            
        

        try {
            // Thêm hàng hóa mới và lấy ID của hàng hóa từ phản hồi
            const hangHoaResponse = await axios.post(`${API_URL}/addNewMerchandise`, hangHoa);
            const idHangHoa = hangHoaResponse.data.data.idHangHoa;
            setIdHangHoa(idHangHoa);
    
            // Tạo chi tiết hóa đơn với idHangHoa đã được gán
            const chiTietHoaDonDTOList = [
                {
                    ve: null,
                    soTien,
                },
            ];
    
            const hoaDonDTO = {
                khachHang: { idKhachHang: khachHang },
                nhanVien: { idNhanVien: nhanVien },
                soLuongVe: 0,
                loaiHoaDon,
                phuongThucThanhToan: { idPhuongThucTT: phuongThucThanhToan },
                tongTien,
                thoiGianLap: new Date(),
                trangThaiActive: 'PENDING',
            };
    
            const hoaDonCreate = {
                hoaDonDTO,
                chiTietHoaDonDTOList
            };
    
            // Thêm hóa đơn
            const response = await axios.post(`${API_URL}/createHoaDon`, hoaDonCreate);
            console.log('Thêm hóa đơn thành công', response.data);
            navigate('/admin/hoadon');
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = error.response.data.data;
                setFieldErrors(errors);
            } else {
                setError('Đã xảy ra lỗi trong quá trình thêm hóa đơn!');
            }
            console.error('There was an error adding bill!', error);
        }
    };


    useEffect(() => {
        fetchKhachHang();
        fetchLoaiHoaDonList();
        fetchPTTTList();
        fetchNhanVien();
        fetchLoaiHangHoa();
        fetchAvailableVe();
    }, []);

    
    const fetchLoaiHangHoa = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/loaiHangHoa/3`);
            setLoaiHangHoa(response.data.data);
        } catch (error) {
            console.error('Error fetching LoaiHangHoa list:', error);
        }
    }

    const fetchKhachHang = async () => {
        try {
            const response = await fetch(`${API_URL}/khachhang/getAllCustomer`);
            const data = await response.json();
            setKhachHangList(data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách khách hàng:', error);
        }
    };

    const fetchNhanVien = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/nhanvien/getallnhanvien`);
            const data = await response.json();
            setNhanVienList(data.data);
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

    const fetchAvailableVe = async () => {
        try {
            const response = await axios.get(`${API_URL}/ve`);
            setVeList(response.data.data.content); // Truy cập trực tiếp vào `response.data`
        } catch (error) {
            console.error('Lỗi khi lấy danh sách vé:', error);
        }
    };

    return (
        <>
        <h1 style={{"fontSize": "1.4em", "padding": "10px 0px", "margin": "20px 0px"}}>Thêm hóa đơn hàng hóa</h1>
        <form onSubmit={handleSubmit} className="row">
             <div className="mb-3 col-4">
                 <label className="form-label">Khách hàng</label>
                 <select
                    className={`form-control`}
                    value={khachHang}
                    onChange={(e) => setKhachHang(parseInt(e.target.value), 10)}
                >
                    <option value="">Chọn khách hàng</option>
                    {khachHangList.filter(kh => kh.trangThaiActive !== 'IN_ACTIVE').map((kh) => (
                        <option key={kh.idKhachHang} value={kh.idKhachHang}>
                            {kh.hoTen}
                        </option>
                    ))}
                </select>
             </div>
             <div className="mb-3 col-4">
                 <label className="form-label">Nhân viên</label>
                 <select
                    className={`form-control`}
                    value={nhanVien}
                    onChange={(e) => setNhanVien(parseInt(e.target.value), 10)}
                >
                    <option value="">Chọn nhân viên</option> {/*lấy tạm danh sách khách hàng*/}
                    {nhanVienList.filter(nv => nv.trangThaiActive !== 'IN_ACTIVE').map((nv) => (
                        <option key={nv.idNhanVien} value={nv.idNhanVien}>
                            {nv.hoTen}
                        </option>
                    ))}
                </select>
             </div>
             <div className="mb-3 col-4">
                <label className="form-label">Loại hóa đơn</label>
                <select
                    className="form-control"
                    value={loaiHoaDon.idLoaiHoaDon || ""}
                    onChange={handleLoaiHoaDonChange}
                >
                    <option value="">Chọn loại hóa đơn</option>
                    {loaiHoaDonList
                        .filter((lhd) => lhd.status !== 'IN_ACTIVE')
                        .map((lhd) => (
                            <option key={lhd.idLoaiHD} value={lhd.idLoaiHD}>
                                {lhd.tenLoaiHD}
                            </option>
                        ))}
                </select>
            </div>

            {showVeDropdown && (
                <div className="mb-3 col-4">
                    <label className="form-label">Vé</label>
                    <select
                        className="form-control"
                        value={ve.idVe || ""}
                        onChange={(e) => setVe({ idVe: parseInt(e.target.value, 10) })}
                    >
                        <option value="">Chọn vé</option>
                        {veList
                            .filter((ve) => ve.status !== 'IN_ACTIVE')
                            .map((ve) => (
                                <option key={ve.idVe} value={ve.idVe}>
                                    {ve.maVe}
                                </option>
                            ))}
                    </select>
                </div>
            )}
             <div className="mb-3 col-4">
                 <label className={`form-label`}>Tên hàng hóa</label>
                 <input 
                    type="text" 
                    className={`form-control`} 
                    value={tenHangHoa}
                    onChange={(e) => setTenHangHoa(e.target.value)}
                 />
             </div>
             <div className="mb-3 col-4">
                 <label className={`form-label `}>Tải trọng</label>
                 <input 
                    type="text" 
                    className={`form-control`} 
                    value={taiTrong}
                    onChange={(e) =>{ 
                        setTaiTrong(e.target.value);
                        setGiaPhatSinh(e.target.value*loaiHangHoa.giaThemMoiKg);
                        setTongTien(e.target.value*loaiHangHoa.giaThemMoiKg);
                    }}
                 />
                </div>
             <div className="mb-3 col-4">
                 <label className={`form-label`}>Giá phát sinh</label>
                 <input 
                    type="text" 
                    className={`form-control`} 
                    value={giaPhatSinh}
                    disabled={true}
                    onChange={(e) => setGiaPhatSinh(e.target.value)}
                 />
             </div>
             <div className="mb-3 col-4">
                 <label className="form-label">Phương thức thanh toán</label>
                 <select
                    className={`form-control`}
                    value={phuongThucThanhToan}
                    onChange={(e) => setPhuongThucThanhToan(parseInt(e.target.value), 10)}
                >
                    <option value="">Chọn phương thức thanh toán</option>
                    {phuongThucThanhToanList
                        .filter(pttt => pttt.status !== 'IN_ACTIVE') // Lọc các phương thức thanh toán
                        .map((pttt) => (
                            <option key={pttt.idPTTT} value={pttt.idPTTT}>
                                {pttt.tenPTTT}
                            </option>
                        ))}
                </select>
             </div>
             <div className="mb-3 col-10">
                 <label className="form-label">Tổng tiền</label>
                 <input 
                    type="text" 
                    className={`form-control`} 
                    value={tongTien}
                    onChange={(e) => setTongTien(e.target.value)}
                    disabled={true}
                 />
             </div>
             
             <button type="submit" className="btn btn-primary">Submit</button>
         </form>
        </>
    );

}

export default HoaDonAdd;