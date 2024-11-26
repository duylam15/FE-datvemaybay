import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LayOutThongBao from '../../../layout/LayoutThongBao/layOutThongBao';
import { addChucVuService, dataChucVuById, updateChucVuService } from '../../../services/chucVuServices';
import "./chucvu.css";

const AddChucVu = () => {

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const idChucVu = queryParams.get('id');

  const [tenChucVu, setTenChucVu] = useState("");
  const [errorTenChucVu, setErrorTenChucVu] = useState("");
  const [moTa, setMoTa] = useState("");
  const [errorMoTa, setErrorMoTa] = useState("");
  const [trangThaiActive, setTrangThaiActive] = useState("ACTIVE");
  const [errorTrangThaiActive, setErrorTrangThaiActive] = useState("")

  const handleTenChucVu = (e) => {
    setTenChucVu(e.target.value);
    console.log(e.target.value);
  }

  const handleMoTa = (e) => {
    setMoTa(e.target.value);
  }

  const handleTrangThaiActive = (e) => {
    setTrangThaiActive(e.target.value);
  }

  const [typeDisplay, setTypeDisplay] = useState('none'); /// display layout
  const [thongBao, setThongBao] = useState({
    message: "",
    typeMessage: "" // "inpage" ,"outpage" ,  ""
  });
  const message = {
    cancle: "Bạn có quay trở lại trang chính ",
    sucessAdd: "Thêm thành công",
    errorField: "Có thông tin không hợp lệ.Hãy kiểm tra lại!",
    sucessEdit: "Sửa thành công"
  }

  const cancle = () => {
    setTypeDisplay("block");
    setThongBao({ message: message.cancle, typeMessage: 'outpage' });
  }

  const emptyField = () => {
    setErrorTenChucVu("");
    setErrorMoTa("");
    setErrorTrangThaiActive("");
  }

  const errorField = (errorData) => {
    setErrorTenChucVu(errorData?.ten);
    setErrorMoTa(errorData?.moTa);
    setErrorTrangThaiActive(errorData?.trangThaiActive);
  }

  const createChucVu = () => {
    const fetchData = async () => {
      const ten = tenChucVu;
      const data = { ten, moTa, trangThaiActive };
      const response = await addChucVuService(data);
      console.log(response);
      if (response.statusCode == 400 || response.statusCode == 409) {
        emptyField();
        errorField(response.data);
        setTypeDisplay("block");
        setThongBao({ message: response.message, typeMessage: 'inpage' });
      }
      if (response.status == 201) {
        setTypeDisplay("block");
        setThongBao({ message: "Thêm thành công", typeMessage: 'outpagehere' });
      }
    }

    fetchData();
  }

  const saveChucVu = () => {
    const fetchData = async () => {
      const ten = tenChucVu;
      const data = { idChucVu, ten, moTa, trangThaiActive };
      const response = await updateChucVuService(idChucVu, data);
      console.log(response);
      if (response.statusCode == 400 || response.statusCode == 409 || response.statusCode == 403) {
        emptyField();
        errorField(response.data);
        setTypeDisplay("block");
        setThongBao({ message: response.message, typeMessage: 'inpage' });
      }
      if (response.status == 201) {
        setTypeDisplay("block");
        setThongBao({ message: "Sửa thành công", typeMessage: 'outpagehere' });
      }
    }

    fetchData();
  }

  const unable = () => {
    if (!idChucVu)
      return false;
    if (tenChucVu == "Cơ trưởng" || tenChucVu == "Cơ phó" || tenChucVu == "Tiếp viên") {
      return true;
    }
    return false;
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await dataChucVuById(idChucVu);
      setTenChucVu(response.data.data.ten);
      setMoTa(response.data.data.moTa);
      setTrangThaiActive(response.data.data.trangThaiActive);
    }
    if (idChucVu) {
      fetchData();
    }
  }, [])

  return (
    <>
      <div className="container__all">
        <div className="container__chucvu">
          <div className="container-infor">
            <h3>{idChucVu ? "Sửa" : "Thêm"} chức vụ</h3>
            <div className="container__input">
              <div className="form-input">
                <label htmlFor="">Tên Chức vụ : </label>
                <input type="text" onChange={handleTenChucVu} value={tenChucVu} placeholder='Nhập tên chức vụ' disabled={unable()} />
              </div>
              <span>{errorTenChucVu}</span>
            </div>
            <div className="container__input container__input_custom">
              <div className="form-input form-custom">
                <label htmlFor="">Mô tả: </label>
                <textarea type="text" onChange={handleMoTa} value={moTa} placeholder='Nhập Mô tả' />
              </div>
              <span>{errorMoTa}</span>
            </div>
            <div className="container__input">
              <div className="form-input">
                <label htmlFor="">Trạng Thái: </label>
                <select onChange={handleTrangThaiActive} value={trangThaiActive}>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="IN_ACTIVE">IN_ACTIVE</option>
                </select>
              </div>
              <span>{errorTrangThaiActive}</span>
            </div>
          </div>
          <div className="container__add-edit container__btn">
            <button className='btn' onClick={idChucVu ? saveChucVu : createChucVu}>
              {idChucVu ? "Sửa" : "Thêm"}
            </button>
            <button className="btnHuy" onClick={cancle}>Quay lại</button>
          </div>
        </div>
        <div style={{ display: typeDisplay }}>
          <LayOutThongBao thongBao={thongBao} setTypeDisplay={setTypeDisplay} />
        </div>
      </div>
    </>
  );
};

export default AddChucVu;