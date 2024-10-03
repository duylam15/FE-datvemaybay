import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { dataNhanVien, deleteNhanVien } from "../../services/nhanVienServices";

const DeleteComponent = ({close , reload}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idNhanVien = queryParams.get('id');

  const [nhanviens , setNhanVien] = useState([]);

  const navigator = useNavigate();
  const [hoTen ,  setHoten] = useState();
  const [cccd , setCCCD] = useState();
  const [soDienThoai , setSoDienThoai] = useState();
  const [gioiTinhEnum , setGioiTinhEnum] = useState();
  const [email , setEmail] = useState();
  const [ngaySinh , setNgaySinh] = useState();
  const [chucVu , setChucVu] = useState();
  const [trangThaiActive , setTrangThaiActive] = useState();

  useEffect(() => {
    dataNhanVien()
                    .then(response => {
                                        setNhanVien(response.data.data);
                                      })
                    .catch(error => {console.error( error)})
  } , [])

  useEffect(() => {
    nhanviens.find( nv =>{
                            if( nv.idNhanVien == idNhanVien) {
                                setHoten(nv.hoTen)
                                setCCCD(nv.cccd)
                                setEmail(nv.email)
                                setGioiTinhEnum(nv.gioiTinhEnum)
                                setSoDienThoai(nv.soDienThoai)
                                setChucVu(nv.chucVu)
                                setNgaySinh((nv.ngaySinh+"").split("T")[0])
                                setTrangThaiActive(nv.trangThaiActive)
                            }
                          }
                  )
  } ,[idNhanVien , nhanviens])


  const deleteNV = () =>{
      const nhanvien = {idNhanVien ,hoTen , cccd , soDienThoai  , gioiTinhEnum, email , ngaySinh , chucVu , trangThaiActive}
      deleteNhanVien(nhanvien).then(() => {
        close();
        reload();
          const path = window.location.pathname;
        navigator(path);
      });
  }

  return (
    <>
        <div>
          <div>Bạn có muốn xoá nhân viên {idNhanVien} không</div>
          <button onClick={deleteNV}><Link to="/admin/nhanvien">Đồng ý</Link></button>
          <button onClick={close}>Không</button>
        </div>
    </>
  )
}

export default DeleteComponent