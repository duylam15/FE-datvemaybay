import { useState } from 'react';
import PaginationComponent from '../../components/PhanTrang/PaginationComponent';
import TableComponent from '../../components/Table/TableComponent';

export default function DanhSachComponent(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const nhanviens = props.data ;

  // Tính tổng số trang
  const totalPages = Math.ceil(nhanviens.length / itemsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const currentData = nhanviens.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    'Stt',
    'Họ và tên',
    'CCCD',
    'SĐT',
    'Giới tính',
    'Email',
    'Ngày sinh',
    'Chức vụ',
    'Trạng thái'
  ];

  const dataKeys = [
    'idNhanVien',
    'hoTen',
    'cccd',
    'soDienThoai',
    'gioiTinhEnum',
    'email',
    'ngaySinh',
    'chucVu',
    'trangThaiActive'
  ];

  const editLink = "edit-employee";

  return (
    <div>
      <TableComponent
        columns={columns}
        dataKeys={dataKeys}
        data={currentData}
        editLink= {editLink}
        setData={props.setData}
      />
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
