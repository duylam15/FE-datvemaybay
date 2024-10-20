
import { createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Error from '../pages/Error';
import Post from "../pages/Post";
import UsersPage from "../pages/UserPage";
import LayoutAdmin from "../pages/admin/layoutAdmin";
import Dashboard from "../pages/admin/dashboard";
import MayBay from "../pages/admin/MayBay";
import Quyen from "../pages/admin/Quyen";
import NhanVien from "../pages/admin/NhanVien";
import ChucVu from "../pages/admin/ChucVu";
import WebSocketDemo from "../pages/WebSocketDemo";
import ResetPassword from "../pages/ResetPassword";

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
			{ path: "maybay", element: <MayBay /> } // Route con khác
		]
	},
	
]);
