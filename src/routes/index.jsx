import { createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Error from '../pages/Error';
import Post from "../pages/Post";
import KhachHangPage from '../pages/KhachHang';
import KhachHangEdit from '../pages/KhachHang/KhachHangEdit';
import ThemKhachHang from '../pages/KhachHang/ThemKhachHang';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutDefault />,
        errorElement: <Error />,
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
                path: "/customers",
                element: <KhachHangPage />, // Hiển thị danh sách khách hàng
            },
            { path: "/customer/edit/:idKhachHang", element: <KhachHangEdit /> },
            { path: "/customer/add", element: <ThemKhachHang /> },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);
