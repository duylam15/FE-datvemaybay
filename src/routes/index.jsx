import { createBrowserRouter } from "react-router-dom";
import AddComponent from "../components/NhanVien/AddComponent";
import EditComponent from "../components/NhanVien/EditComponent";
import LayoutDefault from "../layout/LayoutDefault";
import Admin from "../pages/Admin/Admin";
import Error from '../pages/Error';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NhanVien from "../pages/NhanVien";
import Post from "../pages/Post";
import Register from '../pages/Register';

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
						element : <EditComponent />
					}
				]
			},
			
		]
	}
]);