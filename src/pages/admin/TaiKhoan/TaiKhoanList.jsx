import React from 'react';
import { useState } from 'react';

    const TaiKhoanList = ({
        taiKhoan,          // Danh sách các phương thức thanh toán
        onEdit,            // Hàm gọi khi muốn chỉnh sửa phương thức thanh toán
        searchTerm,          // Giá trị tìm kiếm
        setSearchTerm,       // Hàm cập nhật giá trị tìm kiếm
        handleSearch,        // Hàm xử lý sự kiện tìm kiếm
        handleSort,          // Hàm xử lý sắp xếp danh sách
        sortOrder,           // Thứ tự sắp xếp (tăng dần hoặc giảm dần)
        sortField,
        handlePagination,
        setPage,
        setSize
    }) => {

    console.log(taiKhoan);

    return (
        <div>
            <div className="search-sort-controls">
                <input
                    type="text"
                    placeholder="Tìm kiếm tài khoản..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm Kiếm</button>
            </div>
            <table className="table table-hover table-bordered ">
                <thead>
                    <tr className=''>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('idTaiKhoan')}>
                            ID {sortField === 'idTaiKhoan' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}   
                        </th>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('tenDangNhap')}>
                            Tên đăng nhập {sortField === 'tenDangNhap' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('quyen.tenQuyen')}>
                            Quyền {sortField === 'quyen.TenQuyen' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th><th scope="col" className='align-bottom' onClick={() => handleSort('khachHang.hoTen')}>
                            Họ tên {sortField === 'khachHang.hoTen' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('khachHang.email')}>
                            Email {sortField === 'khachHang.email' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('khachHang.cccd')}>
                            CCCD {sortField === 'khachHang.cccd' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('trangThaiActive')}>
                            Trạng thái {sortField === 'trangThaiActive' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className=''>
                    {taiKhoan.length > 0 ? (taiKhoan.map(tk => (
                        <tr key={tk.idTaiKhoan}>
                            <td className=' align-middle '>{tk.idTaiKhoan}</td>
                            <td className=' align-middle '>{tk.tenDangNhap}</td>
                            <td className=' align-middle '>{tk.quyen.tenQuyen}</td>
                            <td className=' align-middle '>{tk.khachHang.hoTen}</td>
                            <td className=' align-middle '>{tk.khachHang.email}</td>
                            <td className=' align-middle '>{tk.khachHang.cccd}</td>
                            <td className=' align-middle '>{tk.trangThaiActive === 'ACTIVE' ? 'Kích Hoạt' : 'Không Kích Hoạt'}</td>
                            <td className=' align-middle '>
                                <button className="btn btn-primary mr-2" onClick={() => onEdit(tk.idTaiKhoan)}>Edit</button>
                            </td>
                        </tr>
                    )))
                    : (
                        <tr>
                            <td colSpan="9" className="text-center">Không tìm thấy kết quả tìm kiếm!</td>
                        </tr>
                    )
                    }
                </tbody>
                </table>
                {/* Pagination */}
                {/* {totalPages > 1 && (
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
                )} */}
        </div>
    );
};

export default TaiKhoanList;
