import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { dataChuyenBay } from "../../services/chuyenBayServices";
import DanhSachCHuyenBay from "./DanhSachChuyenBay";


export const ChuyenBay =  () =>{

  const [searchInfo ,  setSearchInfo] =  useState("");
  const [typeInfo , setTypeInfo] = useState("0");
  const [data , setData] = useState([]);

  useEffect(() => {
      dataChuyenBay()
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
        })
        .catch((error) => {
          setData([]);
        })
  },[typeInfo , searchInfo])


  const handleSearch = (e) => {
    setSearchInfo(e.target.value);
    console.log(e.target.value);
  }

  const handleType = (e) => {
    setTypeInfo(e.target.value);
    console.log(e.target.value);
    setSearchInfo("");
  }

  return(
    <>
      <ul>
        <li><Link to="add-chuyenbay">Thêm</Link></li>
          <li>
            <select name="filter" id="filter" onChange={handleType}>
              <option value="0">Hiện toàn bộ</option>
              <option value="1">loc theo thoi gian</option>
            </select>
            <input disabled = {typeInfo == 0} type={typeInfo  == 2 || typeInfo == 3 || typeInfo == 5 ? "number" : "text"} placeholder="enter data"  onChange={handleSearch}/> 
            <button>Tìm kiếm</button>
          </li>
      </ul>
      {<DanhSachCHuyenBay data ={data ? data : []} setData={setData}/>}
    </>
  )

}