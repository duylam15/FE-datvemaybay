import { useEffect, useState } from 'react';
import PaginationComponent from '../../components/PhanTrang/PaginationComponent';
import TableComponent from '../../components/Table/TableComponent';
import { dataNhanVien } from '../../services/nhanVienServices';

export default function DanhSachComponent() {
  const [nhanviens, setNhanVien] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    dataNhanVien()
      .then(response => {
        setNhanVien(response.data.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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

  return (
    <div>
      <TableComponent
        columns={columns}
        dataKeys={dataKeys}
        data={currentData} // Sử dụng dữ liệu phân trang
        editLink="edit-employee"
      />
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage} // Cập nhật trang
      />
    </div>
  );
}
