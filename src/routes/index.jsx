import { createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Error from '../pages/Error';
import Post from "../pages/Post";

import PhuongThucTTPage from "../pages/PhuongThucThanhToan";
import PhuongThucThanhToanAdd from "../pages/PhuongThucThanhToan/PhuongThucThanhToanAdd";
import PhuongThucThanhToanEdit from "../pages/PhuongThucThanhToan/PhuongThucThanhToanEdit";

import HoaDonPage from "../pages/HoaDon";
import HoaDonAdd from "../pages/HoaDon/HoaDonAdd";

import LoaiHoaDonPage from "../pages/LoaiHoaDon";
import LoaiHoaDonAdd from "../pages/LoaiHoaDon/LoaiHoaDonAdd";
import LoaiHoaDonEdit from "../pages/LoaiHoaDon/LoaiHoaDonEdit";

import ChiTietHoaDon from "../components/ChiTietHoaDon/ChiTietHoaDon";
import ChiTietHoaDonPage from "../pages/ChiTietHoaDon/ChiTietHoaDonPage";

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
			{
                path: "/pttt",
                element: <PhuongThucTTPage />, // Hiển thị danh sách pttt
            },
            { 
				path: "/pttt/add", 
				element: <PhuongThucThanhToanAdd /> 
			},
			{
				path: "/pttt/edit/:idPTTT",
				element: <PhuongThucThanhToanEdit />
			},
			{
				path: "/hoadon",
				element: <HoaDonPage />
			},
			{
				path: "/hoadon/add",
				element: <HoaDonAdd />
			},
			{
				path: "/loaihoadon",
				element: <LoaiHoaDonPage />
			},
			{
				path: "/loaihoadon/add",
				element: <LoaiHoaDonAdd />
			},
			{
				path: "/loaihoadon/edit/:idLoaiHD",
				element: <LoaiHoaDonEdit />
			},
			{
				path: "/hoadon/chitiet/:idHoaDon",
				element: <ChiTietHoaDonPage />
			}
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
]);