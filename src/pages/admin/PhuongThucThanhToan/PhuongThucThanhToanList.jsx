import React from 'react';
import './PhuongThucThanhToan.scss';
import { useState } from 'react';
    const PhuongThucTTList = ({
        phuongThucTT,          // Danh sách các phương thức thanh toán
        onEdit,              // Hàm gọi khi muốn chỉnh sửa phương thức thanh toán
        searchTerm,          // Giá trị tìm kiếm
        setSearchTerm,       // Hàm cập nhật giá trị tìm kiếm
        handleSearch,        // Hàm xử lý sự kiện tìm kiếm
        handleSort,          // Hàm xử lý sắp xếp danh sách
        sortOrder,           // Thứ tự sắp xếp (tăng dần hoặc giảm dần)
        sortField            // Trường dữ liệu để sắp xếp
    }) => {
    const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
    const itemsPerPage = 10;  // Số lượng hóa đơn mỗi trang

    // Tính toán chỉ số bắt đầu và kết thúc của các hóa đơn hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPTTT = phuongThucTT.slice(indexOfFirstItem, indexOfLastItem);

    // Số lượng trang
    const totalPages = Math.ceil(phuongThucTT.length / itemsPerPage);

    // Hàm chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div>
            <div className="search-sort-controls">
                <input
                    type="text"
                    placeholder="Tìm kiếm PTTT..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm Kiếm</button>
            </div>
            <table className="table table-hover table-bordered ">
                <thead>
                    <tr className=''>
                        <th scope="col" className='align-bottom col-2' onClick={() => handleSort('idPhuongThucTT')}>
                            ID {sortField === 'idPhuongThucTT' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}   
                        </th>
                        <th scope="col" className='align-bottom col-3' onClick={() => handleSort('tenPhuongThucTT')}>
                            Tên PTTT {sortField === 'tenPhuongThucTT' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom col-4'>
                            Mô tả
                        </th>
                        <th scope="col" className='align-bottom col-3' onClick={() => handleSort('trangThaiActive')}>
                            Trạng thái {sortField === 'trangThaiActive' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom col-2'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className=''>
                    {currentPTTT.length > 0 ? (currentPTTT.map(pttt => (
                        <tr key={pttt.idPTTT}>
                            <td className=' align-middle '>{pttt.idPTTT}</td>
                            <td className=' align-middle '>{pttt.tenPTTT}</td>
                            <td className=' align-middle '>{pttt.moTa}</td>
                            <td className=' align-middle '>{pttt.status === 'ACTIVE' ? 'Kích Hoạt' : 'Không Kích Hoạt'}</td>
                            <td className=' align-middle '>
                                <button className="btn btn-primary mr-2" onClick={() => onEdit(pttt.idPTTT)}>Edit</button>
                            </td>
                        </tr>
                    )))
                    : (
                        <tr>
                            <td colSpan="9" className="text-center">Không có phương thức thanh toán!</td>
                        </tr>
                    )
                    }
                </tbody>
                </table>
                {/* Pagination */}
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

export default PhuongThucTTList;
