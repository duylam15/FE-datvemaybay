import React, { useState, useEffect } from 'react';
import FormInput from '../../../components/QL/FormInput';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './StyleAddMerchandise.scss';
import axios from 'axios';

const AddMerchandise = () => {
  let navigate = useNavigate();
  const { idHangHoa } = useParams();
  const [typeMerchans, setTypeMerchans] = useState([]);
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
      navigate('/admin/merchandise');
    } catch (error) {
      console.error('Error updating merchandise:', error);
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <form onSubmit={handleSave}>
          <div>
            <label htmlFor='idSanBayBatDau'>Loại hàng hóa</label>
            <select
              name='idLoaiHangHoa'
              id='idLoaiHangHoa'
              onChange={handleChange}
              value={merchan.idLoaiHangHoa}
              error={errors.idLoaiHangHoa}
              required
            >
              <option value='0' hidden>
                Chọn loại hàng hoá
              </option>
              {typeMerchans.map((item) => (
                <option key={item.idLoaiHangHoa} value={item.idLoaiHangHoa}>
                  {item.tenLoaiHangHoa}
                </option>
              ))}
            </select>
          </div>
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
              Update
            </button>
            <Link to='/admin/merchandise' className='btn btn-cancel'>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMerchandise;
