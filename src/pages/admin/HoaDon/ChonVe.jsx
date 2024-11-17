import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const ChonVe = ({ onClose, onSelect, chuyenBayId }) => {
  const [veList, setVeList] = useState([]);
  const [loadingVe, setLoadingVe] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVes, setSelectedVes] = useState([]); // Khởi tạo với mảng rỗng

  const fetchVeList = async () => {
    setLoadingVe(true);
    setError(null); // Reset lỗi trước khi fetch
    try {
      const response = await axios.get(`${API_URL}/ve/chuyenbay/${chuyenBayId}`);
      console.log("Dữ liệu trả về từ server:", response.data); // Xem dữ liệu trả về
      if (response.status === 204) {
        setVeList([]);
      } else {
        setVeList(response.data.data.content || []);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách vé:", error);
      setError("Không thể tải danh sách vé. Vui lòng thử lại.");
    } finally {
      setLoadingVe(false);
    }
  };

  useEffect(() => {
    if (chuyenBayId) {
      fetchVeList();
    }
  }, [chuyenBayId]);

  const handleSelectVe = (ve) => {
    console.log("Vé được chọn:", ve);

    // Kiểm tra nếu vé đã được chọn rồi
    if (selectedVes.some(v => v.idVe === ve.idVe)) {
        alert("Vé này đã được chọn rồi.");
        return;
    }

    // Cập nhật selectedVes bằng cách sử dụng hàm cập nhật state (function form)
    setSelectedVes((prevSelectedVes) => {
        console.log("Danh sách vé trước khi cập nhật:", prevSelectedVes);
        
        // Nếu selectedVes là mảng rỗng, prevSelectedVes sẽ là []
        const updatedSelectedVes = [...prevSelectedVes, ve];  // Thêm vé mới vào mảng
        
        console.log("Danh sách vé sau khi cập nhật:", updatedSelectedVes);
        
        // Trả về mảng cập nhật để React cập nhật lại state
        return updatedSelectedVes;
    });

    onSelect(ve);  // Trả về vé đã chọn
    onClose();     // Đóng popup
};


  const isVeSelected = (ve) => {
    const isSelected = selectedVes.some(v => v.idVe === ve.idVe);
    console.log(`Vé ${ve.idVe} đã chọn: ${isSelected}`); // Log thông tin trạng thái vé
    return isSelected;
  };

  return (
    <div className="popup-overlay ve-popup">
      <div className="popup-container">
        <h3>Chọn vé</h3>
        {loadingVe ? (
          <div className="loading">Đang tải danh sách vé...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : veList.filter(ve => ve.trangThai === 'EMPTY').length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Mã vé</th>
                <th>Hạng vé</th>
                <th>Giá</th>
                <th>Số ghế</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {veList.filter(ve => ve.trangThai === 'EMPTY') // Lọc vé có trạng thái 'EMPTY'
                .map((ve) => (
                  <tr key={ve.idVe}>
                    <td>{ve.idVe}</td>
                    <td>{ve.hangVe.tenHangVe}</td>
                    <td>{ve.giaVe.toLocaleString()} VNĐ</td>
                    <td>{ve.choNgoi.rowIndex}{ve.choNgoi.columnIndex}</td>
                    <td>{ve.trangThai}</td>
                    <td>
                      <button
                        className="btn-select"
                        onClick={() => handleSelectVe(ve)}
                        disabled={isVeSelected(ve)} // Disable nút chọn nếu vé đã được chọn
                      >
                        Chọn
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">Không có ghế trống.</div>
        )}
        <button className="btn-close" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default ChonVe;
