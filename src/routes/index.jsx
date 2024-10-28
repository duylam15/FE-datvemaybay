import { createBrowserRouter } from 'react-router-dom';
import LayoutDefault from '../layout/LayoutDefault';
import LayoutAdmin from '../layout/LayoutAdmin';

import Home from '../pages/Home';

import Error from '../pages/Error';
import Post from '../pages/Post';
import FlightResults from '../pages/Flight/FlightResults';
import FlightDetails from '../pages/Flight/FlightDetails';
import Checkout from '../pages/Flight/Checkout';
import ProtectedRoute from '../components/ProtectedRoute';
import Register from '../pages/Register';
import Login from '../pages/Login';
import UsersPage from '../pages/UserPage';
import Dashboard from '../pages/admin/dashboard';
import Quyen from '../pages/admin/Quyen';
import NhanVien from '../pages/admin/NhanVien';
import ChucVu from '../pages/admin/ChucVu';
import WebSocketDemo from '../pages/WebSocketDemo';
import ResetPassword from '../pages/ResetPassword';
import React from 'react';
import MayBayPage from '../pages/admin/MayBay/index';
import MayBayEdit from '../pages/admin/MayBay/MayBayEdit';
import AddMayBayForm from '../pages/admin/MayBay/ThemMayBay';
import MerchandiseTable from '../pages/Admin/Merchandise/MerchandiseTable';
import AddMerchandise from '../pages/admin/Merchandise/MerchandiseAddForm';
import EditMerchandise from '../pages/admin/Merchandise/MerchandiseEditForm';
import RouteTable from '../pages/Admin/ManageRoute/RouteTable';
import AddForm from '../pages/Admin/ManageRoute/AddForm';
import EditForm from '../pages/Admin/ManageRoute/EditForm';
import PhuongThucTTPage from "../pages/admin/PhuongThucThanhToan";
import PhuongThucThanhToanAdd from "../pages/admin/PhuongThucThanhToan/PhuongThucThanhToanAdd";
import PhuongThucThanhToanEdit from "../pages/admin/PhuongThucThanhToan/PhuongThucThanhToanEdit";
import HoaDonPage from "../pages/admin/HoaDon";
import HoaDonAdd from "../pages/admin/HoaDon/HoaDonAdd";
import LoaiHoaDonPage from "../pages/admin/LoaiHoaDon";
import LoaiHoaDonAdd from "../pages/admin/LoaiHoaDon/LoaiHoaDonAdd";
import LoaiHoaDonEdit from "../pages/admin/LoaiHoaDon/LoaiHoaDonEdit";
import ChiTietHoaDonPage from "../pages/admin/ChiTietHoaDon";
import KhachHangPage from "../pages/admin/KhachHang/index"
import KhachHangEdit from "../pages/admin/KhachHang/KhachHangEdit"
import ThemKhachHang from "../pages/admin/KhachHang/ThemKhachHang"
import SanBayPage from "../pages/admin/SanBay";
import SanBayEdit from "../pages/admin/SanBay/SanBayEdit";
import ThemSanBay from "../pages/admin/SanBay/ThemSanBay"
import CheckBookingPage from '../pages/UserPage/CheckBooking';

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LayoutDefault />, // Hiển thị Layout cho các route này
		errorElement: <Error />, // Hiển thị NotFound khi có lỗi
		children: [
			{ index: true, element: <Home /> },
			{
				path: "post/:id?",
				element: <Post />
			},
			{
				path: "post/:postId?/:userId?",
				element: <Post />,
			},
		],
	},

	{
		path: "/login",
		element: <Login />, // Route login, hiển thị Login
	},
	{
		path: "/register",
		element: <Register />, // Route register, hiển thị Register
	},
	{
		path: "/quanlidatve",
		element: <CheckBookingPage/>
	},
	{
		path: "/my_profile",
		element: <UsersPage />, // Route register, hiển thị Register
		// element: <WebSocketDemo></WebSocketDemo>
	},
	{
		path: "/reset_password",
		element: <ResetPassword></ResetPassword>
	},
	{
		path: "/admin",
		element: <LayoutAdmin />, // Route layout admin
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
			{ path: "maybay",
				element: <MayBayPage />
				// children: [
				// 	{ path: "edit/:idMayBay", element: <MayBayEdit/> },
            	// 	{ path: "add", element: <AddMayBayForm/> },
				// ]
			}, 
			{ path: "maybay/add", element: <AddMayBayForm/>},
			{ path: "maybay/edit/:idMayBay", element: <MayBayEdit/>},
      { path: "sanbay", element: <SanBayPage/>},
			{ path: "sanbay/add", element: <ThemSanBay/>},
			{ path: "sanbay/edit/:idSanBay", element: <SanBayEdit/>},
      { path: 'customers', element: <KhachHangPage /> },
      { path: 'customer/edit/:idKhachHang', element: <KhachHangEdit /> },
      { path: 'customer/add', element: <ThemKhachHang /> },
      //Hang Hoa
      { path: 'Merchandise', element: <MerchandiseTable /> },

      {
        path: 'addMerchandise',
        element: <AddMerchandise />,
      },
      {
        path: 'EditMerchandise/:idHangHoa',
        element: <EditMerchandise />,
      },

      //TuyenBay
      {
        path: 'RouteTable',
        element: <RouteTable />,
      },

      {
        path: 'AddForm',
        element: <AddForm />,
      },

      { path: 'EditRoute/:idTuyenBay', element: <EditForm /> },
      {
      path: "pttt",
      element: <PhuongThucTTPage />, // Hiển thị danh sách pttt
      },
      { 
        path: "pttt/add", 
        element: <PhuongThucThanhToanAdd /> 
      },
      {
        path: "pttt/edit/:idPTTT",
        element: <PhuongThucThanhToanEdit />
      },
      {
        path: "hoadon",
        element: <HoaDonPage />
      },
      {	
        path: "hoadon/add",
        element: <HoaDonAdd />
      },
      {
        path: "hoadon/chitiet/:idHoaDon",
        element: <ChiTietHoaDonPage />
      },
      {
        path: "loaihoadon",
        element: <LoaiHoaDonPage />,
      },
      {
        path: "loaihoadon/add",
        element: <LoaiHoaDonAdd />
      },
      {
        path: "loaihoadon/edit/:idLoaiHD",
        element: <LoaiHoaDonEdit />
      }
		]
	},
	
]);