import { createBrowserRouter } from 'react-router-dom';
import LayoutAdmin from '../layout/LayoutAdmin';
import LayoutDefault from '../layout/LayoutDefault';

import { ChuyenBay } from '../pages/Admin/ChuyenBay';
import { AddChuyenBay } from '../pages/Admin/ChuyenBay/AddChuyenBay';
import Error from '../pages/Error';
import Home from '../pages/Home';

import React from 'react';
import ChiTietHoaDonPage from '../pages/admin/ChiTietHoaDon';
import ChucVu from '../pages/admin/ChucVu';
import Dashboard from '../pages/admin/dashboard';
import HoaDonPage from '../pages/admin/HoaDon';
import HoaDonAdd from '../pages/admin/HoaDon/HoaDonAdd';
import KhachHangPage from '../pages/admin/KhachHang/index';
import KhachHangEdit from '../pages/admin/KhachHang/KhachHangEdit';
import ThemKhachHang from '../pages/admin/KhachHang/ThemKhachHang';
import LoaiHoaDonPage from '../pages/admin/LoaiHoaDon';
import LoaiHoaDonAdd from '../pages/admin/LoaiHoaDon/LoaiHoaDonAdd';
import LoaiHoaDonEdit from '../pages/admin/LoaiHoaDon/LoaiHoaDonEdit';
import AddForm from '../pages/Admin/ManageRoute/AddForm';
import EditForm from '../pages/Admin/ManageRoute/EditForm';
import RouteTable from '../pages/Admin/ManageRoute/RouteTable';
import MayBayPage from '../pages/admin/MayBay/index';
import MayBayEdit from '../pages/admin/MayBay/MayBayEdit';
import AddMayBayForm from '../pages/admin/MayBay/ThemMayBay';
import AddMerchandise from '../pages/admin/Merchandise/MerchandiseAddForm';
import EditMerchandise from '../pages/admin/Merchandise/MerchandiseEditForm';
import MerchandiseTable from '../pages/Admin/Merchandise/MerchandiseTable';
import NhanVien from '../pages/Admin/NhanVien';
import AddComponent from '../pages/Admin/NhanVien/AddComponent';
import PhuongThucTTPage from '../pages/admin/PhuongThucThanhToan';
import PhuongThucThanhToanAdd from '../pages/admin/PhuongThucThanhToan/PhuongThucThanhToanAdd';
import PhuongThucThanhToanEdit from '../pages/admin/PhuongThucThanhToan/PhuongThucThanhToanEdit';
import Quyen from '../pages/admin/Quyen';
import SanBayPage from '../pages/admin/SanBay';
import SanBayEdit from '../pages/admin/SanBay/SanBayEdit';
import ThemSanBay from '../pages/admin/SanBay/ThemSanBay';
import ForgotPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import Post from '../pages/Post';
import FlightResults from '../pages/Flight/FlightResult';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import UsersPage from '../pages/UserPage';
import CheckBookingPage from '../pages/UserPage/CheckBooking';
import FlightPopup from '../pages/Flight/FlightPopup';
import QuyenThem from '../pages/Admin/Quyen/QuyenThem';
import QuyenListOverall from '../pages/Admin/Quyen/QuyenListOverall';
import QuyenEdit from '../pages/Admin/Quyen/QuyenEdit';
import FlightDetails from "../pages/FlightDetails";
import TaiKhoanPage from "../pages/admin/TaiKhoan/index"
import TaiKhoanEdit from '../pages/admin/TaiKhoan/TaiKhoanEdit';
import TaiKhoanAddForm from '../pages/admin/TaiKhoan/TaiKhoanAdd';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutDefault />, // Hiển thị Layout cho các route này
    errorElement: <Error />, // Hiển thị NotFound khi có lỗi
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'post/:id?',
        element: <Post />,
      },
      {
        path: 'post/:postId?/:userId?',
        element: <Post />,
      },

      {
        path: 'flightResult',
        element: <FlightResults />,
      },

      {
        path: 'flightPopup',
        element: <FlightPopup />,
      },

      {
        path: 'flightDetails',
        element: <FlightDetails />,
      }
    ],
  },

  {
    path: '/login',
    element: <Login />, // Route login, hiển thị Login
  },
  {
    path: '/register',
    element: <Register />, // Route register, hiển thị Register
  },
  {
    path: '/quanlidatve',
    element: <CheckBookingPage />,
  },
  {
    path: '/my_profile',
    element: <UsersPage />, // Route register, hiển thị Register
    // element: <WebSocketDemo></WebSocketDemo>
  },
  {
    path: '/fogot_password',
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: '/reset_password',
    element: <ResetPassword></ResetPassword>,
  },
  {
    path: '/admin',
    element: <LayoutAdmin />, // Route layout admin
    errorElement: <Error />, // Trang lỗi khi không tìm thấy đường dẫn
    children: [
      { index: true, element: <Dashboard /> }, // Route mặc định khi vào "/admin"
      { path: 'dashboard', element: <Dashboard /> }, // Route con của admin

      // Thêm route cấp 2: "/admin/quanlinhanvien"
      {
        path: 'quanlinhanvien',
        // element: <QuanLiNhanVien />,  // Component quản lý nhân viên (cấp 2)
        children: [
          // Route cấp 3: "/admin/quanlinhanvien/nhanvien"
          {
            path: 'nhanvien',
            element: null,
            errorElement: <Error />,
            children: [
              { index: true, element: <NhanVien /> },
              {
                path: 'add',
                element: <AddComponent />,
              },
              {
                path: 'edit/:id?',
                element: <AddComponent />,
              },
            ],
          },
          // Bạn có thể thêm các route khác cùng cấp như:
          { path: 'chucvu', element: <ChucVu></ChucVu> },
        ],
      },

      {
        path: 'quyen',
        element: <Quyen />,
        children: [
          { index: true, element: <QuyenListOverall /> },
          {
            path: 'add',
            element: <QuyenThem></QuyenThem>,
          },
          {
            path: 'edit/:idQuyen',
            element: <QuyenEdit></QuyenEdit>,
          },
        ],
      },
      {
        path: 'maybay',
        element: <MayBayPage />,
        // children: [
        // 	{ path: "edit/:idMayBay", element: <MayBayEdit/> },
        // 	{ path: "add", element: <AddMayBayForm/> },
        // ]
      },
      { path: 'maybay/add', element: <AddMayBayForm /> },
      { path: 'maybay/edit/:idMayBay', element: <MayBayEdit /> },
      { path: 'sanbay', element: <SanBayPage /> },
      { path: 'sanbay/add', element: <ThemSanBay /> },
      { path: 'sanbay/edit/:idSanBay', element: <SanBayEdit /> },
      { path: 'customers', element: <KhachHangPage /> },
      { path: 'customer/edit/:idKhachHang', element: <KhachHangEdit /> },
      { path: 'customer/add', element: <ThemKhachHang /> },
      //Hang Hoa
      { path: 'merchandise', element: <MerchandiseTable /> },

      {
        path: 'merchandise/add',
        element: <AddMerchandise />,
      },
      {
        path: 'merchandise/editMerchandise/:idHangHoa',
        element: <EditMerchandise />,
      },

      //TuyenBay
      {
        path: 'route',
        element: <RouteTable />,
      },
      //Chuyen Bay
      {
        path: 'chuyenbay',
        element: null,
        errorElement: <Error />,
        children: [
          { index: true, element: <ChuyenBay /> },
          {
            path: 'add',
            element: <AddChuyenBay />,
          },
          {
            path: 'edit/:id?',
            element: <AddChuyenBay />,
          },
        ],
      },

      {
        path: 'route/add',
        element: <AddForm />,
      },

      { path: 'route/editRoute/:idTuyenBay', element: <EditForm /> },
      {
        path: 'pttt',
        element: <PhuongThucTTPage />, // Hiển thị danh sách pttt
      },
      {
        path: 'pttt/add',
        element: <PhuongThucThanhToanAdd />,
      },
      {
        path: 'pttt/edit/:idPTTT',
        element: <PhuongThucThanhToanEdit />,
      },
      {
        path: 'hoadon',
        element: <HoaDonPage />,
      },
      {
        path: 'hoadon/add',
        element: <HoaDonAdd />,
      },
      {
        path: 'hoadon/chitiet/:idHoaDon',
        element: <ChiTietHoaDonPage />,
      },
      {
        path: 'loaihoadon',
        element: <LoaiHoaDonPage />,
      },
      {
        path: 'loaihoadon/add',
        element: <LoaiHoaDonAdd />,
      },
      {
        path: 'loaihoadon/edit/:idLoaiHD',
        element: <LoaiHoaDonEdit />,
      },
      {
        path: "taikhoan",
        element: <TaiKhoanPage />
      },
      {
        path: "taikhoan/add",
        element: <TaiKhoanAddForm />
      },
      {
        path: "taikhoan/edit/:idTaiKhoan",
        element: <TaiKhoanEdit />
      },
    ],
  },
]);
