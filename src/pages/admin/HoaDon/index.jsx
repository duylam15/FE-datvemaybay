// pơges/PhuongThucThanhToan
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useFetchHoaDon } from '../../../utils/useFetchHoaDon.jsx';
import HoaDonList from './HoaDonList.jsx';
import { editHoaDon, getComboboxValue } from '../../../services/hoaDonService.js';
import { searchHoaDon } from '../../../services/hoaDonService.js';
import { handleSort } from '../../../services/hoaDonService.js';
import { detail } from '../../../services/hoaDonService.js';
import { filHoaDon } from '../../../services/hoaDonService.js';
import { updateHoaDonStatus } from '../../../services/hoaDonService.js';

import { Link, Outlet } from "react-router-dom";
import IconLabelButtons from "../../../components/Admin/ColorButtons";
import { PermissionAddButton } from '../../../components/Admin/Sidebar/index.jsx';

import "../HoaDon/HoaDon.scss";

const HoaDonPage = () => {
    const { hoaDon: initialHoaDon, loading, error } = useFetchHoaDon();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [hoaDon, setHoaDon] = useState(initialHoaDon);
    const [sortField, setSortField] = React.useState('');
    const [filterType, setFilterType] = useState('0');
    const [selectedValue, setSelectedValue] = useState('0');
    const [comboBoxValues, setComboBoxValues] = useState([]);

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

    const handleComboBoxValues = (field) => {
        console.log('Type: ', field);

        if (field == "0") {
            setComboBoxValues([]);
        }
        else {
            getComboboxValue(field, setComboBoxValues);
            console.log("cbb value trong handle: ", comboBoxValues);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="hoa-don-page page">
            <h1>Danh Sách Hóa Đơn</h1>
            <PermissionAddButton feature="Quản lí hoá đơn">
                <Link to="add">
                    <IconLabelButtons></IconLabelButtons>
                </Link>
            </PermissionAddButton>

            <div className="separate_block"></div>

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
                handleComboBoxValues={handleComboBoxValues}
                comboBoxValues={comboBoxValues}
            />
        </div>
    );
}

export default HoaDonPage;