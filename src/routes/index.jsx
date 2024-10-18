import { createBrowserRouter } from 'react-router-dom';
import LayoutDefault from '../layout/LayoutDefault';
import LayoutAdmin from '../layout/LayoutAdmin';
import Home from '../pages/Home';

import Error from '../pages/Error';
import Post from '../pages/Post';
import FlightResults from "../pages/Flight/FlightResults";
import FlightDetails from "../pages/Flight/FlightDetails";
import Checkout from "../pages/Flight/Checkout";
import User from "../pages/Admin/User";
import Product from "../pages/Admin/Product";
import ProtectedRoute from '../components/ProtectedRoute';
import Register from '../pages/Register';
import Login from '../pages/Login';

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
        path: "flightResult",
        element: <FlightResults />
      },
      {
        path: "flightDetails",
        element: <FlightDetails />
      },
      {
        path: "checkout",
        element: <Checkout />
      },
    ],
  },
  {
    path: '/admin',
    element: <LayoutAdmin />,
    errorElement: <Error />,
    children: [
      { index: true, element: <ProtectedRoute><User /> </ProtectedRoute> },
      {
        path: 'product',
        element: <Product />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />, // Route register, hiển thị Register
  },
]);
