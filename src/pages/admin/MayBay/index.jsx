import React, { useState, useEffect } from 'react';
import { useFetchMayBay } from '../../../utils/useFetchMayBay.jsx';
import MayBayList from '../../../pages/admin/MayBay/MayBayList.jsx';
import AddMayBayForm from './ThemMayBay.jsx';
import { useNavigate } from 'react-router-dom';
import { handleSort, searchPlanes, editPlane, blockPlane, getSoLuong, getByAirline} from '../../../services/planesServices.js';
import './MayBay.css';
import axios from 'axios';
const API_URL = 'http://localhost:8080';
const MayBayPage = () => {
    const { mayBay: initialMayBay, loadingMayBay, errorMayBay } = useFetchMayBay();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [mayBay, setMayBay] = useState(initialMayBay);
    const [sortField, setSortField] = React.useState('');
    const [soGhe, setSoGhe] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setMayBay(initialMayBay);
    }, [initialMayBay]);
 
    const handleSearch = () => {
        searchPlanes(searchTerm, setMayBay);
    };

    const handleEdit = (idMayBay) => {
        editPlane(navigate, idMayBay);
    };

    const handleBlock = async (idMayBay) => {
        console.log('handleBlock');
        try {
            const updatedPlane = await blockPlane(idMayBay);
            // Cập nhật state mayBay để thay đổi trạng thái máy bay trong giao diện
            setMayBay((prevMayBay) =>
                prevMayBay.map((mb) =>
                    mb.idMayBay === idMayBay ? { ...mb, trangThaiActive: updatedPlane.trangThaiActive } : mb
                )
            );
        } catch (error) {
            console.error('Failed to block the plane!', error);
        }
    };

    const handleSortClick = (field) => {
        console.log('Sorted hướng:', field, 'Order:', sortOrder);
        handleSort(field, sortOrder, setMayBay, setSortOrder, setSortField);
    };

    useEffect(() => {
        const fetchSoLuongGhe = async () => {
            const gheMap = {};
            for (const mb of initialMayBay) {
                const slGhe = await getSoLuong(mb.idMayBay);
                gheMap[mb.idMayBay] = slGhe;
            }
            setSoGhe(gheMap);
        };
        fetchSoLuongGhe();
    }, [initialMayBay]);
    
    const getPlaneByAirline = async (idHangBay) => {
        try {
            await getByAirline(idHangBay, setMayBay); // Gọi hàm với setMayBay
        } catch (error) {
            console.error;
        }
    };

    

    if (loadingMayBay) return <p>Loading...</p>;
    if (errorMayBay) return <p>Error: {errorMayBay}</p>;

    return (
        <div className="may-bay-page">
            <h1>Danh Sách Máy Bay</h1>
            <button onClick={() => navigate('/admin/maybay/add')} className="btn them-button">
                Thêm Máy Bay
            </button>
            
            <MayBayList 
                mayBay={mayBay}
                onEdit={handleEdit} 
                getSoLuongGhe={(id) => soGhe[id] || 'Đang tải...'}
                getPlaneByAirline={getPlaneByAirline}
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

export default MayBayPage;