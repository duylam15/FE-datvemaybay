import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DanhGia.css'
import { FaGrinStars, FaStar, FaStarAndCrescent, FaStarOfDavid, FaStarOfLife } from 'react-icons/fa';

const API_URL = 'http://localhost:8080';
const DanhGiaList = ({ danhGia, handleSearchByTenKhachHang, handleSearchByHangBay, handleSearchByStartTimeAndEndTime,
     handleBlock, searchTerm, setSearchTerm , startTime, setStartTime, endTime, setEndTime}) => {
    const [hangBay, setHangBay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log("DanhGia: ", danhGia);
    const getHangBay = async () => {
        const response = await fetch(`${API_URL}/admin/hangbay/getAllAirline`); // Thay đổi endpoint theo API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch airline');
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        return data.data; // Trả về phần data bên trong JSON
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHangBay();
                setHangBay(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getSao = (sao) => {
        switch(sao) {
            case 'ONE':
                return <><FaStar/></>;
            case 'TWO':
                return <><FaStar/><FaStar/></>;
            case 'THREE':
                return <><FaStar/><FaStar/><FaStar/></>;
            case 'FOUR':
                return <><FaStar/><FaStar/><FaStar/><FaStar/></>;
            case 'FIVE':
                return <><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></>;
            default:
                return null;
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            <div className="menu-search">
                <input
                    className='input-search'
                    type="text"
                    placeholder="Tìm kiếm đánh giá..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearchByTenKhachHang}>Tìm Kiếm</button>
                <select onChange={(e) => handleSearchByHangBay(e.target.value)} className='form-search'>
                    <option value="Lọc theo hãng bay">Lọc theo hãng bay</option>
                    {hangBay.map((hb) => (
                        <option value={hb.idHangBay} key={hb.idHangBay}>
                            {hb.idHangBay} - {hb.tenHangBay}
                        </option>
                    ))}
                </select>
                <div className='search-by-create-time'>
                    <div className='form-time'>
                        <label htmlFor="startTime">Thời gian bắt đầu</label>
                        <input
                            type="date"
                            id="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>

                    <div className='form-time'>
                        <label htmlFor="endTime">Thời gian kết thúc</label>
                        <input
                            type="date"
                            id="endTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>

                    <button
                        className='btn-create-time'
                        onClick={() => handleSearchByStartTimeAndEndTime(startTime, endTime)}
                    >
                        Tìm kiếm
                    </button>
                </div>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th >
                            ID 
                        </th>
                        <th >
                            Sao 
                        </th>
                        <th >
                            Nội Dung 
                        </th>
                        <th >
                            Hãng Bay 
                        </th>
                        <th >
                            Khách Hàng 
                        </th>
                        <th >
                            Thời gian tạo 
                        </th>
                        <th>Trạng Thái</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {danhGia.length > 0 ? (
                        danhGia.map(mb => (
                            <tr key={mb.idDanhGia}>
                                <td>{mb.idDanhGia}</td>
                                <td>{mb.sao === null ? 'NULL' : getSao(mb.sao)}</td>
                                <td>{mb.noiDung}</td>
                                <td>{mb.hangBay.tenHangBay}</td>
                                <td>{mb.khachHang.hoTen}</td>
                                <td>{mb.thoiGianTao}</td>
                                <td>{mb.trangThaiActive === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}</td>
                                <td>
                                    <div className="button-group">
                                        <button 
                                            className={`btn btn-block`}
                                            onClick={() => handleBlock(mb.idDanhGia)}
                                        >
                                            {mb.trangThaiActive === 'ACTIVE' ? 'Block' : 'Unblock'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">Không tìm thấy kết quả tìm kiếm!</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DanhGiaList;
