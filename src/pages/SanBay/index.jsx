import React, { useEffect, useState } from "react";
import { useFetchSanBay } from "../../utils/useFetchSanBay";
import SanBayList from '../../components/SanBayList/SanBayList';
import { useNavigate } from "react-router-dom";
import { blockAirport, editAirport, handleSort, searchAirports, searchByCity } from "../../services/airportsServices";
import axios from "axios";

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

    const handleBlock = async(idSanBay) => {
        console.log('handleSort')
        // blockAirport(idSanBay);
        try {
            const updatedAirport = await blockAirport(idSanBay);
            // Cập nhật state mayBay để thay đổi trạng thái máy bay trong giao diện
            setSanBay((prevSanBay) =>
                prevSanBay.map((sb) =>
                    sb.idSanBay === idSanBay ? { ...sb, trangThaiActive: updatedAirport.trangThaiActive } : sb
                )
            );
        } catch (error) {
            console.error('Failed to block the airport!', error);
        }
    };

    const handleSortClick = (field) => {
        console.log('Sorted hướng:', field, 'Order:', sortOrder);
        handleSort(field, sortOrder, setSanBay, setSortOrder, setSortField);
    };

    const getAirportByCT = async (idThanhPho) => {
        try {
            await searchByCity(idThanhPho, setSanBay);
        } catch (error) {
            console.error;
        }
    }
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
                getAirportByCity={getAirportByCT}
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