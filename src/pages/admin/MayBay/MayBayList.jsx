import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MayBay.css'

const API_URL = 'http://localhost:8080';
const MayBayList = ({ mayBay, onEdit, getSoLuongGhe, getPlaneByAirline, onBlock, searchTerm, setSearchTerm, handleSearch, handleSort, sortOrder, sortField }) => {
    const [hangBay, setHangBay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getHangBay = async () => {
        const response = await fetch(`${API_URL}/getAllAirline`); // Thay đổi endpoint theo API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch airline');
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        return data.data; // Trả về phần data bên trong JSON
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHangBay();
                setHangBay(data);
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
                    placeholder="Tìm kiếm máy bay..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm Kiếm</button>
                <select onChange={(e) => getPlaneByAirline(e.target.value)} className='form-control'>
                    <option value="Lọc theo hãng bay">Lọc theo hãng bay</option>
                    {hangBay.map((hb) => (
                        <option value={hb.idHangBay} key={hb.idHangBay}>
                            {hb.idHangBay} - {hb.tenHangBay}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th onClick={() => handleSort('idMayBay')}>
                            ID {sortField === 'idMayBay' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('tenMayBay')}>
                            Tên Máy Bay {sortField === 'tenMayBay' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('hangBay')}>
                            Hãng Bay {sortField === 'hangBay' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('icaoMayBay')}>
                            ICAO Máy Bay {sortField === 'icaoMayBay' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('soHieu')}>
                            Số Hiệu {sortField === 'soHieu' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th>Số Lượng Ghế</th>
                        <th>Năm Sản Xuất</th>
                        <th>Trạng Thái</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {mayBay.length > 0 ? (
                        mayBay.map(mb => (
                            <tr key={mb.idMayBay}>
                                <td>{mb.idMayBay}</td>
                                <td>{mb.tenMayBay}</td>
                                <td>{mb.hangBay.tenHangBay}</td>
                                <td>{mb.icaoMayBay}</td>
                                <td>{mb.soHieu}</td>
                                <td>{getSoLuongGhe(mb.idMayBay)}</td>
                                <td>{mb.namSanXuat}</td>
                                <td>{mb.trangThaiActive === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}</td>
                                <td>
                                    <div className="button-group">
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => onEdit(mb.idMayBay)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className={`btn btn-block`}
                                            onClick={() => onBlock(mb.idMayBay)}
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

export default MayBayList;
