const API_URL = 'http://localhost:8080';

import axios from "../utils/axios-8080"


// Lấy thông tin cá nhân
export const getMyProfile = async () => {
	return axios.get(`/taikhoan/me`);
};


// Cập nhật mật khẩu
export const updatePassword = async (passwordData) => {
	const token = localStorage.getItem('access_token');
	const response = await fetch(`${API_URL}/taikhoan/update_password`, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(passwordData),
	});
	return await response.json();
};