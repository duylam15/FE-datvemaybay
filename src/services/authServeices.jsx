import axios from "../utils/axios-8080"

export const callLogin = (userName, password) => {
	return axios.post('/auth/login', { userName, password });
}

export const callRefreshToken = () => {
	return axios.post('/auth/refresh_token');
}

export const callLogout = (token) => {
	return axios.post('/auth/logout', { token });
}


export const callRegister = (data) => {
	return axios.post('/auth/signup', {
		userName: data.userName,
		password: data.password,
		rePassword: data.rePassword,
		cccd: data.cccd,
		email: data.email,
		gioiTinh: data.gioiTinh,
		hoTen: data.hoTen,
		ngaySinh: data.ngaySinh,
		soDienThoai: data.soDienThoai
	});
}


export const callInfoUser = (token) => {
	return axios.get('/taikhoan/me', {
		headers: {
			Authorization: `Bearer ${token}` // Thêm token vào header
		}
	});
}

export const getListLocationsForHeader = () => {
	return axios.get(`/admin/thanhpho/getAllCity`);
}

