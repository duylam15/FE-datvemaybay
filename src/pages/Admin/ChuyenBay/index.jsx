import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataChuyenBay, filterChuyenBay } from "../../../services/chuyenBayServices";
import { dataSanBay } from "../../../services/sanBayService";
import { dataTuyenBay } from "../../../services/tuyenBayService";
import DanhSachCHuyenBay from "./DanhSachChuyenBay";


export const ChuyenBay = () => {

  const idNhanVienDangNhap = -1;

  const [selectTrangThai, setSelectTrangThai] = useState("SCHEDULED");
  const [selectThoiGianBatDau, setSelectThoiGianBatDau] = useState("");
  const [selectThoiGianKetThuc, setSelectThoiGianKetThuc] = useState("");
  const [typeInfo, setTypeInfo] = useState("0");
  const [data, setData] = useState([]);
  const [action, setAction] = useState("main");
  const page = "chuyenbay";

  const [sanbays, setsanbays] = useState([]);
  const [tuyenbays, settuyenbays] = useState([]);

  const [one, setone] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const responseSanBay = await dataSanBay();
      setsanbays(responseSanBay.data.data);
      const responseTuyenBay = await dataTuyenBay();
      settuyenbays(responseTuyenBay.data.data);
      setone(!one);
    }
    fetchData();
  }, [])



  const [two, settwo] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await dataChuyenBay();
      let udpateData = [...response.data.data];
      udpateData?.map((item) => {
        const sanBayBatDau = sanbays.filter((sanbay) => sanbay.idSanBay == item.tuyenBay.idSanBayBatDau);
        const sanBayKetThuc = sanbays.filter((sanbay) => sanbay.idSanBay == item.tuyenBay.idSanBayKetThuc);
        item.tuyenBay.sanBayBatDau = sanBayBatDau[0];
        item.tuyenBay.sanBayKetThuc = sanBayKetThuc[0];
      })
      let filterByIdNhanVienDangNhap = udpateData.filter((item) => {
        let s = item.nvhk.toString().split("/");
        let s1 = s[2].split("-").map(Number);
        let arr = [s[0], s[1], ...s1].map(Number);
        return arr.some(item1 => item1 == idNhanVienDangNhap)
      })
      setData(idNhanVienDangNhap == -1 ? udpateData : filterByIdNhanVienDangNhap);
      settwo(!two)
    }
    fetchData();
  }, [one])

  useEffect(() => {
    filterChuyenBay(selectTrangThai, selectThoiGianBatDau, selectThoiGianKetThuc)
      .then((response) => {
        let udpateData = [...response.data.data];
        udpateData?.map((item) => {
          const sanBayBatDau = sanbays.filter((sanbay) => sanbay.idSanBay == item.tuyenBay.idSanBayBatDau);
          const sanBayKetThuc = sanbays.filter((sanbay) => sanbay.idSanBay == item.tuyenBay.idSanBayKetThuc);
          item.tuyenBay.sanBayBatDau = sanBayBatDau[0];
          item.tuyenBay.sanBayKetThuc = sanBayKetThuc[0];
        })
        let filterByIdNhanVienDangNhap = udpateData.filter((item) => {
          let s = item.nvhk.toString().split("/");
          let s1 = s[2].split("-").map(Number);
          let arr = [s[0], s[1], ...s1].map(Number);
          return arr.some(item1 => item1 == idNhanVienDangNhap)
        })
        setData(idNhanVienDangNhap == -1 ? udpateData : filterByIdNhanVienDangNhap);
      })
      .catch((error) => {
        setData([]);
      })
  }, [typeInfo, selectTrangThai, action, selectThoiGianBatDau, selectThoiGianKetThuc, two])


  const handleType = (e) => {
    setTypeInfo(e.target.value);
    setSelectTrangThai("");
  }

  const navigator = useNavigate();

  const addChuyenBay = () => {
    const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
    const newPath = `${currentPath}/add`; // Thêm đoạn mới vào
    navigator(newPath, { replace: true })
    setAction("addChuyenBay");
  }

  return (
    <>
      <div className="main">
        <div className="containerMain">
          <>
            <ul>
              <li className="filterChuyenBay">
                <div className="filterTrangThai">
                  <label htmlFor="">Chọn trạng thái:</label>
                  <select name="" id="" value={selectTrangThai} onChange={(e) => setSelectTrangThai(e.target.value)}>
                    <option value="">Toàn bộ</option>
                    <option value="CANCELED">CANCELED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="DELAYED">DELAYED</option>
                    <option value="SCHEDULED">SCHEDULED</option>
                    <option value="IN_FLIGHT">IN_FLIGHT</option>
                  </select>
                </div>
                <div className="filterThoiGianDi">
                  <label htmlFor="">Chọn thời gian đi:</label>
                  <div className="thoiGianBatDau thoiGian">
                    <label htmlFor="">Thời gian bắt đầu</label>
                    <input type="datetime-local" onChange={(e) => setSelectThoiGianBatDau(e.target.value)} value={selectThoiGianBatDau} />
                  </div>
                  <div className="thoiGianKetThuc thoiGian">
                    <label htmlFor="">Thời gian kết thúc</label>
                    <input type="datetime-local" onChange={(e) => setSelectThoiGianKetThuc(e.target.value)} value={selectThoiGianKetThuc} />
                  </div>
                </div>
              </li>
              <li className='btn btnThem' onClick={addChuyenBay}>Thêm</li>
            </ul>
            {<DanhSachCHuyenBay data={data ? data : []} setData={setData} page={page} />}
          </>
        </div>
      </div>
    </>
  )

}