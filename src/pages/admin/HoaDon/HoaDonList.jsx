import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getHoaDon } from '../../../services/hoaDonService';
const HoaDonList = ({
    hoaDon,          // Danh sách các phương thức thanh toán
    onEdit,   
    viewDetail,           // Hàm gọi khi muốn chỉnh sửa phương thức thanh toán
    searchTerm,          // Giá trị tìm kiếm
    setSearchTerm,       // Hàm cập nhật giá trị tìm kiếm
    handleSearch,        // Hàm xử lý sự kiện tìm kiếm
    handleSort,          // Hàm xử lý sắp xếp danh sách
    sortOrder,           // Thứ tự sắp xếp (tăng dần hoặc giảm dần)
    sortField,        // Trường dữ liệu để sắp xếp
    filterType,
    setFilterType,
    selectedValue,
    setSelectedValue,
    handleFilter,
    handleState
}) => {
    console.log(hoaDon);

    const hoaDonState = ["PENDING", "PAID", "CANCELLED", "REFUNDED", "EXPIRED"];

    const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
    const itemsPerPage = 10;  // Số lượng hóa đơn mỗi trang

    // Tính toán chỉ số bắt đầu và kết thúc của các hóa đơn hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentHoaDon = hoaDon ? hoaDon.slice(indexOfFirstItem, indexOfLastItem) : [];

    // Số lượng trang
    const totalPages = Math.ceil(hoaDon.length / itemsPerPage);

    // Hàm chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // State để lưu các giá trị cho combobox
    const [comboBoxValues, setComboBoxValues] = useState([]);

    useEffect(() => {
        const fetchFieldValue = async () => {
            // const values = await getHoaDon(); lấy danh sách value theo trường thông tin
            setComboBoxValues([1]);
        };
        fetchFieldValue();
    }, []);

    // console.log(currentHoaDon);
    return (
        <div className='hoa-don-controls'>
            <div className="search-sort-controls">
                <input
                    type="text"
                    placeholder="Tìm kiếm hóa đơn..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm Kiếm</button>
            </div>
            <div className="filter-controls">
                <label htmlFor="hoadon-filter-field">Lọc theo:</label>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className='filter-field' id='hoadon-filter-field'>
                    <option value="">Chọn trường</option>
                    <option value="nhanVien" selected>Nhân viên</option>
                    <option value="khachHang">Khách hàng</option>
                    <option value="phuongThucThanhToan">Phương thức thanh toán</option>
                    <option value="loaiHoaDon">Loại hóa đơn</option>
                </select>

                <label htmlFor="hoadon-filter-value">Giá trị:</label>
                <select onChange={(e) => setSelectedValue(e.target.value)} className='filter-value' id='hoadon-filter-value'>
                    <option value="">Chọn giá trị</option>
                    {comboBoxValues.map(item => (
                        <option key={item} value={item}>{item}</option>
                    ))}
            </select>
                <button className='btn-primary' onClick={() => handleFilter(filterType, selectedValue)}>Lọc</button>
            </div>
             
            <table className="table table-hover table-bordered pad-x">
                <thead>
                    <tr className='align-bottom'>
                        <th scope="col" className='align-bottom col-1' onClick={() => handleSort('idHoaDon')}>
                            ID {sortField === 'idHoaDon' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}   
                        </th>
                        <th scope="col" className='align-bottom col-2' onClick={() => handleSort('khachHang.hoTen')}>
                            Tên Khách hàng {sortField === 'khachHang.hoTen' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom col-2' onClick={() => handleSort('nhanVien.hoTen')}>
                            Tên Nhân viên {sortField === 'nhanVien.hoTen' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom col-1' onClick={() => handleSort('soLuongVe')}>
                            Số lượng vé {sortField === 'soLuongVe' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom col-2' onClick={() => handleSort('loaiHoaDon')}>
                            Loại hóa đơn {sortField === 'loaiHoaDon' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom col-2' onClick={() => handleSort('phuongThucTT.tenPhuongThucTT')}>
                            Phương thức thanh toán {sortField === 'phuongThucTT.tenPhuongThucTT' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom col-1' onClick={() => handleSort('tongTien')}>
                            Tổng tiền {sortField === 'tongTien' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom col-1' onClick={() => handleSort('status')}>
                            Trạng thái {sortField === 'status' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope='col' className='align-bottom col-1'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {currentHoaDon.length > 0 ? (currentHoaDon.map(hd => (
                        <tr key={hd.idHoaDon}>
                            <td className='align-middle'>{hd.idHoaDon}</td>
                            <td className='align-middle'>{hd.khachHang.hoTen}</td>
                            <td className='align-middle'>{hd.nhanVien.hoTen}</td>
                            <td className='align-middle'>{hd.soLuongVe}</td>
                            <td className='align-middle'>{hd.loaiHoaDon.tenLoaiHoaDon}</td>
                            <td className='align-middle'>{hd.phuongThucThanhToan.tenPhuongThucTT}</td>
                            <td className='align-middle'>{hd.tongTien}</td>
                            <td className='align-middle'>
                                <select name="status" id="hd.status" value={hd.status} onChange={(e) => {
                                    (handleState(hd.idHoaDon, e.target.value));
                                    console.log(e.target.value);
                                    console.log(hd.status);
                                    }}>
                                    {hoaDonState.map(state => (
                                        <option value={state}>{state}</option>
                                    ))}
                                </select>
                            </td>
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
