import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addChuyenbay, getChuyenBayById, updateChuyenBay } from '../../services/chuyenBayServices';
import { dataCongBySanBay, getCongById } from '../../services/congServices';
import { dataSanBay } from '../../services/sanBayService';
import useEffectDataMayBay from '../../utils/useEffectDataMayBay';
import useEffectDataSanBayByID from '../../utils/useEffectDataSanBayById';
import useEffectDataTuyenBay from '../../utils/useEffectDataTuyenBay';
import './chuyenbay.css';

export const AddChuyenBay = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idChuyenBay = queryParams.get('id');
  const [dataSelectChuyenBay , setDataSelectChuyenBay] = useState([]);

  const [delay , setDelay] =  useState(0);
  const [iataChuyenBay , setIataChuyenBay] =  useState(0);
  const [icaoChuyenBay , setIcaoChuyenBay] =  useState(0);
  const [ngayBay, setNgayBay] = useState("");
  const [thoiGianBatDauDuTinh , setthoiGianBatDauDuTinh] = useState("");
  const [thoiGianKetThucDuTinh , setThoiGianKetThucDuTinh] =  useState("");
  const [thoiGianBatDauThucTe , setthoiGianBatDauThucTe] = useState("");
  const [thoiGianKetThucThucTe , setThoiGianKetThucThucTe] =  useState("");
  const [trangThai , setTrangThai] = useState("");
  const [trangThaiActive ,  setTrangThaiActive] = useState("");
  const [soGhe , setSoGhe] = useState(0);

  const handleIataChuyenBay = (e) =>{
    setIataChuyenBay(e.target.value);
  }

  const handleIcaoChuyenBay = (e) =>{
    setIcaoChuyenBay(e.target.value);
  }

  const handleNgayBay = (e) =>{
    setNgayBay(e.target.value);
  }

  const handleThoiGianBatDauDuTinh = (e) =>{
    setthoiGianBatDauDuTinh(e.target.value);
    handleThoiGianBatDauThucTe(e);
  }

  const handleThoiGianBatDauThucTe = (e) =>{
    setthoiGianBatDauThucTe(e.target.value);
  }

  const handleThoiGianKetThucDuTinh = (e) =>{
    setThoiGianKetThucDuTinh(e.target.value);
    handleThoiGianKetThucThucTe(e);
  }

  const handleThoiGianKetThucThucTe = (e) =>{
    setThoiGianKetThucThucTe(e.target.value);
  }

  const handleDelay = (e) =>{
    setDelay(e.target.value);
  }

  const handleTrangThai = (e) =>{
    setTrangThai(e.target.value);
  }

  const handleTrangThaiActive = (e) =>{
    setTrangThaiActive(e.target.value);
  }

  const [sanBay , setDataSanBay] = useState([]);
  const [sanBayBatDau , setSanBayBatDau] = useState(0);
  const [sanBayKetThuc , setSanBayKetThuc] = useState(0);
  let dataSanBayBatDau = useEffectDataSanBayByID(sanBayBatDau);
  let dataSanBayKetThuc = useEffectDataSanBayByID(sanBayKetThuc);

  const [datacong ,setdatacong] = useState([]);
  const [selectCong , setSelectCong] = useState(0);
  const [cong , setCong] = useState([]);

  const handleSelectCong = (e) =>{
    setSelectCong(e.target.value);
  }

  useEffect(() => {
    getCongById(selectCong)
      .then((response) => {
        setCong(response.data.data);
      })
      .catch((error) =>{
        console.error(error);
      })
  } ,[selectCong])

  let dataTuyenBay = useEffectDataTuyenBay();
  const [tuyenBay , setTuyenBay] = useState([]);

  let mayBays =  useEffectDataMayBay();
  const [selectMayBay , setSelectMayBay] = useState(0);
  const [mayBay , setInforMayBay] = useState();



  useEffect(() => {
    dataCongBySanBay(sanBayBatDau)
                              .then((response) => {
                                setdatacong(response.data.data);
                                console.log(response.data.data);
                              })
  } ,[sanBayBatDau])
  useEffect(() => {
    const temp = mayBays.find((item) => item.idMayBay == selectMayBay)
    setInforMayBay(temp);
    setSoGhe(temp == null ? "" : temp.soLuongGhe);
    console.log(temp);
  } ,[selectMayBay])
  useEffect(() => {
    // Kiểm tra nếu cả hai sân bay và dữ liệu tuyến bay đã có
    if (dataSanBayBatDau && dataSanBayKetThuc && dataTuyenBay.length > 0) {
      // Tìm tuyến bay dựa trên sanBayBatDau và sanBayKetThuc
      const tuyenBay = dataTuyenBay.find(
        (item) =>
          item.sanBayBatDau.idSanBay == sanBayBatDau &&
          item.sanBayKetThuc.idSanBay == sanBayKetThuc
      );
      setTuyenBay(tuyenBay);
      console.log(tuyenBay);
    }
  }, [dataSanBayBatDau, dataSanBayKetThuc, dataTuyenBay, sanBayBatDau, sanBayKetThuc]);
  useEffect(() => {
    dataSanBay()
              .then((response) => {
                  setDataSanBay(response.data.data);
              })
  } , [])

  const handleSanBayBatDau = (e) => {
      setSanBayBatDau(e.target.value);
  }

  const handleSanBayKetThuc = (e) => {
    setSanBayKetThuc(e.target.value);
}

  const handleMayBay = (e) => {
    setSelectMayBay(e.target.value);
  } 


  const navigator = useNavigate();

  const createChuyenBay = () => {
    const dataChuyenBay =  {delay , iataChuyenBay , icaoChuyenBay , ngayBay ,thoiGianBatDauDuTinh , thoiGianBatDauThucTe , thoiGianKetThucDuTinh , thoiGianKetThucThucTe ,trangThai, trangThaiActive,soGhe ,tuyenBay,cong,mayBay};
    console.log(dataChuyenBay);
    addChuyenbay(dataChuyenBay)
    .then(() => {
      console.log("them thanh cong");
      navigator("../");
    })
    .catch((error) => {
        console.log(error.response.data);
        const  errorData = error.response.data.data;
    })

  }

  const suaChuyenBay = () => {
    const dataChuyenBay =  {idChuyenBay ,delay , iataChuyenBay , icaoChuyenBay , ngayBay ,thoiGianBatDauDuTinh , thoiGianBatDauThucTe , thoiGianKetThucDuTinh , thoiGianKetThucThucTe ,trangThai, trangThaiActive,soGhe ,tuyenBay,cong,mayBay};
    console.log(dataChuyenBay);
    updateChuyenBay(idChuyenBay ,dataChuyenBay)
    .then(() => {
      console.log("sua thanh cong");
      navigator("../");
    })
    .catch((error) => {
        console.log(error.response.data);
        const  errorData = error.response.data.data;
    })
  }


  useEffect(() =>{
    getChuyenBayById(idChuyenBay)
      .then((response) => {
        console.log(response.data.data);
        setDataSelectChuyenBay(response.data.data);
        const data = response.data.data;
        setDelay(data.delay);
        setSanBayBatDau(data.tuyenBay.sanBayBatDau.idSanBay);
        setSanBayKetThuc(data.tuyenBay.sanBayKetThuc.idSanBay);
        setSelectCong(data.cong.idCong);
        setTuyenBay(data.tuyenBay);
        setInforMayBay(data.mayBay);
        setSelectMayBay(data.mayBay.idMayBay);
        setIataChuyenBay(data.iataChuyenBay);
        setIcaoChuyenBay(data.icaoChuyenBay);
        setNgayBay(data.ngayBay.toString().split("T")[0]);
        setthoiGianBatDauDuTinh(data.thoiGianBatDauDuTinh);
        setThoiGianKetThucDuTinh(data.thoiGianKetThucDuTinh);
        setTrangThai(data.trangThai);
        setTrangThaiActive(data.trangThaiActive);
      })
  },[])
  
  const cancle = () => {
    navigator("../");
  }
  return (
    <>
        <div className="containe-chuyenbay">
          <div className="row row1 ">
            <div className="column1">
            <div>
                <label htmlFor="">iata chuyen bay:</label>
                <input type="text" name="" id="" onChange={handleIataChuyenBay} value={iataChuyenBay}/>
              </div>
              <div>
                <label htmlFor="">icao chuyen bay:</label>
                <input type="text" name="" id="" onChange={handleIcaoChuyenBay} value={icaoChuyenBay}/>
              </div>
              <div>
                <label htmlFor="">Ngày bay :</label>
                <input type="date" name="" id="" onChange={handleNgayBay} value={ngayBay}/>
              </div>
              <div>
                <label htmlFor="">Thoi gian bat dau du tinh:</label>
                <input type='datetime-local' name="" id="" onChange={handleThoiGianBatDauDuTinh} value={thoiGianBatDauDuTinh}/>
              </div>
              <div>
                <label htmlFor="">Thoi gian ket thuc du tinh :</label>
                <input type="datetime-local" name="" id="" onChange={handleThoiGianKetThucDuTinh} value={thoiGianKetThucDuTinh}/>
              </div>
              <div>
                <label htmlFor="">delay:</label>
                <input type="number" name="" id="" onChange={handleDelay} value={delay}/><label htmlFor="">Phút</label>
              </div>
              <select name="" id="" onChange={handleTrangThai} value={trangThai}> STATUS
                <option value="">chọn trạng thái chuyến bay</option>
                <option value="CANCELED">CANCELED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="DELAYED">DELAYED</option>
                <option value="SCHEDULED">SCHEDULED</option>
              </select>
              <select name="" id="" onChange={handleTrangThaiActive} value={trangThaiActive}> STATUS
                <option value="">chọn trạng thái xử lí</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="IN_ACTIVE">IN_ACTIVE</option>
              </select>
            </div>
            <div className="column2">
              <h3>Chọn cổng </h3>
              <select name="" id="" onChange={handleSelectCong} value={selectCong}>
                <option value="">Chon Cong</option>
                {
                  datacong != null && datacong.map((item) => (
                    <option value={item.idCong}>{item.tenCong}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="row row2">
            <div className="column1">
              <h3>Chọn  máy bay</h3>
              <select name="" id="" value={selectMayBay} onChange={handleMayBay}>
                <option value="0">Chon May Bay</option>
                {
                  mayBays.map((item) => (
                    <option value={item.idMayBay}>{item.tenMayBay}</option>
                  ))
                }
              </select>
              <div>
                <label htmlFor="">Tên hãng bay :</label>
                <input type="text" name="" id="" disabled = {true} value={mayBay == null ? "" : mayBay.hangBay.tenHangBay}/>
              </div>
              <div>
                <label htmlFor="">icao may bay :</label>
                <input type="text" name="" id="" disabled = {true} value={mayBay == null ? "" : mayBay.icaoMayBay}/>
              </div>
              <div>
                <label htmlFor="">Nam san xuat :</label>
                <input type="number" name="" id="" disabled={true} value = {mayBay == null ? "" : mayBay.namSanXuat}/>
              </div>
              <div>
                <label htmlFor="">So Hieu :</label>
                <input type="text" name="" id="" disabled={true} value = {mayBay == null ? "" : mayBay.soHieu}/>
              </div>
              <div>
                <label htmlFor="">So Luong ghe :</label>
                <input type="number" name="" id="" disabled={true} value = {mayBay == null ? "" : mayBay.soLuongGhe}/>
              </div>
            </div>
            <div className="column2">
              <h3>Chọn tuyến bay</h3>
              <label> San bay bat dau </label>
              <select name="" id="" onChange={handleSanBayBatDau} value={sanBayBatDau}>
                {
                  sanBayBatDau == 0 && <option value="0">Chon San Bay</option>
                }
                {
                  sanBay.filter((item) => item.idSanBay != sanBayKetThuc)
                  .map((item) => (
                      <option value={item.idSanBay}>{item.tenSanBay}</option>
                  ))
                }
              </select>
              <div>
                <label htmlFor="">iata san bay :</label>
                <input type="text" name="" id="" disabled = {true} value={dataSanBayBatDau == null ? "" : dataSanBayBatDau.iataSanBay}/>
              </div>
              <div>
                <label htmlFor="">icao san bay :</label>
                <input type="text" name="" id="" disabled = {true} value={dataSanBayBatDau == null ? "" : dataSanBayBatDau.icaoSanBay}/>
              </div>
              <div>
                <label htmlFor="">Địa chỉ :</label>
                <input type="text" name="" id="" disabled = {true} value={dataSanBayBatDau == null ? "" : dataSanBayBatDau.thanhPho.tenThanhPho}/>
              </div>
              <div>
                <label htmlFor="">Quốc gia :</label>
                <input type="text" name="" id="" disabled = {true} value={dataSanBayBatDau == null ? "" : dataSanBayBatDau.thanhPho.quocGia.tenQuocGia}/>
              </div>
              <br/>
              <label> San Bay Ket Thuc </label>
              <select name="" id="" onChange={handleSanBayKetThuc} value={sanBayKetThuc} disabled = {sanBayBatDau != 0 ? false : true}>
                
                {
                  sanBayKetThuc == 0 && <option value="">Chon San Bay</option>
                }
                {
                  sanBay
                  .filter((item) => item.idSanBay != sanBayBatDau)
                  .map((item) => (
                    <option value={item.idSanBay}>{item.tenSanBay}</option>
                  ))
                }
              </select>
              <div>
                <label htmlFor="">iata san bay :</label>
                <input type="text" name="" id="" disabled = {true} value={dataSanBayKetThuc == null ? "" : dataSanBayKetThuc.iataSanBay}/>
              </div>
              <div>
                <label htmlFor="">icao san bay :</label>
                <input type="text" name="" id="" disabled = {true} value={dataSanBayKetThuc == null ? "" : dataSanBayKetThuc.icaoSanBay}/>
              </div>
              <div>
                <label htmlFor="">Địa chỉ :</label>
                <input type="text" name="" id="" disabled = {true} value={dataSanBayKetThuc == null ? "" : dataSanBayKetThuc.thanhPho.tenThanhPho}/>
              </div>
              <div>
                <label htmlFor="">Quốc gia :</label>
                <input type="text" name="" id="" disabled = {true} value={dataSanBayKetThuc == null ? "" : dataSanBayKetThuc.thanhPho.quocGia.tenQuocGia}/>
              </div>
              <div>
                <label htmlFor="">Khoang cach :</label>
                <input type="number" name="" id="" disabled = {true} value={tuyenBay.khoangCach}/>
              </div>
              <div>
                <label htmlFor="">Thoi gian chuyen bay :</label>
                <input type="time" name="" id="" disabled = {true} value={tuyenBay.thoiGianChuyenBay}/>
              </div>
            </div>
            <div className="column1">
                  Day la column cho ngoi
            </div>
          </div>
        </div>
        <button onClick={ idChuyenBay ? suaChuyenBay : createChuyenBay}>{idChuyenBay ? "Sửa chuyến bay" : "Thêm chuyến bay"}</button>
        <button onClick={cancle}>huy bo</button>
    </>
  )
}