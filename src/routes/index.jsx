import { createBrowserRouter } from 'react-router-dom';
import LayoutDefault from '../layout/LayoutDefault';
import Home from '../pages/Home';

import Error from '../pages/Error';
import Post from '../pages/Post';
import FlightResults from "../pages/Flight/FlightResults";
import FlightDetails from "../pages/Flight/FlightDetails";
import Checkout from "../pages/Flight/Checkout";
import ProtectedRoute from '../components/ProtectedRoute';
import Register from '../pages/Register';
import Login from '../pages/Login';
import UsersPage from "../pages/UserPage";
import Dashboard from "../pages/admin/dashboard";
import MayBay from "../pages/admin/MayBay";
import Quyen from "../pages/admin/Quyen";
import NhanVien from "../pages/admin/NhanVien";
import ChucVu from "../pages/admin/ChucVu";
import LayoutAdmin from '../pages/Admin/layoutAdmin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutDefault />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'post/:id?',
        element: <Post />,
      },
      {
        path: 'post/:postId?/:userId?',
        element: <Post />,
      },
      {
        path: "flightResult",
        element: <FlightResults />
      },
      {
        path: "flightDetails",
        element: <FlightDetails />
      },
      {
        path: "checkout",
        element: <Checkout />
      },
      {
        path: "/my_profile",
        element: <UsersPage />, // Route register, hiển thị Register
      },
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />, // Route register, hiển thị Register
  },

  {
    path: "/admin",
    element: <LayoutAdmin></LayoutAdmin>, // Route layout admin
    errorElement: <Error />,  // Trang lỗi khi không tìm thấy đường dẫn
    children: [
      { index: true, element: <Dashboard /> }, // Route mặc định khi vào "/admin"
      { path: "dashboard", element: <Dashboard /> }, // Route con của admin

      // Thêm route cấp 2: "/admin/quanlinhanvien"
      {
        path: "quanlinhanvien",
        // element: <QuanLiNhanVien />,  // Component quản lý nhân viên (cấp 2)
        children: [
          // Route cấp 3: "/admin/quanlinhanvien/nhanvien"
          { path: "nhanvien", element: <NhanVien></NhanVien> },
          // Bạn có thể thêm các route khác cùng cấp như:
          { path: "chucvu", element: <ChucVu></ChucVu> }
        ]
      },

      { path: "quyen", element: <Quyen /> },  // Route con khác
      { path: "maybay", element: <MayBay /> } // Route con khác
    ]
  },

]);
