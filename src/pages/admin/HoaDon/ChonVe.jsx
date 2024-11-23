import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios-80802';

const API_URL = 'http://localhost:8080';

const ChonVe = ({ onClose, onSelect, chuyenBayId, selectedVe, currentFieldsetIndex }) => {
  const [veList, setVeList] = useState([]);
  const [loadingVe, setLoadingVe] = useState(false);
  const [error, setError] = useState(null);

  const fetchVeList = async () => {
    setLoadingVe(true);
    setError(null); 
    try {
      const response = await axios.get(`${API_URL}/ve/getVeByIdCBNotPaging`, { params: { idChuyenBay: chuyenBayId } });
      setVeList(response.data?.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách vé:", error);
      setError(`Lỗi: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
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
    if (isVeSelected(ve)) {
      alert("Vé này đã được chọn.");
      return;
    }
    onSelect(ve);
    onClose();
  };

  const isVeSelected = (ve) => {
    return selectedVe.some(selVe => selVe?.idVe === ve.idVe);
  };

  const emptySeats = veList.filter(ve => ve.trangThai === 'EMPTY');

  return (
    <div className="popup-overlay ve-popup">
      <div className="popup-container">
        <h3>Chọn vé</h3>
        {loadingVe ? (
          <div className="loading">
            <span className="spinner"></span> Đang tải danh sách vé...
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : emptySeats.length > 0 ? (
          <table className="table">
            <thead className="thead-dark">
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
              {emptySeats.map((ve) => (
                <tr key={ve.idVe} className={isVeSelected(ve) ? 'selected' : ''}>
                  <td>{ve.idVe}</td>
                  <td>{ve.hangVe.tenHangVe}</td>
                  <td>{ve.giaVe.toLocaleString()} VNĐ</td>
                  <td>{ve.choNgoi.rowIndex}{ve.choNgoi.columnIndex}</td>
                  <td>{ve.trangThai}</td>
                  <td>
                    <button
                      type="button"
                      className="btn-select"
                      onClick={() => handleSelectVe(ve)}
                      disabled={isVeSelected(ve)}
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
