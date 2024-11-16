import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DanhGia.css'
import { FaGrinStars, FaStar, FaStarAndCrescent, FaStarOfDavid, FaStarOfLife } from 'react-icons/fa';
import { DatePicker, Space } from 'antd';
import { PermissionEditButton } from '../../../components/Admin/Sidebar';
const { RangePicker } = DatePicker;

const API_URL = 'http://localhost:8080';
const DanhGiaList = ({ danhGia, handleSearchByTenKhachHang, handleSearchByHangBay, handleSearchByStartTimeAndEndTime,
    handleBlock, searchTerm, setSearchTerm, startTime, setStartTime, endTime, setEndTime }) => {
    const [hangBay, setHangBay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDates, setSelectedDates] = useState(["", ""]); // State để lưu ngày

    const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
    const itemsPerPage = 10;  // Số lượng hóa đơn mỗi trang

    // Tính toán chỉ số bắt đầu và kết thúc của các hóa đơn hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDanhGia = danhGia.slice(indexOfFirstItem, indexOfLastItem);

    // Số lượng trang
    const totalPages = Math.ceil(danhGia.length / itemsPerPage);

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

    const getSao = (sao) => {
        switch (sao) {
            case 'ONE':
                return <><FaStar /></>;
            case 'TWO':
                return <><FaStar /><FaStar /></>;
            case 'THREE':
                return <><FaStar /><FaStar /><FaStar /></>;
            case 'FOUR':
                return <><FaStar /><FaStar /><FaStar /><FaStar /></>;
            case 'FIVE':
                return <><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></>;
            default:
                return null;
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            <div className='separate_block'></div>
            <div className="search-sort-controlss">
                <input
                    className='input-search'
                    type="text"
                    placeholder="Tìm kiếm đánh giá..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeLarge MuiButton-outlinedSizeLarge MuiButton-colorPrimary MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeLarge MuiButton-outlinedSizeLarge MuiButton-colorPrimary css-camtgg-MuiButtonBase-root-MuiButton-root' onClick={handleSearchByTenKhachHang}>
                    <span className='MuiButton-icon MuiButton-startIcon MuiButton-iconSizeLarge css-170ovb9-MuiButton-startIcon'>
                        <svg className='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1umw9bq-MuiSvgIcon-root'
                            focusable='false' aria-hidden='true' viewBox='0 0 24 24'
                        >
                            <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14'></path>
                        </svg>
                    </span>
                    Tìm Kiếm
                </button>
                <select onChange={(e) => handleSearchByHangBay(e.target.value)} className='form-search'>
                    <option value="Lọc theo hãng bay">Lọc theo hãng bay</option>
                    {hangBay.map((hb) => (
                        <option value={hb.idHangBay} key={hb.idHangBay}>
                            {hb.idHangBay} - {hb.tenHangBay}
                        </option>
                    ))}
                </select>
                <div className='search-by-create-time'>
                    <div className='form-time'>
                        <label htmlFor="startTime">Thời gian bắt đầu</label>
                        <input
                            type="date"
                            id="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>

                    <div className='form-time'>
                        <label htmlFor="endTime">Thời gian kết thúc</label>
                        <input
                            type="date"
                            id="endTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                    <button className='MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeLarge MuiButton-outlinedSizeLarge MuiButton-colorPrimary MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeLarge MuiButton-outlinedSizeLarge MuiButton-colorPrimary css-camtgg-MuiButtonBase-root-MuiButton-root' onClick={() => handleSearchByStartTimeAndEndTime(startTime, endTime)} style={{ margin: "20px" }}>
                        <span className='MuiButton-icon MuiButton-startIcon MuiButton-iconSizeLarge css-170ovb9-MuiButton-startIcon'>
                            <svg className='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1umw9bq-MuiSvgIcon-root'
                                focusable='false' aria-hidden='true' viewBox='0 0 24 24'
                            >
                                <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14'></path>
                            </svg>
                        </span>
                        Tìm Kiếm
                    </button>
                </div>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th >
                            ID
                        </th>
                        <th >
                            Sao
                        </th>
                        <th >
                            Nội Dung
                        </th>
                        <th >
                            Hãng Bay
                        </th>
                        <th >
                            Khách Hàng
                        </th>
                        <th >
                            Thời gian tạo
                        </th>
                        <th>Trạng Thái</th>
                        <PermissionEditButton feature="Quản lí đánh giá">
                            <th>Actions</th>
                        </PermissionEditButton>
                                 
                    </tr>
                </thead>
                <tbody>
                    {danhGia.length > 0 ? (
                        danhGia.map(mb => (
                            <tr key={mb.idDanhGia}>
                                <td>{mb.idDanhGia}</td>
                                <td>{mb.sao === null ? 'NULL' : getSao(mb.sao)}</td>
                                <td>{mb.noiDung}</td>
                                <td>{mb.hangBay.tenHangBay}</td>
                                <td>{mb.tenKhachHang}</td>
                                <td>{mb.thoiGianTao}</td>
                                <td>{mb.trangThaiActive === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}</td>
                                <PermissionEditButton feature="Quản lí đánh giá">
                                    <td>

                                        <div>
                                            <button
                                                onClick={() => handleBlock(mb.idDanhGia)}
                                            >
                                                {mb.trangThaiActive === 'ACTIVE' ? 'Block' : 'Unblock'}
                                            </button>
                                        </div>
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

export default DanhGiaList;
