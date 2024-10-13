import React from 'react';
import axios from 'axios';

const MayBayList = ({ mayBay, onEdit, searchTerm, setSearchTerm, handleSearch, handleSort, handleBlock, sortOrder, sortField }) => {
    
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
            </div>
            <table className="table table-striped">
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
                    {mayBay.map(mb => (
                        <tr key={mb.idMayBay}>
                            <td>{mb.idMayBay}</td> {/* Thêm cột ID để tránh thiếu cột */}
                            <td>{mb.tenMayBay}</td>
                            <td>{mb.hangBay.tenHangBay}</td>
                            <td>{mb.icaoMayBay}</td>
                            <td>{mb.soHieu}</td>
                            <td>{mb.soLuongGhe}</td>
                            <td>{mb.namSanXuat}</td>
                            <td>{mb.trangThaiActive === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}</td>
                            <td>
                                <button className="btn btn-primary mr-2" onClick={() => onEdit(mb.idMayBay)}>Edit</button>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => handleBlock(mb.idMayBay)}
                                >
                                    {mb.trangThaiActive === 'ACTIVE' ? 'Block' : 'Unblock'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MayBayList;