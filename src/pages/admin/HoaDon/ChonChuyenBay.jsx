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
            const cbList = response.data.data;
    
            // Tạo một array các Promise để gọi API song song cho từng chuyến bay
            const promises = cbList.map(async (cb) => {
                const res = await axios.get(`${API_URL}/admin/chuyenbay/getSoGheTrong`, { params: { idChuyenBay: cb.idChuyenBay } });
                
                if (res.data && res.data.data !== undefined) {
                    cb.soGheTrong = res.data.data;
                } else {
                    console.error(`Không có dữ liệu số ghế trống cho chuyến bay ID: ${cb.idChuyenBay}`);
                }
            });
    
            // Chạy tất cả các Promise song song và đợi chúng hoàn tất
            await Promise.all(promises);
    
            // Cập nhật lại danh sách chuyến bay sau khi tất cả dữ liệu đã được lấy
            setChuyenBayList(cbList);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách chuyến bay:", error);
        } finally {
            setLoadingChuyenBay(false);
        }
    };
    

    const fetchAvailableTicket = async () => {
        try {
            const updatedChuyenBayList = [...chuyenBayList];  
            for (let cb of updatedChuyenBayList) {
                const response = await axios.get(`${API_URL}/admin/chuyenbay/getSoGheTrong`, {params: {idChuyenBay: cb.idChuyenBay}});
                
                if (response.data && response.data.data !== undefined) {
                    if (!cb.hasOwnProperty('soGheTrong')) {
                        cb.soGheTrong = response.data.data; 
                    } else {
                        cb.soGheTrong = response.data.data;
                    }
                } else {
                    console.error(`Không có dữ liệu số ghế trống cho chuyến bay ID: ${cb.idChuyenBay}`);
                }
            }
            setChuyenBayList(updatedChuyenBayList);
    
        } catch (error) {
            console.error("Lỗi khi lấy số ghế trống:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchChuyenBayList();
            await fetchSanBayList();
        };
    
        fetchData();
    }, []); // Lần đầu tiên gọi, không có phụ thuộc vào dữ liệu khác

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
                                    <td>{cb.soGheTrong}</td>
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
