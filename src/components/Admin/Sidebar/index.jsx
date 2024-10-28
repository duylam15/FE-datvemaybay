import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from 'react-router-dom';
import './Sidebar.css';
import { MdSpaceDashboard } from 'react-icons/md';
import { GiSoccerField } from 'react-icons/gi';
import { FaPlane, FaPlaneDeparture } from 'react-icons/fa';
import { FaCriticalRole } from 'react-icons/fa';
import { FaSdCard, FaRegUser } from 'react-icons/fa';
import { FaRegMoneyBillAlt, FaMapMarkerAlt, FaBox } from 'react-icons/fa';
import React from 'react';
import DropdownSidebar from '../Dropdown/DropdownSidebar';

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
              className={`nav-link ${
                location.pathname === '/admin/dashboard' ? 'active' : ''
              }`}
              to='/admin/dashboard'
            >
              <div
                className={`nav-item row ${
                  location.pathname === '/admin/dashboard' ? 'active' : ''
                }`}
              >
                <MdSpaceDashboard />
                Dashboard
              </div>
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === '/admin/quyen' ? 'active' : ''
              }`}
              to='/admin/quyen'
            >
              <div
                className={`nav-item row ${
                  location.pathname === '/admin/quyen' ? 'active' : ''
                }`}
              >
                <FaCriticalRole />
                Nhóm quyền
              </div>
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === '/admin/maybay' ? 'active' : ''
              }`}
              to='/admin/maybay'
            >
              <div
                className={`nav-item row ${
                  location.pathname === '/admin/maybay' ? 'active' : ''
                }`}
              >
                <FaPlane></FaPlane>
                Máy bay
              </div>
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === '/admin/sanbay' ? 'active' : ''
              }`}
              to='/admin/sanbay'
            >
              <div
                className={`nav-item row ${
                  location.pathname === '/admin/sanbay' ? 'active' : ''
                }`}
              >
                <FaPlaneDeparture></FaPlaneDeparture>
                Sân bay
              </div>
            </Link>

            <Link
              className={`nav-link ${
                location.pathname === '/admin/pttt' ? 'active' : ''
              }`}
              to='/admin/pttt'
            >
              <div
                className={`nav-item row ${
                  location.pathname === '/admin/pttt' ? 'active' : ''
                }`}
              >
                <FaSdCard />
                Phương thức thanh toán
              </div>
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === '/admin/hoadon' ? 'active' : ''
              }`}
              to='/admin/hoadon'
            >
              <div
                className={`nav-item row ${
                  location.pathname === '/admin/hoadon' ? 'active' : ''
                }`}
              >
                <FaRegMoneyBillAlt />
                Hóa đơn
              </div>
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === '/admin/loaihoadon' ? 'active' : ''
              }`}
              to='/admin/loaihoadon'
            >
              <div
                className={`nav-item row ${
                  location.pathname === '/admin/loaihoadon' ? 'active' : ''
                }`}
              >
                <FaRegMoneyBillAlt />
                Loại hóa đơn
              </div>
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === '/admin/customers' ? 'active' : ''
              }`}
              to='/admin/customers'
            >
              <div
                className={`nav-item row ${
                  location.pathname === '/admin/customers' ? 'active' : ''
                }`}
              >
                <FaPlane></FaPlane>
                Khách hàng
              </div>
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === '/admin/merchandise' ? 'active' : ''
              }`}
              to='/admin/merchandise'
            >
              <div
                className={`nav-item row ${
                  location.pathname === '/admin/merchandise' ? 'active' : ''
                }`}
              >
                <FaBox></FaBox>
                Hàng hoá
              </div>
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === '/admin/route' ? 'active' : ''
              }`}
              to='/admin/route'
            >
              <div
                className={`nav-item row ${
                  location.pathname === '/admin/route' ? 'active' : ''
                }`}
              >
                <FaMapMarkerAlt></FaMapMarkerAlt>
                Tuyến bay
              </div>
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/admin/taikhoan" ? "active" : ""
              }`}
              to="/admin/taikhoan"
            >
              <div
                className={`nav-item row ${
                  location.pathname === "/admin/taikhoan" ? "active" : ""
                }`}
              >
                <FaRegUser/>
                 Tài khoản
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
