import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataChucVu } from '../../../services/chucVuServices';
import { filterNhanVien } from '../../../services/nhanVienServices';
import DanhSachComponent from './DanhSachComponent';
import './NhanVien.css';
import IconLabelButtons from '../../../components/Admin/ColorButtons';
import { PermissionAddButton } from '../../../components/Admin/Sidebar';

export default function NhanVien() {
  const [searchInfo, setSearchInfo] = useState("");
  const [selectChucVu, setSelectChucVu] = useState(0);
  const [typeInfo, setTypeInfo] = useState("0");
  const [data, setData] = useState([]);
  const [dataCV, setDataChucVu] = useState([]);
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
    dataChucVu()
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        setDataChucVu(data?.filter((item) => item.trangThaiActive == "ACTIVE"));
      });
  }, [])

  useEffect(() => {
    console.log(typeInfo);
    console.log("ho ten : " + (typeInfo == "1" ? searchInfo : ""));
    filterNhanVien(typeInfo == "1" ? searchInfo : "", typeInfo == "4" ? searchInfo : "", typeInfo == "2" ? searchInfo : "", typeInfo == "3" ? searchInfo : "", selectChucVu)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        setData([]);
      })
  }, [selectChucVu, typeInfo, searchInfo])

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
          <h1>DANH SÁCH NHÂN VIÊN</h1>
          {
            (
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
                  <li>
                    <label htmlFor="">Chức vụ : </label>
                    <select name="" id="" value={selectChucVu} onChange={(e) => setSelectChucVu(e.target.value)}>
                      <option value="0">Toàn bộ chức vụ</option>
                      {dataCV.map((item) => (<option value={item.idChucVu}>{item.ten}</option>))}
                    </select>
                  </li>
                  <PermissionAddButton feature="Quản lí nhân viên">
                    <div onClick={addEmployee}><IconLabelButtons></IconLabelButtons></div>
                  </PermissionAddButton>
                </ul>
                <DanhSachComponent data={data ? data : []} setData={setData} page={page} />
              </>
            )
          }
        </div>
      </div>
    </>
  )
}
