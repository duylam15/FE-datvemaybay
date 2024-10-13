import React, { useState, useEffect } from 'react';
import { useFetchMayBay } from '../../utils/useFetchMayBay.jsx';
import MayBayList from '../../components/MayBayList/MayBayList.jsx';
import { useNavigate } from 'react-router-dom';
import { handleSort, searchPlanes, editPlane, blockPlane} from '../../services/planesServices.js';
import axios from 'axios';

const MayBayPage = () => {
    const { mayBay: initialMayBay, loading, error } = useFetchMayBay();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [mayBay, setMayBay] = useState(initialMayBay);
    const [sortField, setSortField] = React.useState('');
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

    const handleBlock = (idMayBay) => {
        console.log('handleSort')
        blockPlane(idMayBay);
    };

    const handleSortClick = (field) => {
        console.log('Sorted hướng:', field, 'Order:', sortOrder);
        handleSort(field, sortOrder, setMayBay, setSortOrder, setSortField);
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="may-bay-page">
            <h1>Danh Sách Máy Bay</h1>
            <button onClick={() => navigate('/plane/add')} className="btn btn-success mb-3">
                Thêm Máy Bay
            </button>
            <MayBayList 
                mayBay={mayBay}
                onEdit={handleEdit} 
                onBlock={handleBlock} 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                handleSearch={handleSearch} 
                handleSort={handleSortClick} 
                handleBlock={handleBlock}
                sortOrder={sortOrder} 
                sortField={sortField}
            />
        </div>
    );
};

export default MayBayPage;