import React, { useEffect, useState } from "react";
import { useFetchSanBay } from "../../utils/useFetchSanBay";
import SanBayList from '../../components/SanBayList/SanBayList';
import { useNavigate } from "react-router-dom";
import { blockAirport, editAirport, handleSort, searchAirports } from "../../services/airportsServices";

const SanBayPage = () => {
    const {sanBay: initialSanBay, loading, error} = useFetchSanBay();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sanBay, setSanBay] = useState(initialSanBay);
    const [sortField, setSortField] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setSanBay(initialSanBay);
    },[initialSanBay]);

    const handleSearch = () => {
        searchAirports(searchTerm, setSanBay);
    };

    const handleEdit = (idSanBay) => {
        editAirport(navigate, idSanBay);
    };

    const handleBlock = (idSanBay) => {
        console.log('handleSort')
        blockAirport(idSanBay);
    };

    const handleSortClick = (field) => {
        console.log('Sorted hướng:', field, 'Order:', sortOrder);
        handleSort(field, sortOrder, setSanBay, setSortOrder, setSortField);
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="san-bay-page">
            <h1>Danh Sách Sân Bay</h1>
            <button onClick={() => navigate('/airport/add')} className="btn btn-success mb-3">
                Thêm Sân Bay
            </button>
            <SanBayList
                sanBay={sanBay}
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
    )
}
export default SanBayPage;