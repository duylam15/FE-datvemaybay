// App.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RouterProvider
} from "react-router-dom";
import "./assets/css/font.css";
import "./assets/css/reset.css";
import "./assets/css/styles.css";
import Loading from './components/Loading';
import { doGetAccountAction } from './redux/account/accountSlice';
import { router } from './routes';
import { callInfoUser } from './services/authServeices';

function App() {
  const dispatch = useDispatch(); // Khởi tạo hook dispatch để gửi các action đến Redux store
  const isLoading = useSelector(state => state.account.isLoading) // Lấy trạng thái loading từ Redux store


  const token = localStorage.getItem('access_token')
  useEffect(() => {
    const getAccout = async () => {
      if (window.location.pathname === "/login"
        || window.location.pathname === "/register"
      ) return
      let res
      if (token) {
        res = await callInfoUser(token)
      }
      console.log("res APP", res)
      if (res && res.data) {
        dispatch(doGetAccountAction(res.data))
      }
    }
    getAccout()
  }, [])


  return (
    <div>
      {
        isLoading === false
          || window.location.pathname === '/login'
          || window.location.pathname === '/register'
          || window.location.pathname === '/'
          || window.location.pathname === '/forgot_password'
          || window.location.pathname === '/reset_password'
          || window.location.pathname === '/cmt'
          || window.location.pathname === '/flightDetails'
          || window.location.pathname === '/flightResult'
          ?
          <RouterProvider router={router} />
          :
          <>
            <Loading />
          </>
      }
    </div>
  );
}

export default App;
