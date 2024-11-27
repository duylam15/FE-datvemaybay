import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios-80802';
import { message } from 'antd';

import PopupChonChuyenBay from './ChonChuyenBay'; // Import Popup
import ChonVe from './ChonVe';
import FrameVe from './FrameVe'; // Import FrameVe
import { forEach, update } from 'lodash';

const API_URL = 'http://localhost:8080';

const HoaDonAdd = () => {
    const userData = JSON.parse(localStorage.getItem("dataNguoiDung")); // Lấy chuỗi JSON từ localStorage

    const [khachHang, setKhachHang] = useState(null);
    const [nhanVien, setNhanVien] = useState(userData.nhanVien.idNhanVien);
    const [loaiHoaDon, setLoaiHoaDon] = useState('ve'); // radio button value
    const [phuongThucThanhToan, setPhuongThucThanhToan] = useState(null);
    const [tongTien, setTongTien] = useState('');
    const [trangThaiActive, setTrangThaiActive] = useState('PENDING');

    // State cho hàng hóa
    const [tenHangHoa, setTenHangHoa] = useState('');
    const [taiTrong, setTaiTrong] = useState('');
    const [giaPhatSinh, setGiaPhatSinh] = useState('');

    // State cho vé
    const [soLuongVe, setSoLuongVe] = useState(1);
    const [isPopupChuyenBayOpen, setIsPopupChuyenBayOpen] = useState(false);
    const [isPopupVeOpen, setIsPopupVeOpen] = useState(false);
    const [selectedChuyenBay, setSelectedChuyenBay] = useState(null);

    const [selectedVes, setSelectedVes] = useState([]);
    const [guestList, setGuestList] = useState([]); // Mảng lưu thông tin hành khách
    const [veList, setVeList] = useState([]);
    const [hangHoaDTOList, setHangHoaDTOList] = useState([]);

    const [phuongThucThanhToanList, setPhuongThucThanhToanList] = useState([]);
    const [loaiHoangHoaList, setLoaiHangHoaList] = useState([]);

    const [fieldErrors, setFieldErrors] = useState({
        hoTen: '',
        email: '',
        ngaySinh: '',
        soDienThoai: '',
        gioiTinhEnum: '',
        cccd: ''
    });

    const navigate = useNavigate();

    

    const handleOpenPopupChuyenBay = () => {
        setIsPopupChuyenBayOpen(true);
    };

    const handleClosePopupChuyenBay = () => {
        setIsPopupChuyenBayOpen(false);
    };

    const handleClosePopupVe = () => {
        setIsPopupVeOpen(false);
    };

    const handleSelectChuyenBay = (chuyenBay) => {
        setSelectedChuyenBay(chuyenBay);
        handleClosePopupChuyenBay(); 
    };

    const handleSoLuongVeChange = (event) => {
        const newSoLuongVe = parseInt(event.target.value, 10);
    
        setSoLuongVe(newSoLuongVe);
    
        const newVeList = [...selectedVes];
        const newGuestList = [...guestList];
        const newHangHoaList = [...hangHoaDTOList];
    
        setSelectedVes(newVeList);
        setGuestList(newGuestList);
        setHangHoaDTOList(newHangHoaList);
    };

    // Hàm nhận thông tin vé và khách hàng từ FrameVe
    const handleSelectVe = (index, selectedVe, guestInfo, hangHoaInfo) => {
        const updatedVeList = [...selectedVes];

        updatedVeList[index] = selectedVe;
        setSelectedVes(updatedVeList);
        const updatedGuestList = [...guestList];
        updatedGuestList[index] = guestInfo; // Chỉ cập nhật thông tin khách hàng
        setGuestList(updatedGuestList); // Cập nhật lại danh sách hành khách

        const updatedHangHoaList = [...hangHoaDTOList];
        updatedHangHoaList[index] = hangHoaInfo; // Chỉ cập nhật thông tin
        setHangHoaDTOList(updatedHangHoaList); // Cập nhật lại danh sách
    };

    // Hàm nhận thông tin thay đổi từ khách hàng
    const handleGuestInfoChange = (index, updatedGuestInfo) => {
        const updatedGuestList = [...guestList];
        updatedGuestList[index] = updatedGuestInfo; // Cập nhật thông tin khách hàng theo index
        setGuestList(updatedGuestList); // Cập nhật lại danh sách khách hàng
    };

    // Hàm cập nhật thông tin hàng hóa
    const handleHangHoaChange = (index, updatedHangHoa) => {
        const updatedHangHoaList = [...hangHoaDTOList];
        updatedHangHoaList[index] = updatedHangHoa;
        setHangHoaDTOList(updatedHangHoaList);
    };

    useEffect(() => {
        fetchPTTTList();
        fetchLoaiHangHoaList();
        setSelectedVes((prevSelectedVe) => {
            const newSelectedVe = [...prevSelectedVe];
            while (newSelectedVe.length < soLuongVe) {
              newSelectedVe.push(null); // Hoặc đối tượng mặc định
            }
            return newSelectedVe;
          });
    }, []);

    useEffect(() => {
        if (selectedChuyenBay) {
          // Khi chọn chuyến bay khác, reset số lượng vé và danh sách vé
          setSoLuongVe(1);
          setSelectedVes([null]); // Reset danh sách vé về 1 phần tử null
        }
      }, [selectedChuyenBay]);

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
        const errors = {};
        
        selectedVes.forEach((ve, index) => {
            console.log("ve ", index, ": ", ve);
            if (!ve) {
                errors[`ve-${index}`] = 'Vé không được để trống';
            }
        });
        if (selectedVes.length < soLuongVe) {
            errors.veList = `Vui lòng chọn vé!`;
        } 
        
        guestList.forEach((guest, index) => {
            console.log("guest ", index,": ", guest);
            if (!guest.hoTen) {
                errors[`hoTen-${index}`] = 'Họ tên không được để trống';
            }
            if (!guest.email) {
                errors[`email-${index}`] = 'Email không được để trống';
            }
            if (!guest.cccd) {
                errors[`cccd-${index}`] = 'Số CCCD không được để trống';
            }
            if (!guest.soDienThoai) {
                errors[`soDienThoai-${index}`] = "Số điện thoại không được để trống";
            }
            if (!guest.ngaySinh) {
                errors[`ngaySinh-${index}`] = 'Ngày sinh không được để trống';
            }
            if (!guest.gioiTinhEnum) {
                errors[`gioiTinhEnum-${index}`] = 'Giới tính không được để trống';
            }
            if (!/^0[0-9]{9}$/.test(guest.soDienThoai)) {
                errors[`soDienThoai-${index}`] = 'Số điện thoại phải đúng định dạng';
            }
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(guest.email)) {
                errors[`email-${index}`] = 'Email phải đúng định dạng';
            }
            if (!/^\d{9}$|^\d{12}$/.test(guest.cccd)) {
                errors[`cccd-${index}`] = 'Căn cước công dân phải là 9 hoặc 12 số';
            }
            if (new Date(guest.ngaySinh) >= new Date().setHours(0, 0, 0, 0)) {
                errors[`ngaySinh-${index}`] = 'Ngày sinh phải trước ngày hôm nay';
            }
        });
 
        if (!phuongThucThanhToan) {
            errors['phuongThucThanhToan'] = 'Vui lòng chọn phương thức thanh toán';
        }

        hangHoaDTOList.forEach((hangHoa, index) => {
            if (!hangHoa.tenHangHoa) {
                errors[`tenHangHoa-${index}`] = 'Tên hàng hóa không được để trống';
            }
        });
    
        setFieldErrors(errors); // Lưu lại lỗi vào state
            // Nếu có lỗi, cập nhật state fieldErrors và dừng việc submit
        if (Object.keys(errors).length > 0) {
            console.log("Lỗi kiểm tra khách hàng va hang hoa");
            console.log(errors);
            return false; // Dừng xử lý và trả về false
        }
    
        try {
            // Bước 1: Lưu tất cả khách hàng song song
            const guestPromises = guestList.map(guest =>
                axios.post(`${API_URL}/hanhkhach`, guest) // Gửi yêu cầu lưu khách hàng
            );
    
            // Bước 2: Chờ tất cả yêu cầu lưu khách hàng hoàn thành
            const guestResponses = await Promise.all(guestPromises);
    
            // Lấy danh sách khách hàng đã lưu từ phản hồi của API
            const savedGuests = guestResponses.map(response => response.data);
            console.log(savedGuests);
    
            // Bước 3: Cập nhật thông tin khách hàng vào vé
            console.log("ve list: ", veList);
            const updatedVeList = selectedVes.map((ve, index) => {
                console.log("ve ", index," : ", ve);
                const guest = savedGuests[index];
                return {
                    idVe: ve.idVe,
                    idHanhKhach: guest.data.idHanhKhach, // Gán khách hàng vào vé
                    trangThai: "BOOKED"
                };
            });
            console.log("updated Ve List: ", updatedVeList);
            // Cập nhật lại veList với khách hàng đã gán
            // setSelectedVes(updatedVeList);
    
            // Bước 4: Lưu các vé đã cập nhật vào cơ sở dữ liệu
            const ticketPromises = updatedVeList.map(ve =>
                axios.put(`${API_URL}/ve/update_hanhkhach`, ve)
            );
    
            // Chờ tất cả các yêu cầu lưu vé hoàn thành
            await Promise.all(ticketPromises);
            console.log(ticketPromises.data);
            console.log("Đã lưu tất cả khách hàng và cập nhật vé thành công.");
            return true; // Trả về true khi thành công
        } catch (error) {
            console.error("Lỗi khi lưu khách hàng hoặc cập nhật vé:", error);
            return false; // Trả về false khi có lỗi
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let errors ={};
        if (!selectedChuyenBay) {
            errors[`selectedChuyenBay`] = 'Vui lòng chọn chuyến bay';
            setFieldErrors(errors);
            return;
        }
        try {
            // Gọi saveGuestsAndUpdateTickets và kiểm tra kết quả
            const success = await saveGuestsAndUpdateTickets();
            if (!success) {
                console.log("them hanh khach va update ve that bai");
                return; // Dừng nếu lưu khách hàng hoặc cập nhật vé thất bại
            }
            
            console.log(hangHoaDTOList);
            
            const chiTietHoaDonDTOList = selectedVes.map((ve) => ({
                ve: { idVe: ve.idVe },
            }));

            const hoaDonDTO = {
                khachHang: null,
                nhanVien: { idNhanVien: nhanVien },
                soLuongVe: loaiHoaDon === 've' ? soLuongVe : 0,
                loaiHoaDon: loaiHoaDon === 've' ? { idLoaiHoaDon: 1 } : { idLoaiHoaDon: 2 },
                phuongThucThanhToan: { idPhuongThucTT: phuongThucThanhToan },
                tongTien,
                status: trangThaiActive,
            };
    
            const hoaDonCreate = { hoaDonDTO, chiTietHoaDonDTOList, hangHoaDTOList};
            const response = await axios.post(`${API_URL}/createHoaDon`, hoaDonCreate);
    
            if (response.statusCode === 400) {
                const errors = response.data;
                setFieldErrors(errors);
                return;
            } else {
                message.success('Thêm hóa đơn thành công!');
                navigate('/admin/hoadon');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = error.response.data.data;
                setFieldErrors(errors);
            }
            console.error('There was an error adding bill!', error);
        }
    };
    
    

    

    return (
        <div className='hoa-don-add add-form'>
            <h1>Thêm hóa đơn</h1>
                <form onSubmit={handleSubmit} className="row">
                    <div className='chon-cb'>
                        <button type='button' onClick={handleOpenPopupChuyenBay}>Chọn chuyến bay</button>

                        <label>Thông tin chuyến bay:</label>
                        <input 
                            type="text" 
                            value={selectedChuyenBay ? `Chuyến bay: ${selectedChuyenBay.idChuyenBay}`: ''}
                            disabled={true}
                        />
                        {!selectedChuyenBay && (
                            fieldErrors.selectedChuyenBay && (
                            <p style={{ color: "red", marginLeft: "50px"}}>{fieldErrors.selectedChuyenBay}</p>
                        ))}
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
                                    onChange={handleSoLuongVeChange}
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
                                    onHangHoaChange={handleHangHoaChange}
                                    fieldErrors={fieldErrors}
                                    selectedVe={selectedVes}
                                />
                            ))}
                            <div className="mb-3 col-4">
                                <label className="form-label">Phương thức thanh toán</label>
                                <select
                                    className={`form-control form-control-lg ${fieldErrors?.phuongThucThanhToan ? 'is-invalid' : ''}`}
                                    value={phuongThucThanhToan? phuongThucThanhToan : ''}
                                    onChange={(e) => setPhuongThucThanhToan(parseInt(e.target.value))}
                                >
                                    <option value="0">Chọn phương thức thanh toán</option>
                                    {phuongThucThanhToanList.map((pttt) => (
                                        <option key={pttt.idPTTT} value={pttt.idPTTT}>
                                            {pttt.tenPTTT}
                                        </option>
                                    ))}
                                </select>
                                {fieldErrors?.phuongThucThanhToan && <div className="invalid-feedback">{fieldErrors?.phuongThucThanhToan}</div>} {/* Hiển thị thông báo lỗi */}
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

                <div className='add-btn-group'>
                    <button type='button' className='btn btn-primary' onClick={() => navigate("/admin/hoadon")}>Quay lại</button>
                    <button type="submit" className="btn btn-primary">Thêm</button>
                </div>

            </form>
        </div>
    );
};

export default HoaDonAdd;
