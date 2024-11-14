import React, { useState, useEffect } from 'react';
import { useFetchMayBay } from '../../../utils/useFetchMayBay.jsx';
import MayBayList from '../../../pages/admin/MayBay/MayBayList.jsx';
import AddMayBayForm from './ThemMayBay.jsx';
import { useNavigate } from 'react-router-dom';
import { handleSort, searchPlanes, editPlane, blockPlane, getSoLuong, getByAirline, getByAirport} from '../../../services/planesServices.js';
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
        try {
            const updatedMayBay = await blockPlane(idMayBay);  // Gọi blockReview và lấy lại danh sách đánh giá
            setMayBay(updatedMayBay);  // Cập nhật danh sách đánh giá mới
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

    const getPlaneByAirport = async (idSanBay) => {
        try {
            await getByAirport(idSanBay, setMayBay); // Gọi hàm với setMayBay
        } catch (error) {
            console.error;
        }
    };
    

    if (loadingMayBay) return <p>Loading...</p>;
    if (errorMayBay) return <p>Error: {errorMayBay}</p>;

    return (
        <div className="may-bay-page">
            <h1 className='title'>Danh Sách Máy Bay</h1>
            <button onClick={() => navigate('/admin/maybay/add')} className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeLarge MuiButton-outlinedSizeLarge MuiButton-colorPrimary MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeLarge MuiButton-outlinedSizeLarge MuiButton-colorPrimary css-camtgg-MuiButtonBase-root-MuiButton-root">
                <span className='MuiButton-icon MuiButton-startIcon MuiButton-iconSizeLarge css-170ovb9-MuiButton-startIcon'>
                    <svg className='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1umw9bq-MuiSvgIcon-root' focusable='false' aria-hidden='true'
                                        viewBox='0 0 24 24'
                    >
                        <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z'></path>
                    </svg>
                </span>
                Thêm
            </button>
            
            <MayBayList 
                mayBay={mayBay}
                onEdit={handleEdit} 
                getSoLuongGhe={(id) => soGhe[id] || 'Đang tải...'}
                getPlaneByAirline={getPlaneByAirline}
                getPlaneByAirport={getPlaneByAirport}
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