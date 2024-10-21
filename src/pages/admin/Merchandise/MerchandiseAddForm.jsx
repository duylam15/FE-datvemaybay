import React, { useState } from 'react';
import FormInput from '../../../components/QL/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import './StyleAddMerchandise.scss';
import axios from 'axios';

const AddMerchandise = () => {
  let navigate = useNavigate();
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
        merchan
      );
      console.log('Merchandise saved successfully:', result);
      navigate('/Merchandise');
    } catch (error) {
      console.error('Error saving merchandise:', error);
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
        />
        <FormInput
          label='Tên hàng hóa'
          name='tenHangHoa'
          value={merchan.tenHangHoa}
          onChange={handleChange}
          error={errors.tenHangHoa}
        />
        <FormInput
          label='Tải trọng (kg)'
          name='taiTrong'
          value={merchan.taiTrong}
          onChange={handleChange}
          error={errors.taiTrong}
        />
        <FormInput
          label='Giá phát sinh (VND)'
          name='giaPhatSinh'
          value={merchan.giaPhatSinh}
          onChange={handleChange}
          error={errors.giaPhatSinh}
        />
        <div className='button-container'>
          <button type='submit' className='btn btn-save'>
            Save
          </button>
          <Link to='/Merchandise' className='btn btn-cancel'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddMerchandise;
