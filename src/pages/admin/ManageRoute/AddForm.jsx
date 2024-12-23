import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios-80802';
import { message } from 'antd';

import './StyleAddRoute.scss';

const AddRoute = () => {
  const navigate = useNavigate();
  const [airports, setAirports] = useState([]);
  const [errors, setErrors] = useState({});
  const [route, setRoute] = useState({
    thoiGianChuyenBay: '',
    khoangCach: '',
    status: 'ACTIVE',
    idSanBayBatDau: 0,
    idSanBayKetThuc: 0,
  });

  useEffect(() => {
    loadAirport();
  }, []);

  const loadAirport = async () => {
    try {
      const result = await axios.get(
        'http://localhost:8080/admin/sanbay/getAllAirport'
      );
      if (result.status === 200) {
        setAirports(result.data.data);
      }
    } catch (error) {
      console.error('Error loading airports:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoute({ ...route, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = '';
    if (!value.trim()) {
      errorMessage = 'Trường này không thể để trống';
    } else if (
      name === 'thoiGianChuyenBay' &&
      (!Number.isInteger(+value) || +value <= 0)
    ) {
      errorMessage = 'Vui lòng nhập số nguyên dương hợp lệ';
    } else if (name === 'khoangCach' && (isNaN(value) || value < 0)) {
      errorMessage = 'Vui lòng nhập số dương hợp lệ';
    }

    if (
      name === 'idSanBayKetThuc' &&
      value === route.idSanBayBatDau.toString()
    ) {
      errorMessage = 'Sân bay kết thúc không thể giống sân bay bắt đầu';
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formErrors = Object.values(errors).some((error) => error);
    if (
      formErrors ||
      route.idSanBayBatDau === 0 ||
      route.idSanBayKetThuc === 0
    ) {
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/addNewRoute',
        {
          thoiGianChuyenBay: route.thoiGianChuyenBay,
          khoangCach: route.khoangCach,
          status: route.status,
          idSanBayBatDau: route.idSanBayBatDau,
          idSanBayKetThuc: route.idSanBayKetThuc,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (response.statusCode == 400) {
        if (response.message === 'Route already exists.') {
          message.error('Tuyến bay đã tồn tại');
        } else {
          message.error(response.message);
        }
      } else {
        message.success('Thêm tuyến bay mới thành công');
        navigate('/admin/route');
      }
    } catch (error) {
      if (response.statusCode == 400) {
        if (response.message === 'Route already exists.') {
          message.error('Tuyến bay đã tồn tại');
        } else {
          message.error(response.message);
        } // Hiển thị thông báo từ backend
      } else {
        console.error('Lỗi khi gửi dữ liệu đến API:', error);
        message.error('Đã xảy ra lỗi khi thêm tuyến bay.');
      }
    }
  };

  return (
    <div className='addform-manageroute'>
      <div className='container'>
        <div className='form-container'>
          <form onSubmit={handleSave}>
            <div>
              <label htmlFor='thoiGianChuyenBay'>
                Thời gian chuyến bay (phút):
              </label>
              <input
                type='text'
                id='thoiGianChuyenBay'
                name='thoiGianChuyenBay'
                value={route.thoiGianChuyenBay}
                onChange={handleChange}
                className={errors.thoiGianChuyenBay ? 'input-error' : ''}
                required
              />
              {errors.thoiGianChuyenBay && (
                <p className='error-message'>{errors.thoiGianChuyenBay}</p>
              )}
            </div>
            <div>
              <label htmlFor='khoangCach'>Khoảng cách (km):</label>
              <input
                type='text'
                id='khoangCach'
                name='khoangCach'
                value={route.khoangCach}
                onChange={handleChange}
                className={errors.khoangCach ? 'input-error' : ''}
                required
              />
              {errors.khoangCach && (
                <p className='error-message'>{errors.khoangCach}</p>
              )}
            </div>
            <div>
              <label htmlFor='status'>Trạng thái:</label>
              <select
                id='status'
                name='status'
                value={route.status}
                onChange={handleChange}
                required
              >
                <option value='ACTIVE'>ACTIVE</option>
                <option value='IN_ACTIVE'>INACTIVE</option>
              </select>
            </div>

            <div>
              <label htmlFor='idSanBayBatDau'>Sân bay BĐ:</label>
              <select
                name='idSanBayBatDau'
                id='idSanBayBatDau'
                onChange={handleChange}
                value={route.idSanBayBatDau}
              >
                <option value='0' hidden>
                  Chọn Sân Bay
                </option>
                {airports.map((item) => (
                  <option key={item.idSanBay} value={item.idSanBay}>
                    {item.tenSanBay}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor='idSanBayKetThuc'>Sân bay KT:</label>
              <select
                name='idSanBayKetThuc'
                id='idSanBayKetThuc'
                onChange={handleChange}
                value={route.idSanBayKetThuc}
                disabled={route.idSanBayBatDau === 0}
              >
                <option value='0' hidden>
                  Chọn Sân Bay
                </option>
                {airports
                  .filter((item) => item.idSanBay !== route.idSanBayBatDau)
                  .map((item) => (
                    <option key={item.idSanBay} value={item.idSanBay}>
                      {item.tenSanBay}
                    </option>
                  ))}
              </select>
              {errors.idSanBayKetThuc && (
                <p className='error-message'>{errors.idSanBayKetThuc}</p>
              )}
            </div>

            <div className='button-container'>
              <button type='submit' className='btn btn-save'>
                Lưu
              </button>
              <Link to='/admin/route' className='btn btn-cancel'>
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoute;
