import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Outlet, Link, useNavigate } from "react-router-dom";
import "./layoutAdmin.css";
import Sidebar from "../../components/Admin/Sidebar";
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { callLogout } from "../../services/authServeices";
const LayoutAdmin = () => {
  // const isAdminRoute = window.location.pathname.startsWith('/admin');
  // const user = useSelector(state => state.account.user);
  // const userRole = user?.data?.quyen?.tenQuyen;
  const navigate = useNavigate()

  const handleLogout = async () => {
    const token = localStorage.getItem('access_token');
    const res = await callLogout(token);
    if (res.statusCode === 200) {
      localStorage.removeItem('access_token');
      localStorage.removeItem("dataNguoiDung")
      navigate("/");
    } else {
      console.error("Đăng xuất thất bại", res);
    }
  };
  
  return (
    <>
      <div className="container-fluidd">
        <div className="row_admin">
          {/* {isAdminRoute && userRole === 'admin' ?  : <></>} */}
          <Sidebar />
          <main className="content-admin">
            <div className="header_admin">
              <div className="container_header_admin">
                <div className="flex_header_admin">
                  <div className="button_logout" onClick={handleLogout}>
                    <Button color="danger" variant="outlined" iconPosition="start" icon={<LogoutOutlined />}>
                      Logout
                    </Button>
                  </div>
                  <Link to="/admin/my_profile">
                    <div className="block_thongtin">
                      <div class="img_icon_person">
                        <img src="/public/icons/avatar.svg" alt="" />
                      </div>
                      <div><span>Thông tin</span></div>
                    </div>
                  </Link>

                  {/* <div className="text_hover"><span>Thông tin cá nhân</span></div> */}
                </div>
              </div>
            </div>
            <div className="pt_35px">
              <Outlet></Outlet>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};


export default LayoutAdmin;
