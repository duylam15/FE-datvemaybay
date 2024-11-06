import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { dataChucVu, filterChucVuService } from "../../../services/chucVuServices";
import DanhSachChucVu from "./DanhSachChucVu";
import "./chucvu.css";
const ChucVu = () => {

    const [searchInfor, setSearchInfor] = useState("");
    const [searchTrangthai, setSearchTrangThai] = useState("");
    const page = "chucvu";
    const navigator = useNavigate()
    const addChucVu = () => {
        const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
        const newPath = `${currentPath}/add`; // Thêm đoạn mới vào
        navigator(newPath, { replace: true })
    }

    const [data, setData] = useState([]);

    const [one, setone] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await dataChucVu()
            console.log(response.data.data);
            setData(response.data.data);
            setone(!one);
        }
        fetchData();
    }, [])

    const handleSearchInfor = (e) => {
        setSearchInfor(e.target.value);
    }

    const handleSearchTrangThai = (e) => {
        setSearchTrangThai(e.target.value);
    }

    useEffect(() => {
        console.log(searchInfor);
        const fetchData = async () => {
            const response = await filterChucVuService(searchInfor, searchTrangthai)
            console.log(response.data.data);
            setData(response.data.data);
        }
        fetchData();
    }, [searchInfor, searchTrangthai])

    return (
        <>
            <div className='container__mainChucVu'>
                <div className="filter">
                    <div className="filterTen">
                        <label htmlFor="">Tìm kiếm theo tên</label>
                        <input type="text" placeholder='Nhập tên chức vụ ' onChange={handleSearchInfor} value={searchInfor} />
                    </div>
                    <div className="filterTrangThai">
                        <label htmlFor="">Trạng thái</label>
                        <select name="" id="" onChange={handleSearchTrangThai} value={searchTrangthai}>
                            <option value="">Toàn bộ trạng thái</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="IN_ACTIVE">IN_ACTIVE</option>
                        </select>
                    </div>
                </div>
                <button className='btn btnThem' onClick={addChucVu}>Add</button>
            </div>
            {<DanhSachChucVu data={data ? data : []} setData={setData} page={page} />}
        </>
    );
};

export default ChucVu;