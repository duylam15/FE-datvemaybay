import { Button, Form, Input, Select, notification } from 'antd';
import { useState } from 'react';
import { callRegister } from '../../services/authServeices';
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';
import '../Login/Login.scss'; // Tệp CSS để định dạng giao diện

const Register = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("values", values)
    setIsSubmit(true);
    const res = await callRegister(values);
    console.log("res register", res?.soDienThoai)
    console.log("res register", res?.data?.phone)
    setIsSubmit(false);

    if (res.statusCode === 200) {
      notification.success({ message: 'Đăng ký tài khoản thành công!' });
      navigate('/login');
    } else {
      notification.error({
        message: res?.userName || res?.data?.username || res?.data?.phone || res?.data?.email || res?.password || res?.rePassword || res?.soDienThoai || res?.hoTen || res?.soDienThoai || res?.cccd,
        description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
        duration: 5,
      });
    }
  };

  return (
    <div className="registerForm">
      <div className="container">
        <div className='registerForm__inner'>
          <section className="wrapper">
            <div className="heading">
              <img src="public/icons/logo.svg" alt="" className="heading__img" />
              <h2 className="heading__text">Đăng Ký Bamboo Club</h2>
            </div>
            <Form
              name="register"
              onFinish={onFinish}
              autoComplete="off"
              className='registerForm__form'
            >
              <div className='wrap'>

                <div className='wrap__item'>
                  <Form.Item
                    className='registerForm__label'
                    labelCol={{ span: 24 }}
                    label="Tên đăng nhập"
                    name="userName"
                    rules={[{ required: true, message: 'Tên đăng nhập không được để trống!' }]}
                  >
                    <Input className='registerForm__input' />
                  </Form.Item>

                  <Form.Item
                    className='registerForm__label'
                    labelCol={{ span: 24 }}

                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                  >
                    <Input.Password className='registerForm__input' />
                  </Form.Item>

                  <Form.Item
                    className='registerForm__label'
                    labelCol={{ span: 24 }}

                    label="Nhập lại mật khẩu"
                    name="rePassword"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Mật khẩu không khớp!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password className='registerForm__input' />
                  </Form.Item>

                  <Form.Item
                    className='registerForm__label'
                    labelCol={{ span: 24 }}

                    label="Họ và tên"
                    name="hoTen"
                    rules={[{ required: true, message: 'Họ và tên không được để trống!' }]}
                  >
                    <Input className='registerForm__input' />
                  </Form.Item>
                </div>

                <div className='wrap__item'>
                  <Form.Item
                    className='registerForm__label'
                    labelCol={{ span: 24 }}

                    label="CCCD/CMND"
                    name="cccd"
                    rules={[{ required: true, message: 'CCCD /CMND không được để trống!' }]}
                  >
                    <Input className='registerForm__input' />
                  </Form.Item>

                  <Form.Item
                    className='registerForm__label'
                    labelCol={{ span: 24 }}

                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Email không hợp lệ!' }]}
                  >
                    <Input className='registerForm__input' />
                  </Form.Item>


                  <Form.Item
                    className='registerForm__label'
                    labelCol={{ span: 24 }}
                    label="Số điện thoại"
                    name="soDienThoai"
                    rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                  >
                    <Input className='registerForm__input' />
                  </Form.Item>

                  <div className='wrap'>
                    <Form.Item
                      className='registerForm__label'
                      labelCol={{ span: 24 }}

                      label="Ngày sinh"
                      name="ngaySinh"
                      rules={[{ required: true, message: 'Ngày sinh không được để trống!' }]}
                    >
                      <Input className='registerForm__input' type="date" />
                    </Form.Item>


                    <Form.Item
                      className='registerForm__label'
                      labelCol={{ span: 24 }}
                      label="Giới tính"
                      name="gioiTinh"
                      rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                    >
                      <Select placeholder="Chọn giới tính"
                        className='registerForm__select'>
                        <Select.Option value="NAM">Nam</Select.Option>
                        <Select.Option value="NU">Nữ</Select.Option>
                        {/* <Select.Option value="KHAC">Khác</Select.Option> */}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </div>

              <Form.Item
                className='registerForm__label'>
                <Button type="primary" htmlType="submit" loading={isSubmit} className='registerForm__btn'>
                  Đăng ký
                </Button>
              </Form.Item>

              <p className="text text-normal">Đã có tài khoản?
                <span>
                  <Link to='/login' className='registerForm__label'> Đăng nhập ngay </Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Register;
