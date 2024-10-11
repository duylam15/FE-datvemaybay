import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StyleAddRoute.scss';
import axios from 'axios';

const AddRoute = () => {
  const [route, setRoutes] = useState({
    thoiGianChuyenBay: '',
    khoangCach: '',
    trangThai: '',
    sanBayBatDau: '',
    sanBayKetThuc: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoutes({
      ...route,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:8080/addRoute', route);
      console.log('Route saved successfully:', result);
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={(e) => handleSave(e)}>
        <div>
          <label htmlFor='thoiGianChuyenBay'>Thời gian chuyến bay:</label>
          <input
            type='text'
            id='thoiGianChuyenBay'
            name='thoiGianChuyenBay'
            value={route.thoiGianChuyenBay}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div>
          <label htmlFor='khoangCach'>Khoảng cách:</label>
          <input
            type='text'
            id='khoangCach'
            name='khoangCach'
            value={route.khoangCach}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div>
          <label htmlFor='status'>Trạng thái:</label>
          <input
            type='text'
            id='status'
            name='status'
            value={route.status}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div>
          <label htmlFor='sanBayBatDau'>Sân bay BĐ:</label>
          <input
            type='text'
            id='sanBayBatDau'
            name='sanBayBatDau'
            value={route.sanBayBatDau}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div>
          <label htmlFor='sanBayKetThuc'>Sân bay KT:</label>
          <input
            type='text'
            id='sanBayKetThuc'
            name='sanBayKetThuc'
            value={route.sanBayKetThuc}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className='button-container'>
          <button type='submit' className='btn btn-save'>
            Save
          </button>
          <Link to={`/QLTuyenBay`} className='btn btn-cancel'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddRoute;
