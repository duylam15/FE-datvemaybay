import React from 'react';
import axios from 'axios';
import EditBtn from "../../components/Admin/ColorButtons/EditBtn";
import SearchBtn from "../../components/Admin/ColorButtons/SearchBtn";
import { PermissionButton } from '../Admin/Sidebar';
const KhachHangList = ({ khachHang, onEdit, searchTerm, setSearchTerm, handleSearch, handleSort, sortOrder, sortField }) => {
    return (
        <div>
            <div className="search-sort-controlss" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                paddingBottom: '30px',
                paddingTop: '30px'
            }}>
                <input
                    type="text"
                    placeholder="Tìm kiếm khách hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '500px',
                        borderRadius: '4px',
                        padding: '5px 10px',
                        outline: 'none',
                        height: '38px',
                        border: '1px solid #858383'
                    }}
                />
                <div onClick={handleSearch}><SearchBtn></SearchBtn></div>
            </div>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th onClick={() => handleSort('idKhachHang')}>
                            ID {sortField === 'idKhachHang' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        {/* <th>#</th> */}
                        <th onClick={() => handleSort('hoTen')}>
                            Họ Tên {sortField === 'hoTen' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('email')}>
                            Email {sortField === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('soDienThoai')}>
                            Số Điện Thoại {sortField === 'soDienThoai' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('point')}>
                            Số lần mua {sortField === 'point' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th>Giới Tính</th>
                        <th>Trạng Thái</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {khachHang.map(kh => (
                        <tr key={kh.idKhachHang}>
                            {/* <td>
                                {kh.point >= 1000000 ? (
                                    <span>
                                        <img src="/public/images/star-badge.png" alt="Diamond" style={{ width: '24px', height: '24px' }} />
                                    </span>
                                ) : kh.point >= 700000 ? (
                                    <span>
                                        <img src="/public/images/silver-badge.png" alt="Gold" style={{ width: '24px', height: '24px' }} />
                                    </span>
                                ) : kh.point >= 200000 ? (
                                    <span>
                                        <img src="/public/images/coin.png" alt="Silver" style={{ width: '24px', height: '24px' }} />
                                    </span>
                                ) : (
                                    <span></span>
                                )}
                            </td> */}
                            <td>{kh.idKhachHang}</td>
                            <td>{kh.hoTen}</td>
                            <td>{kh.email}</td>
                            <td>{kh.soDienThoai}</td>
                            <td>{kh.point}</td>
                            <td>{kh.gioiTinhEnum === 'NAM' ? 'Nam' : 'Nữ'}</td>
                            <td>{kh.trangThaiActive === 'ACTIVE' ? 'Kích Hoạt' : 'Không Kích Hoạt'}</td>
                            <td>
                            <PermissionButton feature="Quản lí khách hàng" idButton={kh.idKhachHang} onEdit={onEdit}>
                            </PermissionButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default KhachHangList;
