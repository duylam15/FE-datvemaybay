// pơges/PhuongThucThanhToan

import React, { useState, useEffect } from 'react';
import { useFetchPTTT } from '../../../utils/useFetchPhuongThucTT.jsx';
import PhuongThucTTList from '../PhuongThucThanhToan/PhuongThucThanhToanList.jsx';
import { editPhuongThucTT } from '../../../services/phuongThucThanhToanService.js';
import { searchPhuongThucTT } from '../../../services/phuongThucThanhToanService.js';
import { handleSort } from '../../../services/phuongThucThanhToanService.js';
import { useNavigate } from 'react-router-dom';

import { Link, Outlet } from "react-router-dom";
import IconLabelButtons from "../../../components/Admin/ColorButtons";
import { PermissionAddButton } from '../../../components/Admin/Sidebar/index.jsx';


const PhuongThucTTPage = () => {
    const { phuongThucTT: initialPhuongThucTT, loading, error } = useFetchPTTT();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [phuongThucTT, setPhuongThucTT] = useState(initialPhuongThucTT);
    const [sortField, setSortField] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setPhuongThucTT(initialPhuongThucTT);
    }, [initialPhuongThucTT]);

    const handleSearch = () => {
        searchPhuongThucTT(searchTerm, setPhuongThucTT);
    };

    const handleEdit = (idPTTT) => {
        editPhuongThucTT(navigate, idPTTT);
    };

    const handleBlock = (idPTTT) => {
        blockPTTT(idPTTT);
    };

    const handleSortClick = (field) => {
        console.log('Sorted hướng:', field, 'Order:', sortOrder);
        handleSort(field, sortOrder, setPhuongThucTT, setSortOrder, setSortField);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="phuong-thuc-tt-page page">
            <h1 className='text'>Danh Sách Phương Thức Thanh Toán</h1>
            <PermissionAddButton feature="Quản lí PTTT">
                <Link to="add">
                    <IconLabelButtons></IconLabelButtons>
                </Link>
            </PermissionAddButton>
            <div className="separate_block"></div>


            <PhuongThucTTList
                phuongThucTT={phuongThucTT}
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
}

export default PhuongThucTTPage;