import React, { useState } from 'react';
import EditBtn from "../../components/Admin/ColorButtons/EditBtn";
import SearchBtn from "../../components/Admin/ColorButtons/SearchBtn";
import { PermissionButton } from '../Admin/Sidebar';

const KhachHangList = ({
    khachHang = [],
    onEdit,
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleSort,
    sortOrder,
    sortField
}) => {
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const itemsPerPage = 5; // Số lượng khách hàng mỗi trang

    // Tính toán chỉ số bắt đầu và kết thúc của các khách hàng hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentKhachHang = Array.isArray(khachHang) 
        ? khachHang.slice(indexOfFirstItem, indexOfLastItem)
        : [];
    // Số lượng trang
    const totalPages = Math.ceil(khachHang.length / itemsPerPage);

    // Hàm chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Thanh tìm kiếm */}
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
                <div onClick={handleSearch}><SearchBtn /></div>
            </div>
            
            {/* Bảng danh sách khách hàng */}
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
                        <th onClick={() => handleSort('point')}>
                            Số lần mua {sortField === 'point' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th>Giới Tính</th>
                        <th>Trạng Thái</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentKhachHang.length > 0 ? (
                        currentKhachHang.map(kh => (
                            <tr key={kh.idKhachHang}>
                                <td>{kh.idKhachHang}</td>
                                <td>{kh.hoTen}</td>
                                <td>{kh.email}</td>
                                <td>{kh.soDienThoai}</td>
                                <td>{kh.point}</td>
                                <td>{kh.gioiTinhEnum === 'NAM' ? 'Nam' : 'Nữ'}</td>
                                <td>{kh.trangThaiActive === 'ACTIVE' ? 'Kích Hoạt' : 'Không Kích Hoạt'}</td>
                                <td>
                                    <PermissionButton feature="Quản lí khách hàng" idButton={kh.idKhachHang} onEdit={onEdit}>
                                        <EditBtn />
                                    </PermissionButton>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">Không có khách hàng!</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            {/* Phân trang */}
            {totalPages > 1 && (
                <ul className="pagination pagination-lg">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                    </li>
                    {[...Array(totalPages).keys()].map(number => (
                        <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                            <a className="page-link" href="#" onClick={() => paginate(number + 1)}>
                                {number + 1}
                            </a>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default KhachHangList;
