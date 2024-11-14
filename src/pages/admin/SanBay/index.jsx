import React, { useState, useEffect } from 'react';
import { useFetchSanBay } from '../../../utils/useFetchSanBay.jsx';
import SanBayList from '../../../pages/admin/SanBay/SanBayList.jsx';
import AddSanBayForm from './ThemSanBay.jsx';
import { useNavigate } from 'react-router-dom';
import { blockAirport, editAirport, getByCity, getByNation, handleSortAirport, searchAirports } from '../../../services/airportsService.js';
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
        try {
            const updatedSanBay = await blockAirport(idsanBay);  // Gọi blockReview và lấy lại danh sách đánh giá
            setsanBay(updatedSanBay);  // Cập nhật danh sách đánh giá mới
        } catch (error) {
            console.error('Failed to block the airport!', error);
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

    const getAirportByNation = async (idQuocGia) => {
        try {
            await getByNation(idQuocGia, setsanBay);
        } catch (error) {
            console.error;
        }
    }

    if (loadingsanBay) return <p>Loading...</p>;
    if (errorsanBay) return <p>Error: {errorsanBay}</p>;

    return (
        <div className="may-bay-page">
            <h1>Danh Sách Sân Bay</h1>
            <button onClick={() => navigate('/admin/sanbay/add')} className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeLarge MuiButton-outlinedSizeLarge MuiButton-colorPrimary MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeLarge MuiButton-outlinedSizeLarge MuiButton-colorPrimary css-camtgg-MuiButtonBase-root-MuiButton-root">
                <span className='MuiButton-icon MuiButton-startIcon MuiButton-iconSizeLarge css-170ovb9-MuiButton-startIcon'>
                    <svg className='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1umw9bq-MuiSvgIcon-root' focusable='false' aria-hidden='true'
                                        viewBox='0 0 24 24'
                    >
                        <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z'></path>
                    </svg>
                </span>
                Thêm
            </button>
            
            <SanBayList 
                sanBay={sanBay}
                onEdit={handleEdit} 
                getAirportByCity={getAirportByCity}
                getAirportByNation={getAirportByNation}
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