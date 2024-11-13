// Nhập các thành phần cần thiết từ thư viện và các dịch vụ
import { Button, Divider, Form, Input, message, notification } from 'antd'; // Các thành phần giao diện từ Ant Design
import { Link, useNavigate } from 'react-router-dom'; // Link và useNavigate từ React Router
import './Login.scss'; // Tệp CSS để định dạng giao diện
import { useEffect, useState } from 'react'; // Hook useState để quản lý trạng thái
import { callInfoUser, callLogin, callRefreshToken } from '../../services/authServeices';
import { useDispatch, useSelector } from "react-redux"
import { doLoginAction } from '../../redux/account/accountSlice';

const Login = () => {
  const navigate = useNavigate(); // Hook dùng để điều hướng người dùng
  const [isSubmit, setIsSubmit] = useState(false); // Trạng thái để theo dõi quá trình gửi biểu mẫu
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);

  // Hàm xử lý khi người dùng gửi biểu mẫu
  const onFinish = async (values) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callLogin(username, password);
    // const RefreshToken = await callRefreshToken();
    // console.log("RefreshToken", RefreshToken)
    let infoUser
    if (res.data) {
      console.log("abccasc")
      infoUser = await callInfoUser(res.data);
    }
    console.log(infoUser)
    setIsSubmit(false); // Kết thúc quá trình gửi dữ liệu
    if (res?.data) { // Kiểm tra nếu API trả về dữ liệu
      localStorage.setItem("access_token", res.data)
      dispatch(doLoginAction(infoUser.data))
      message.success('Đăng nhập tài khoản thành công!'); // Hiển thị thông báo thành công
      setTimeout(() => {
        navigate('/');
      }, 500); // Delay để Redux cập nhật
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message) ? res.message[0] : res.message, // Hiển thị thông báo lỗi
        duration: 5
      });
    }
  };

  return (
    <div className="loginForm">
      <div className="container">
        <div className='loginForm__inner'>
          <section className="wrapper">
            <div className="heading">
              <img src="public/icons/logo.svg" alt="" className="heading__img" />
              <h2 className="heading__text">Đăng Nhập Bamboo Club</h2>
            </div>
            <Form
              name="basic"
              onFinish={onFinish} // Hàm xử lý khi gửi biểu mẫu thành công
              autoComplete="off" // Tắt tự động hoàn thành trình duyệt
              className='loginForm__form'
            >
              <Form.Item
                labelCol={{ span: 24 }} // Cài đặt label chiếm toàn bộ cột
                label="Tên đăng nhập"
                name="username" // Tên trường dữ liệu
                rules={[{ required: true, message: 'Tên đăng nhập không được để trống!' }]}
                className='loginForm__label'
              >
                <Input className='loginForm__input' />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} // Cài đặt label chiếm toàn bộ cột
                label="Mật khẩu"
                name="password" // Tên trường dữ liệu
                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]} // Quy tắc xác thực
                className='loginForm__label'
              >
                <Input.Password className='loginForm__input' />
              </Form.Item>

              <Link to='/forgot_password' className='loginForm__forgot loginForm__label'> Quên mật khẩu </Link> {/* Liên kết đến trang đăng ký */}

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmit}
                  className='loginForm__btn'>
                  Đăng nhập
                </Button>
              </Form.Item>


              <p className="text text-normal">Bạn chưa là hội viên?
                <span>
                  <Link to='/register' className='loginForm__label'> Đăng ký Bamboo Club </Link> {/* Liên kết đến trang đăng ký */}
                </span>
              </p>
            </Form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Login; // Xuất thành phần LoginPage
