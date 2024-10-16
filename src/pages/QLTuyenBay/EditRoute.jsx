import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './StyleAddRoute.scss';

const EditRoute = () => {
  let navigate = useNavigate();

  const { idTuyenBay } = useParams();

  const [route, setRoutes] = useState({
    thoiGianChuyenBay: '',
    khoangCach: '',
    status: 'ACTIVE',
    idSanBayBatDau: '',
    idSanBayKetThuc: '',
  });

  const [errors, setErrors] = useState({});

  const {
    thoiGianChuyenBay,
    khoangCach,
    status,
    idSanBayBatDau,
    idSanBayKetThuc,
  } = route;

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
        setRoutes(result.data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
      setRoutes([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRoutes({
      ...route,
      [name]: value,
    });

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
    } else if (
      (name === 'idSanBayBatDau' || name === 'idSanBayKetThuc') &&
      value === ''
    ) {
      errorMessage = 'Vui lòng chọn sân bay';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Check validation
    const formErrors = Object.values(errors).some((error) => error);
    if (formErrors) {
      return;
    }

    console.log('route:', route);

    try {
      const result = await axios.put(
        `http://localhost:8080/updateRoute/${route.idTuyenBay}`,
        route
      );
      console.log('Route saved successfully:', result);
      navigate('/QLTuyenBay');
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleUpdate}>
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

        <div>
          <label htmlFor='idSanBayBatDau'>Sân bay BĐ:</label>
          <input
            type='text'
            id='idSanBayBatDau'
            name='idSanBayBatDau'
            value={idSanBayBatDau}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor='idSanBayKetThuc'>Sân bay KT:</label>
          <input
            type='text'
            id='idSanBayKetThuc'
            name='idSanBayKetThuc'
            value={idSanBayKetThuc}
            onChange={handleChange}
            required
          />
        </div>

        <div className='button-container'>
          <button type='submit' className='btn btn-save'>
            Update
          </button>
          <Link to={`/QLTuyenBay`} className='btn btn-cancel'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditRoute;
