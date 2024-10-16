import { createBrowserRouter } from 'react-router-dom';
import LayoutDefault from '../layout/LayoutDefault';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Error from '../pages/Error';
import Post from '../pages/Post';
import LoginForm from '../pages/LoginForm/LoginForm';
import SignupForm from '../pages/SignupForm/SignupForm';
import QLTuyenBay from '../pages/QLTuyenBay/QLTuyenBay';
import AddRoute from '../pages/QLTuyenBay/AddRoute';
import EditRoute from '../pages/QLTuyenBay/EditRoute';
import QLHangHoa from '../pages/QLHangHoa/QLHangHoa';
import AddMerchandise from '../pages/QLHangHoa/AddMerchandise';
import EditMerchandise from '../pages/QLHangHoa/EditMerchandise';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutDefault />, // Hiển thị Layout cho các route này
    errorElement: <Error />, // Hiển thị NotFound khi có lỗi
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
    ],
  },

  {
    path: '/loginform',
    element: <LoginForm />, // Route login, hiển thị Login
  },
  {
    path: '/SignupForm',
    element: <SignupForm />, // Route register, hiển thị Register
  },
  {
    path: '/QLTuyenBay',
    element: <QLTuyenBay />,
  },
  {
    path: '/addRoute',
    element: <AddRoute />,
  },
  {
    path: '/EditRoute/:idTuyenBay',
    element: <EditRoute />,
  },
  {
    path: '/QLHangHoa',
    element: <QLHangHoa />,
  },
  {
    path: '/addMerchandise',
    element: <AddMerchandise />,
  },
  {
    path: '/EditMerchan/:idHangHoa',
    element: <EditMerchandise />,
  },
]);
