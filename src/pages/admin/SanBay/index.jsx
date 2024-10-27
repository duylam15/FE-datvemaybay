import React, { useState, useEffect } from 'react';
import { useFetchSanBay } from '../../../utils/useFetchSanBay.jsx';
import SanBayList from '../../../pages/admin/SanBay/SanBayList.jsx';
import AddSanBayForm from './ThemSanBay.jsx';
import { useNavigate } from 'react-router-dom';
import { blockAirport, editAirport, getByCity, handleSortAirport, searchAirports } from '../../../services/airportsService.js';
import './SanBay.css';
import axios from 'axios';
const API_URL = 'http://localhost:8080';
const SanBayPage = () => {
    const { sanBay: initialsanBay, loadingsanBay, errorsanBay } = useFetchSanBay();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sanBay, setsanBay] = useState(initialsanBay);
    const [sortField, setSortField] = React.useState('');
    const [soGhe, setSoGhe] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setsanBay(initialsanBay);
    }, [initialsanBay]);
 
    const handleSearch = () => {
        searchAirports(searchTerm, setsanBay);
    };

    const handleEdit = (idsanBay) => {
        editAirport(navigate, idsanBay);
    };

    const handleBlock = async (idsanBay) => {
        console.log('handleBlock');
        try {
            const updatedAirport = await blockAirport(idsanBay);
            // Cập nhật state sanBay để thay đổi trạng thái máy bay trong giao diện
            setsanBay((prevsanBay) =>
                prevsanBay.map((mb) =>
                    mb.idsanBay === idsanBay ? { ...mb, trangThaiActive: updatedAirport.trangThaiActive } : mb
                )
            );
        } catch (error) {
            console.error('Failed to block the aiport!', error);
        }
    };

    const handleSortClick = (field) => {
        console.log('Sorted hướng:', field, 'Order:', sortOrder);
        handleSortAirport(field, sortOrder, setsanBay, setSortOrder, setSortField);
    };

   
    const getAirportByCity = async (idThanhPho) => {
        try {
            await getByCity(idThanhPho, setsanBay); // Gọi hàm với setsanBay
        } catch (error) {
            console.error;
        }
    };

    

    if (loadingsanBay) return <p>Loading...</p>;
    if (errorsanBay) return <p>Error: {errorsanBay}</p>;

    return (
        <div className="may-bay-page">
            <h1>Danh Sách Sân Bay</h1>
            <button onClick={() => navigate('/admin/sanbay/add')} className="btn them-button">
                Thêm Sân Bay
            </button>
            
            <SanBayList 
                sanBay={sanBay}
                onEdit={handleEdit} 
                getAirportByCity={getAirportByCity}
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
};

export default SanBayPage;