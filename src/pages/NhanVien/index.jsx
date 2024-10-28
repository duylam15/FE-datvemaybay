import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataNhanVien, getNhanVienByCCCD, getNhanVienByEmail, getNhanVienByHoTen, getNhanVienBySDT } from '../../services/nhanVienServices';
import AddComponent from './AddComponent';
import DanhSachComponent from './DanhSachComponent';
import './NhanVien.css';

export default function NhanVien() {
  const [searchInfo, setSearchInfo] = useState("");
  const [typeInfo, setTypeInfo] = useState("0");
  const [data, setData] = useState([]);
  const page = "nhanvien"

  const [action, setAction] = useState("main");

  const navigator = useNavigate();
  const addEmployee = () => {
    const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
    const newPath = `${currentPath}/add`; // Thêm đoạn mới vào
    navigator(newPath, { replace: true })
    setAction("addEmployee");
  }

  useEffect(() => {
    switch (typeInfo) {
      case "0":
        dataNhanVien()
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.log(error.response.data.message);
            setData([]);
          })
        break;
      case "1":
        if (searchInfo == "") { return; }
        getNhanVienByHoTen(searchInfo.trim())
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.log(error.response.data.message);
            setData([]);
          })
        break;
      case "2":
        if (searchInfo == "") { return; }
        getNhanVienBySDT(searchInfo.trim())
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.log(error.response.data.message);
            setData([]);
          })
        break;
      case "3":
        if (searchInfo == "") { return; }
        getNhanVienByCCCD(searchInfo.trim())
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.log(error.response.data.message);
            setData([]);
          })
        break;
      case "4":
        if (searchInfo == "") { return; }
        getNhanVienByEmail(searchInfo.trim())
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            console.log(error.response.data.message);
            setData([]);
          })
        break;
      default:
        setData([]);
        break;
    }
  }, [typeInfo, searchInfo]);

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

      <div className='main'>
        <div className='containerMain'>
          {
            action == "main" && (
              <>
                <ul>
                  <li>
                    <select name="filter" id="filter" onChange={handleType}>
                      <option value="0">Hiện toàn bộ</option>
                      <option value="1">Lọc theo họ tên</option>
                      <option value="2">Lọc theo số điện thoại</option>
                      <option value="3">Lọc theo cccd</option>
                      <option value="4">Lọc theo email</option>
                    </select>
                    <input disabled={typeInfo == 0} type={typeInfo == 2 || typeInfo == 3 || typeInfo == 5 ? "number" : "text"} placeholder="enter data" onChange={handleSearch} />
                  </li>
                  <li className='btn btnThem' onClick={addEmployee}>Thêm</li>
                </ul>
                <DanhSachComponent data={data ? data : []} setData={setData} setAction={setAction} page={page} />
              </>
            )
          }
          {
            action == "addEmployee" && <AddComponent setAction={setAction} action={action} />
          }

          {
            action == "editEmployee" && <AddComponent setAction={setAction} action={action} />
          }
        </div>
      </div>
    </>
  )
}
