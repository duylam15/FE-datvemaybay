import React, { useState, useEffect } from 'react';
import { useFetchDanhGia } from '../../../utils/useFetchDanhGia.jsx';
import DanhGiaList from '../../../pages/admin/DanhGia/DanhGiaList.jsx';
import { useNavigate } from 'react-router-dom';
import './DanhGia.css';
import { blockReview, searchByAirline, searchByStartTimeAndEndTime, searchByTenKhachHang } from '../../../services/reviewsService.js';
const API_URL = 'http://localhost:8080';

const DanhGiaPage = () => {
    const { danhGia: initialDanhGia, loadingDanhGia, errorDanhGia } = useFetchDanhGia();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [danhGia, setDanhGia] = useState(initialDanhGia);
    const [sortField, setSortField] = React.useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setDanhGia(initialDanhGia);
    }, [initialDanhGia]);

    const handleSearchByTenKhachHang = () => {
        searchByTenKhachHang(searchTerm, setDanhGia);
    };

    const handleSearchByHangBay = async (idHangBay) => {
        try {
            await searchByAirline(idHangBay, setDanhGia);
            console.log('List Review by airline: ', danhGia)
        } catch (error) {
            console.error('Error fetching reviews by airline:', error);
        }
    };

    const handleSearchByStartTimeAndEndTime = async () => {
        try {
            console.log('Start: ', startTime, ", End: ", endTime);
            const response = await searchByStartTimeAndEndTime(startTime, endTime); 
            setDanhGia(response);
            console.log('List Review by start and end time: ', response)
        } catch (error) {
            console.error('Error fetching reviews by start and end time:', error);
        }
    }

    const handleBlock = async (idDanhGia) => {
        try {
            const updatedDanhGia = await blockReview(idDanhGia);  // Gọi blockReview và lấy lại danh sách đánh giá
            setDanhGia(updatedDanhGia);  // Cập nhật danh sách đánh giá mới
        } catch (error) {
            console.error('Failed to block the review!', error);
        }
    };

    if (loadingDanhGia) return <p>Loading...</p>;
    if (errorDanhGia) return <p>Error: {errorDanhGia}</p>;

    return (
        <div className="danh-gia-page">
            <h1 className='title'>Danh Sách Đánh Giá </h1>
           
            <DanhGiaList 
                danhGia={danhGia}
                handleSearchByTenKhachHang={handleSearchByTenKhachHang}
                handleSearchByHangBay={handleSearchByHangBay}
                handleSearchByStartTimeAndEndTime={handleSearchByStartTimeAndEndTime}
                handleBlock={handleBlock}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
            />
        </div>
    );
};

export default DanhGiaPage;
