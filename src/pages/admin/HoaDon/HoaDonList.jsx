import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import FilterIcon from '@mui/icons-material/Search';
import DetailBtn from '../../../components/Admin/ColorButtons/DetailBtn';

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
    handleState,
    comboBoxValues,
    handleComboBoxValues
}) => {
    const hoaDonState = ["PENDING", "PAID", "CANCELLED", "REFUNDED", "EXPIRED"];

    const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
    const itemsPerPage = 8;  // Số lượng hóa đơn mỗi trang

    // Tính toán chỉ số bắt đầu và kết thúc của các hóa đơn hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentHoaDon = hoaDon ? hoaDon.slice(indexOfFirstItem, indexOfLastItem) : [];

    // Số lượng trang
    const totalPages = hoaDon ? Math.ceil(hoaDon.length / itemsPerPage) : 1;

    // Hàm chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className='hoa-don-controls'>
            <div className="search-sort-controlss">
                <input
                className="input_search"
                type="text"
                placeholder="Tìm kiếm hóa đơn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<SearchIcon />}
                        size="large"
                        sx={{ fontSize: '1.25rem' }}  
                        onClick={handleSearch}
                    >
                        Tìm kiếm
                    </Button>
                </Stack>
            </div>
            <div className="filter-controls">
                <label htmlFor="hoadon-filter-field">Lọc theo:</label>
                <select className='filter-field' id='hoadon-filter-field' value={filterType} onChange={(e) => {
                    setFilterType(e.target.value);
                    setSelectedValue('0');
                    console.log("Filter type selected: ", e.target.value);
                    handleComboBoxValues(e.target.value);}} 
                >
                    <option value="0">Tất cả</option>
                    {/* <option value="nhanVien">Nhân viên</option> */}
                    <option value="khachHang">Khách hàng</option>
                    <option value="phuongThucThanhToan">Phương thức thanh toán</option>
                    <option value="loaiHoaDon">Loại hóa đơn</option>
                    <option value="thoiGianLap">Ngày lập</option>
                </select>

                <label htmlFor="hoadon-filter-value">Giá trị:</label>
                {
                    filterType === 'thoiGianLap' ? (
                        // Ô chọn ngày
                        <input 
                            type="date" 
                            onChange={(e) => setSelectedValue(e.target.value)} 
                            className="filter-value" 
                            id="hoadon-filter-value" 
                        />
                    ) : (
                        // Dropdown menu
                        <select 
                            onChange={(e) => {setSelectedValue(e.target.value); console.log(e.target.value)}} 
                            className="filter-value" 
                            id="hoadon-filter-value"
                        > 
                            <option value="0">Tất cả</option>
                            {comboBoxValues.length > 0 ? comboBoxValues.map(item => (
                                <option key={item.id} value={item.id}>{item.ten}</option>
                            )) : ""}
                        </select>
                    )
                }

                
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<FilterIcon />}
                        size="large"
                        sx={{ fontSize: '1.25rem' }}  
                        onClick={() => {handleFilter(filterType, selectedValue)}}
                    >
                        Lọc
                    </Button>
                </Stack>
            </div>
             
            <table className="table">
                <thead className="thead-dark">
                    <tr className='align-bottom'>
                        <th scope="col" className='align-bottom col-1' onClick={() => handleSort('idHoaDon')}>
                            ID {sortField === 'idHoaDon' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}   
                        </th>
                        <th scope="col" className='align-bottom col-2' onClick={() => handleSort('khachHang.hoTen')}>
                            Tên Khách hàng {sortField === 'khachHang.hoTen' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        {/* <th scope="col" className='align-bottom col-1' onClick={() => handleSort('nhanVien.hoTen')}>
                            Tên Nhân viên {sortField === 'nhanVien.hoTen' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th> */}
                        <th scope="col" className='align-bottom col-1' onClick={() => handleSort('soLuongVe')}>
                            Số lượng vé {sortField === 'soLuongVe' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom col-2' onClick={() => handleSort('loaiHoaDon')}>
                            Loại hóa đơn {sortField === 'loaiHoaDon' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom col-1' onClick={() => handleSort('phuongThucTT.tenPhuongThucTT')}>
                            Phương thức thanh toán {sortField === 'phuongThucTT.tenPhuongThucTT' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" className='align-bottom col-2' onClick={() => handleSort('thoiGianLap')}>
                            Thời gian lập {sortField === 'thoiGianLap' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
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
                            <td className='align-middle'>{hd.khachHang? hd.khachHang.hoTen:"-"}</td>
                            {/* <td className='align-middle'>{hd.nhanVien.hoTen}</td> */}
                            <td className='align-middle'>{hd.soLuongVe}</td>
                            <td className='align-middle'>{hd.loaiHoaDon.tenLoaiHoaDon}</td>
                            <td className='align-middle'>{hd.phuongThucThanhToan.tenPhuongThucTT}</td>
                            <td className='align-middle'>
                                {new Date(hd.thoiGianLap).toLocaleString('vi-VN', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                })}
                            </td>
                            <td className='align-middle'>{hd.tongTien}</td>
                            <td className='align-middle'>
                                <select name="status" id="hd.status" className='status-select' value={hd.status} disabled={hd.status==='PAID'} onChange={(e) => {
                                    (handleState(hd.idHoaDon, e.target.value));
                                    console.log(e.target.value);
                                    console.log(hd.status);
                                    }}>
                                    {hoaDonState.map(state => (
                                        <option value={state}>{state}</option>
                                    ))}
                                </select>
                            </td>
                            <td className=' align-middle btn_row'>
                                <div className="btn_block align-middle" onClick={() => viewDetail(hd.idHoaDon)}><DetailBtn></DetailBtn></div>
                            </td>
                        </tr>
                    )))
                    : (
                        <tr>
                            <td colSpan="9" className="text-center">Không có hóa đơn!</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
                <ul className="pagination pagination-lg">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" aria-label="Previous" onClick={() => paginate(currentPage - 1)}>
                            <span aria-hidden="true">&#8249;</span> 
                        </a>
                    </li>
                    {[...Array(totalPages).keys()].map(number => (
                        <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                            <a className="page-link" href="#" onClick={() => paginate(number + 1)}>
                                {number + 1}
                            </a>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" aria-label="Next" onClick={() => paginate(currentPage + 1)}>
                            <span aria-hidden="true">&#8250;</span>
                        </a>
                    </li>
                </ul>
            )}
            
        </div>
    );
};

export default HoaDonList;
