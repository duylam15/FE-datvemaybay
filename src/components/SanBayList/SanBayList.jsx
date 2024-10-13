import React from 'react';
import axios from 'axios';

const SanBayList = ({ sanBay, onEdit, searchTerm, setSearchTerm, handleSearch, handleSort, handleBlock, sortOrder, sortField }) => {
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
                    {sanBay.map(sb => (
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
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default SanBayList;