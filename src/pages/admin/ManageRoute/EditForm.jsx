import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import './StyleAddRoute.scss';

const AddRoute = () => {
  const navigate = useNavigate();
  const { idTuyenBay } = useParams();

  const [airports, setAirports] = useState([]);
  const [errors, setErrors] = useState({});
  const [route, setRoute] = useState({
    thoiGianChuyenBay: '',
    khoangCach: '',
    status: 'ACTIVE',
    idSanBayBatDau: 0,
    idSanBayKetThuc: 0,
  });

  const { idLoaiHangHoa, tenHangHoa, taiTrong, giaPhatSinh, trangThaiActive } =
    route;

  useEffect(() => {
    if (idTuyenBay) {
      loadRoute(idTuyenBay);
    }
  }, [idTuyenBay]);

  const loadRoute = async (idTuyenBay) => {
    try {
      const result = await axios.get(
        `http://localhost:8080/getRouteById/${idTuyenBay}`
      );
      if (result.status === 200) {
        setRoute(result.data.data);
      }
    } catch (error) {
      console.error('Error loading routes:', error);
    }
  };

  useEffect(() => {
    loadAirport();
  }, []);

  const rawData = {
    statusCode: 200,
    message: 'Get all airport success!!',
    data: [
      {
        idSanBay: 1,
        tenSanBay: 'Tân Sơn Nhất',
        iataSanBay: '132',
        icaoSanBay: '123',
        diaChi: 'HCM',
        thanhPho: {
          idThanhPho: 2,
          tenThanhPho: 'Thành phố Hồ Chí Minh',
          quocGia: {
            idQuocGia: 1,
            tenQuocGia: 'Việt Nam',
          },
        },
      },
      {
        idSanBay: 2,
        tenSanBay: 'Nội Bài',
        iataSanBay: '134',
        icaoSanBay: '124',
        diaChi: 'HN',
        thanhPho: {
          idThanhPho: 1,
          tenThanhPho: 'Hà Nội',
          quocGia: {
            idQuocGia: 1,
            tenQuocGia: 'Việt Nam',
          },
        },
      },
      // ... thêm dữ liệu sân bay khác
    ],
  };

  const loadAirport = async () => {
    try {
      const result = await axios.get(
        'http://localhost:8080/admin/sanbay/getAllAirport'
      );
      if (result.status === 200) {
        setAirports(rawData.data);
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
      const result = await axios.put(
        `http://localhost:8080/updateRoute/${idTuyenBay}`,
        route
      );
      console.error('Route updated successfully:', result);
      navigate('/admin/route');
    } catch (error) {
      console.error('Error updating route:', error);
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
