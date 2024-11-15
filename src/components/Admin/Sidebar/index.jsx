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
import EditBtn from '../ColorButtons/EditBtn';
import XemChiTietBtn from '../ColorButtons/XemChiTietBtn';
import IconLabelButtons from '../ColorButtons';

// Function to check if a specific permission exists for a feature
const hasPermission = (featureName, action) => {
  const dataNguoiDung = JSON.parse(localStorage.getItem("dataNguoiDung"));
  const chiTietQuyenDTOList = dataNguoiDung?.quyen?.chiTietQuyenDTOList || [];
  console.log("chiTietQuyenDTOList: ", chiTietQuyenDTOList)
  const permissionsArray = chiTietQuyenDTOList.map(
    (permission) => `${permission.tenChucNang}:${permission.hanhDong}`
  );
  console.log("ARAAY: ", permissionsArray);
  const permissionSet = new Set(permissionsArray);

  return permissionSet.has(`${featureName}:${action}`);
};


const PermissionAddButton = ({ feature, children }) => {
  const isAllowed = hasPermission(feature, "CREATE");
  return isAllowed ? children : null;
};

export { PermissionAddButton }


const PermissionEditButton = ({ feature, children }) => {
  const isAllowed = hasPermission(feature, "EDIT");
  return isAllowed ? children : null;
};

export { PermissionEditButton }

// Component to display the correct button based on permissions
const PermissionButton = ({ feature, idButton, onEdit}) => {
  const hasEditPermission = hasPermission(feature, "EDIT");
  const hasViewPermission = hasPermission(feature, "VIEW");

  if (hasEditPermission) {
    return (
      <div onClick={() => onEdit(idButton)}>
        <EditBtn />
      </div>
    );
  }

  if (hasViewPermission) {
    return (
      <div onClick={() => onEdit(idButton)}>
        <XemChiTietBtn />
      </div>
    );
  }

  return null;
};

export { PermissionButton }; 


// Sidebar component
const Sidebar = () => {
  const location = useLocation();

  // Define menu items with associated paths, feature names, and icons
  const permissions = [
    { name: 'Thống kê', path: '/admin/dashboard', feature: 'Quản lí thống kê', icon: <MdSpaceDashboard /> },
    { name: 'Nhóm quyền', path: '/admin/quyen', feature: 'Quản lí nhóm quyền', icon: <FaCriticalRole /> },
    { name: 'Vé', path: '/admin/ve', feature: 'Quản lí vé', icon: <MdAirplaneTicket /> },
    { name: 'Máy bay', path: '/admin/maybay', feature: 'Quản lí máy bay', icon: <FaPlane /> },
    { name: 'Sân bay', path: '/admin/sanbay', feature: 'Quản lí sân bay', icon: <FaPlaneDeparture /> },
    { name: 'PTTT', path: '/admin/pttt', feature: 'Quản lí PTTT', icon: <FaSdCard /> },
    { name: 'Hóa đơn', path: '/admin/hoadon', feature: 'Quản lí hoá đơn', icon: <FaRegMoneyBillAlt /> },
    { name: 'Loại hóa đơn', path: '/admin/loaihoadon', feature: 'Quản lí loại hoá đơn', icon: <FaRegMoneyBillAlt /> },
    { name: 'Khách hàng', path: '/admin/customers', feature: 'Quản lí khách hàng', icon: <FaPlane /> },
    { name: 'Hàng hoá', path: '/admin/merchandise', feature: 'Quản lí hàng hoá', icon: <FaBox /> },
    { name: 'Tuyến bay', path: '/admin/route', feature: 'Quản lí tuyến bay', icon: <FaMapMarkerAlt /> },
    { name: 'Tài khoản', path: '/admin/taikhoan', feature: 'Quản lí tài khoản', icon: <FaRegUser /> },
    { name: 'Chuyến bay', path: '/admin/chuyenbay', feature: 'Quản lí chuyến bay', icon: <FaRegUser /> },
    { name: 'Nhân viên', path: '/admin/quanlinhanvien/nhanvien', feature: 'Quản lí nhân viên', icon: <FaRegUser /> },
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
            if (!hasPermission(permission.feature, 'VIEW')) {
              return null;
            }

            const isActive = location.pathname.includes(permission.path)

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