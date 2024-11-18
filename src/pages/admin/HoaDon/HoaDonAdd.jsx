import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PopupChonChuyenBay from './ChonChuyenBay'; // Import Popup
import ChonVe from './ChonVe';
import FrameVe from './FrameVe'; // Import FrameVe

const API_URL = 'http://localhost:8080';

const HoaDonAdd = () => {
    const userData = JSON.parse(localStorage.getItem("dataNguoiDung")); // Lấy chuỗi JSON từ localStorage

    const [khachHang, setKhachHang] = useState(null);
    const [nhanVien, setNhanVien] = useState(userData.nhanVien.idNhanVien);
    const [loaiHoaDon, setLoaiHoaDon] = useState(''); // radio button value
    const [phuongThucThanhToan, setPhuongThucThanhToan] = useState(null);
    const [tongTien, setTongTien] = useState('');
    const [trangThaiActive, setTrangThaiActive] = useState('PENDING');

    // State cho hàng hóa
    const [loaiHangHoa, setLoaiHangHoa] = useState('');
    const [tenHangHoa, setTenHangHoa] = useState('');
    const [taiTrong, setTaiTrong] = useState('');
    const [giaPhatSinh, setGiaPhatSinh] = useState('');

    // State cho vé
    const [soLuongVe, setSoLuongVe] = useState(1);
    const [isPopupChuyenBayOpen, setIsPopupChuyenBayOpen] = useState(false);
    const [isPopupVeOpen, setIsPopupVeOpen] = useState(false);
    const [selectedChuyenBay, setSelectedChuyenBay] = useState(null);

    const [selectedVe, setSelectedVe] = useState(null);
    const [guestList, setGuestList] = useState([]); // Mảng lưu thông tin hành khách
    const [veList, setVeList] = useState([]);

    const [phuongThucThanhToanList, setPhuongThucThanhToanList] = useState([]);
    const [loaiHoangHoaList, setLoaiHangHoaList] = useState([]);

    const navigate = useNavigate();

    // Mở popup chọn chuyến bay
    const handleOpenPopupChuyenBay = () => {
        setIsPopupChuyenBayOpen(true);
    };

    // Đóng popup chọn chuyến bay
    const handleClosePopupChuyenBay = () => {
        setIsPopupChuyenBayOpen(false);
    };

    // Mở popup chọn vé
    const handleOpenPopupVe = () => {
        setIsPopupVeOpen(true);
    };

    // Đóng popup chọn vé
    const handleClosePopupVe = () => {
        setIsPopupVeOpen(false);
    };

    // Xử lý khi chọn chuyến bay
    const handleSelectChuyenBay = (chuyenBay) => {
        setSelectedChuyenBay(chuyenBay);
        handleClosePopupChuyenBay(); // Đóng popup chuyến bay
    };

    // Hàm nhận thông tin vé và khách hàng từ FrameVe
    const handleSelectVe = (index, selectedVe, guestInfo) => {
        // Cập nhật lại veList
        const updatedVeList = [...veList];
        updatedVeList[index] = selectedVe; // Chỉ cập nhật vé đã chọn
        setVeList(updatedVeList); // Cập nhật lại danh sách vé

        // Cập nhật guestList
        const updatedGuestList = [...guestList];
        updatedGuestList[index] = guestInfo; // Chỉ cập nhật thông tin khách hàng
        setGuestList(updatedGuestList); // Cập nhật lại danh sách hành khách
    };

    // Hàm nhận thông tin thay đổi từ khách hàng
    const handleGuestInfoChange = (index, field, value) => {
        const updatedGuestList = [...guestList];
        const updatedGuestInfo = { ...updatedGuestList[index], [field]: value };
        updatedGuestList[index] = updatedGuestInfo; // Cập nhật thông tin khách hàng
        setGuestList(updatedGuestList); // Cập nhật lại danh sách khách hàng
    };

    const handleLoaiHoaDonChange = (e) => {
        setLoaiHoaDon(e.target.value); // Cập nhật loại hóa đơn
        // Reset các giá trị liên quan khi thay đổi
        if (e.target.value === 've') {
            setTenHangHoa('');
            setTaiTrong('');
            setGiaPhatSinh('');
        } else {
            setSoLuongVe(0);
            setSelectedChuyenBay(null);
            setSelectedVe(null);
        }
    };


    useEffect(() => {
        fetchPTTTList();
        fetchLoaiHangHoaList();
    }, []);

    const fetchPTTTList = async () => {
        try {
            const response = await axios.get(`${API_URL}/getAllPTTT`);
            setPhuongThucThanhToanList(response.data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách phương thức thanh toán:', error);
        }
    };

    const fetchLoaiHangHoaList = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/loaiHangHoa/all`);
            setLoaiHangHoaList(response.data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách phương thức thanh toán:', error);
        }
    };

    const getGiaTienLoaiHangHoa = (id) => {
        const hangHoa = loaiHoangHoaList.find((item) => item.idLoaiHangHoa === id);
        return hangHoa ? hangHoa.giaThemMoiKg : 0; // Trả về giá tiền hoặc null nếu không tìm thấy
    };

    const saveGuestsAndUpdateTickets = async () => {
        try {
            // Bước 1: Lưu tất cả khách hàng song song
            const guestPromises = guestList.map(guest =>
                axios.post(`${API_URL}/hanhkhach`, guest)  // Gửi yêu cầu lưu khách hàng
            );
    
            // Bước 2: Chờ tất cả yêu cầu lưu khách hàng hoàn thành
            const guestResponses = await Promise.all(guestPromises);
    
            // Lấy danh sách khách hàng đã lưu từ phản hồi của API
            const savedGuests = guestResponses.map(response => response.data); // savedGuests là danh sách khách hàng đã lưu
            console.log(savedGuests);
            // Bước 3: Cập nhật thông tin khách hàng vào vé
            const updatedVeList = veList.map((ve, index) => {
                const guest = savedGuests[index];  // Gán khách hàng tương ứng vào vé
                console.log("hanhkhach: ",index,": ", guest);
                return {
                    idVe: ve.idVe,
                    idHanhKhach: guest.data.idHanhKhach,  // Gán khách hàng vào vé
                    trangThai: "BOOKED"
                };
            });
    
            // Cập nhật lại veList với khách hàng đã gán
            setVeList(updatedVeList);
            console.log("updated ve list: ", updatedVeList);
    
            // Bước 4: Nếu cần, bạn có thể lưu các vé đã cập nhật vào cơ sở dữ liệu
            const ticketPromises = updatedVeList.map(ve =>
                axios.put(`${API_URL}/ve/update_hanhkhach`, ve)  // Giả sử API lưu vé đã cập nhật
            );
    
            // Chờ tất cả các yêu cầu lưu vé hoàn thành
            await Promise.all(ticketPromises);
    
            console.log("Đã lưu tất cả khách hàng và cập nhật vé thành công.");
        } catch (error) {
            console.error("Lỗi khi lưu khách hàng hoặc cập nhật vé:", error);
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const hangHoa = 
            {
                tenHangHoa,
                idLoaiHangHoa: loaiHangHoa === 've' ? 1 : 2 ,
                taiTrong,
                giaPhatSinh,
                trangThaiActive: 'ACTIVE',
            }

            var idHangHoa = null;
            if (loaiHoaDon==='hangHoa') {
                const hangHoaResponse = await axios.post(`${API_URL}/addNewMerchandise`, hangHoa);
                idHangHoa = hangHoaResponse.data.data.idHangHoa;
            }  else {
                if (veList.length === 0) {
                    alert("Bạn chưa chọn vé. Vui lòng chọn ít nhất một vé để tạo hóa đơn.");
                    return; // Dừng việc xử lý nếu không có vé nào trong danh sách
                }
                await saveGuestsAndUpdateTickets();            
            }
            

            const chiTietHoaDonDTOList = loaiHoaDon === 've'
                ? veList.map(vesl => ({ ve: { idVe: vesl.idVe } }))
                : [{hangHoa: {idHangHoa : idHangHoa}}];

            // console.log(khachHang);
            console.log(guestList);
            console.log(veList);

            const hoaDonDTO = {
                khachHang: null,
                nhanVien: { idNhanVien: nhanVien },
                soLuongVe: loaiHoaDon === 've' ? soLuongVe : 0,
                loaiHoaDon: loaiHoaDon === 've' ? {idLoaiHoaDon: 1} : {idLoaiHoaDon: 2},
                phuongThucThanhToan: { idPhuongThucTT: phuongThucThanhToan },
                tongTien,
                status: trangThaiActive,
            };

            const hoaDonCreate = { hoaDonDTO, chiTietHoaDonDTOList };
            console.log(hoaDonCreate);
            const response = await axios.post(`${API_URL}/createHoaDon`, hoaDonCreate);
            console.log('Thêm hóa đơn thành công:', response.data);
            alert("Thêm hóa đơn thành công!");
            navigate('/admin/hoadon');
        } catch (error) {
            console.error('Có lỗi xảy ra khi thêm hóa đơn:', error);
            alert("Xảy ra lỗi!");
        }
    };

    

    return (
        <div className='hoa-don-add add-form'>
            <h1>Thêm hóa đơn</h1>
                <div className="mb-3 radio-group">
                    <label>
                        <input
                            type="radio"
                            id="ve"
                            name="loaiHoaDon"
                            value="ve"
                            checked={loaiHoaDon === 've'}
                            onChange={handleLoaiHoaDonChange}
                        />
                        Hóa đơn vé
                    </label>
                    <label>
                        <input
                            type="radio"
                            id="hangHoa"
                            name="loaiHoaDon"
                            value="hangHoa"
                            checked={loaiHoaDon === 'hangHoa'}
                            onChange={handleLoaiHoaDonChange}
                        />
                        Hóa đơn hàng hóa
                    </label>
                </div>
                <form onSubmit={handleSubmit} className="row">

                {loaiHoaDon === 've' && (
                    <>
                        <div className='chon-cb'>
                            <button type='button' onClick={handleOpenPopupChuyenBay}>Chọn chuyến bay</button>

                            <label>Thông tin chuyến bay:</label>
                            <input 
                                type="text" 
                                value={selectedChuyenBay ? `Chuyến bay: ${selectedChuyenBay.idChuyenBay}`: ''}
                                disabled={true}
                            />
                        </div>
                        {
                            selectedChuyenBay && (
                                <>
                                <div className="mb-3 col-4">
                                    <label className="form-label">Số lượng vé</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={soLuongVe}
                                        onChange={(e) => setSoLuongVe(Number(e.target.value))}
                                        min="1"
                                    />
                                </div>
                                {/* Tạo các frame cho từng vé */}
                                {[...Array(soLuongVe)].map((_, index) => (
                                    <FrameVe 
                                        key={index} 
                                        index={index} 
                                        selectedChuyenBay={selectedChuyenBay} 
                                        onSelectVe={handleSelectVe} 
                                        onGuestInfoChange={handleGuestInfoChange} 
                                    />
                                ))}
                                <div className="mb-3 col-4">
                                    <label className="form-label">Phương thức thanh toán</label>
                                    <select
                                        className="form-control"
                                        value={phuongThucThanhToan? phuongThucThanhToan : ''}
                                        onChange={(e) => setPhuongThucThanhToan(parseInt(e.target.value))}
                                    >
                                        <option value="">Chọn phương thức thanh toán</option>
                                        {phuongThucThanhToanList.map((pttt) => (
                                            <option key={pttt.idPTTT} value={pttt.idPTTT}>
                                                {pttt.tenPTTT}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                

                                {/* Popup chọn vé */}
                                {isPopupVeOpen && selectedChuyenBay && (
                                    <ChonVe
                                        onClose={handleClosePopupVe}
                                        onSelect={handleSelectVe}
                                        chuyenBayId={selectedChuyenBay.idChuyenBay}
                                    />
                                )}
                                </>
                                
                            )
                        }
                        {/* Popup chọn chuyến bay */}
                        {isPopupChuyenBayOpen && (
                            <PopupChonChuyenBay
                                onClose={handleClosePopupChuyenBay}
                                onSelect={handleSelectChuyenBay}
                            />
                        )}
                    </>
                )}

                {loaiHoaDon === 'hangHoa' && (
                    <>
                        <div className="mb-3 col-4">
                            <label className="form-label">Tên hàng hóa</label>
                            <input
                                type="text"
                                className="form-control"
                                value={tenHangHoa}
                                onChange={(e) => setTenHangHoa(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 col-4">
                            <label className="form-label">Tải trọng</label>
                            <input
                                type="number"
                                className="form-control"
                                value={taiTrong}
                                onChange={(e) => {
                                    setTaiTrong(e.target.value); 
                                    if (e.target.value <= 45) {
                                        setGiaPhatSinh(0);
                                    } else {
                                        setGiaPhatSinh((e.target.value-45) * getGiaTienLoaiHangHoa(3));
                                    }
                                    
                                }}
                            />
                        </div>
                        <div className="mb-3 col-4">
                            <label className="form-label">Giá phát sinh</label>
                            <input
                                type="number"
                                className="form-control"
                                value={giaPhatSinh}
                                disabled={true}
                            />
                        </div>
                        <div className="mb-3 col-4">
                            <label className="form-label">Phương thức thanh toán</label>
                            <select
                                className="form-control"
                                value={phuongThucThanhToan}
                                onChange={(e) => setPhuongThucThanhToan(parseInt(e.target.value))}
                            >
                                <option value="">Chọn phương thức thanh toán</option>
                                {phuongThucThanhToanList.map((pttt) => (
                                    <option key={pttt.idPTTT} value={pttt.idPTTT}>
                                        {pttt.tenPTTT}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

                
                <button type="submit" className="btn btn-primary">Thêm hóa đơn</button>
            </form>
        </div>
    );
};

export default HoaDonAdd;
