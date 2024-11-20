import React, { useState, useEffect } from 'react';
import { useFetchLoaiHoaDon } from '../../../utils/useFetchLoaiHD.jsx';
import LoaiHoaDonList from './LoaiHoaDonList.jsx';
import { editLoaiHoaDon } from '../../../services/loaiHoaDonService.js';
import { searchLoaiHoaDon } from '../../../services/loaiHoaDonService.js';
import { handleSort } from '../../../services/loaiHoaDonService.js';
import { useNavigate } from 'react-router-dom';

import { Link, Outlet } from "react-router-dom";
import IconLabelButtons from "../../../components/Admin/ColorButtons";
import { PermissionAddButton } from '../../../components/Admin/Sidebar/index.jsx';

const LoaiHoaDonPage = () => {
    const { loaiHoaDon: initialLoaiHoaDon, loading, error } = useFetchLoaiHoaDon();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loaiHoaDon, setLoaiHoaDon] = useState(initialLoaiHoaDon);
    const [sortField, setSortField] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoaiHoaDon(initialLoaiHoaDon);
    }, [initialLoaiHoaDon]);

    const handleSearch = () => {
        searchLoaiHoaDon(searchTerm, setLoaiHoaDon);
    };

    const handleEdit = (idLoaiHoaDon) => {
        editLoaiHoaDon(navigate, idLoaiHoaDon);
    };

    const handleBlock = (idLoaiHoaDon) => {
        blockLoaiHoaDon(idLoaiHoaDon);
    };

    const handleSortClick = (field) => {
        console.log('Sorted hướng:', field, 'Order:', sortOrder);
        handleSort(field, sortOrder, setLoaiHoaDon, setSortOrder, setSortField);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="loai-hoa-don-page page">
            <h1>Danh Sách Loại Hóa Đơn</h1>
            <PermissionAddButton feature="Quản lí loại hoá đơn">
                <Link to="add">
                    <IconLabelButtons></IconLabelButtons>
                </Link>
            </PermissionAddButton>

            <div className="separate_block"></div>


            <LoaiHoaDonList
                loaiHoaDon={loaiHoaDon}
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

export default LoaiHoaDonPage;