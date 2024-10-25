import React, { useState, useEffect } from 'react';
import FormInput from '../../../components/QL/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import './StyleAddMerchandise.scss';
import axios from 'axios';

const AddMerchandise = () => {
  const navigate = useNavigate();
  const [merchan, setMerchan] = useState({
    idLoaiHangHoa: '',
    tenHangHoa: '',
    taiTrong: '',
    giaPhatSinh: '',
    trangThaiActive: 'ACTIVE',
  });

  const [errors, setErrors] = useState({});

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
      const result = await axios.post(
        'http://localhost:8080/addNewMerchandise',
        merchan,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Merchandise saved successfully:', result);
      navigate('/Merchandise');
    } catch (error) {
      // Log detailed error information
      console.error(
        'Error saving merchandise:',
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSave}>
        <FormInput
          label='Loại hàng hóa'
          name='idLoaiHangHoa'
          value={merchan.idLoaiHangHoa}
          onChange={handleChange}
          error={errors.idLoaiHangHoa}
          required // Make this required if necessary
        />
        <FormInput
          label='Tên hàng hóa'
          name='tenHangHoa'
          value={merchan.tenHangHoa}
          onChange={handleChange}
          error={errors.tenHangHoa}
          required // Make this required if necessary
        />
        <FormInput
          label='Tải trọng (kg)'
          name='taiTrong'
          value={merchan.taiTrong}
          onChange={handleChange}
          error={errors.taiTrong}
          required // Make this required if necessary
        />
        <FormInput
          label='Giá phát sinh (VND)'
          name='giaPhatSinh'
          value={merchan.giaPhatSinh}
          onChange={handleChange}
          error={errors.giaPhatSinh}
          required // Make this required if necessary
        />
        <div className='button-container'>
          <button type='submit' className='btn btn-save'>
            Lưu
          </button>
          <Link to='/Merchandise' className='btn btn-cancel'>
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddMerchandise;
