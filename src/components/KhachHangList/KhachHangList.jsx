import React from 'react';
import axios from 'axios';

const KhachHangList = ({ khachHang, onEdit, searchTerm, setSearchTerm, handleSearch, handleSort, sortOrder, sortField }) => {
    return (
        <div>
            <div className="search-sort-controls">
                <input
                    type="text"
                    placeholder="Tìm kiếm khách hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm Kiếm</button>
            </div>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th onClick={() => handleSort('idKhachHang')}>
                            ID {sortField === 'idKhachHang' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('hoTen')}>
                            Họ Tên {sortField === 'hoTen' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('email')}>
                            Email {sortField === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('soDienThoai')}>
                            Số Điện Thoại {sortField === 'soDienThoai' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th>CCCD</th>
                        <th>Giới Tính</th>
                        <th>Trạng Thái</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {khachHang.map(kh => (
                        <tr key={kh.idKhachHang}>
                            <td>{kh.idKhachHang}</td>
                            <td>{kh.hoTen}</td>
                            <td>{kh.email}</td>
                            <td>{kh.soDienThoai}</td>
                            <td>{kh.cccd}</td>
                            <td>{kh.gioiTinhEnum === 'NAM' ? 'Nam' : 'Nữ'}</td>
                            <td>{kh.trangThaiActive === 'ACTIVE' ? 'Kích Hoạt' : 'Không Kích Hoạt'}</td>
                            <td>
                                <button className="btn btn-primary mr-2" onClick={() => onEdit(kh.idKhachHang)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default KhachHangList;
