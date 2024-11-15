import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MayBay.css';
import EditBtn from '../../../components/Admin/ColorButtons/EditBtn';
import { FaAlignLeft, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

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
                        <th>Actions</th>
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
                                <td>
                                    <div onClick={() => onEdit(mb.idMayBay)}><EditBtn></EditBtn></div>
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
                            <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}> <FaAngleLeft/> </a>
                        </li>
                        {[...Array(totalPages).keys()].map(number => (
                            <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                                <a className="page-link" href="#" onClick={() => paginate(number + 1)}>
                                    {number + 1}
                                </a>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}><FaAngleRight/></a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MayBayList;


