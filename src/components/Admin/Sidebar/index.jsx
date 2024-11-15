import React from 'react';
import {
  FaBox,
  FaCriticalRole,
  FaGavel,
  FaGrinStars,
  FaMapMarkerAlt,
  FaPlane,
  FaPlaneDeparture,
  FaRegMoneyBillAlt,
  FaRegUser,
  FaSdCard,
} from 'react-icons/fa';
import { MdAirplaneTicket, MdSpaceDashboard } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  // Retrieve and parse user data from local storage
  const dataNguoiDung = JSON.parse(localStorage.getItem("dataNguoiDung"));
  const chiTietQuyenDTOList = dataNguoiDung?.quyen?.chiTietQuyenDTOList || [];

  console.log("chi tiet quyen DTO LÍT: ", chiTietQuyenDTOList);

  // Map permissions into a format we can easily check
  const permissionsArray = chiTietQuyenDTOList.map(
    (permission) => `${permission.tenChucNang}:${permission.hanhDong}`
  );
  const permissionSet = new Set(permissionsArray);

  // Function to check if a specific permission exists for a feature
  const hasPermission = (featureName) => {
    return permissionSet.has(`${featureName}:VIEW`);
  };

  // Define menu items with associated paths, feature names, and icons
  const permissions = [
    { name: 'Dashboard', path: '/admin/dashboard', feature: 'Quản lí thống kê', icon: <MdSpaceDashboard /> },
    { name: 'Nhóm quyền', path: '/admin/quyen', feature: 'Quản lí nhóm quyền', icon: <FaCriticalRole /> },
    { name: 'Vé', path: '/admin/ve', feature: 'Vé', icon: <MdAirplaneTicket /> },
    { name: 'Máy bay', path: '/admin/maybay', feature: 'Quản lí máy bay', icon: <FaPlane /> },
    { name: 'Sân bay', path: '/admin/sanbay', feature: 'Quản lí sân bay', icon: <FaPlaneDeparture /> },
    { name: 'Phương thức thanh toán', path: '/admin/pttt', feature: 'Quản lí PTTT', icon: <FaSdCard /> },
    { name: 'Hóa đơn', path: '/admin/hoadon', feature: 'Quản lí hóa đơn', icon: <FaRegMoneyBillAlt /> },
    { name: 'Loại hóa đơn', path: '/admin/loaihoadon', feature: 'Quản lí loại hóa đơn', icon: <FaRegMoneyBillAlt /> },
    { name: 'Khách hàng', path: '/admin/customers', feature: 'Quản lí khách hàng', icon: <FaPlane /> },
    { name: 'Hàng hoá', path: '/admin/merchandise', feature: 'Quản lí hàng hoá', icon: <FaBox /> },
    { name: 'Tuyến bay', path: '/admin/route', feature: 'Quản lí tuyến bay', icon: <FaMapMarkerAlt /> },
    { name: 'Tài khoản', path: '/admin/taikhoan', feature: 'Quản lí tài khoản', icon: <FaRegUser /> },
    { name: 'Chuyến bay', path: '/admin/chuyenbay', feature: 'Quản lí chuyến bay', icon: <FaRegUser /> },
    { name: 'Nhân viên', path: '/admin/quanlinhanvien/nhanvien', feature: 'Quản lí nhân viên', icon: <FaRegUser /> },
    // { name: 'Quy định', path: '/admin/rule', feature: 'Quy định', icon: <FaGavel /> },
    { name: 'Chức vụ', path: '/admin/quanlinhanvien/chucvu', feature: 'Quản lí chức vụ', icon: <FaGavel /> },
    { name: 'Đánh giá', path: '/admin/danhgia', feature: 'Quản lí đánh giá', icon: <FaGrinStars /> },
  ];

  return (
    <nav className='col-md-3 col-lg-2 d-md-block sidebar'>
      <img
        src='https://www.bambooairways.com/o/wpbav-home-theme/css/assets/logo.png'
        alt=''
        className='logo'
      />
      <div className='position-sticky'>
        <div className='nav flex-column'>
          {permissions.map((permission) => {
    

            if (!hasPermission(permission.feature)) {
              return null;
            }

            const isActive = location.pathname === permission.path;

            return (
              <Link
                key={permission.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                to={permission.path}
              >
                <div className={`nav-item row ${isActive ? 'active' : ''}`}>
                  {permission.icon}
                  {permission.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;