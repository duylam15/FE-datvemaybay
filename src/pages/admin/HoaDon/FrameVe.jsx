import React, { useState, useEffect } from "react";
import ChonVe from "./ChonVe"; // Import popup chọn vé
import GuestInfoForm from './GuesInfoForm'; // Import form thông tin khách hàng
import HangHoaForm from './HangHoaForm'; // Import form thông tin hàng hóa (tạo mới)

const FrameVe = ({
  index,
  selectedChuyenBay,
  onSelectVe,
  onGuestInfoChange,
  onHangHoaChange, // Hàm thay đổi thông tin hàng hóa
  fieldErrors,
  selectedVe
}) => {
  useEffect(() => {
    console.log(`Vé tại index ${index} đã thay đổi:`, selectedVe);
  }, [selectedVe]); // Chỉ chạy khi selectedVe thay đổi


  const [guestInfo, setGuestInfo] = useState({
    hoTen: "",
    cccd: "",
    gioiTinhEnum: "",
    ngaySinh: "",
    soDienThoai: "",
    email: "",
    trangThaiActive: "ACTIVE", // Mặc định trang thái khách hàng là "ACTIVE"
  });
  
  // Thêm state quản lý hàng hóa
    const [hangHoa, setHangHoa] = useState({
        tenHangHoa: "",
        taiTrong: 0,
        idLoaiHangHoa: 1,
        giaPhatSinh: 0,
        trangThaiActive: 'ACTIVE'
    });
  
  const [isPopupVeOpen, setIsPopupVeOpen] = useState(false);
  const [currentFieldsetIndex, setCurrentFieldsetIndex] = useState(null);

  const handleOpenPopupVe = (currentIndex) => {
    setCurrentFieldsetIndex(currentIndex); // Lưu lại `index` của fieldset hiện tại
    setIsPopupVeOpen(true); // Mở popup
  };

  const handleClosePopupVe = () => {
    setIsPopupVeOpen(false);
  };

  const handleSelectVe = (ve, index) => {
    if (selectedVe.some((v) => v != null && v.idVe === ve.idVe)) {
      alert("Vé này đã được chọn.");
      return;
    }
    onSelectVe(index, ve, guestInfo, hangHoa);
  };

  const handleGuestInfoChange = (field, value) => {
    const updatedGuestInfo = { ...guestInfo, [field]: value };
    setGuestInfo(updatedGuestInfo);
    onGuestInfoChange(index, updatedGuestInfo); // Truyền dữ liệu lên cha
  };

  const handleHangHoaChange = (field, value) => {
    const updatedHangHoa = {...hangHoa, [field]: value};
    setHangHoa(updatedHangHoa);
    onHangHoaChange(index, updatedHangHoa); // Truyền dữ liệu lên cha
  };

  return (
    <fieldset className="frame-ve">
      <legend>Vé {index + 1}</legend>

      <button type="button" onClick={() => handleOpenPopupVe(index)}>
        Chọn vé
      </button>

      {selectedVe[index] && (
        <div className="ticket-info">
          <label>Vé đã chọn:</label>
          <input
            type="text"
            value={`${selectedVe[index].maVe}`}
            disabled
          />
          <label>Số ghế:</label>
          <input
            type="text"
            value={`${selectedVe[index].choNgoi.rowIndex}${selectedVe[index].choNgoi.columnIndex}`}
            disabled
          />
        </div>
      )}
      {!selectedVe[index] && (
            fieldErrors[`ve-${index}`] && (
                <p style={{ color: "red" }}>{fieldErrors[`ve-${index}`]}</p>
            )
        )
      }
        
      {/* Sử dụng GuestInfoForm */}
      <GuestInfoForm
        guestInfo={guestInfo}
        onGuestInfoChange={handleGuestInfoChange}
        fieldErrors={fieldErrors}
        index={index}
      />

      {/* Sử dụng HangHoaForm cho hàng hóa */}
      <HangHoaForm
        hangHoa={hangHoa}  // Lấy thông tin hàng hóa tại index
        onHangHoaChange={handleHangHoaChange}  // Cập nhật thông tin hàng hóa
        fieldErrors={fieldErrors}
        index={index}
      />

      {isPopupVeOpen && (
        <ChonVe
          onClose={handleClosePopupVe}
          onSelect={handleSelectVe}
          chuyenBayId={selectedChuyenBay?.idChuyenBay}
          selectedVe={selectedVe}
          currentFieldsetIndex={currentFieldsetIndex}
        />
      )}
    </fieldset>
  );
};

export default FrameVe;
