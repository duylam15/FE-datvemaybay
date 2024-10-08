
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addNhanVien, editNhanVien } from "../../services/nhanVienServices";
import useEffectDataNhanVienByID from "../../utils/useEffectDataNhanVienByID";
import "./NhanVien.css";

const AddComponent = () =>{
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idNhanVien = queryParams.get('id');
  let nhanvien  = null;

    if(idNhanVien != null){
      console.log("dang sua nhan vien " + idNhanVien);
      nhanvien = useEffectDataNhanVienByID(idNhanVien);
      if(nhanvien != null){
        console.log("da tim thay nahn vien : " + nhanvien.ngaySinh);
      }
    }
    else {
      console.log("dang them nhan vien");
    }

  const navigator = useNavigate();
  const [hoTen ,  setHoten] = useState();
  const [errorHoten,setErrorHoten] = useState();
  const [cccd , setCCCD] = useState();
  const [errorCCCD , setErrorCCCD] = useState();
  const [soDienThoai , setSoDienThoai] = useState();
  const [errorSoDienThoai , setErrorSoDienThoai] = useState();
  const [gioiTinhEnum , setGioiTinhEnum] = useState();
  const [errorGioiTinhEnum , setErrorGioiTinhEnum] =  useState();
  const [email , setEmail] = useState();
  const [errorEmail , setErrorEmail] = useState();
  const [ngaySinh , setNgaySinh] = useState();
  const [errorNgaySinh , setErrorNgaySinh] = useState();
  const [chucVu , setChucVu] = useState();
  const [errorChucVu ,  setErrorChucVu] =  useState();
  const [trangThaiActive , setTrangThaiActive] = useState();
  const [errorTrangThaiActive , setErrorTrangThaiActive] = useState();

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

  useEffect(() => {
    if (nhanvien) {
      setHoten(nhanvien.hoTen);
      setCCCD(nhanvien.cccd);
      setSoDienThoai(nhanvien.soDienThoai);
      setGioiTinhEnum(nhanvien.gioiTinhEnum);
      setEmail(nhanvien.email);
      setNgaySinh(nhanvien.ngaySinh ? nhanvien.ngaySinh.toString().split("T")[0] : "");
      setChucVu(nhanvien.chucVu);
      setTrangThaiActive(nhanvien.trangThaiActive);
    }
  }, [nhanvien]);

  const setEmpty = () => {
    setErrorNgaySinh("");
    setErrorEmail("");
    setErrorSoDienThoai("");
    setErrorCCCD("");
    setErrorChucVu("");
    setErrorGioiTinhEnum("");
    setErrorHoten("");
    setErrorTrangThaiActive("");
  };

  const setErrorData = (errorData) => {
      if(errorData.hoTen != null){
        setErrorHoten(errorData.hoTen);
      }

      if(errorData.cccd != null){
        setErrorCCCD(errorData.cccd);
      }

      if(errorData.chucVu != null){
        setErrorChucVu(errorData.chucVu);
      }

      if(errorData.email != null){
        setErrorEmail(errorData.email);
      }

      if(errorData.gioiTinhEnum != null){
        setErrorGioiTinhEnum(errorData.gioiTinhEnum);
      }

      if(errorData.ngaySinh != null){
        setErrorNgaySinh(errorData.ngaySinh);
      }

      if(errorData.soDienThoai != null){
        setErrorSoDienThoai(errorData.soDienThoai);
      }

      if(errorData.trangThaiActive != null){
        setErrorTrangThaiActive(errorData.trangThaiActive);
      }
  }

    const createNhanVien = () => {
      setEmpty();
      const nhanvien = {hoTen , cccd , soDienThoai  , gioiTinhEnum, email , ngaySinh , chucVu , trangThaiActive}
      addNhanVien(nhanvien)
      .then(() => {
        navigator("../");
      })
      .catch(error => {
        console.log(error.response.data);
        const  errorData = error.response.data.data;
        setErrorData(errorData);
      });
      console.log(nhanvien);
  }

  const saveNhanVien = () => {
    setEmpty();
    const nhanvien = {idNhanVien ,hoTen , cccd , soDienThoai  , gioiTinhEnum, email , ngaySinh , chucVu , trangThaiActive}
    editNhanVien(idNhanVien,nhanvien).then(() => {
      navigator("../");
    })
    .catch(error => {
      console.log(error.response.data);
      const  errorData = error.response.data.data;
      setErrorData(errorData);
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
        <input type="text" placeholder="Nhập họ và tên" onChange={handleHoTen} value={hoTen}/>
        <span>{errorHoten}</span>
      </div>
      <div className = "container__input_cccd">
        <label htmlFor="">CCCD : </label>
        <input type="number" placeholder="Nhập CCCD" onChange={handleCCCD} value={cccd}/>
        <span>{errorCCCD}</span>
      </div>
      <div className = "container__input_soDienThoai">
        <label htmlFor="">Số điện thoại : </label>
        <input type="text" placeholder="Nhập so dien thoai" onChange={handleSoDienThoai} value={soDienThoai}/>
        <span>{errorSoDienThoai}</span>
      </div>
      <div  className = "container__input_gioiTinhEnum">
        Giới tính : 
      <select name="gioiTinhEnum" id="gioiTinhEnumSelect" onChange={handleGioiTinhEnum} value={gioiTinhEnum}>
      <option value="-1">Chọn giới tính</option>
        <option value="NAM">NAM</option>
        <option value="NU">NỮ</option>
      </select>
      <span>{errorGioiTinhEnum}</span>
      </div>
      <div className = "container__input_email">
        <label htmlFor="">Email: </label>
        <input type="text" placeholder="Nhập email" onChange={handleEmail} value={email}/>
        <span>{errorEmail}</span>
      </div>

      <div className = "container__input_ngaySinh">
        <label htmlFor="">Ngày sinh : </label>
        <input type="date" placeholder="" onChange={handleNgaySinh} value={ngaySinh}/>
        <span>{errorNgaySinh}</span>
      </div>

      <div className = "container__input_chucVu">
        <label htmlFor="">Chức vụ : </label>
        <select name="chucVu" id="chucVuSelect" onChange={handleChucVu} value={chucVu}>
        <option value="-1">Chọn chức vụ</option>
          <option value="ADMIN">ADMIN</option>
          <option value="EMPLOYEE">EMPLOYEE</option>
          <option value="USER">USER</option>
        </select>
        <span>{errorChucVu}</span>
      </div>
      <div className = "container__input_trangThaiActive">
        <label htmlFor="">Trạng thái : </label>
        <select name="trangThai" id="trangThaiSelect" onChange={handleTrangThaiActive} value={trangThaiActive}>
          <option value="-1">Chọn trạng thái</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="IN_ACTIVE">INACTIVE</option>
        </select>
        <span>{errorTrangThaiActive}</span>
      </div>

      <button onClick={nhanvien ? saveNhanVien : createNhanVien}>
          {nhanvien ? "Sửa" : "Thêm"}
      </button>

      <button onClick={cancle}>Huỷ bỏ</button>
    </>
  )
};

export default AddComponent;