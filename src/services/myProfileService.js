const API_URL = 'http://localhost:8080';
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcyODQzNDc2MiwiZXhwIjoxNzI5MDM5NTYyfQ.HyW3mNDUpcn5tCQiR5ddZS7c0aNm3uYx08y8m6e8LfA"
// Lấy thông tin cá nhân
export const getMyProfile = async () => {
	// const token = localStorage.getItem('token');
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
	// const token = localStorage.getItem('token');
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