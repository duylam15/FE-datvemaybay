import {React, useState} from "react";


const LoaiHoaDonList =({
    loaiHoaDon,
    onEdit,
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleSort,
    sortOrder,
    sortField,
}) => {
    const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
    const itemsPerPage = 10;  // Số lượng hóa đơn mỗi trang

    // Tính toán chỉ số bắt đầu và kết thúc của các hóa đơn hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLoaiHD = loaiHoaDon.slice(indexOfFirstItem, indexOfLastItem);

    // Số lượng trang
    const totalPages = Math.ceil(loaiHoaDon.length / itemsPerPage);

    // Hàm chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div>
            <div className="search-sort-controls">
                <input
                    type="text"
                    placeholder="Tìm kiếm loại hóa đơn..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm Kiếm</button>
            </div>
            <table className="table table-hover table-bordered pad-x">
                <thead>
                    <tr className="align-bottom ">
                        <th scope="col" className='align-bottom' onClick={() => handleSort('idLoaiHoaDon')}>
                            ID {sortField === 'idLoaiHoaDon' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}   
                        </th>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('tenLoaiHoaDon')}>
                            Tên loại hóa đơn {sortField === 'tenLoaiHoaDon' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
						<th scope="col" className='align-bottom'>
                            Mô tả
                        </th>
                        <th scope="col" className='align-bottom' onClick={() => handleSort('trangThaiActive')}>
                            Trạng thái {sortField === 'trangThaiActive' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='col-1 align-bottom'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="align-middle">
                    {currentLoaiHD.length > 0 ? (currentLoaiHD.map(lhd => (
                        <tr key={lhd.idLoaiHD}>
                            <td className=' align-middle '>{lhd.idLoaiHD}</td>
                            <td className=' align-middle '>{lhd.tenLoaiHD}</td>
                            <td className=' align-middle '>{lhd.moTa}</td>
                            <td className=' align-middle '>{lhd.status === 'ACTIVE' ? 'Kích Hoạt' : 'Không Kích Hoạt'}</td>
                            <td className=' align-middle '>
                                <button className="btn btn-primary mr-2" onClick={() => onEdit(lhd.idLoaiHD)}>Edit</button>
                            </td>
                        </tr>
                    )))
                    : (
                        <tr>
                            <td colSpan="9" className="text-center">Không có loại hóa đơn!</td>
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

export default LoaiHoaDonList;