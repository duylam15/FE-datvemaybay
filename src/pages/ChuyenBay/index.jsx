import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataChuyenBay } from "../../services/chuyenBayServices";
import { dataSanBay } from "../../services/sanBayService";
import { dataTuyenBay } from "../../services/tuyenBayService";
import { AddChuyenBay } from "./AddChuyenBay";
import DanhSachCHuyenBay from "./DanhSachChuyenBay";


export const ChuyenBay = () => {

  const [searchInfo, setSearchInfo] = useState("");
  const [typeInfo, setTypeInfo] = useState("0");
  const [data, setData] = useState([]);
  const [action, setAction] = useState("main");
  const page = "chuyenbay";

  const [sanbays, setsanbays] = useState([]);
  const [tuyenbays, settuyenbays] = useState([]);

  useEffect(() => {
    dataSanBay()
      .then((response) => {
        setsanbays(response.data.data);
      })
    dataTuyenBay()
      .then((response) => {
        settuyenbays(response.data.data);
      })
  }, [])

  useEffect(() => {
    dataChuyenBay()
      .then((response) => {
        let udpateData = [...response.data.data];
        udpateData?.map((item) => {
          const sanBayBatDau = sanbays.filter((sanbay) => sanbay.idSanBay == item.tuyenBay.idSanBayBatDau);
          const sanBayKetThuc = sanbays.filter((sanbay) => sanbay.idSanBay == item.tuyenBay.idSanBayKetThuc);
          item.tuyenBay.sanBayBatDau = sanBayBatDau[0];
          item.tuyenBay.sanBayKetThuc = sanBayKetThuc[0];
        })
        setData(udpateData);
      })
  }, [sanbays])

  useEffect(() => {
    dataChuyenBay()
      .then((response) => {
        let udpateData = [...response.data.data];
        udpateData?.map((item) => {
          const sanBayBatDau = sanbays.filter((sanbay) => sanbay.idSanBay == item.tuyenBay.idSanBayBatDau);
          const sanBayKetThuc = sanbays.filter((sanbay) => sanbay.idSanBay == item.tuyenBay.idSanBayKetThuc);
          item.tuyenBay.sanBayBatDau = sanBayBatDau[0];
          item.tuyenBay.sanBayKetThuc = sanBayKetThuc[0];
        })
        setData(udpateData);
      })
      .catch((error) => {
        setData([]);
      })
  }, [typeInfo, searchInfo, action])



  const handleSearch = (e) => {
    setSearchInfo(e.target.value);
  }

  const handleType = (e) => {
    setTypeInfo(e.target.value);
    setSearchInfo("");
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
          {
            action == "main" && (
              <>
                <ul>
                  <li>
                    <select name="filter" id="filter" onChange={handleType}>
                      <option value="0">Hiện toàn bộ</option>
                      <option value="1">loc theo thoi gian</option>
                    </select>
                    <input disabled={typeInfo == 0} type={typeInfo == 2 || typeInfo == 3 || typeInfo == 5 ? "number" : "text"} placeholder="enter data" onChange={handleSearch} />
                  </li>
                  <li className='btn btnThem' onClick={addChuyenBay}>Thêm</li>
                </ul>
                {<DanhSachCHuyenBay data={data ? data : []} setData={setData} setAction={setAction} page={page} />}
              </>
            )
          }
          {
            action == "addChuyenBay" && <AddChuyenBay data={data ? data : []} setAction={setAction} action={"addChuyenBay"} />
          }
          {
            action == "editChuyenBay" && <AddChuyenBay data={data ? data : []} setAction={setAction} action={"editChuyenBay"} />
          }
        </div>
      </div>
    </>
  )

}