
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNhanVien } from "../../services/nhanVienServices";
const AddComponent = () =>{

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

  const createNhanVien = () => {
      const nhanvien = {hoTen , cccd , soDienThoai  , gioiTinhEnum, email , ngaySinh , chucVu , trangThaiActive}
      addNhanVien(nhanvien).then(() => {
        navigator("../");
      });
      
      console.log(nhanvien);
  }

  const cancle = () => {
    navigator("../");
  }

  return (
    <>
      <div className = "container__input_hoTen">
        <label htmlFor="">Họ và tên : </label>
        <input type="text" placeholder="Nhập họ và tên" onChange={handleHoTen} />
      </div>
      <div className = "container__input_cccd">
        <label htmlFor="">CCCD : </label>
        <input type="number" placeholder="Nhập CCCD" onChange={handleCCCD} />
      </div>
      <div className = "container__input_soDienThoai">
        <label htmlFor="">Số điện thoại : </label>
        <input type="text" placeholder="Nhập so dien thoai" onChange={handleSoDienThoai}/>
      </div>
      <div  className = "container__input_gioiTinhEnum">
        Giới tính : 
      <select name="gioiTinhEnum" id="gioiTinhEnumSelect" onChange={handleGioiTinhEnum}>
      <option value="-1">Chọn giới tính</option>
        <option value="0">NAM</option>
        <option value="1">NỮ</option>
      </select>
      </div>
      <div className = "container__input_email">
        <label htmlFor="">Email: </label>
        <input type="text" placeholder="Nhập email" onChange={handleEmail}/>
      </div>

      <div className = "container__input_ngaySinh">
        <label htmlFor="">Ngày sinh : </label>
        <input type="date" placeholder="" onChange={handleNgaySinh}/>
      </div>

      <div className = "container__input_chucVu">
        <label htmlFor="">Chức vụ : </label>
        <select name="chucVu" id="chucVuSelect" onChange={handleChucVu}>
        <option value="-1">Chọn chức vụ</option>
          <option value="0">ADMIN</option>
          <option value="1">EMPLOYEE</option>
          <option value="2">USER</option>
        </select>
      </div>
      <div className = "container__input_trangThaiActive">
        <label htmlFor="">Trạng thái : </label>
        <select name="trangThai" id="trangThaiSelect" onChange={handleTrangThaiActive}>
          <option value="-1">Chọn trạng thái</option>
          <option value="0">ACTIVE</option>
          <option value="1">INACTIVE</option>
        </select>
      </div>

      <button onClick={createNhanVien}>Thêm</button>
      <button onClick={cancle}>Huỷ bỏ</button>
    </>
  )
};

export default AddComponent;