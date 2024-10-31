// pơges/PhuongThucThanhToan

import React, { useState, useEffect } from 'react';
import { useFetchTaiKhoan } from '../../../utils/useFetchTaiKhoan.jsx';
import TaiKhoanList from './TaiKhoanList.jsx';
import { useNavigate } from 'react-router-dom';
import { editTaiKhoan, handlePaginatonServ, handleSort, searchTaiKhoan } from '../../../services/qlTaiKhoanService.js';

const TaiKhoanPage = () => {
    const { taiKhoan: initialTaiKhoan, loading, error } = useFetchTaiKhoan();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [taiKhoan, setTaiKhoan] = useState(initialTaiKhoan);
    const [sortField, setSortField] = React.useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        setTaiKhoan(initialTaiKhoan);
    }, [initialTaiKhoan]);

    const handleSearch = () => {
        searchTaiKhoan(searchTerm, setTaiKhoan);
    };

    const handleEdit = (idTaiKhoan) => {
        editTaiKhoan(navigate, idTaiKhoan);
    };

    const handleBlock = (idPTTT) => {
        blockPTTT(idPTTT);
    };

    const handleSortClick = (field) => {
        console.log('Sorted hướng:', field, 'Order:', sortOrder);
        handleSort(field, sortOrder, setTaiKhoan, setSortOrder, setSortField);
    };

    const handlePagination = () => {
        handlePaginatonServ(page, size, setTaiKhoan);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="tai-khoan-tt-page page">
            <div className='top-bar'>
                <h1 className='text'>Danh Sách Tài Khoản</h1>
                <button onClick={() => navigate('/admin/taikhoan/add')} className="btn btn-success mb-3 add-btn">
                    Thêm Tài Khoản
                </button>
            </div>
            
            
            <TaiKhoanList
                taiKhoan={taiKhoan} 
                onEdit={handleEdit} 
                onBlock={handleBlock} 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                handleSearch={handleSearch} 
                handleSort={handleSortClick} 
                sortOrder={sortOrder}
                sortField={sortField}
                handlePagination={handlePagination}
                setPage={setPage}
                setSize={setSize}
            />
        </div>
    );
}

export default TaiKhoanPage;