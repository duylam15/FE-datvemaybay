import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';

const QLHangHoa = () => {
  const [merchans, setMerchans] = useState([]);

  useEffect(() => {
    loadMerchans();
  }, []);

  const loadMerchans = async () => {
    try {
      const result = await axios.get(
        'http://localhost:8080/getAllMerchandises',
        {
          validateStatus: () => true,
        }
      );
      console.log(result.data);
      if (result.status === 200) {
        setMerchans(result.data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
      setMerchans([]);
    }
  };

  const handleDelete = async (idHangHoa) => {
    await axios.delete(`http://localhost:8080/deleteMerchandise/${idHangHoa}`);
    loadMerchans();
  };

  return (
    <>
      <div className='button-container'>
        <Link to={`/addMerchandise`} className='add-btn'>
          <FaPlus />
        </Link>
      </div>
      <section class='table-container'>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Loại hàng hoá</th>
              <th>Tên hàng hoá</th>
              <th>Trọng tải (kg)</th>
              <th>Giá phát sinh (VND)</th>
              <th>Trạng thái</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {merchans.map((merchan, index) => (
              <tr key={merchan.idHangHoa}>
                <th scope='row'>{index + 1}</th>
                <td>{merchan.idLoaiHangHoa}</td>
                <td>{merchan.tenHangHoa}</td>
                <td>{merchan.taiTrong}</td>
                <td>{merchan.giaPhatSinh}</td>
                <td>{merchan.trangThaiActive}</td>

                <td>
                  <Link
                    to={`/EditMerchan/${merchan.idHangHoa}`}
                    className='edit-btn'
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className='delete-btn'
                    onClick={() => handleDelete(merchan.idHangHoa)}
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
};

export default QLHangHoa;
