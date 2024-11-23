import { useEffect, useState } from 'react';
import PaginationComponent from '../../../components/PhanTrang/PaginationComponent';
import TableComponent from '../../../components/Table/TableComponent';

export default function DanhSachCHuyenBay(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const primaryData = props.data;
  useEffect(() => {
    setCurrentPage(1)
  }, [primaryData])

  // Tính tổng số trang
  const totalPages = Math.ceil(primaryData.length / itemsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const currentData = primaryData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



  const columns = [
    'Stt',
    'Iata chuyến bay',
    'Địa chỉ sân bay đi',
    'Địa chỉ sân bay đến',
    'Thời gian đi',
    'Thời gian đến',
    'Trạng thái',
  ];
  // 'tuyenBay.sanBayBatDau.tenSanBay',
  // 'tuyenBay.sanBayKetThuc.tenSanBay',
  const dataKeys = [
    'idChuyenBay',
    'iataChuyenBay',
    'tuyenBay.sanBayBatDau.diaChi',
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
        page={props.page}
        type="Quản lí chuyến bay"
      />
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
