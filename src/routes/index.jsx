
import { createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Error from '../pages/Error';
import Post from "../pages/Post";
import MayBayPage from '../pages/MayBay';
import MayBayEdit from '../pages/MayBay/MayBayEdit';
import ThemMayBay from '../pages/MayBay/ThemMayBay';
import SanBayPage from '../pages/SanBay/index'
import SanBayEdit from "../pages/SanBay/SanBayEdit";
import ThemSanBay from '../pages/SanBay/ThemSanBay';

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
                path: "/planes",
                element: <MayBayPage />, // Hiển thị danh sách khách hàng
            },
            { path: "/plane/edit/:idMayBay", element: <MayBayEdit /> },
            { path: "/plane/add", element: <ThemMayBay /> },
            {
                path: "/airports",
                element: <SanBayPage />
            },
            { path: "/airport/edit/:idSanBay", element: <SanBayEdit />},
            { path: "/airport/add", element: <ThemSanBay />}
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
