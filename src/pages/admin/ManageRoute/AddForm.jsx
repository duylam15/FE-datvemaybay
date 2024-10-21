import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StyleAddRoute.scss';

const AddRoute = () => {
  let navigate = useNavigate();

  const [route, setRoutes] = useState({
    thoiGianChuyenBay: '',
    khoangCach: '',
    status: 'ACTIVE',
    idSanBayBatDau: '',
    idSanBayKetThuc: '',
  });

  const [airports, setAirports] = useState([]); // State to store fetched airport data
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch airport data from API
    const loadAirports = async () => {
      try {
        const result = await axios.get('http://localhost:8080/getAllRoutes');
        if (result.status === 200) {
          setAirports(result.data.data);
        }
      } catch (error) {
        console.error('Error loading airports:', error);
      }
    };

    loadAirports();
  }, []);

  const {
    thoiGianChuyenBay,
    khoangCach,
    status,
    idSanBayBatDau,
    idSanBayKetThuc,
  } = route;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoutes({ ...route, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = '';
    if (!value.trim()) {
      errorMessage = 'Trường này không thể để trống';
    } else if (name === 'thoiGianChuyenBay' || name === 'khoangCach') {
      if (isNaN(value) || value < 0) {
        errorMessage = 'Vui lòng nhập số dương hợp lệ';
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formErrors = Object.values(errors).some((error) => error);
    if (formErrors) {
      return;
    }

    try {
      const result = await axios.post(
        'http://localhost:8080/addNewRoute',
        route
      );
      navigate('/RouteTable');
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };

  return (
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
            value={thoiGianChuyenBay}
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
            value={khoangCach}
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
            value={status}
            onChange={handleChange}
            required
          >
            <option value='ACTIVE'>ACTIVE</option>
            <option value='IN_ACTIVE'>INACTIVE</option>
          </select>
        </div>

        {/* Dropdown for "Sân bay BĐ" */}
        <div>
          <label htmlFor='idSanBayBatDau'>Sân bay BĐ:</label>
          <select
            id='idSanBayBatDau'
            name='idSanBayBatDau'
            value={idSanBayBatDau}
            onChange={handleChange}
            required
          >
            <option value=''>Chọn sân bay</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.idSanBayBatDau}
              </option>
            ))}
          </select>
          {errors.idSanBayBatDau && (
            <p className='error-message'>{errors.idSanBayBatDau}</p>
          )}
        </div>

        {/* Dropdown for "Sân bay KT" */}
        <div>
          <label htmlFor='idSanBayKetThuc'>Sân bay KT:</label>
          <select
            id='idSanBayKetThuc'
            name='idSanBayKetThuc'
            value={idSanBayKetThuc}
            onChange={handleChange}
            required
          >
            <option value=''>Chọn sân bay</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.idSanBayKetThuc}
              </option>
            ))}
          </select>
          {errors.idSanBayKetThuc && (
            <p className='error-message'>{errors.idSanBayKetThuc}</p>
          )}
        </div>

        <div className='button-container'>
          <button type='submit' className='btn btn-save'>
            Save
          </button>
          <Link to={`/RouteTable`} className='btn btn-cancel'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddRoute;
