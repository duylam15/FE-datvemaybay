import React, { useState, useEffect } from 'react';
import FormInput from '../../../components/QL/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import './StyleAddMerchandise.scss';
import axios from '../../../utils/axios-80802';
import { message } from 'antd';

const AddMerchandise = () => {
  const navigate = useNavigate();
  const [typeMerchans, setTypeMerchans] = useState([]);
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

  const loadTypeMerchandises = async () => {
    try {
      const result = await axios.get(
        'http://localhost:8080/api/loaiHangHoa/all'
      );
      if (result.status === 200) {
        setTypeMerchans(result.data.data);
      }
    } catch (error) {
      console.error('Error loading type merchandises:', error);
    }
  };

  useEffect(() => {
    loadTypeMerchandises();
  }, []);

  const validateField = (name, value) => {
    let errorMessage = '';

    // if (!value.trim()) {
    //   errorMessage = 'Trường này không thể để trống';
    // } else
    if (name === 'taiTrong' && (isNaN(value) || value < 0 || value == 0)) {
      errorMessage = 'Vui lòng nhập số dương hợp lệ';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  // Hàm kiểm tra tất cả các trường trước khi lưu
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    Object.keys(merchan).forEach((field) => {
      if (!merchan[field].trim()) {
        newErrors[field] = 'Trường này không thể để trống';
        formIsValid = false;
      } else if (
        field === 'taiTrong' &&
        (isNaN(merchan[field]) || merchan[field] < 0)
      ) {
        newErrors[field] = 'Vui lòng nhập số dương hợp lệ';
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Nếu có lỗi, ngừng việc gửi dữ liệu
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
      message.success('Thêm hàng hoá thành công');
      navigate('/admin/merchandise');
    } catch (error) {
      console.error(
        'Error saving merchandise:',
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div className='machidiseaddform'>
      <div className='container'>
        <div className='form-container'>
          <form onSubmit={handleSave}>
            <div>
              <label htmlFor='idLoaiHangHoa'>Loại hàng hóa</label>
              <select
                name='idLoaiHangHoa'
                id='idLoaiHangHoa'
                onChange={handleChange}
                value={merchan.idLoaiHangHoa}
                error={errors.idLoaiHangHoa}
                required
              >
                <option value='' hidden>
                  Chọn loại hàng hoá
                </option>
                {typeMerchans.map((item) => (
                  <option key={item.idLoaiHangHoa} value={item.idLoaiHangHoa}>
                    {item.tenLoaiHangHoa}
                  </option>
                ))}
              </select>
              {errors.idLoaiHangHoa && (
                <span className='error'>{errors.idLoaiHangHoa}</span>
              )}
            </div>

            <FormInput
              label='Tên hàng hóa'
              name='tenHangHoa'
              value={merchan.tenHangHoa}
              onChange={handleChange}
              error={errors.tenHangHoa}
              required
            />
            <FormInput
              label='Tải trọng (kg)'
              name='taiTrong'
              value={merchan.taiTrong}
              onChange={handleChange}
              error={errors.taiTrong}
              required
            />

            <div className='button-container'>
              <button type='submit' className='btn btn-save'>
                Lưu
              </button>
              <Link to='/admin/merchandise' className='btn btn-cancel'>
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMerchandise;
