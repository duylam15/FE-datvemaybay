// pơges/PhuongThucThanhToan
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useFetchHoaDon } from '../../../utils/useFetchHoaDon.jsx';
import HoaDonList from '../../../components/HoaDonList/HoaDonList.jsx';
import { editHoaDon } from '../../../services/hoaDonService.js';
import { searchHoaDon } from '../../../services/hoaDonService.js';
import { handleSort } from '../../../services/hoaDonService.js';
import { detail } from '../../../services/hoaDonService.js';

const HoaDonPage = () => {
    const { hoaDon: initialHoaDon, loading, error } = useFetchHoaDon();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [hoaDon, setHoaDon] = useState(initialHoaDon);
    const [sortField, setSortField] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setHoaDon(initialHoaDon);
    }, [initialHoaDon]);

    const handleSearch = () => {
        searchHoaDon(searchTerm, setHoaDon);
    };

    const handleEdit = (idHoaDon) => {
        editHoaDon(navigate, idHoaDon);
    };

    const viewDetail = (idHoaDon) => {
        detail(navigate, idHoaDon);
    };

    const handleBlock = (idHoaDon) => {
        blockHoaDon(idHoaDon);
    };

    const handleSortClick = (field) => {
        console.log('Sorted hướng:', field, 'Order:', sortOrder);
        handleSort(field, sortOrder, setHoaDon, setSortOrder, setSortField);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="hoa-don-page">
            <h1>Danh Sách Hóa Đơn</h1>
            <button onClick={() => navigate('/hoadon/add')} className="btn btn-success mb-3">
                Thêm Hóa đơn
            </button>
            <HoaDonList
                hoaDon={hoaDon} 
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

export default HoaDonPage;