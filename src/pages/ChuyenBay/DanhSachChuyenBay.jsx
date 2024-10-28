import { useEffect, useState } from 'react';
import PaginationComponent from '../../components/PhanTrang/PaginationComponent';
import TableComponent from '../../components/Table/TableComponent';
import { dataSanBay } from '../../services/sanBayService';
import { dataTuyenBay } from '../../services/tuyenBayService';

export default function DanhSachCHuyenBay(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const nhanviens = props.data;

  // Tính tổng số trang
  const totalPages = Math.ceil(nhanviens.length / itemsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const currentData = nhanviens.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
