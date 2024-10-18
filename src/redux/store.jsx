import { combineReducers, configureStore } from '@reduxjs/toolkit'; // Nhập các hàm cần thiết từ Redux Toolkit
import accountReducer from '../redux/account/accountSlice'; // Nhập reducer cho account từ slice tương ứng


const store = configureStore({
	reducer: {
		account: accountReducer
	},

});

export { store };
