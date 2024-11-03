import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SanBay.css'

const API_URL = 'http://localhost:8080';
const SanBayList = ({ sanBay, onEdit, getAirportByCity, getAirportByNation, onBlock, searchTerm, setSearchTerm, handleSearch, handleSort, sortOrder, sortField }) => {
    const [thanhPho, setThanhPho] = useState([]);
    const [quocgia, setQuocGia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getThanhPho = async () => {
        const response = await fetch(`${API_URL}/admin/thanhpho/getAllCity`); // Thay đổi endpoint theo API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch city');
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        return data.data; // Trả về phần data bên trong JSON
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getThanhPho();
                setThanhPho(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getQuocGia = async () => {
        const response = await fetch(`${API_URL}/admin/quocgia/getAllNation`); // Thay đổi endpoint theo API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch nation');
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        return data.data; // Trả về phần data bên trong JSON
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getQuocGia();
                setQuocGia(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            <div className="search-sort-controls">
                <input
                    type="text"
                    placeholder="Tìm kiếm sân bay..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm Kiếm</button>
                <select onChange={(e) => getAirportByCity(e.target.value)} className='form-control'>
                    <option value="Lọc theo thành phố">Lọc theo thành phố</option>
                    {thanhPho.map((tp) => (
                        <option value={tp.idThanhPho} key={tp.idThanhPho}>
                            {tp.idThanhPho} - {tp.tenThanhPho}
                        </option>
                    ))}
                </select>
                <select onChange={(e) => getAirportByNation(e.target.value)} className='form-control'>
                    <option value="Lọc theo quốc gia">Lọc theo quốc gia</option>
                    {quocgia.map((qg) => (
                        <option value={qg.idQuocGia} key={qg.idQuocGia}>
                            {qg.idQuocGia} - {qg.tenQuocGia}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th onClick={() => handleSort('idSanBay')}>
                            ID {sortField === 'idSanBay' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('tenSanBay')}>
                            Tên Sân Bay {sortField === 'tenSanBay' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('iataSanBay')}>
                            IATA Sân Bay {sortField === 'iataSanBay' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('icaoSanBay')}>
                            ICAO Sân Bay {sortField === 'icaoSanBay' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th>Địa chỉ</th>
                        <th>Thành Phố</th>
                        <th>Trạng thái</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {sanBay.length > 0 ? (
                        sanBay.map(mb => (
                            <tr key={mb.idSanBay}>
                                <td>{mb.idSanBay}</td>
                                <td>{mb.tenSanBay}</td>
                                <td>{mb.iataSanBay}</td>
                                <td>{mb.icaoSanBay}</td>
                                <td>{mb.thanhPho.tenThanhPho}</td>
                                <td>{mb.diaChi}</td>
                                <td>{mb.trangThaiActive === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}</td>
                                <td>
                                    <div className="button-group">
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => onEdit(mb.idSanBay)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className={`btn btn-block`}
                                            onClick={() => onBlock(mb.idSanBay)}
                                        >
                                            {mb.trangThaiActive === 'ACTIVE' ? 'Block' : 'Unblock'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">Không tìm thấy kết quả tìm kiếm!</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SanBayList;
