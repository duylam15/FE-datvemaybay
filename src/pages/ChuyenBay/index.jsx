import { useEffect, useState } from "react";
import { dataChuyenBay } from "../../services/chuyenBayServices";
import { AddChuyenBay } from "./AddChuyenBay";
import DanhSachCHuyenBay from "./DanhSachChuyenBay";


export const ChuyenBay = () => {

  const [searchInfo, setSearchInfo] = useState("");
  const [typeInfo, setTypeInfo] = useState("0");
  const [data, setData] = useState([]);
  const [action, setAction] = useState("main");
  const page = "chuyenbay";

  useEffect(() => {
    dataChuyenBay()
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        setData([]);
      })
  }, [typeInfo, searchInfo])


  const handleSearch = (e) => {
    setSearchInfo(e.target.value);
    console.log(e.target.value);
  }

  const handleType = (e) => {
    setTypeInfo(e.target.value);
    console.log(e.target.value);
    setSearchInfo("");
  }

  const addChuyenBay = () => {
    setAction("addChuyenBay");
  }

  return (
    <>
      <div className="main">
        <div className="sideBar"></div>
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
            action == "addChuyenBay" && <AddChuyenBay data={data ? data : []} setAction={setAction} action={action} />
          }
          {
            action == "editChuyenBay" && <AddChuyenBay data={data ? data : []} setAction={setAction} action={action} />
          }
        </div>
      </div>
    </>
  )

}