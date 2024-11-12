import React, { useState, useEffect } from 'react';
import { useFetchKhachHang } from '../../../utils/useFetchKhachHang.jsx';
import KhachHangList from '../../../components/KhachHangList/KhachHangList.jsx';
import {Link, useNavigate } from 'react-router-dom';
import { handleSort, searchCustomers, editCustomer, blockCustomer } from '../../../services/customersServices.js';
import axios from 'axios';
import IconLabelButtons from "../../../components/Admin/ColorButtons";
const KhachHangPage = () => {
    const { khachHang: initialKhachHang, loading, error } = useFetchKhachHang();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [khachHang, setKhachHang] = useState(initialKhachHang);
    const [sortField, setSortField] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setKhachHang(initialKhachHang);
    }, [initialKhachHang]);

    const handleSearch = () => {
        searchCustomers(searchTerm, setKhachHang);
    };

    const handleEdit = (idKhachHang) => {
        editCustomer(navigate, idKhachHang);
    };

    const handleBlock = (idKhachHang) => {
        blockCustomer(idKhachHang);
    };

    const handleSortClick = (field) => {
        console.log('Sorted hướng:', field, 'Order:', sortOrder);
        handleSort(field, sortOrder, setKhachHang, setSortOrder, setSortField);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="khach-hang-page">
            <div onClick={() => navigate('/admin/customer/add')}>
            <IconLabelButtons></IconLabelButtons>
            </div>
            <KhachHangList 
                khachHang={khachHang} 
                onEdit={handleEdit} 
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

export default KhachHangPage;
