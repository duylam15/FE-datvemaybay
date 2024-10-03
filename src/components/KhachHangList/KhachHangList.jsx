import React from 'react';
import axios from 'axios';

const KhachHangList = ({ khachHang, onEdit, onBlock, searchTerm, setSearchTerm, handleSearch, handleSort, sortOrder }) => {
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
                <button onClick={() => handleSort('hoTen')}>Sắp Xếp Theo Họ Tên {sortOrder === 'asc' ? '↑' : '↓'}</button>
                <button onClick={() => handleSort('email')}>Sắp Xếp Theo Email {sortOrder === 'asc' ? '↑' : '↓'}</button>
            </div>
            <table className="table table-striped">
    <thead className="thead-dark">
        <tr>
            <th>ID</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Số Điện Thoại</th>
            {/* <th>Ngày Sinh</th> Thêm cột Ngày Sinh */}
            <th>CCCD</th> {/* Thêm cột CCCD */}
            <th>Giới Tính</th> {/* Thêm cột Giới Tính */}
            <th>Trạng Thái</th> {/* Thêm cột Trạng Thái */}
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
                {/* <td>{kh.ngaySinh}</td> Hiển thị Ngày Sinh */}
                <td>{kh.cccd}</td> {/* Hiển thị CCCD */}
                <td>{kh.gioiTinhEnum === 'NAM' ? 'Nam' : 'Nữ'}</td> {/* Hiển thị Giới Tính */}
                <td>{kh.trangThaiActive === 'ACTIVE' ? 'Kích Hoạt' : 'Không Kích Hoạt'}</td> {/* Hiển thị Trạng Thái */}
                <td>
                    <button 
                        className="btn btn-primary mr-2"
                        onClick={() => onEdit(kh.idKhachHang)}
                    >
                        Edit
                    </button>
                    {/* <button 
                        className="btn btn-danger"
                        onClick={() => onBlock(kh.idKhachHang)}
                    >
                        Block
                    </button> */}
                </td>
            </tr>
        ))}
    </tbody>
</table>

        </div>
    );
};

export default KhachHangList;
