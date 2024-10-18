// Nhập các thành phần cần thiết từ thư viện và các dịch vụ
import { Button, Divider, Form, Input, message, notification } from 'antd'; // Các thành phần giao diện từ Ant Design
import { Link, useNavigate } from 'react-router-dom'; // Link và useNavigate từ React Router
import './Login.scss'; // Tệp CSS để định dạng giao diện
import { useState } from 'react'; // Hook useState để quản lý trạng thái
import { callInfoUser, callLogin, callRefreshToken } from '../../services/authServeices';
import { useDispatch } from "react-redux"
import { doLoginAction } from '../../redux/account/accountSlice';

const Login = () => {
  const navigate = useNavigate(); // Hook dùng để điều hướng người dùng
  const [isSubmit, setIsSubmit] = useState(false); // Trạng thái để theo dõi quá trình gửi biểu mẫu


  const dispatch = useDispatch()

  // Hàm xử lý khi người dùng gửi biểu mẫu
  const onFinish = async (values) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callLogin(username, password);
    // const RefreshToken = await callRefreshToken();
    // console.log("RefreshToken", RefreshToken)
    const infoUser = await callInfoUser(res.data);
    console.log(infoUser)
    setIsSubmit(false); // Kết thúc quá trình gửi dữ liệu
    if (res?.data) { // Kiểm tra nếu API trả về dữ liệu
      localStorage.setItem("access_token", res.data)
      dispatch(doLoginAction(infoUser))
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
    <div className="login-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng Nhập</h2>
              <Divider /> {/* Tạo đường phân cách */}
            </div>
            <Form
              name="basic"
              onFinish={onFinish} // Hàm xử lý khi gửi biểu mẫu thành công
              autoComplete="off" // Tắt tự động hoàn thành trình duyệt
            >
              <Form.Item
                labelCol={{ span: 24 }} // Cài đặt label chiếm toàn bộ cột
                label="Email"
                name="username" // Tên trường dữ liệu
                rules={[{ required: true, message: 'Email không được để trống!' }]} // Quy tắc xác thực
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} // Cài đặt label chiếm toàn bộ cột
                label="Mật khẩu"
                name="password" // Tên trường dữ liệu
                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]} // Quy tắc xác thực
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng nhập
                </Button>
              </Form.Item>
              <Divider>Or</Divider> {/* Đường phân cách */}
              <p className="text text-normal">Chưa có tài khoản ?
                <span>
                  <Link to='/register' > Đăng Ký </Link> {/* Liên kết đến trang đăng ký */}
                </span>
              </p>
              <br />
              <p className="text" style={{ color: "#9d9d9d" }}>
                p/s: Để test, sử dụng tài khoản guest@gmail.com/123456 {/* Thông tin tài khoản thử nghiệm */}
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Login; // Xuất thành phần LoginPage
