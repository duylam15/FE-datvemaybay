import { createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault";
import Admin from "../pages/Admin/Admin";
import { ChuyenBay } from "../pages/ChuyenBay";
import { AddChuyenBay } from "../pages/ChuyenBay/AddChuyenBay";
import Error from '../pages/Error';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NhanVien from "../pages/NhanVien";
import AddComponent from "../pages/NhanVien/AddComponent";
import Post from "../pages/Post";
import Register from '../pages/Register';

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LayoutDefault />, // Hiển thị Layout cho các route này
		errorElement: <Error />, // Hiển thị NotFound khi có lỗi
		children: [
			{ index: true,
				element: <Home /> },
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
		path : "/admin",
		element :null,
		errorElement: <Error />,
		children : [
			{ index: true, element: <Admin /> },
			{
				path : "nhanvien",
				element : null,
				errorElement : <Error />,
				children : [
					{ index: true, element: <NhanVien /> },
					{
						path : "add-employee",
						element : <AddComponent />
					},
					{
						path : "edit-employee",
						element : <AddComponent />
					}
				]
			},
			{
				path : "chuyenbay",
				element : null,
				errorElement : <Error />,
				children : [
					{ index: true, element: <ChuyenBay /> },
					{
						path : "add-chuyenbay",
						element : <AddChuyenBay />
					},
					{
						path : "edit-chuyenbay",
						element : <AddChuyenBay />
					}
				]
			}
			
		]
	}
]);