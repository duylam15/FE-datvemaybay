import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StyleTuyenBay.scss';
import { FaEdit, FaPlus, FaTrashAlt } from 'react-icons/fa';

export default function QLTuyenBay() {
  const [routes, setRoutes] = useState([]);
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    loadRoutes();
    loadAirports();
  }, []);

  const loadRoutes = async () => {
    try {
      const result = await axios.get('http://localhost:8080/getAllRoutes', {
        validateStatus: () => true,
      });
      console.log(result.data);
      if (result.status === 200) {
        setRoutes(result.data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
      setRoutes([]);
    }
  };

  const loadAirports = async () => {
    try {
      const result = await axios.get('http://localhost:8080/getAllAirport', {
        validateStatus: () => true,
      });
      if (result.status === 200) {
        setAirports(result.data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sân bay từ API:', error);
      setAirports([]);
    }
  };

  const handleDelete = async (idTuyenBay) => {
    await axios.delete(`http://localhost:8080/deleteRoute/${idTuyenBay}`);
    loadRoutes();
  };

  //  Hàm tìm tên sân bay dựa trên mã
  const getAirportName = (idSanBay) => {
    const airport = airports.find((airport) => airport.idSanBay === idSanBay);
    return airport ? airport.tenSanBay : 'Không xác định';
  };

  const formateTime = (time) => {
    const hour = Math.floor(time / 60);
    const minute = time % 60;
    return hour + 'h ' + minute + "'";
  };

  return (
    <>
      <div className='button-container'>
        <Link to={`/addRoute`} className='add-btn'>
          <FaPlus />
        </Link>
      </div>
      <section class='table-container'>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Thời gian chuyến bay</th>
              <th>Khoảng cách (km)</th>
              <th>Trạng thái</th>
              <th>Sân bay BĐ</th>
              <th>Sân bay KT</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {routes.map((route, index) => (
              <tr key={route.idTuyenBay}>
                <th scope='row'>{index + 1}</th>
                <td>{formateTime(route.thoiGianChuyenBay)}</td>
                <td>{route.khoangCach}</td>
                <td>{route.status}</td>
                <td>{route.idSanBayBatDau}</td>
                <td>{route.idSanBayKetThuc}</td>

                <td>
                  <Link
                    to={`/EditRoute/${route.idTuyenBay}`}
                    className='edit-btn'
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className='delete-btn'
                    onClick={() => handleDelete(route.idTuyenBay)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
