import React, { useState, useEffect } from 'react';
import FormInput from '../../../components/QL/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import './StyleAddRule.scss';
import axios from 'axios';

const RuleAdd = () => {
  const navigate = useNavigate();
  const [typeRules, setTypeRules] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [rule, setRule] = useState({
    idLoaiQuyDinh: '', // Assuming this is the ID for the type of rule
    tenQuyDinh: '',
    noiDung: '',
    nhanVien: '', // Adjusted to match the name
    trangThaiActive: 'ACTIVE',
    thoiGianCapNhat: '',
    thoiGianTao: new Date().toISOString().split('T')[0], // Set creation date to today
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRule({
      ...rule,
      [name]: value,
    });
    validateField(name, value);
  };

  const loadTypeRules = async () => {
    try {
      const result = await axios.get(
        'http://localhost:8080/admin/loaiquydinh/getallloaiquydinh'
      );
      if (result.status === 200) {
        setTypeRules(result.data.data);
      }
    } catch (error) {
      console.error('Error loading rule types:', error);
    }
  };

  const loadEmployees = async () => {
    try {
      const result = await axios.get(
        'http://localhost:8080/admin/nhanvien/getallnhanvien' // Adjust this endpoint as necessary
      );
      if (result.status === 200) {
        setEmployees(result.data.data);
      }
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  useEffect(() => {
    loadTypeRules();
    loadEmployees();
  }, []);

  const validateField = (name, value) => {
    let errorMessage = '';

    if (!value.trim()) {
      errorMessage = 'Trường này không thể để trống';
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
        'http://localhost:8080/admin/quydinh/addquydinh',
        rule,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Rule saved successfully:', result);
      navigate('/admin/rule');
    } catch (error) {
      console.error(
        'Error saving rule:',
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
              <label htmlFor='idLoaiQuyDinh'>Loại quy định</label>
              <select
                name='idLoaiQuyDinh'
                id='idLoaiQuyDinh'
                onChange={handleChange}
                value={rule.idLoaiQuyDinh}
                required
              >
                <option value='' hidden>
                  Chọn loại quy định
                </option>
                {typeRules.map((item) => (
                  <option key={item.idLoaiQuyDinh} value={item.idLoaiQuyDinh}>
                    {item.tenLoaiQuyDinh}
                  </option>
                ))}
              </select>
            </div>

            <FormInput
              label='Tên quy định'
              name='tenQuyDinh'
              value={rule.tenQuyDinh}
              onChange={handleChange}
              error={errors.tenQuyDinh}
              required
            />
            <FormInput
              label='Nội dung'
              name='noiDung'
              value={rule.noiDung}
              onChange={handleChange}
              error={errors.noiDung}
              required
            />
            <div>
              <label htmlFor='nhanVien'>Nhân viên</label>
              <select
                name='nhanVien'
                id='nhanVien'
                onChange={handleChange}
                value={rule.nhanVien} // Ensure this is set correctly
                required
              >
                <option value='' hidden>
                  Chọn nhân viên
                </option>
                {employees.map((item) => (
                  <option key={item.idNhanVien} value={item.idNhanVien}>
                    {item.hoTen}
                  </option>
                ))}
              </select>
            </div>

            <div className='button-container'>
              <button type='submit' className='btn btn-save'>
                Lưu
              </button>
              <Link to='/admin/rule' className='btn btn-cancel'>
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RuleAdd;
