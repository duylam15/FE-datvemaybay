import { useState } from 'react';
import PaginationComponent from '../../../components/PhanTrang/PaginationComponent';
import TableComponent from '../../../components/Table/TableComponent';

export default function DanhSachCHuyenBay(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const primaryData = props.data;

  // Tính tổng số trang
  const totalPages = Math.ceil(primaryData.length / itemsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const currentData = primaryData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



  const columns = [
    'Stt',
    'Iata chuyến bay',
    'Sân bay đi',
    'Nơi đi',
    'Sân bay đến',
    'Nơi đến',
    'Thời gian đi',
    'Thời gian đến',
    'Trạng thái',
  ];

  const dataKeys = [
    'idChuyenBay',
    'iataChuyenBay',
    'tuyenBay.sanBayBatDau.tenSanBay',
    'tuyenBay.sanBayBatDau.diaChi',
    'tuyenBay.sanBayKetThuc.tenSanBay',
    'tuyenBay.sanBayKetThuc.diaChi',
    'thoiGianBatDauDuTinh',
    'thoiGianKetThucDuTinh',
    'trangThai'
  ];

  const editLink = "edit-chuyenbay";

  return (
    <div>
      <TableComponent
        columns={columns}
        dataKeys={dataKeys}
        primaryData={primaryData}
        data={currentData}
        editLink={editLink}
        setData={props.setData}
        setAction={props.setAction}
        page={props.page}
      />
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
