import { createBrowserRouter } from 'react-router-dom';
import LayoutDefault from '../layout/LayoutDefault';
import Home from '../pages/Home';

import Error from '../pages/Error';
import Post from '../pages/Post';
import LoginForm from '../pages/LoginForm/LoginForm';
import SignupForm from '../pages/SignupForm/SignupForm';
import FlightResults from '../pages/Flight/FlightResults';
import FlightDetails from '../pages/Flight/FlightDetails';
import Checkout from '../pages/Flight/Checkout';

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
        path: 'flightResult',
        element: <FlightResults />,
      },
      {
        path: 'flightDetails',
        element: <FlightDetails />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginForm />, // Route login, hiển thị Login
  },
  {
    path: '/register',
    element: <SignupForm />, // Route register, hiển thị Register
  },
  // {
  //   path: '/QLTuyenBay',
  //   element: <QLTuyenBay />,
  // },
  // {
  //   path: '/addRoute',
  //   element: <AddRoute />,
  // },
  // {
  //   path: '/EditRoute/:idTuyenBay',
  //   element: <EditRoute />,
  // },
  // {
  //   path: '/QLHangHoa',
  //   element: <QLHangHoa />,
  // },
  // {
  //   path: '/addMerchandise',
  //   element: <AddMerchandise />,
  // },
  // {
  //   path: '/EditMerchan/:idHangHoa',
  //   element: <EditMerchandise />,
  // },
]);
