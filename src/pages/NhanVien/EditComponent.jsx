
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dataNhanVien, editNhanVien } from "../../services/nhanVienServices";

const EditComponent = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idNhanVien = queryParams.get('id');

  const [nhanviens , setNhanVien] = useState([]);
  const [selectedNhanVien, setSelectedNhanVien] = useState();

  useEffect(() => {
    dataNhanVien()
                    .then(response => { setNhanVien(response.data.data);
                                        // Lọc ra nhân viên có id tương ứng
                                        
                                      }
                          )
                    .catch(error => {console.error( error)})
                
  } , [])


  const navigator = useNavigate();
  const [hoTen ,  setHoten] = useState();
  const [cccd , setCCCD] = useState();
  const [soDienThoai , setSoDienThoai] = useState();
  const [gioiTinhEnum , setGioiTinhEnum] = useState();
  const [email , setEmail] = useState();
  const [ngaySinh , setNgaySinh] = useState();
  const [chucVu , setChucVu] = useState();
  const [trangThaiActive , setTrangThaiActive] = useState();

  const handleHoTen = (e) => {
      setHoten(e.target.value);
  }

  const handleCCCD = (e) => {
    setCCCD(e.target.value);
  }

  const handleSoDienThoai = (e) => {
    setSoDienThoai(e.target.value);
  };

  const handleGioiTinhEnum = (e) => {
    setGioiTinhEnum(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleNgaySinh = (e) => {
    setNgaySinh(e.target.value);
  };

  const handleChucVu = (e) => {
    setChucVu(e.target.value);
  };

  const handleTrangThaiActive = (e) => {
    setTrangThaiActive(e.target.value);
  };

  const saveNhanVien = () => {
      const nhanvien = {idNhanVien ,hoTen , cccd , soDienThoai  , gioiTinhEnum, email , ngaySinh , chucVu , trangThaiActive}
      editNhanVien(idNhanVien,nhanvien).then(() => {
        navigator("../");
      });
      
      console.log(nhanvien);
  }

  const cancle = () => {
    navigator("../");
  }

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


  return (
    <>
      <div className = "container__input_hoTen">
        <label htmlFor="">Họ và tên : </label>
        <input type="text" placeholder="Nhập họ và tên" onChange={handleHoTen} defaultValue={hoTen}/>
      </div>
      <div className = "container__input_cccd">
        <label htmlFor="">CCCD : </label>
        <input type="number" placeholder="Nhập CCCD" onChange={handleCCCD}  defaultValue={cccd}/>
      </div>
      <div className = "container__input_soDienThoai">
        <label htmlFor="">Số điện thoại : </label>
        <input type="text" placeholder="Nhập so dien thoai" onChange={handleSoDienThoai} defaultValue={soDienThoai}/>
      </div>
      <div  className = "container__input_gioiTinhEnum">
        Giới tính : 
      <select name="gioiTinhEnum" id="gioiTinhEnumSelect" onChange={handleGioiTinhEnum} value={gioiTinhEnum}>
      <option value="-1">Chọn giới tính</option>
        <option value="NAM">NAM</option>
        <option value="NU">NỮ</option>
      </select>
      </div>
      <div className = "container__input_email">
        <label htmlFor="">Email: </label>
        <input type="text" placeholder="Nhập email" onChange={handleEmail} defaultValue={email}/>
      </div>

      <div className = "container__input_ngaySinh">
        <label htmlFor="">Ngày sinh : </label>
        <input type="date" placeholder="" onChange={handleNgaySinh} defaultValue={ngaySinh}/>
      </div>

      <div className = "container__input_chucVu">
        <label htmlFor="">Chức vụ : </label>
        <select name="chucVu" id="chucVuSelect" onChange={handleChucVu} value={chucVu}>
        <option value="-1">Chọn chức vụ</option>
          <option value="ADMIN">ADMIN</option>
          <option value="EMPLOYEE">EMPLOYEE</option>
          <option value="USER">USER</option>
        </select>
      </div>
      <div className = "container__input_trangThaiActive">
        <label htmlFor="">Trạng thái : </label>
        <select name="trangThai" id="trangThaiSelect" onChange={handleTrangThaiActive} value={trangThaiActive}>
          <option value="-1">Chọn trạng thái</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="IN_ACTIVE">INACTIVE</option>
        </select>
      </div>

      <button onClick={saveNhanVien}>Sửa</button>
      <button onClick={cancle}>Huỷ bỏ</button>
    </>
  )
};

export default EditComponent