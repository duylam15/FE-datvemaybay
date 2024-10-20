const API_URL = 'http://localhost:8080';

// Lấy thông tin cá nhân
export const getMyProfile = async (token) => {
	const response = await fetch(`${API_URL}/taikhoan/me`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	if (!response.ok) {
		throw new Error('Failed to fetch profile');
	}
	return await response.json();
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