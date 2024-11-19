import React from 'react';
import { useState } from 'react';
import PaginationComponent from '../../../components/PhanTrang/PaginationComponent';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import EditBtn from '../../../components/Admin/ColorButtons/EditBtn';
import { PermissionButton, PermissionEditButton } from '../../../components/Admin/Sidebar';

const currentDataList = ({
    taiKhoan,          // Danh sách các phương thức thanh toán
    onEdit,            // Hàm gọi khi muốn chỉnh sửa phương thức thanh toán
    searchTerm,          // Giá trị tìm kiếm
    setSearchTerm,       // Hàm cập nhật giá trị tìm kiếm
    handleSearch,        // Hàm xử lý sự kiện tìm kiếm
    handleSort,          // Hàm xử lý sắp xếp danh sách
    sortOrder,           // Thứ tự sắp xếp (tăng dần hoặc giảm dần)
    sortField,
}) => {

    return (
        <div>
            <div className="search-sort-controlss">
                <input
                    className="input_search"
                    type="text"
                    placeholder="Tìm kiếm tài khoản..."
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
            <table className="table">
                <thead className="thead-dark">
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
                        <PermissionEditButton feature="Quản lí tài khoản">
                            <th scope="col" className='align-bottom'>
                                Actions
                            </th>
                        </PermissionEditButton>

                    </tr>
                </thead>
                <tbody className=''>
                    {taiKhoan.length > 0 ? (taiKhoan.map(tk => (
                        <tr key={tk.idTaiKhoan}>
                            <td className=' align-middle '>{tk.idTaiKhoan}</td>
                            <td className=' align-middle '>{tk.tenDangNhap}</td>
                            <td className=' align-middle '>{tk.quyen.tenQuyen}</td>
                            <td className='align-middle'>
                                {tk.nhanVien ? tk.nhanVien.hoTen : tk.khachHang?.hoTen || ''}
                            </td>
                            <td className='align-middle'>
                                {tk.nhanVien ? tk.nhanVien.email : tk.khachHang?.email || ''}
                            </td>
                            <td className='align-middle'>
                                {tk.nhanVien ? tk.nhanVien.cccd : tk.khachHang?.cccd || ''}
                            </td>
                            <td className=' align-middle '>{tk.trangThaiActive === 'ACTIVE' ? 'Kích Hoạt' : 'Không Kích Hoạt'}</td>
                            <PermissionEditButton feature="Quản lí tài khoản">
                                <td className=' align-middle btn_row'>
                                    <div onClick={() => { onEdit(tk.idTaiKhoan) }}><EditBtn></EditBtn></div>
                                </td>
                            </PermissionEditButton>
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
        </div>
    );
};

export default currentDataList;
