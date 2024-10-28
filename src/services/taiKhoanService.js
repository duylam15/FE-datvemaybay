import axios from "../utils/axios-8080"


// Lấy thông tin cá nhân
export const forgotPassword = async (data) => {
	return axios.post(`auth/forgot_password`, data);
};
