import { useState } from 'react';
import PaginationComponent from '../../components/PhanTrang/PaginationComponent';
import TableComponent from '../../components/Table/TableComponent';

export default function DanhSachCHuyenBay(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const nhanviens = props.data ;

  // Tính tổng số trang
  const totalPages = Math.ceil(nhanviens.length / itemsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const currentData = nhanviens.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    'Stt',
    'Tên máy bay',
    'Sân bay bắt đầu',
    'Địa điểm bắt đầu',
    'Sân bay đến',
    'Địa điểm đến',
    'Thời gian bắt đầu dự tính',
    'Thời gian kết thúc dự tính',
    'Trạng thái',
    'Trạng thái Active',
  ];

  const dataKeys = [
    'idChuyenBay',
    'mayBay.tenMayBay',
    'tuyenBay.sanBayBatDau.tenSanBay',
    'tuyenBay.sanBayBatDau.diaChi',
    'tuyenBay.sanBayKetThuc.tenSanBay',
    'tuyenBay.sanBayKetThuc.diaChi',
    'thoiGianBatDauDuTinh',
    'thoiGianKetThucDuTinh',
    'trangThai',
    'trangThaiActive'
  ];

  const editLink = "edit-chuyenbay";

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
