
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LayOutThongBao from "../../../layout/LayoutThongBao/layOutThongBao";
import { dataChucVu } from "../../../services/chucVuServices";
import { addNhanVien, editNhanVien } from "../../../services/nhanVienServices";
import useEffectDataNhanVienByID from "../../../utils/useEffectDataNhanVienByID";
import "./NhanVien.css";

const AddComponent = (props) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idNhanVien = queryParams.get('id');
  console.log(location);
  let nhanvien = null;

  if (idNhanVien != null) {
    console.log("dang sua nhan vien " + idNhanVien);
    nhanvien = useEffectDataNhanVienByID(idNhanVien);
    console.log(nhanvien);
  }
  else {
    console.log("dang them nhan vien");
  }

  useEffect(() => {

  }, [props.action])

  const navigator = useNavigate();
  const [hoTen, setHoten] = useState();
  const [errorHoten, setErrorHoten] = useState();
  const [cccd, setCCCD] = useState();
  const [errorCCCD, setErrorCCCD] = useState();
  const [soDienThoai, setSoDienThoai] = useState();
  const [errorSoDienThoai, setErrorSoDienThoai] = useState();
  const [gioiTinhEnum, setGioiTinhEnum] = useState();
  const [errorGioiTinhEnum, setErrorGioiTinhEnum] = useState();
  const [email, setEmail] = useState();
  const [errorEmail, setErrorEmail] = useState();
  const [ngaySinh, setNgaySinh] = useState();
  const [errorNgaySinh, setErrorNgaySinh] = useState();
  const [selectchucVu, setChucVu] = useState("0");
  const [chucVus, setChucVus] = useState([]);
  const [errorChucVu, setErrorChucVu] = useState();
  const [trangThaiActive, setTrangThaiActive] = useState();
  const [errorTrangThaiActive, setErrorTrangThaiActive] = useState();
  const [chuyenBay, setChuyenBay] = useState(null);

  useEffect(() => {
    dataChucVu()
      .then((response) => {
        setChucVus(response.data);
        console.log(response.data);
      })
  }, []);

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
      console.log(nhanvien);
      setHoten(nhanvien.hoTen);
      setCCCD(nhanvien.cccd);
      setSoDienThoai(nhanvien.soDienThoai);
      setGioiTinhEnum(nhanvien.gioiTinhEnum);
      setEmail(nhanvien.email);
      setNgaySinh(nhanvien?.ngaySinh?.toString().split("T")[0]);
      setChucVu(nhanvien?.chucVu?.idChucVu);
      setTrangThaiActive(nhanvien.trangThaiActive);
      setChuyenBay(nhanvien.chuyenBay);
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
    if (errorData?.hoTen != null) {
      setErrorHoten(errorData.hoTen);
    }

    if (errorData?.cccd != null) {
      setErrorCCCD(errorData.cccd);
    }

    if (errorData?.chucVu != null) {
      setErrorChucVu(errorData.chucVu);
    }

    if (errorData?.email != null) {
      setErrorEmail(errorData.email);
    }

    if (errorData?.gioiTinhEnum != null) {
      setErrorGioiTinhEnum(errorData.gioiTinhEnum);
    }

    if (errorData?.ngaySinh != null) {
      setErrorNgaySinh(errorData.ngaySinh);
    }

    if (errorData?.soDienThoai != null) {
      setErrorSoDienThoai(errorData.soDienThoai);
    }

    if (errorData?.trangThaiActive != null) {
      setErrorTrangThaiActive(errorData.trangThaiActive);
    }
  }

  const createNhanVien = () => {
    const fetchData = async () => {
      setEmpty();
      let chucVu = chucVus.find(item => item.idChucVu == selectchucVu);
      const nhanvien = { hoTen, cccd, soDienThoai, gioiTinhEnum, email, ngaySinh, chucVu, trangThaiActive }
      const fdAddNhanVien = await addNhanVien(nhanvien);
      console.log(fdAddNhanVien);
      if (fdAddNhanVien.statusCode == 400) {
        setErrorData(fdAddNhanVien.data);
        setTypeDisplay("block");
        setThongBao({ message: message.errorField, typeMessage: 'inpage' });
      }
      if (fdAddNhanVien.statusCode == 201) {
        setTypeDisplay("block");
        setThongBao({ message: message.sucessAdd, typeMessage: 'outpagehere' });
      }
      if (fdAddNhanVien.statusCode == 409) {
        setErrorData(fdAddNhanVien.data);
        setTypeDisplay("block");
        setThongBao({ message: message.errorField, typeMessage: 'inpage' });
      }
    }
    fetchData();
  }

  const saveNhanVien = () => {
    const fetchData = async () => {
      setEmpty();
      let chucVu = chucVus.find(item => item.idChucVu == selectchucVu);
      const nhanvien = { idNhanVien, hoTen, cccd, soDienThoai, gioiTinhEnum, email, ngaySinh, chucVu, trangThaiActive }
      const response = await editNhanVien(idNhanVien, nhanvien);
      if (response.statusCode == 400) {
        setErrorData(response.data);
        setTypeDisplay("block");
        setThongBao({ message: message.errorField, typeMessage: 'inpage' });
      }
      if (response.statusCode == 201) {
        setTypeDisplay("block");
        setThongBao({ message: message.sucessAdd, typeMessage: 'outpagehere' });
      }
      if (response.statusCode == 409) {
        setErrorData(response.data);
        setTypeDisplay("block");
        setThongBao({ message: message.errorField, typeMessage: 'inpage' });
      }
    }
    fetchData();
  }

  const cancle = () => {
    setTypeDisplay("block");
    setThongBao({ message: message.cancle, typeMessage: 'outpage' });
  }


  /// bat tat layout thong bao va gui thong bao 
  const [typeDisplay, setTypeDisplay] = useState('none'); /// display layout
  const [thongBao, setThongBao] = useState({
    message: "",
    typeMessage: "" // "inpage" ,"outpage" ,  ""
  });
  const message = {
    cancle: "Bạn có quay trở lại trang chính ?",
    sucessAdd: "Thêm thành công",
    errorField: "Có thông tin không hợp lệ.Hãy kiểm tra lại!",
    sucessEdit: "Sửa thành công"
  }

  return (
    <>
      <div className="container-allnhanvien">
        <section className="container__nhanvien">
          <div className="container-infor">
            <h3>{nhanvien ? "Sửa" : "Thêm"} nhân viên</h3>
            <div className="container__input_hoTen container__input">
              <div className="form-input">
                <label htmlFor="" >Họ và tên : </label>
                <input type="text" placeholder="Nhập họ và tên" onChange={handleHoTen} value={hoTen} />
              </div>
              <span>{errorHoten}</span>
            </div>
            <div className="container__input_cccd container__input">
              <div className="form-input">
                <label htmlFor="">CCCD : </label>
                <input type="number" placeholder="Nhập CCCD" onChange={handleCCCD} value={cccd} />
              </div>
              <span>{errorCCCD}</span>
            </div>
            <div className="container__input_soDienThoai container__input">
              <div className="form-input">
                <label htmlFor="">Số điện thoại : </label>
                <input type="text" placeholder="Nhập so dien thoai" onChange={handleSoDienThoai} value={soDienThoai} />
              </div>
              <span>{errorSoDienThoai}</span>
            </div>
            <div className="container__input_gioiTinhEnum container__input">
              <div className="form-input">
                <label htmlFor="">Giới tính :</label>
                <select name="gioiTinhEnum" id="gioiTinhEnumSelect" onChange={handleGioiTinhEnum} value={gioiTinhEnum}>
                  <option value="-1">Chọn giới tính</option>
                  <option value="NAM">NAM</option>
                  <option value="NU">NỮ</option>
                </select>
              </div>
              <span>{errorGioiTinhEnum}</span>
            </div>
            <div className="container__input_email container__input">
              <div className="form-input">
                <label htmlFor="">Email: </label>
                <input type="text" placeholder="Nhập email" onChange={handleEmail} value={email} />
              </div>
              <span>{errorEmail}</span>
            </div>
            <div className="container__input_ngaySinh container__input">
              <div className="form-input">
                <label htmlFor="">Ngày sinh : </label>
                <input type="date" placeholder="" onChange={handleNgaySinh} value={ngaySinh} />
              </div>
              <span>{errorNgaySinh}</span>
            </div>
            <div className="container__input_chucVu container__input">
              <div className="form-input">
                <label htmlFor="">Chức vụ : </label>
                <select name="chucVu" id="chucVuSelect" onChange={handleChucVu} value={selectchucVu}>
                  <option value="0">Chọn chức vụ</option>
                  {
                    chucVus.length > 0 && chucVus.map((item) => (
                      <option value={item.idChucVu}>{item.ten}</option>
                    ))
                  }
                </select>
              </div>
              <span>{errorChucVu}</span>
            </div>
            <div className="container__input_trangThaiActive container__input">
              <div className="form-input">
                <label htmlFor="">Trạng thái : </label>
                <select name="trangThai" id="trangThaiSelect" onChange={handleTrangThaiActive} value={trangThaiActive}>
                  <option value="-1">Chọn trạng thái</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="IN_ACTIVE">INACTIVE</option>
                </select>
              </div>
              <span>{errorTrangThaiActive}</span>
            </div>
            <div className="container__input">
              <div className="form-input">
                <label htmlFor="">Hoạt động</label>
                <input type="text" value={chuyenBay ? "Đang bay" : "Đang rãnh"} disabled={true} />
              </div>
            </div>
          </div>

          <div className="container__add-edit container__btn">
            <button className='btn' onClick={nhanvien ? saveNhanVien : createNhanVien}>
              {nhanvien ? "Sửa" : "Thêm"}
            </button>
            <button className="btnHuy" onClick={cancle}>Quay lại</button>
          </div>
        </section>
      </div>
      <div style={{ display: typeDisplay }}>
        <LayOutThongBao thongBao={thongBao} setTypeDisplay={setTypeDisplay} />
      </div>
    </>
  )
};

export default AddComponent;