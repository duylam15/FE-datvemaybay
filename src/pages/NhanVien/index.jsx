import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dataNhanVien, getNhanVienByCCCD, getNhanVienByEmail, getNhanVienByHoTen, getNhanVienBySDT } from '../../services/nhanVienServices';
import DanhSachComponent from './DanhSachComponent';
import './NhanVien.css';

export default function NhanVien(){
  const [searchInfo ,  setSearchInfo] =  useState("");
  const [typeInfo , setTypeInfo] = useState("0");
  const [data , setData] = useState([]);

  useEffect(() => {
    switch(typeInfo){
      case "0" :
            dataNhanVien()
                          .then((response) => {
                                                setData(response.data.data);
                                              })
                          .catch((error) => {
                                              console.log(error.response.data.message);
                                              setData([]);
                                            })
            break;
      case "1" :
          if(searchInfo == "") {return;}
            getNhanVienByHoTen(searchInfo.trim())
                          .then((response) => {
                                                setData(response.data.data);
                                              })
                          .catch((error) => {
                                              console.log(error.response.data.message);
                                              setData([]);
                                            })
            break;
            case "2" :
              if(searchInfo == "") {return;}
              getNhanVienBySDT(searchInfo.trim())
                            .then((response) => {
                                                  setData(response.data.data);
                                                })
                            .catch((error) => {
                                                console.log(error.response.data.message);
                                                setData([]);
                                              })
              break;
              case "3" :
                if(searchInfo == "") {return;}
                getNhanVienByCCCD(searchInfo.trim())
                              .then((response) => {
                                                    setData(response.data.data);
                                                  })
                              .catch((error) => {
                                                  console.log(error.response.data.message);
                                                  setData([]);
                                                })
                break;
                case "4" :
                  if(searchInfo == "") {return;}
                  getNhanVienByEmail(searchInfo.trim())
                                .then((response) => {
                                                      setData(response.data.data);
                                                    })
                                .catch((error) => {
                                                    console.log(error.response.data.message);
                                                    setData([]);
                                                  })
                  break;
      default :
            setData([]);
            break;
    }
  },[typeInfo,searchInfo]);

  const handleSearch = (e) => {
    setSearchInfo(e.target.value);
    console.log(e.target.value);
  }

  const handleType = (e) => {
    setTypeInfo(e.target.value);
    console.log(e.target.value);
    setSearchInfo("");
  }

  return (
    <>
      <ul>
        <li><Link to="add-employee">Thêm</Link></li>
          <li>
            <select name="filter" id="filter" onChange={handleType}>
              <option value="0">Hiện toàn bộ</option>
              <option value="1">loc theo ho ten</option>
              <option value="2">loc theo sdt</option>
              <option value="3">loc theo cccd</option>
              <option value="4">loc theo email</option>
            </select>
            <input disabled = {typeInfo == 0} type={typeInfo  == 2 || typeInfo == 3 || typeInfo == 5 ? "number" : "text"} placeholder="enter data"  onChange={handleSearch}/> 
            <button>Tìm kiếm</button>
          </li>
      </ul>
      {
        <DanhSachComponent data={data} setData={setData}/>
      }
    </>
  )
}
