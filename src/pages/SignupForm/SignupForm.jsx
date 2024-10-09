import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StyleSignup.css';
import slogon from '../../assets/images/slogan.png';
import logo from '../../assets/images/LogoBamboo.png';

export default function SignupForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    lastName: '',
    firstName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    cccd: '',
    passport: '',
    terms: false,
    promotions: false,
  });

  const [errors, setErrors] = useState({
    lastName: '',
    firstName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    cccd: '',
    passport: '',
    terms: false,
    promotions: false,
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let isValid = true;
    for (let key in values) {
      const bool = validateField(key, values[key]);
      isValid = isValid && bool;
    }
    if (!isValid) return;

    // Nếu hợp lệ, gửi dữ liệu tới server
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), // Chuyển đổi object `values` thành chuỗi JSON
      });

      if (!response.ok) {
        throw new Error('Đã có lỗi xảy ra khi gửi thông tin.');
      }

      // Xử lý khi gửi thành công, dùng navigate để điều hướng sang trang khác
      alert('Đăng ký thành công!');
      // navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    validateField(name, value);
  };

  const validateField = (fieldName, fieldValue) => {
    const formErrors = {};
    let isValid = true;

    switch (fieldName) {
      case 'lastName': {
        const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
        if (fieldValue.trim() === '') {
          formErrors.lastName = 'Họ không được để trống';
          isValid = false;
        } else if (!nameRegex.test(fieldValue)) {
          formErrors.lastName = 'Họ chỉ được chứa chữ cái và khoảng trắng';
          isValid = false;
        } else if (fieldValue.length < 2 || fieldValue.length > 50) {
          formErrors.lastName = 'Họ phải có từ 2 đến 50 ký tự';
          isValid = false;
        } else {
          formErrors.lastName = '';
        }
        break;
      }
      case 'firstName': {
        const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
        if (fieldValue.trim() === '') {
          formErrors.firstName = 'Tên không được để trống';
          isValid = false;
        } else if (!nameRegex.test(fieldValue)) {
          formErrors.firstName = 'Tên chỉ được chứa chữ cái và khoảng trắng';
          isValid = false;
        } else if (fieldValue.length > 50) {
          formErrors.firstName = 'Tên không quá 50 ký tự';
          isValid = false;
        } else {
          formErrors.firstName = '';
        }
        break;
      }

      case 'dob': {
        if (fieldValue === '') {
          formErrors.dob = 'Ngày sinh chưa được chọn';
          isValid = false;
        } else {
          const today = new Date();
          const birthDate = new Date(fieldValue);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          if (age < 18) {
            formErrors.dob = 'Bạn chưa đủ 18 tuổi';
            isValid = false;
          } else {
            formErrors.dob = '';
          }
        }
        break;
      }
      case 'gender': {
        if (fieldValue === '') {
          formErrors.gender = 'Giới tính chưa được chọn';
          isValid = false;
        } else {
          formErrors.gender = '';
        }
        break;
      }
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (fieldValue.trim() === '') {
          formErrors.email = 'Email không được để trống';
          isValid = false;
        } else if (!emailRegex.test(fieldValue)) {
          formErrors.email = 'Email không hợp lệ';
          isValid = false;
        } else {
          formErrors.email = '';
        }
        break;
      }
      case 'phone': {
        const phoneRegex = /^[0-9]{10}$/;
        const validVietnamPrefixes = ['03', '05', '07', '08', '09'];

        if (fieldValue.trim() === '') {
          formErrors.phone = 'Số điện thoại không được để trống';
          isValid = false;
        } else if (!phoneRegex.test(fieldValue)) {
          formErrors.phone = 'Số điện thoại chỉ được chứa 10 số';
          isValid = false;
        } else if (!validVietnamPrefixes.includes(fieldValue.substring(0, 2))) {
          formErrors.phone = 'Đầu số không hợp lệ với đầu số Việt Nam';
          isValid = false;
        } else {
          formErrors.phone = '';
        }
        break;
      }

      case 'cccd': {
        const cccdRegex = /^\d{12}$|^\d{9}$/;
        if (fieldValue.trim() === '') {
          formErrors.cccd = 'CCCD không được để trống';
          isValid = false;
        } else if (!cccdRegex.test(fieldValue)) {
          formErrors.cccd = 'CCCD phải là 9 hoặc 12 chữ số';
          isValid = false;
        } else {
          formErrors.cccd = '';
        }
        break;
      }

      case 'passport': {
        const passportRegex = /^[A-Za-z0-9]{8,12}$/;
        if (fieldValue.trim() === '') {
          formErrors.passport = 'Số hộ chiếu không được để trống';
          isValid = false;
        } else if (!passportRegex.test(fieldValue)) {
          formErrors.passport =
            'Số hộ chiếu không hợp lệ (chỉ chứa chữ cái và số, từ 8 đến 12 ký tự)';
          isValid = false;
        } else {
          formErrors.passport = '';
        }
        break;
      }

      default:
        break;
    }

    setErrors((currentValues) => {
      return { ...currentValues, ...formErrors };
    });

    return isValid;
  };

  return (
    <>
      <div className='container'>
        <div className='card'>
          <div className='flex'>
            <div className='image-container register-banner p32'>
              <img
                alt='Bamboo Airways slogan'
                src={slogon}
                style={{ width: 311, height: 26 }}
              />
            </div>
            <div className='form-container p32'>
              <div className='logo-container'>
                <div className=''>
                  <h2 className='title '>
                    Bạn đã sẵn sàng tham gia Bamboo Club? Hãy bắt đầu ngay!
                  </h2>
                  <p className='description font16'>
                    Vui lòng điền đầy đủ thông tin cá nhân giống trên CMND/CCCD
                    của bạn.
                  </p>
                </div>
                <img
                  alt='Bamboo Club logo'
                  src={logo}
                  style={{ width: 84, height: 64 }}
                />
              </div>

              <div className='form-group checkbox-group'>
                <input
                  id='buy-membership'
                  name='buy-membership'
                  type='checkbox'
                />
                <label htmlFor='buy-membership'>
                  Quý khách muốn mua số hội viên đẹp?{' '}
                  <span className='green'>Mua ngay!</span>
                </label>
              </div>
              <h3 className='section-title'>Thông tin cá nhân</h3>
              <div className='sign'>
                Để tích lũy và đổi điểm, tên của bạn phải khớp với tên trên Hộ
                chiếu/ CCCD do chính phủ cấp được sử dụng khi đi du lịch.
              </div>
              <form onSubmit={handleSubmit}>
                <div className='grid'>
                  <div className='grid-item '>
                    <label htmlFor='lastName'>HỌ</label>
                    <input
                      id='lastName'
                      name='lastName'
                      placeholder='Họ, ví dụ: PHAM'
                      type='text'
                      value={values.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <span className='errorMessage'>{errors.lastName}</span>
                    )}
                  </div>

                  <div className='grid-item'>
                    <label htmlFor='firstName'>TÊN ĐỆM & TÊN</label>
                    <input
                      id='firstName'
                      name='firstName'
                      placeholder='Tên đệm & tên'
                      type='text'
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <span className='errorMessage'>{errors.firstName}</span>
                    )}
                  </div>
                  <div className='grid-item'>
                    <label htmlFor='dob'>NGÀY, THÁNG, NĂM SINH</label>
                    <input
                      id='dob'
                      name='dob'
                      type='date'
                      value={values.dob}
                      onChange={handleChange}
                    />
                    {errors.dob && (
                      <span className='errorMessage'>{errors.dob}</span>
                    )}
                  </div>
                  <div className='grid-item'>
                    <label htmlFor='gender'>GIỚI TÍNH</label>
                    <select
                      id='gender'
                      name='gender'
                      placeholder='Giới tính'
                      value={values.gender}
                      onChange={handleChange}
                    >
                      {errors.gender && (
                        <span className='errorMessage'>{errors.gender}</span>
                      )}
                      <option value='' hidden selected>
                        Giới tính
                      </option>
                      <option value='nam'>Nam</option>
                      <option value='nu'>Nữ</option>
                      <option value='khongxacdinh'>Không xác định</option>
                    </select>
                  </div>
                </div>
                <h3 className='section-title'>Thông tin liên hệ</h3>
                <div className='sign'>
                  Bằng cách chia sẻ thông tin liên lạc của bạn, bạn có thể nhận
                  được cuộc gọi hoặc tin nhắn liên quan đến chuyến bay và bất kỳ
                  cập nhật về hành lý nào cho hành trình của bạn.
                </div>
                <div className='grid'>
                  <div className='grid-item'>
                    <label htmlFor='email'>EMAIL</label>
                    <input
                      id='email'
                      name='email'
                      placeholder='Email của bạn'
                      type='email'
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <span className='errorMessage'>{errors.email}</span>
                    )}
                  </div>
                  <div className='grid-item'>
                    <label htmlFor='phone'>SỐ ĐIỆN THOẠI</label>
                    <input
                      id='phone'
                      name='phone'
                      placeholder='Việt Nam (+84) + Số điện thoại'
                      type='tel'
                      value={values.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <span className='errorMessage'>{errors.phone}</span>
                    )}
                  </div>
                  <div className='grid-item'>
                    <label htmlFor='cccd'>CCCD</label>
                    <input
                      id='cccd'
                      name='cccd'
                      placeholder='CCCD'
                      type='text'
                      value={values.cccd}
                      onChange={handleChange}
                    />
                    {errors.cccd && (
                      <span className='errorMessage'>{errors.cccd}</span>
                    )}
                  </div>
                  <div className='grid-item'>
                    <label htmlFor='passport'>SỐ HỘ CHIẾU</label>
                    <input
                      id='passport'
                      name='passport'
                      placeholder='Số hộ chiếu'
                      type='text'
                      value={values.passport}
                      onChange={handleChange}
                    />
                    {errors.passport && (
                      <span className='errorMessage'>{errors.passport}</span>
                    )}
                  </div>
                </div>
                <div className='my32'>
                  <div className='form-group checkbox-group'>
                    <input
                      id='terms'
                      name='terms'
                      type='checkbox'
                      checked={values.terms}
                      onChange={handleChange}
                    />
                    <label htmlFor='terms' className='font14'>
                      Tôi đã đọc và đồng ý với{' '}
                      <span className='underline'>
                        các điều khoản và điều kiện của Bamboo Airways và Bamboo
                        Club.
                      </span>
                    </label>
                  </div>
                  <div className='form-group checkbox-group'>
                    <input
                      id='promotions'
                      name='promotions'
                      type='checkbox'
                      checked={values.promotions}
                      onChange={handleChange}
                    />
                    <label htmlFor='promotions' className='font14'>
                      Đồng ý nhận thông tin về các chương trình khuyến mãi, sản
                      phẩm và dịch vụ từ Bamboo Airways và các đối tác.
                    </label>
                  </div>
                </div>
                <button type='submit' className='submit-button'>
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
