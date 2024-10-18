// App.jsx
import React, { useEffect, useState } from 'react';
import { router } from './routes';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./assets/css/reset.css"
import "./assets/css/font.css"
import "./assets/css/styles.css"
import { useDispatch, useSelector } from 'react-redux';
import { callInfoUser } from './services/authServeices';
import { doGetAccountAction } from './redux/account/accountSlice';
import Loading from './components/Loading';

function App() {
  const dispatch = useDispatch(); // Khởi tạo hook dispatch để gửi các action đến Redux store
  const isLoading = useSelector(state => state.account.isLoading) // Lấy trạng thái loading từ Redux store

  const isAuthenticated = useSelector(state => state.account.isAuthenticated)

  const token = localStorage.getItem('access_token')
  useEffect(() => {
    const getAccout = async () => {
      if (window.location.pathname === "/login"
        || window.location.pathname === "/register"
      ) return
      const res = await callInfoUser(token)
      console.log("res APP", res )
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
          ? // Hiển thị router khi không đang trong trạng thái loading hoặc khi ở một số trang nhất định
          <RouterProvider router={router} />
          :
          <Loading />// {/* Hiển thị Loading khi dữ liệu đang được tải */}
      }
    </div>
  );
}

export default App;
