import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MayBay.css';

const API_URL = 'http://localhost:8080';
const MayBayList = ({ mayBay, onEdit, getSoLuongGhe, getPlaneByAirline, getPlaneByAirport, onBlock, searchTerm, setSearchTerm, handleSearch, handleSort, sortOrder, sortField }) => {
    const [hangBay, setHangBay] = useState([]);
    const [sanBay, setSanBay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log("MayBay: ", mayBay);

    const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
    const itemsPerPage = 10;  // Số lượng hóa đơn mỗi trang

    // Tính toán chỉ số bắt đầu và kết thúc của các hóa đơn hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMayBay = mayBay.slice(indexOfFirstItem, indexOfLastItem);

    // Số lượng trang
    const totalPages = Math.ceil(mayBay.length / itemsPerPage);

    // Hàm chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    const getHangBay = async () => {
        const response = await fetch(`${API_URL}/admin/hangbay/getAllAirline`); // Thay đổi endpoint theo API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch airline');
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        return data.data; // Trả về phần data bên trong JSON
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHangBay();
                setHangBay(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getSanBay = async () => {
        const response = await fetch(`${API_URL}/admin/sanbay/getAllAirport`); // Thay đổi endpoint theo API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch airport');
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        return data.data; // Trả về phần data bên trong JSON
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSanBay();
                setSanBay(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            <div className='separate_block'></div>
            <div className="search-sort-controlss">
                <input
                    className='input-search'
                    type="text"
                    placeholder="Tìm kiếm máy bay..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeLarge MuiButton-outlinedSizeLarge MuiButton-colorPrimary MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeLarge MuiButton-outlinedSizeLarge MuiButton-colorPrimary css-camtgg-MuiButtonBase-root-MuiButton-root' onClick={handleSearch}>
                <span className='MuiButton-icon MuiButton-startIcon MuiButton-iconSizeLarge css-170ovb9-MuiButton-startIcon'>
                    <svg className='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1umw9bq-MuiSvgIcon-root'
                        focusable='false' aria-hidden='true' viewBox='0 0 24 24' 
                    >
                        <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14'></path>
                    </svg>
                </span>
                    Tìm Kiếm
                </button>
                <select onChange={(e) => getPlaneByAirline(e.target.value)} className='form-search'>
                    <option value="Lọc theo hãng bay">Lọc theo hãng bay</option>
                    {hangBay.map((hb) => (
                        <option value={hb.idHangBay} key={hb.idHangBay}>
                            {hb.idHangBay} - {hb.tenHangBay}
                        </option>
                    ))}
                </select>
                <select onChange={(e) => getPlaneByAirport(e.target.value)} className='form-search'>
                    <option value="Lọc theo sân bay">Lọc theo sân bay</option>
                    {sanBay.map((sb) => (
                        <option value={sb.idSanBay} key={sb.idSanBay}>
                            {sb.idSanBay} - {sb.tenSanBay}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table">
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
                        <th onClick={() => handleSort('hangBay')}>
                            Sân Bay {sortField === 'sanBay' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
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
                        <th className='actions'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {currentMayBay.length > 0 ? (
                        currentMayBay.map(mb => (
                            <tr key={mb.idMayBay}>
                                <td>{mb.idMayBay}</td>
                                <td>{mb.tenMayBay}</td>
                                <td>{mb.hangBay.tenHangBay}</td>
                                <td>{mb.sanBay.tenSanBay}</td>
                                <td>{mb.icaoMayBay}</td>
                                <td>{mb.soHieu}</td>
                                <td>{getSoLuongGhe(mb.idMayBay)}</td>
                                <td>{mb.namSanXuat}</td>
                                <td>{mb.trangThaiActive === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}</td>
                                <td className='actions'>
                                    <div className="button-group">
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => onEdit(mb.idMayBay)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className={`btn btn-block`}
                                            onClick={() => onBlock(mb.idMayBay)}
                                        >
                                            {mb.trangThaiActive === 'ACTIVE' ? 'Block' : 'Unblock'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">Không tìm thấy kết quả tìm kiếm!</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {totalPages > 1 && (
                <div className='pagination-container'>
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
                </div>
            )}


            {/* {totalPages > 1 && (
                <div className='center'>
                <div className='MuiStack-root css-1sazv7p-MuiStack-root'>
                    <nav className='MuiPagination-root MuiPagination-outlined css-1xra8g6-MuiPagination-root' aria-label='pagination navigation'>
                        <ul className='MuiPagination-ul css-1c5o7vy-MuiPagination-ul'>
                            <li>
                                <button className={`btn-phan-trang ${currentPage === 1 ? 'disabled' : ''}`} tabIndex='-1' type='button' disabled aria-label='Go to previous page'>
                                    <svg className='Go to previous page' focusable='false' aria-hidden='true' viewBox='0 0 24 24' href="#" onClick={() => paginate(currentPage - 1)}>
                                        <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'></path>
                                    </svg>
                                </button>
                            </li>
                            {[...Array(totalPages).keys()].map(number => (
                                <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                                    <button className={`MuiButtonBase-root Mui-disabled MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-outlined MuiPaginationItem-rounded Mui-disabled MuiPaginationItem-previousNext css-ptck8z-MuiButtonBase-root-MuiPaginationItem-root ${currentPage === number + 1 ? 'active' : ''}`} tabIndex='-1' type='button' disabled aria-label='Go to previous page' href="#" onClick={() => paginate(number + 1)}>
                                        <a className="page-link" href="#" onClick={() => paginate(number + 1)}>
                                            {number + 1}
                                        </a>
                                    </button>
                                </li>
                                
                            ))}
                            <li>
                                <button className={`MuiButtonBase-root Mui-disabled MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-outlined MuiPaginationItem-rounded Mui-disabled MuiPaginationItem-previousNext css-ptck8z-MuiButtonBase-root-MuiPaginationItem-root ${currentPage === totalPages ? 'disabled' : ''}`} tabIndex='-1' type='button' disabled aria-label='Go to previous page'>
                                    <svg className='Go to previous page' focusable='false' aria-hidden='true' viewBox='0 0 24 24' href="#" onClick={() => paginate(currentPage + 1)}>
                                        <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'></path>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            )} */}

        </div>
    );
};

export default MayBayList;


