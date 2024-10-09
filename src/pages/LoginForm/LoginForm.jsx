import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Styles.module.css';
import logo from '../../assets/images/LogoBamboo.png';

export default function LoginForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });

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
      alert('Đăng nhập thành công!');
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
      case 'username': {
        if (fieldValue.trim() === '') {
          formErrors.username = 'Tên đăng nhập không để trống';
          isValid = false;
        } else {
          formErrors.username = '';
        }
        break;
      }
      case 'password': {
        if (fieldValue.trim() === '') {
          formErrors.password = 'Mật khẩu không để trống';
          isValid = false;
        } else if (fieldValue.length < 6) {
          formErrors.password = 'Mật khẩu phải dài ít nhất 6 ký tự';
          isValid = false;
        } else {
          formErrors.password = '';
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
    <div>
      <div className={styles.carousel}>
        <div className={styles.content}>
          <div className={styles.modalBody}>
            <div>
              <img src={logo} alt='logo' height={60} width={60} />
            </div>
            <h2 className={styles.titleText}>Đăng nhập Bamboo Club</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.mt32}>
                <label className={styles.lableText} htmlFor='username'>
                  Tên đăng nhập
                </label>
                <input
                  className={`${styles.inputText} ${
                    errors.username ? styles.errorInput : ''
                  }`}
                  id='username'
                  name='username'
                  value={values.username}
                  onChange={handleChange} // Validation on change
                  placeholder='Nhập tên đăng nhập'
                />
                {errors.username && (
                  <span className={styles.errorMessage}>{errors.username}</span>
                )}
              </div>

              <div className={styles.mt16}>
                <label className={styles.lableText} htmlFor='password'>
                  Mật khẩu
                </label>
                <input
                  className={`${styles.inputText} ${
                    errors.password ? styles.errorInput : ''
                  }`}
                  id='password'
                  name='password'
                  value={values.password}
                  onChange={handleChange} // Validation on change
                  placeholder='Nhập mật khẩu'
                />
                {errors.password && (
                  <span className={styles.errorMessage}>{errors.password}</span>
                )}
              </div>

              <div className={styles.mt27}>
                <div>
                  <input
                    className={styles.flexBox}
                    id='remember'
                    type='checkbox'
                  />
                  <label className={styles.flexItem} htmlFor='remember'>
                    Lưu thông tin
                  </label>
                </div>
                <a className={styles.colora} href='#'>
                  Quên Mật Khẩu?
                </a>
              </div>

              <button className={styles.btnLogin}>Đăng nhập</button>
            </form>
          </div>

          <div className={`${styles.fontfooter}`}>
            <p className={styles.m0}>
              Bạn chưa là hội viên?
              <Link className={styles.fontu} to='/SignupForm'>
                Đăng ký Bamboo Club
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
