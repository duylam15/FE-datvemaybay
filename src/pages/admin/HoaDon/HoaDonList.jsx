import React, { useState } from 'react';

const HoaDonList = ({
    hoaDon,          // Danh sách các phương thức thanh toán
    onEdit,   
    viewDetail,           // Hàm gọi khi muốn chỉnh sửa phương thức thanh toán
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
    const currentHoaDon = hoaDon.slice(indexOfFirstItem, indexOfLastItem);

    // Số lượng trang
    const totalPages = Math.ceil(hoaDon.length / itemsPerPage);

    // Hàm chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="search-sort-controls">
                <input
                    type="text"
                    placeholder="Tìm kiếm hóa đơn..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm Kiếm</button>
            </div>
            <table className="table table-hover table-bordered pad-x">
                <thead>
                    <tr className='align-bottom fs-2 fw-medium'>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('idHoaDon')}>
                            ID {sortField === 'idHoaDon' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}   
                        </th>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('khachHang.hoTen')}>
                            Tên Khách hàng {sortField === 'khachHang.hoTen' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('nhanVien.hoTen')}>
                            Tên Nhân viên {sortField === 'nhanVien.hoTen' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('soLuongVe')}>
                            Số lượng vé {sortField === 'soLuongVe' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('loaiHoaDon')}>
                            Loại hóa đơn {sortField === 'loaiHoaDon' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('tenPhuongThucTT')}>
                            Phương thức thanh toán {sortField === 'tenPhuongThucTT' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('tongTien')}>
                            Tổng tiền {sortField === 'tongTien' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('status')}>
                            Trạng thái {sortField === 'status' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope='col' className='align-bottom col-1'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className='align-middle fs-3'>
                    {currentHoaDon.length > 0 ? (currentHoaDon.map(hd => (
                        <tr key={hd.idHoaDon}>
                            <td className='align-middle'>{hd.idHoaDon}</td>
                            <td className='align-middle'>{hd.khachHang.hoTen}</td>
                            <td className='align-middle'>{hd.nhanVien.hoTen}</td>
                            <td className='align-middle'>{hd.soLuongVe}</td>
                            <td className='align-middle'>{hd.loaiHoaDon.tenLoaiHoaDon}</td>
                            <td className='align-middle'>{hd.phuongThucThanhToan.tenPhuongThucTT}</td>
                            <td className='align-middle'>{hd.tongTien}</td>
                            <td className='align-middle'>{hd.status === 'ACTIVE' ? 'Kích Hoạt' : 'Không Kích Hoạt'}</td>
                            <td className='align-middle'>
                                <button className="btn btn-primary mr-2" onClick={() => viewDetail(hd.idHoaDon)}>Detail</button>
                            </td>
                        </tr>
                    )))
                    : (
                        <tr>
                            <td colSpan="9" className="text-center">Không tìm thấy kết quả tìm kiếm!</td>
                        </tr>
                    )}
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

export default HoaDonList;
