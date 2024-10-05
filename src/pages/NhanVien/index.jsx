import { Link } from 'react-router-dom';
import DanhSachComponent from './DanhSachComponent';
import './NhanVien.css';


export default function NhanVien(){

  return (
    <>
      <ul>
        <li><Link to="add-employee">Thêm</Link></li>
        <li>Tìm kiếm</li>
      </ul>
    <DanhSachComponent />
    </>
  )
}
