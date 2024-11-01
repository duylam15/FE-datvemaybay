// pơges/PhuongThucThanhToan
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useFetchChiTietHoaDon } from '../../../utils/useFetchCTHD.jsx';
import ChiTietHoaDonList from './ChiTietHoaDonList.jsx';
import { handleSort, searchChiTietHoaDon } from '../../../services/chiTietHoaDonService.js';
import { detail } from '../../../services/chiTietHoaDonService.js';

const ChiTietHoaDonPage = () => {
    const { idHoaDon } = useParams();

    const { chiTietHoaDon : initialChiTietHoaDon, loading, error } = useFetchChiTietHoaDon(idHoaDon);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [chiTietHoaDon, setChiTietHoaDon] = useState(initialChiTietHoaDon);
    const [sortField, setSortField] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setChiTietHoaDon(initialChiTietHoaDon);
    }, [initialChiTietHoaDon]);
    const handleSearch = () => {
        searchChiTietHoaDon(idHoaDon, searchTerm, setChiTietHoaDon);
    };

    const handleEdit = (idChiTietHoaDon) => {
        editChiTietHoaDon(navigate, idChiTietHoaDon);
    };

    const viewDetail = (idHoaDon) => {
        detail(navigate, idHoaDon);
    };

    const handleBlock = (idChiTietHoaDon) => {
        blockChiTietHoaDon(idChiTietHoaDon);
    };

    const handleSortClick = (field) => {
        console.log('Sorted hướng:', field, 'Order:', sortOrder);
        handleSort(field, sortOrder, idHoaDon, setChiTietHoaDon, setSortOrder, setSortField);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="chi-tiet-hoa-don-page page">
            <div className="top-bar">
                <div className="text">
                    <h1>Chi Tiết Hóa Đơn #{idHoaDon}</h1>
                </div>
            </div>
            
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
            <div className="bottom-bar">
                <div className="tongTien">
                    <p>Tổng tiền: {chiTietHoaDon.reduce((tongTien, cthd) => tongTien + cthd.soTien, 0)}VND</p>
                </div>
            </div>
        </div>
    );
}

export default ChiTietHoaDonPage;