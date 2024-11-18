import React, { useState } from "react";
import ChonVe from "./ChonVe"; // Import popup chọn vé

const API_URL = 'http://localhost:8080';

const FrameVe = ({
    index, 
    selectedChuyenBay, 
    onSelectVe, 
    onGuestInfoChange 
}) => {
    const [selectedVe, setSelectedVe] = useState(null);
    const [guestInfo, setGuestInfo] = useState({
        hoTen: "",
        cccd: "",
        gioiTinhEnum: "",
        ngaySinh: "",
        soDienThoai: "",
        email: "",
        trangThaiActive: "ACTIVE", // Mặc định trang thái khách hàng là "ACTIVE"
    });
    const [isPopupVeOpen, setIsPopupVeOpen] = useState(false);

    // Mở popup chọn vé
    const handleOpenPopupVe = () => {
        setIsPopupVeOpen(true);
    };

    // Đóng popup chọn vé
    const handleClosePopupVe = () => {
        setIsPopupVeOpen(false);
    };

    // Khi chọn vé
    const handleSelectVe = (ve) => {
        setSelectedVe(ve); // Cập nhật vé đã chọn
        // Truyền thông tin vé và khách hàng về component cha (HoaDonAdd)
        onSelectVe(index, ve, guestInfo); 
    };

    // Khi thay đổi thông tin khách hàng
    const handleGuestInfoChange = (field, value) => {
        const updatedGuestInfo = { ...guestInfo, [field]: value };
        setGuestInfo(updatedGuestInfo);
        onGuestInfoChange(index, field, value); // Truyền dữ liệu lên cha
    };

    return (
        <fieldset className="frame-ve">
            <legend>Vé {index + 1}</legend>

            {/* Nút chọn vé */}
            <button type="button" onClick={handleOpenPopupVe}>
                Chọn vé
            </button>

            {/* Hiển thị thông tin vé đã chọn */}
            {selectedVe && (
                <>
                <div className="ticket-info">
                    
                    <label>Vé đã chọn:</label>
                    <input
                        type="text"
                        value={selectedVe.choNgoi.rowIndex + selectedVe.choNgoi.columnIndex}
                        disabled={true}
                    />
                </div>
                {/* Thông tin khách hàng */}
                <label htmlFor="" style={{fontSize: '1.1em', fontWeight: 'bold'}}>Thông tinh hành khách</label>
                <div className="guest-info">
                    <label>Họ và tên:</label>
                    <input
                        type="text"
                        placeholder="Nhập họ tên"
                        value={guestInfo.hoTen} // Sửa lại từ guestInfo.ten thành guestInfo.hoTen
                        onChange={(e) => handleGuestInfoChange("hoTen", e.target.value)}
                    />

                    <label>CMND/CCCD:</label>
                    <input
                        type="text"
                        placeholder="012345678901"
                        value={guestInfo.cccd}
                        onChange={(e) => handleGuestInfoChange("cccd", e.target.value)}
                    />

                    <label>Số điện thoại:</label>
                    <input
                        type="text"
                        placeholder="0123123123"
                        value={guestInfo.soDienThoai}
                        onChange={(e) => handleGuestInfoChange("soDienThoai", e.target.value)}
                    />
                    <label>Email:</label>
                    <input
                        type="text"
                        placeholder="abc@exmaple.com"
                        value={guestInfo.email}
                        onChange={(e) => handleGuestInfoChange("email", e.target.value)}
                    />

                    <label>Giới tính:</label>
                    <div className="gioi-tinh">
                        <input
                            type="radio"
                            id={`nam-${index}`}
                            name={`gioiTinh-${index}`}
                            value="NAM"
                            checked={guestInfo.gioiTinhEnum === "NAM"}
                            onChange={(e) => handleGuestInfoChange("gioiTinhEnum", e.target.value)}
                        />
                        <label htmlFor={`nam-${index}`}>Nam</label>

                        <input
                            type="radio"
                            id={`nu-${index}`}
                            name={`gioiTinh-${index}`}
                            value="NU"
                            checked={guestInfo.gioiTinhEnum === "NU"}
                            onChange={(e) => handleGuestInfoChange("gioiTinhEnum", e.target.value)}
                        />
                        <label htmlFor={`nu-${index}`}>Nữ</label>
                    </div>

                    <label>Ngày sinh:</label>
                    <input
                        type="date"
                        value={guestInfo.ngaySinh}
                        onChange={(e) => handleGuestInfoChange("ngaySinh", e.target.value)}
                    />
                </div>
                </>
            )}

            {/* Popup chọn vé */}
            {isPopupVeOpen && (
                <ChonVe
                    onClose={handleClosePopupVe}
                    onSelect={handleSelectVe}
                    chuyenBayId={selectedChuyenBay?.idChuyenBay} // Truyền id chuyến bay
                />
            )}
        </fieldset>
    );
};

export default FrameVe;
