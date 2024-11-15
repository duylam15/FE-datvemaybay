import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SanBay.css'
import EditBtn from '../../../components/Admin/ColorButtons/EditBtn';
import { PermissionButton, PermissionEditButton } from '../../../components/Admin/Sidebar';
import XemChiTietBtn from '../../../components/Admin/ColorButtons/XemChiTietBtn';

const API_URL = 'http://localhost:8080';
const SanBayList = ({ sanBay, onEdit, getAirportByCity, getAirportByNation, onBlock, searchTerm, setSearchTerm, handleSearch, handleSort, sortOrder, sortField }) => {
    const [thanhPho, setThanhPho] = useState([]);
    const [quocgia, setQuocGia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
    const itemsPerPage = 10;  // Số lượng hóa đơn mỗi trang

    // Tính toán chỉ số bắt đầu và kết thúc của các hóa đơn hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSanBay = sanBay.slice(indexOfFirstItem, indexOfLastItem);

    // Số lượng trang
    const totalPages = Math.ceil(sanBay.length / itemsPerPage);

    // Hàm chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const getThanhPho = async () => {
        const response = await fetch(`${API_URL}/admin/thanhpho/getAllCity`); // Thay đổi endpoint theo API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch city');
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        return data.data; // Trả về phần data bên trong JSON
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getThanhPho();
                setThanhPho(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getQuocGia = async () => {
        const response = await fetch(`${API_URL}/admin/quocgia/getAllNation`); // Thay đổi endpoint theo API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch nation');
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        return data.data; // Trả về phần data bên trong JSON
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getQuocGia();
                setQuocGia(data);
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
                    placeholder="Tìm kiếm sân bay..."
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
                <select onChange={(e) => getAirportByCity(e.target.value)} className='form-search'>
                    <option value="Lọc theo thành phố">Lọc theo thành phố</option>
                    {thanhPho.map((tp) => (
                        <option value={tp.idThanhPho} key={tp.idThanhPho}>
                            {tp.idThanhPho} - {tp.tenThanhPho}
                        </option>
                    ))}
                </select>
                <select onChange={(e) => getAirportByNation(e.target.value)} className='form-search'>
                    <option value="Lọc theo quốc gia">Lọc theo quốc gia</option>
                    {quocgia.map((qg) => (
                        <option value={qg.idQuocGia} key={qg.idQuocGia}>
                            {qg.idQuocGia} - {qg.tenQuocGia}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th onClick={() => handleSort('idSanBay')}>
                            ID {sortField === 'idSanBay' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('tenSanBay')}>
                            Tên Sân Bay {sortField === 'tenSanBay' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('iataSanBay')}>
                            IATA Sân Bay {sortField === 'iataSanBay' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('icaoSanBay')}>
                            ICAO Sân Bay {sortField === 'icaoSanBay' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th>Địa chỉ</th>
                        <th>Thành Phố</th>
                        <th>Trạng thái</th>
                        <PermissionEditButton feature="Quản lí sân bay">
                            <th>Actions</th>
                        </PermissionEditButton>
                    </tr>
                </thead>
                <tbody>
                    {sanBay.length > 0 ? (
                        sanBay.map(mb => (
                            <tr key={mb.idSanBay}>
                                <td>{mb.idSanBay}</td>
                                <td>{mb.tenSanBay}</td>
                                <td>{mb.iataSanBay}</td>
                                <td>{mb.icaoSanBay}</td>
                                <td>{mb.thanhPho.tenThanhPho}</td>
                                <td>{mb.diaChi}</td>
                                <td>{mb.trangThaiActive === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}</td>
                                <PermissionEditButton feature="Quản lí sân bay">
                                    <td>
                                        <div onClick={() => onEdit(mb.idSanBay)}><EditBtn></EditBtn></div>
                                    </td>
                                </PermissionEditButton>
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
        </div>
    );
};

export default SanBayList;
