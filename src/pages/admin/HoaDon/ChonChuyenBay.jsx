import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const PopupChonChuyenBay = ({ onClose, onSelect }) => {
    const [chuyenBayList, setChuyenBayList] = useState([]);
    const [loadingChuyenBay, setLoadingChuyenBay] = useState(true);
    const [sanBayList, setSanBayList] = useState([]);

    // Fetch danh sách sân bay
    const fetchSanBayList = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/sanbay/getAllAirport`);
            setSanBayList(response.data.data); // Gán danh sách sân bay vào state
            console.log(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sân bay:', error);
        }
    };

    // Hàm tìm tên sân bay dựa vào ID
    const getTenSanBay = (idSanBay) => {
        const sanBay = sanBayList.find((sb) => sb.idSanBay === idSanBay);
        return sanBay ? sanBay.tenSanBay : 'Không xác định';
    };

    const fetchChuyenBayList = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/chuyenbay/getallchuyenbay`);
            setChuyenBayList(response.data.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách chuyến bay:", error);
        } finally {
            setLoadingChuyenBay(false);
        }
    };

    

    useEffect(() => {
        fetchChuyenBayList();
        fetchSanBayList();
    }, []);

    const handleSelectChuyenBay = (chuyenBay) => {
        onSelect(chuyenBay); // Trả về chuyến bay đã chọn
        onClose(); // Đóng popup
    };


    return (
        <div className="popup-overlay cb-popup">
            <div className="popup-container">
                <h3>Chọn chuyến bay</h3>
                {loadingChuyenBay ? (
                    <div>Đang tải danh sách chuyến bay...</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Mã chuyến bay</th>
                                <th>Thời gian bắt đầu</th>
                                <th>Điểm đi</th>
                                <th>Hành động</th>
                                <th>Số ghế trống</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chuyenBayList.map((cb) => (
                                <tr key={cb.idChuyenBay}>
                                    <td>{cb.idChuyenBay}</td>
                                    <td>{cb.thoiGianBatDauDuTinh}</td>
                                    <td>{getTenSanBay(cb.tuyenBay.idSanBayBatDau)}</td>
                                    <td>{getTenSanBay(cb.tuyenBay.idSanBayKetThuc)}</td>
                                    <td></td>
                                    <td>
                                        <button onClick={() => handleSelectChuyenBay(cb)}>
                                            Chọn
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <button onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

export default PopupChonChuyenBay;
