import React, { useState, useEffect } from 'react';
import { useFetchKhachHang } from '../../utils/useFetchKhachHang.jsx';
import KhachHangList from '../../components/KhachHangList/KhachHangList.jsx';
import AddKhachHangForm from '../KhachHang/ThemKhachHang.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KhachHangPage = () => {
    const { khachHang: initialKhachHang, loading, error } = useFetchKhachHang();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [khachHang, setKhachHang] = useState(initialKhachHang);
    const navigate = useNavigate();

    useEffect(() => {
        setKhachHang(initialKhachHang);
    }, [initialKhachHang]);

    // const handleAddKhachHang = (newKhachHang) => {
    //     setKhachHang(prevKhachHang => [...prevKhachHang, newKhachHang]); // Cập nhật danh sách khách hàng
    // };

    // Các hàm khác (handleSearch, handleSort, handleEdit, handleBlock) giữ nguyên...
    const handleSearch = () => {
        axios.get(`http://localhost:8080/findKhachHang`, { params: { keyword: searchTerm } })
            .then(response => {
                console.log('Search results:', response.data);
                setKhachHang(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    };

    const handleSort = (field) => {
        axios.get("http://localhost:8080/getAllCustomerSorted", { params: { field, order: sortOrder } })
            .then(response => {
                console.log('Sorted results:', response.data);
                setKhachHang(response.data.data);
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            })
            .catch(error => {
                console.error('Error fetching sorted results:', error);
            });
    };

    const handleEdit = (idKhachHang) => {
        navigate(`/khachhang/edit/${idKhachHang}`);
    };

    const handleBlock = (idKhachHang) => {
        axios.put(`/api/khachhang/block/${idKhachHang}`)
            .then(response => {
                console.log(`Blocked customer with ID: ${idKhachHang}`);
            })
            .catch(error => {
                console.error('There was an error blocking the customer!', error);
            });
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="khach-hang-page">
            <h1>Danh Sách Khách Hàng</h1>
            <button onClick={() => navigate('/khachhang/add')} className="btn btn-success mb-3">
                Thêm Khách Hàng
            </button>
            <KhachHangList 
                khachHang={khachHang} 
                onEdit={handleEdit} 
                onBlock={handleBlock} 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                handleSearch={handleSearch} 
                handleSort={handleSort} 
                sortOrder={sortOrder} 
            />
        </div>
    );
};

export default KhachHangPage;
