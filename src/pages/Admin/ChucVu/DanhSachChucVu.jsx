import { useEffect, useState } from 'react';
import PaginationComponent from '../../../components/PhanTrang/PaginationComponent';
import TableComponent from '../../../components/Table/TableComponent';
import "./chucvu.css";
export default function DanhSachChucVu(props) {
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
    'Tên',
    'Mô tả',
    'Trạng thái',
  ];

  const dataKeys = [
    'idChucVu',
    'ten',
    'moTa',
    'trangThaiActive'
  ];

  const editLink = "edit-chucvu";

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
        type="Quản lí chức vụ"
      />
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
