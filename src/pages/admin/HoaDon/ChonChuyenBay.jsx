import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const PopupChonChuyenBay = ({ onClose, onSelect }) => {
    const [chuyenBayList, setChuyenBayList] = useState([]);
    const [loadingChuyenBay, setLoadingChuyenBay] = useState(true);
    const [sanBayList, setSanBayList] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [availableDates, setAvailableDates] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch danh sách sân bay
    const fetchSanBayList = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/sanbay/getAllAirport`);
            setSanBayList(response.data.data);
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

            // Lọc các ngày có sẵn từ danh sách chuyến bay
            const dates = Array.from(new Set(cbList.map(cb => cb.thoiGianBatDauDuTinh.split('T')[0])));
            setAvailableDates(dates);

            // Cập nhật lại danh sách chuyến bay sau khi tất cả dữ liệu đã được lấy
            setChuyenBayList(cbList);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách chuyến bay:", error);
        } finally {
            setLoadingChuyenBay(false);
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        const selectedEndDate = e.target.value;
        setEndDate(selectedEndDate);

        // Kiểm tra nếu ngày kết thúc không lớn hơn ngày bắt đầu
        if (selectedEndDate && selectedEndDate <= startDate) {
            setErrorMessage('Ngày kết thúc phải lớn hơn ngày bắt đầu.');
        } else {
            setErrorMessage('');
        }
    };

    const handleSelectChuyenBay = (chuyenBay) => {
        onSelect(chuyenBay); // Trả về chuyến bay đã chọn
        onClose(); // Đóng popup
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchChuyenBayList();
            await fetchSanBayList();
        };

        fetchData();
    }, []);

    // Lọc danh sách chuyến bay theo ngày bắt đầu và ngày kết thúc
    const filteredChuyenBayList = chuyenBayList.filter(cb => {
        const startDateCheck = startDate ? cb.thoiGianBatDauDuTinh.split('T')[0] >= startDate : true;
        const endDateCheck = endDate ? cb.thoiGianBatDauDuTinh.split('T')[0] <= endDate : true;
        return startDateCheck && endDateCheck;
    });

    return (
        <div className="popup-overlay cb-popup">
            <div className="popup-container">
                <h1>Chọn chuyến bay</h1>

                <div className="loc-cb">
                    {/* Combobox để lọc theo ngày bắt đầu */}
                    <div>
                        <label htmlFor="start-date-filter">Ngày bắt đầu:</label>
                        <input
                            type="date"
                            id="start-date-filter"
                            onChange={handleStartDateChange}
                            value={startDate}
                        />
                    </div>

                    {/* Combobox để lọc theo ngày kết thúc */}
                    <div>
                        <label htmlFor="end-date-filter">Ngày kết thúc:</label>
                        <input
                            type="date"
                            id="end-date-filter"
                            onChange={handleEndDateChange}
                            value={endDate}
                        />
                        {/* Hiển thị thông báo lỗi nếu có */}
                        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                    </div>
                </div>
                

                {loadingChuyenBay ? (
                    <div>Đang tải danh sách chuyến bay...</div>
                ) : (
                    <table className="table">
                        <thead className="thead-dark">
                            <tr className='align-bottom'>
                                <th className='col-2'>Mã chuyến bay</th>
                                <th className='col-2'>Thời gian bắt đầu dự tính</th>
                                <th className='col-2'>Điểm đi</th>
                                <th className='col-2'>Điểm đến</th>
                                <th className='col-2'>Số ghế trống</th>
                                <th className='col-2'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredChuyenBayList.filter(cb => cb.soGheTrong > 0).map((cb) => (
                                <tr key={cb.idChuyenBay}>
                                    <td>{cb.idChuyenBay}</td>
                                    <td>
                                        {new Date(cb.thoiGianBatDauDuTinh).toLocaleString('vi-VN', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                        })}
                                    </td>
                                    <td>{getTenSanBay(cb.tuyenBay.idSanBayBatDau)}</td>
                                    <td>{getTenSanBay(cb.tuyenBay.idSanBayKetThuc)}</td>
                                    <td>{cb.soGheTrong}</td>
                                    <td>
                                        <button type='button' onClick={() => handleSelectChuyenBay(cb)}>
                                            Chọn
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <button type='button' onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

export default PopupChonChuyenBay;
