import { createBrowserRouter } from 'react-router-dom';
import LayoutAdmin from '../layout/LayoutAdmin';
import LayoutDefault from '../layout/LayoutDefault';

import { ChuyenBay } from '../pages/Admin/ChuyenBay';
import { AddChuyenBay } from '../pages/Admin/ChuyenBay/AddChuyenBay';
import Error from '../pages/Error';
import Home from '../pages/Home';

import React from 'react';
import ChiTietHoaDonPage from '../pages/admin/ChiTietHoaDon';
import ChucVu from '../pages/Admin/ChucVu';
import AddChucVu from '../pages/Admin/ChucVu/AddChucVu';
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
import RouteTable from '../pages/admin/ManageRoute/RouteTable';
import MayBayPage from '../pages/admin/MayBay/index';
import MayBayEdit from '../pages/admin/MayBay/MayBayEdit';
import AddMayBayForm from '../pages/admin/MayBay/ThemMayBay';
import AddMerchandise from '../pages/admin/Merchandise/MerchandiseAddForm';
import EditMerchandise from '../pages/admin/Merchandise/MerchandiseEditForm';
import MerchandiseTable from '../pages/admin/Merchandise/MerchandiseTable';
import NhanVien from '../pages/Admin/NhanVien';
import AddComponent from '../pages/Admin/NhanVien/AddComponent';
import PhuongThucTTPage from '../pages/admin/PhuongThucThanhToan';
import PhuongThucThanhToanAdd from '../pages/admin/PhuongThucThanhToan/PhuongThucThanhToanAdd';
import PhuongThucThanhToanEdit from '../pages/admin/PhuongThucThanhToan/PhuongThucThanhToanEdit';
import RuleAdd from '../pages/admin/QuyDinh/RuleAdd';
import RuleEdit from '../pages/admin/QuyDinh/RuleEdit';
import RuleTable from '../pages/admin/QuyDinh/RuleTable';
import Quyen from '../pages/admin/Quyen';
import QuyenEdit from '../pages/Admin/Quyen/QuyenEdit';
import QuyenListOverall from '../pages/Admin/Quyen/QuyenListOverall';
import QuyenThem from '../pages/Admin/Quyen/QuyenThem';
import SanBayPage from '../pages/admin/SanBay';
import SanBayEdit from '../pages/admin/SanBay/SanBayEdit';
import ThemSanBay from '../pages/admin/SanBay/ThemSanBay';
import TaiKhoanPage from '../pages/admin/TaiKhoan/index';
import TaiKhoanAdd from '../pages/admin/TaiKhoan/TaiKhoanAdd';
import TaiKhoanEdit from '../pages/admin/TaiKhoan/TaiKhoanEdit';
import VeListOverall from '../pages/Admin/Ve/VeListOverall';
import FlightPopup from '../pages/Flight/FlightPopup';
import FlightResults from '../pages/Flight/FlightResult';
import FlightDetails from '../pages/FlightDetails';
import ForgotPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import Post from '../pages/Post';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import UsersPage from '../pages/UserPage';
import CheckBookingPage from '../pages/UserPage/CheckBooking';
// import EditVe from '../pages/Admin/Ve/EditVe';
import DanhGia from '../components/DanhGia';
import { XemChuyenBay } from '../pages/Admin/ChuyenBay/XemChuyenBay';
import DanhGiaPage from '../pages/admin/DanhGia/index.jsx';
import EditVe from '../pages/Admin/Ve/EditVe';
import Ve from '../pages/Admin/Ve/index.jsx';
import InfoAccount from '../pages/UserPage/InfoAccount';
import LichSuBay from '../pages/UserPage/LichSuBay';
import ProtectedRoute from '../components/ProtectedRoute/index.jsx';
import ThongTinCaNhanAdmin from '../pages/Admin/ThongTinCaNhan/ThongTinCaNhanAdmin.jsx';
import ProtectedRouteHome from '../components/ProtectedRouteHome/index.jsx';
import ThongKe from '../pages/admin/ThongKe/index.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRouteHome><LayoutDefault /></ProtectedRouteHome>, // Hiển thị Layout cho các route này
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
      },
      {
        path: '/cmt',
        element: <DanhGia />,
      },
      {
        path: '/my_profile',
        element: <UsersPage />,
        children: [
          {
            index: true,
            element: <InfoAccount></InfoAccount>,
          },
          {
            path: 'account',
            element: <InfoAccount></InfoAccount>,
          },
          { path: 'lichsubay', element: <LichSuBay></LichSuBay> },
          { path: 'checkbooking', element: <CheckBookingPage /> },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/register',
    element: <Register />,
  },

  {
    path: '/forgot_password',
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: '/reset_password',
    element: <ResetPassword></ResetPassword>,
  },
  {
    path: '/admin',
    element: <ProtectedRoute><LayoutAdmin /></ProtectedRoute>,
    errorElement: <Error />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },

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
          {
            path: 'chucvu',
            element: null,
            errorElement: <Error />,
            children: [
              { index: true, element: <ChucVu /> },
              {
                path: 'add',
                element: <AddChucVu />,
              },
              {
                path: 'edit/:id?',
                element: <AddChucVu />,
              },
            ],
          },
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
      // maybay
      { path: 'maybay', element: <MayBayPage /> },
      { path: 'thongke', element: <ThongKe /> },
      { path: 'maybay/add', element: <AddMayBayForm /> },
      { path: 'maybay/edit/:idMayBay', element: <MayBayEdit /> },
      // sanbay
      { path: 'sanbay', element: <SanBayPage /> },
      { path: 'sanbay/add', element: <ThemSanBay /> },
      { path: 'sanbay/edit/:idSanBay', element: <SanBayEdit /> },
      // danhgia
      { path: 'danhgia', element: <DanhGiaPage /> },
      // khachhang
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
        path: 'xemchuyenbay',
        element: <XemChuyenBay />,
      },

      //TuyenBay
      {
        path: 'route',
        element: <RouteTable />,
      },

      {
        path: 'route/add',
        element: <AddForm />,
      },

      { path: 'route/editRoute/:idTuyenBay', element: <EditForm /> },
      {
        path: 'rule',
        element: <RuleTable />,
      },
      {
        path: 'rule/add',
        element: <RuleAdd />,
      },
      {
        path: 'rule/edit/:idRule',
        element: <RuleEdit />,
      },
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
        path: 'taikhoan',
        element: <TaiKhoanPage />,
      },
      {
        path: 'taikhoan/add',
        element: <TaiKhoanAdd />,
      },
      {
        path: 'taikhoan/edit/:idTaiKhoan',
        element: <TaiKhoanEdit />,
      },

      {
        path: 've',
        element: <Ve></Ve>,
        children: [
          { index: true, element: <VeListOverall /> },
          {
            path: 'edit/:idVe',
            element: <EditVe></EditVe>,
          }
        ],
      },
      {
        path: 'my_profile',
        element: <ThongTinCaNhanAdmin></ThongTinCaNhanAdmin>
      },
    ],
  },
]);
