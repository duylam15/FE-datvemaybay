import { default as React } from 'react';
import {
  FaBox,
  FaCriticalRole, FaGavel, FaMapMarkerAlt,
  FaPlane,
  FaPlaneDeparture,
  FaRegMoneyBillAlt,
  FaRegUser,
  FaSdCard,
  FaGavel,
} from 'react-icons/fa';

import { MdSpaceDashboard } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { MdAirplaneTicket } from 'react-icons/md';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  return (
    <>
      <nav className='col-md-3 col-lg-2 d-md-block sidebar'>
        <img
          src='https://www.bambooairways.com/o/wpbav-home-theme/css/assets/logo.png'
          alt=''
          className='logo'
        />
        <div className='position-sticky'>
          <div className='nav flex-column'>
            <Link
              className={`nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''
                }`}
              to='/admin/dashboard'
            >
              <div
                className={`nav-item row ${location.pathname === '/admin/dashboard' ? 'active' : ''
                  }`}
              >
                <MdSpaceDashboard />
                Dashboard
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname.includes('/admin/quyen') ? 'active' : ''
                }`}
              to='/admin/quyen'
            >
              <div
                className={`nav-item row ${location.pathname.includes('/admin/quyen') ? 'active' : ''
                  }`}
              >
                <FaCriticalRole />
                Nhóm quyền
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname.includes('/admin/ve') ? 'active' : ''
                }`}
              to='/admin/ve'
            >
              <div
                className={`nav-item row ${location.pathname.includes('/admin/ve') ? 'active' : ''
                  }`}
              >
                <MdAirplaneTicket></MdAirplaneTicket>
                Vé
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname === '/admin/maybay' ? 'active' : ''
                }`}
              to='/admin/maybay'
            >
              <div
                className={`nav-item row ${location.pathname === '/admin/maybay' ? 'active' : ''
                  }`}
              >
                <FaPlane></FaPlane>
                Máy bay
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname === '/admin/sanbay' ? 'active' : ''
                }`}
              to='/admin/sanbay'
            >
              <div
                className={`nav-item row ${location.pathname === '/admin/sanbay' ? 'active' : ''
                  }`}
              >
                <FaPlaneDeparture></FaPlaneDeparture>
                Sân bay
              </div>
            </Link>

            <Link
              className={`nav-link ${location.pathname === '/admin/pttt' ? 'active' : ''
                }`}
              to='/admin/pttt'
            >
              <div
                className={`nav-item row ${location.pathname === '/admin/pttt' ? 'active' : ''
                  }`}
              >
                <FaSdCard />
                Phương thức thanh toán
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname === '/admin/hoadon' ? 'active' : ''
                }`}
              to='/admin/hoadon'
            >
              <div
                className={`nav-item row ${location.pathname === '/admin/hoadon' ? 'active' : ''
                  }`}
              >
                <FaRegMoneyBillAlt />
                Hóa đơn
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname === '/admin/loaihoadon' ? 'active' : ''
                }`}
              to='/admin/loaihoadon'
            >
              <div
                className={`nav-item row ${location.pathname === '/admin/loaihoadon' ? 'active' : ''
                  }`}
              >
                <FaRegMoneyBillAlt />
                Loại hóa đơn
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname === '/admin/customers' ? 'active' : ''
                }`}
              to='/admin/customers'
            >
              <div
                className={`nav-item row ${location.pathname === '/admin/customers' ? 'active' : ''
                  }`}
              >
                <FaPlane></FaPlane>
                Khách hàng
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname === '/admin/merchandise' ? 'active' : ''
                }`}
              to='/admin/merchandise'
            >
              <div
                className={`nav-item row ${location.pathname === '/admin/merchandise' ? 'active' : ''
                  }`}
              >
                <FaBox></FaBox>
                Hàng hoá
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname === '/admin/route' ? 'active' : ''
                }`}
              to='/admin/route'
            >
              <div
                className={`nav-item row ${location.pathname === '/admin/route' ? 'active' : ''
                  }`}
              >
                <FaMapMarkerAlt></FaMapMarkerAlt>
                Tuyến bay
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname === '/admin/taikhoan' ? 'active' : ''
                }`}
              to='/admin/taikhoan'
            >
              <div
                className={`nav-item row ${location.pathname === '/admin/taikhoan' ? 'active' : ''
                  }`}
              >
                <FaRegUser />
                Tài khoản
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname === '/admin/chuyenbay' ? 'active' : ''
                }`}
              to='/admin/chuyenbay'
            >
              <div
                className={`nav-item row ${location.pathname === '/admin/chuyenbay' ? 'active' : ''
                  }`}
              >
                <FaRegUser />
                Chuyến bay
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname === '/admin/quanlinhanvien/nhanvien'
                ? 'active'
                : ''
                }`}
              to='/admin/quanlinhanvien/nhanvien'
            >
              <div
                className={`nav-item row ${location.pathname === '/admin/quanlinhanvien/nhanvien'
                  ? 'active'
                  : ''
                  }`}
              >
                <FaRegUser />
                Nhân viên
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname === '/admin/rule' ? 'active' : ''
                }`}
              to='/admin/rule'
            >
              <div
                className={`nav-item row ${location.pathname === '/admin/rule' ? 'active' : ''
                  }`}
              >
                <FaGavel />
                Quy định
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
