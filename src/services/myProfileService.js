import axios from "../utils/axios-8080"


// Lấy thông tin cá nhân
export const getMyProfile = async (token) => {
	return axios.get(`/taikhoan/me`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};

export const updatePassword = async (data) => {
	return axios.put(`/taikhoan/update_password`, data)
}

