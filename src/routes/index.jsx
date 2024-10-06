import { createBrowserRouter } from 'react-router-dom';
import LayoutDefault from '../layout/LayoutDefault';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Error from '../pages/Error';
import Post from '../pages/Post';
import LoginForm from '../pages/LoginForm/LoginForm';
import SignupForm from '../pages/SignupForm/SignupForm';

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
]);
