import axios from "../utils/axios-8080"


// Lấy thông tin cá nhân
export const getMyProfile = async () => {
	return axios.get(`/taikhoan/me`);
};

export const updatePassword = async(data) => {
	return axios.put(`/taikhoan/update_password`, data)
}

