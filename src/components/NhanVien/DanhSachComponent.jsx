
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataNhanVien } from '../../services/nhanVienServices';

export default function DanhSachComponent(count){

  const [nhanviens , setNhanVien] = useState([]);
  const [selectRow , setSelectRow] = useState(null);
  const navigate = useNavigate();

  const handleSelectRow = (index) => {
    setSelectRow(index);
    navigate(`./?id=${index}`, { replace: true });
  }

  useEffect(() => {
    dataNhanVien()
                    .then(response => {setNhanVien(response.data.data);console.log(response.data)})
                    .catch(error => {console.error( error)})
                
  } , [count])

  return (
    <>
    <table>
        <thead>
          <tr>
            <th>Stt</th>
            <th>Họ và tên</th>
            <th>CCCD</th>
            <th>SĐT</th>
            <th>Giới tính</th>
            <th>Email</th>
            <th>Ngày sinh</th>
            <th>Chức vụ</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
        {
          Array.isArray(nhanviens) &&
          nhanviens.map(nhanvien =>
            <tr key ={nhanvien.idNhanVien}
                onClick={() =>handleSelectRow(nhanvien.idNhanVien)}
                style={{
                        backgroundColor: selectRow === nhanvien.idNhanVien ? 'black' : 'white',
                        color: selectRow === nhanvien.idNhanVien ? 'white' : 'black',
                      }}
            >
              <td>{nhanvien.idNhanVien}</td>
              <td>{nhanvien.hoTen}</td>
              <td>{nhanvien.cccd}</td>
              <td>{nhanvien.soDienThoai}</td>
              <td>{nhanvien.gioiTinhEnum}</td>
              <td>{nhanvien.email}</td>
              <td>{nhanvien.ngaySinh}</td>
              <td>{nhanvien.chucVu}</td>
            <td>{nhanvien.trangThaiActive}</td>
          </tr>
          )
        }
        </tbody>
    </table>
    </>
  )
}