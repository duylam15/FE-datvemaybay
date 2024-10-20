import React, { useState } from 'react';
import './Register.scss';
import slogon from '../../assets/images/slogan.png';
import { callRegister } from '../../services/authServeices';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [cccd, setCccd] = useState('');
  const [email, setEmail] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [ngaySinh, setNgaySinh] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');
  const [gioiTinh, setGioiTinh] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const userData = {
      userName,
      password,
      rePassword,
      cccd,
      email,
      hoTen,
      ngaySinh,
      soDienThoai,
      gioiTinh,
    };

    let isValid = true;

    // Validate từng trường
    for (let key in userData) {
      const bool = validateField(key, userData[key]);
      isValid = isValid && bool;
    }

    if (!isValid) return;

    setIsSubmit(true);

    const res = await callRegister(userData);
    console.log(userData)
    console.log(res)

    setIsSubmit(false);

    if (res.statusCode === 200) {
      notification.success({ message: 'Đăng ký tài khoản thành công!' });
      navigate('/login');
    } else {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
        duration: 5,
      });
    }
  };

  const validateField = (fieldName, fieldValue) => {
    const formErrors = {};
    let isValid = true;

    // Logic validate cho từng field
    if (!fieldValue || fieldValue.trim() === '') {
      formErrors[fieldName] = `${fieldName} không được để trống`;
      isValid = false;
    }

    if (fieldName === 'rePassword' && password !== fieldValue) {
      formErrors.rePassword = 'Mật khẩu không khớp';
      isValid = false;
    }

    setErrors((currentErrors) => {
      return { ...currentErrors, ...formErrors };
    });

    return isValid;
  };

  return (
    <div className="register">
      <div className="container">
        <div className="register__inner">
          <div className="register-header">
            <img src={slogon} alt="Slogan" className="register-slogan" />
          </div>
          <form onSubmit={handleSubmit} className="register-form">
            <input
              id="userName"
              name="userName"
              placeholder="Tên đăng nhập"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input-username"
            />
            {errors.userName && <p className="error-text">{errors.userName}</p>}

            <input
              id="password"
              name="password"
              placeholder="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-password"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}

            <input
              id="rePassword"
              name="rePassword"
              placeholder="Nhập lại mật khẩu"
              type="password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="input-repassword"
            />
            {errors.rePassword && <p className="error-text">{errors.rePassword}</p>}

            <input
              id="cccd"
              name="cccd"
              placeholder="CCCD/CMND"
              type="text"
              value={cccd}
              onChange={(e) => setCccd(e.target.value)}
              className="input-cccd"
            />
            {errors.cccd && <p className="error-text">{errors.cccd}</p>}

            <input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-email"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input
              id="hoTen"
              name="hoTen"
              placeholder="Họ và tên"
              type="text"
              value={hoTen}
              onChange={(e) => setHoTen(e.target.value)}
              className="input-hoten"
            />
            {errors.hoTen && <p className="error-text">{errors.hoTen}</p>}

            <input
              id="ngaySinh"
              name="ngaySinh"
              placeholder="Ngày sinh"
              type="date"
              value={ngaySinh}
              onChange={(e) => setNgaySinh(e.target.value)}
              className="input-ngaysinh"
            />
            {errors.ngaySinh && <p className="error-text">{errors.ngaySinh}</p>}

            <input
              id="soDienThoai"
              name="soDienThoai"
              placeholder="Số điện thoại"
              type="tel"
              value={soDienThoai}
              onChange={(e) => setSoDienThoai(e.target.value)}
              className="input-sodienthoai"
            />
            {errors.soDienThoai && <p className="error-text">{errors.soDienThoai}</p>}

            <select
              id="gioiTinh"
              name="gioiTinh"
              value={gioiTinh}
              onChange={(e) => setGioiTinh(e.target.value)}
              className="input-gioitinh"
            >
              <option value="">Chọn giới tính</option>
              <option value="NAM">Nam</option>
              <option value="NU">Nữ</option>
              <option value="FEMALE">Khác</option>
            </select>
            {errors.gioiTinh && <p className="error-text">{errors.gioiTinh}</p>}

            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmit}
            >
              {isSubmit ? 'Đang xử lý...' : 'Đăng ký'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
