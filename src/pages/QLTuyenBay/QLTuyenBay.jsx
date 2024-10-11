import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StyleTuyenBay.scss';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function QLTuyenBay() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    loadRoutes();
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
      setRoutes([]); // Đảm bảo routes luôn là một mảng
    }
  };

  return (
    <>
      <div className='button-container'>
        <Link to={`/addRoute`} className='add-btn'>
          Thêm
        </Link>
      </div>
      <section class='table-container'>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Thời gian chuyến bay</th>
              <th>Khoảng cách</th>
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
                <td>{route.thoiGianChuyenBay}</td>
                <td>{route.khoangCach}</td>
                <td>{route.status}</td>
                <td>{route.sanBayBatDau}</td>
                <td>{route.sanBayKetThuc}</td>

                <td>
                  <Link
                    to={`/editRoute/${route.idTuyenBay}`}
                    className='edit-btn'
                  >
                    <FaEdit />
                  </Link>
                  <button className='delete-btn'>
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
