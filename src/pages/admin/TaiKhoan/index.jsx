// pơges/PhuongThucThanhToan

import React, { useState, useEffect } from 'react';
import TaiKhoanList from './TaiKhoanList.jsx';
import { useNavigate } from 'react-router-dom';
import { editTaiKhoan, getTaiKhoan, handlePaginatonServ, handleSort, searchTaiKhoan } from '../../../services/qlTaiKhoanService.js';

import { Link, Outlet } from "react-router-dom";
import IconLabelButtons from "../../../components/Admin/ColorButtons";
import Pagination from "@mui/material/Pagination"; // Import Pagination
import Stack from "@mui/material/Stack"; // Import Stack
import { PermissionAddButton } from '../../../components/Admin/Sidebar/index.jsx';

const TaiKhoanPage = ({ size = 10 }) => {
    const { loading, error } = ([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [taiKhoan, setTaiKhoan] = useState([]);
    const [sortField, setSortField] = React.useState('');

    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [totalPages, setTotalPages] = useState(0); // State for total pages

    const navigate = useNavigate();

    const fetchTaiKhoan = async (page) => {
        try {
            const result = await getTaiKhoan(page - 1, size); // API usually uses 0-based indexing
            if (result && result.data) {
                setTaiKhoan(result.data.content);
                setTotalPages(result.data.totalPages); // Update total pages based on API response
            } else {
                setTaiKhoan([]);
                setTotalPages(0);
            }
        } catch (error) {
            console.error("Error fetching permissions:", error);
        }
    };

    // useEffect(() => {
    //     setTaiKhoan(initialTaiKhoan);
    // }, [initialTaiKhoan]);

    useEffect(() => {
        fetchTaiKhoan(currentPage); // Fetch with the current page
    }, [currentPage]); // Fetch data when currentPage or searchName changes

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
            <h1 className='text'>Danh Sách Tài Khoản</h1>
            <PermissionAddButton feature="Quản lí tài khoản">
                <Link to="add">
                    <IconLabelButtons></IconLabelButtons>
                </Link>
            </PermissionAddButton>
            <div className="separate_block"></div>


            <TaiKhoanList
                taiKhoan={taiKhoan}
                onEdit={handleEdit}
                // onBlock={handleBlock} 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                handleSort={handleSortClick}
                sortOrder={sortOrder}
                sortField={sortField}
                handlePagination={handlePagination}
            />
            {totalPages > 1 && (
                <div className="center">
                    <Stack spacing={2}>
                        <Pagination
                            count={totalPages} // Tổng số trang
                            page={currentPage} // Trang hiện tại
                            variant="outlined"
                            shape="rounded"
                            onChange={(event, value) => setCurrentPage(value)} // Cập nhật trang hiện tại
                        />
                    </Stack>
                </div>
            )}
        </div>
    );
}

export default TaiKhoanPage;