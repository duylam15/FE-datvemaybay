// pơges/PhuongThucThanhToan
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useFetchHoaDon } from '../../../utils/useFetchHoaDon.jsx';
import HoaDonList from './HoaDonList.jsx'; 
import { editHoaDon } from '../../../services/hoaDonService.js';
import { searchHoaDon } from '../../../services/hoaDonService.js';
import { handleSort } from '../../../services/hoaDonService.js';
import { detail } from '../../../services/hoaDonService.js';
import { filHoaDon } from '../../../services/hoaDonService.js';
import { updateHoaDonStatus } from '../../../services/hoaDonService.js';

const HoaDonPage = () => {
    const { hoaDon: initialHoaDon, loading, error } = useFetchHoaDon();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [hoaDon, setHoaDon] = useState(initialHoaDon);
    const [sortField, setSortField] = React.useState('');
    const [filterType, setFilterType] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

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
    
    const handleFilter = (filterType, selectedValue) => { 
        try {
            filHoaDon(filterType, selectedValue, setHoaDon);
            console.log(hoaDon);
        } catch (err) {
            setError('Không thể tải dữ liệu hóa đơn.');
        }
    };


    const handleState = (id, status) => {
        console.log('Cập nhật trạng thái hóa đơn: ', id, 'trạng thái: ', status);
        updateHoaDonStatus(id, status, setHoaDon);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="hoa-don-page page">
            <div className="top-bar">
                <div className="text">
                    <h1>Danh Sách Hóa Đơn</h1>
                </div>
            </div>
            
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
                filterType={filterType}
                setFilterType={setFilterType}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                handleFilter={handleFilter}
                handleState={handleState}
            />
        </div>
    );
}

export default HoaDonPage;