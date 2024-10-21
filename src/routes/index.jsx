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
import MerchandiseTable from '../pages/admin/Merchandise/MerchandiseTable';
import MerchandiseEditForm from '../pages/admin/Merchandise/MerchandiseEditForm';
import MerchandiseAddForm from '../pages/admin/Merchandise/MerchandiseAddForm';
import RouteTable from '../pages/admin/ManageRoute/RouteTable';
import AddForm from '../pages/admin/ManageRoute/AddForm';
import EditRoute from '../pages/admin/ManageRoute/EditForm';

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
      {
        path: '/Merchandise',
        element: <MerchandiseTable />,
      },

      {
        path: '/addMerchandise',
        element: <MerchandiseAddForm />,
      },
      {
        path: '/EditMerchandise/:idHangHoa',
        element: <MerchandiseEditForm />,
      },
      {
        path: '/RouteTable',
        element: <RouteTable />,
      },

      {
        path: '/AddForm',
        element: <AddForm />,
      },

      {
        path: '/EditRoute/:idTuyenBay',
        element: <EditRoute />,
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
