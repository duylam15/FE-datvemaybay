import axios from "../utils/axios-80802"


// nhap email, gui email kem token reset password
export const forgotPassword = async (data) => {
	return axios.post(`auth/forgot_password`, data);
};

export const resetPassword = async (data) => {
    return axios.post(`auth/reset_password`, data)
}