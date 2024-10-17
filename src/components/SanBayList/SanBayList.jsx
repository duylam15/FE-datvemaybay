import axios from 'axios';
import React, { useState, useEffect } from 'react';
const API_URL = 'http://localhost:8080';

const SanBayList = ({ sanBay, getAirportByCity, onEdit, searchTerm, setSearchTerm, handleSearch, handleSort, handleBlock, sortOrder, sortField }) => {
    const [listCity, setListCity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getThanhPho = async() => {
        const response = await fetch(`${API_URL}/getAllCity`); // Thay đổi endpoint theo API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch airline');
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        return data; // Trả về phần data bên trong JSON
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getThanhPho();
                setListCity(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    });
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
                <select onChange={(e) => getAirportByCity(e.target.value)} className="form-control">
                    <option value="">Lọc theo thành phố</option>
                    {listCity.map((ct) => (
                        <option value={ct.idThanhPho} key={ct.idThanhPho}>
                            {ct.idThanhPho} - {ct.tenThanhPho}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table table-striped">
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
                        <th>Địa Chỉ</th>
                        <th>Thành Phố</th>
                        <th>Trạng Thái</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sanBay.length > 0 ? (
                        sanBay.map(sb => (
                            <tr key={sb.idSanBay}>
                                <td>{sb.idSanBay}</td> {/* Thêm cột ID để tránh thiếu cột */}
                                <td>{sb.tenSanBay}</td>
                                <td>{sb.iataSanBay}</td>
                                <td>{sb.icaoSanBay}</td>
                                <td>{sb.diaChi}</td>
                                <td>{sb.thanhPho.tenThanhPho}</td>
                                <td>{sb.trangThaiActive === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}</td>
                                <td>
                                    <button className="btn btn-primary mr-2" onClick={() => onEdit(sb.idSanBay)}>Edit</button>
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => handleBlock(sb.idSanBay)}
                                    >
                                        {sb.trangThaiActive === 'ACTIVE' ? 'Block' : 'Unblock'}
                                    </button>
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