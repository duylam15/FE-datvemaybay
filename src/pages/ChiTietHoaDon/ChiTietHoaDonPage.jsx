// pơges/PhuongThucThanhToan
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useFetchChiTietHoaDon } from '../../utils/useFetchCTHD.jsx';
import ChiTietHoaDonList from '../../components/HoaDonList/ChiTietHoaDon.jsx';
import { handleSort } from '../../services/hoaDonService.js';
import { detail } from '../../services/hoaDonService.js';

const ChiTietHoaDonPage = () => {
    const { ChiTietHoaDon : initialChiTietHoaDon, loading, error } = useFetchChiTietHoaDon();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [chiTietHoaDon, setChiTietHoaDon] = useState(initialChiTietHoaDon);
    const [sortField, setSortField] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setChiTietHoaDon(initialChiTietHoaDon);
    }, [initialChiTietHoaDon]);

    const handleSearch = () => {
        setChiTietHoaDon(searchTerm, setChiTietHoaDon);
    };

    // const handleEdit = (idHoaDon) => {
    //     editChiTietHoaDon(navigate, idHoaDon);
    // };

    const viewDetail = (idHoaDon) => {
        detail(navigate, idHoaDon);
    };

    // const handleBlock = (idHoaDon) => {
    //     blockHoaDon(idHoaDon);
    // };

    const handleSortClick = (field) => {
        console.log('Sorted hướng:', field, 'Order:', sortOrder);
        handleSort(field, sortOrder, setChiTietHoaDon, setSortOrder, setSortField);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="hoa-don-page">
            <h1>Danh Sách Chi Tiết hóa Đơn</h1>
            <button onClick={() => navigate('/hoadon/add')} className="btn btn-success mb-3">
                Thêm Chi Tiết hóa đơn
            </button>
            <ChiTietHoaDonList
                chiTietHoaDon={chiTietHoaDon} 
                onEdit={handleEdit}
                viewDetail={viewDetail}
                onBlock={handleBlock} 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                handleSearch={handleSearch} 
                handleSort={handleSortClick} 
                sortOrder={sortOrder}
                sortField={sortField}
            />
        </div>
    );
}

export default ChiTietHoaDonPage;