// App.jsx
import React, { useEffect, useState } from 'react';
import { router } from './routes';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
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
      {1
        // isLoading === false
        // || window.location.pathname === '/login'
        // || window.location.pathname === '/register'
        // || window.location.pathname === '/'
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
