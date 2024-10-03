import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DanhSachComponent from '../../components/NhanVien/DanhSachComponent';
import DeleteComponent from '../../components/NhanVien/DeleteComponent';
import './NhanVien.css';


export default function NhanVien(){

  const [hidden , setHidden] = useState(true);

  const handleDisplay = () => {
    setHidden(false);
  };

  const handleClose = () => {
    setHidden(true);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const [count , setCount] = useState(0);

  const handleReload = () =>{
    setCount(count+1);
  }


  return (
    <>
      <ul>
        <li><Link to="add-employee">Thêm</Link></li>
        <li><Link to={`edit-employee?id=${id}`}>Sửa</Link></li>
        <li onClick={handleDisplay}>Xoá</li>
        <li>Tìm kiếm</li>
      </ul>

    <DanhSachComponent />
    <div hidden={hidden}>
      <DeleteComponent close={handleClose} reload  = {handleReload}/>
    </div>
    </>
  )
}
