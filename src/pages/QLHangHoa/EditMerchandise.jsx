import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './StyleAddMerchandise.scss';
import axios from 'axios';

const AddMerchandise = () => {
  let navigate = useNavigate();
  const { idHangHoa } = useParams();

  const [merchan, setMerchan] = useState({
    idLoaiHangHoa: '',
    tenHangHoa: '',
    taiTrong: '',
    giaPhatSinh: '',
    trangThaiActive: 'ACTIVE',
  });

  const [errors, setErrors] = useState({});

  const { idLoaiHangHoa, tenHangHoa, taiTrong, giaPhatSinh, trangThaiActive } =
    merchan;

  useEffect(() => {
    if (idHangHoa) {
      loadMerchan(idHangHoa);
    }
  }, [idHangHoa]);

  const loadMerchan = async (idHangHoa) => {
    try {
      const result = await axios.get(
        `http://localhost:8080/getMerchandiseById/${idHangHoa}`
      );

      if (result.status === 200) {
        setMerchan(result.data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
      setMerchan([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMerchan({
      ...merchan,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = '';

    if (!value.trim()) {
      errorMessage = 'Trường này không thể để trống';
    } else if (
      (name === 'taiTrong' || name === 'giaPhatSinh') &&
      (isNaN(value) || value < 0)
    ) {
      errorMessage = 'Vui lòng nhập số dương hợp lệ';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      return;
    }

    try {
      const result = await axios.put(
        `http://localhost:8080/updateMerchandise/${idHangHoa}`,
        merchan
      );
      console.log('Merchandise updated successfully:', result);
      navigate('/QLHangHoa');
    } catch (error) {
      console.error('Error updating merchandise:', error);
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSave}>
        <div>
          <label htmlFor='idLoaiHangHoa'>Loại hàng hóa:</label>
          <input
            type='text'
            id='idLoaiHangHoa'
            name='idLoaiHangHoa'
            value={idLoaiHangHoa}
            onChange={handleChange}
            className={errors.idLoaiHangHoa ? 'input-error' : ''}
            required
          />
          {errors.idLoaiHangHoa && (
            <p className='error-message'>{errors.idLoaiHangHoa}</p>
          )}
        </div>

        <div>
          <label htmlFor='tenHangHoa'>Tên hàng hóa:</label>
          <input
            type='text'
            id='tenHangHoa'
            name='tenHangHoa'
            value={tenHangHoa}
            onChange={handleChange}
            className={errors.tenHangHoa ? 'input-error' : ''}
            required
          />
          {errors.tenHangHoa && (
            <p className='error-message'>{errors.tenHangHoa}</p>
          )}
        </div>

        <div>
          <label htmlFor='taiTrong'>Tải trọng (kg):</label>
          <input
            type='text'
            id='taiTrong'
            name='taiTrong'
            value={taiTrong}
            onChange={handleChange}
            className={errors.taiTrong ? 'input-error' : ''}
            required
          />
          {errors.taiTrong && (
            <p className='error-message'>{errors.taiTrong}</p>
          )}
        </div>

        <div>
          <label htmlFor='giaPhatSinh'>Giá phát sinh (VNĐ):</label>
          <input
            type='text'
            id='giaPhatSinh'
            name='giaPhatSinh'
            value={giaPhatSinh}
            onChange={handleChange}
            className={errors.giaPhatSinh ? 'input-error' : ''}
            required
          />
          {errors.giaPhatSinh && (
            <p className='error-message'>{errors.giaPhatSinh}</p>
          )}
        </div>

        <div>
          <label htmlFor='trangThaiActive'>Trạng thái:</label>
          <select
            id='trangThaiActive'
            name='trangThaiActive'
            value={trangThaiActive}
            onChange={handleChange}
            required
          >
            <option value='ACTIVE'>ACTIVE</option>
            <option value='IN_ACTIVE'>INACTIVE</option>
          </select>
        </div>

        <div className='button-container'>
          <button type='submit' className='btn btn-save'>
            Update
          </button>
          <Link to='/QLHangHoa' className='btn btn-cancel'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddMerchandise;
