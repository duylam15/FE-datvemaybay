import axios from "axios";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseUrl = import.meta.env.VITE_BACKEND_URL_8080;

const instance = axios.create({
	baseURL: baseUrl,
	withCredentials: true,
});

// instance.defaults.headers.common = {
// 	'Authorization': Bearer ${localStorage.getItem('access_token')}
// };


export const handleRefreshToken = async () => {
	return await mutex.runExclusive(async () => {
		try {
			const res = await instance.post('/auth/refresh_token');
			if (res && res.data) return res.data; // Trả về token mới nếu có
			else return null;
		} catch (error) {
			// Nếu có lỗi trong quá trình refresh token, điều hướng tới trang login
			console.error("Làm mới token thất bại:", error);
			window.location.href = '/login';
			return null;
		}
	});
};

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

// Hàm kiểm tra token đã hết hạn
const isTokenExpired = (token) => {
	const decoded = JSON.parse(atob(token.split('.')[1])); // Giải mã token để lấy thông tin
	return decoded.exp * 1000 < Date.now(); // Kiểm tra thời gian hết hạn
}



const NO_RETRY_HEADER = 'x-no-retry';

instance.interceptors.response.use(function (response) {
	if (response && response.data) {
		return response.data;
	}
	return response;
}, async function (error) {
	console.log("error", error);
	console.log("error.status", error.status);
	console.log("error.config.headers[NO_RETRY_HEADER]", error.config.headers["x-no-retry"])
	if (error.config && error.response
		&& error.status === 500 // Kiểm tra lỗi xác thực (401 Unauthorized)
		&& !error.config.headers[NO_RETRY_HEADER] // Kiểm tra xem đã thử lại hay chưa
	) {
		console.log("refresh here")
		const access_token = await handleRefreshToken(); // Làm mới token
		error.config.headers[NO_RETRY_HEADER] = 'true'; // Đánh dấu đã thử lại
		console.log(error.config.headers[NO_RETRY_HEADER])
		console.log("Trước khi cập nhật Authorization:", error.config.headers['Authorization']);
		if (access_token) {
			if (error.config && error.config.headers) {
				error.config.headers['Authorization'] = `Bearer ${ access_token }`; // Cập nhật token mới
				localStorage.removeItem('access_token');
				localStorage.setItem('access_token', access_token);
				console.log("Sau khi cập nhật Authorization:", error.config.headers['Authorization']);
				console.log("Bearer ${access_token}:", `Bearer ${ access_token }`);
				console.log("access_token Sau khi cập nhật Authorization:", localStorage.getItem("access_token"))
			} else {
				console.error('Không thể cập nhật Authorization, headers không tồn tại', error.config);
			}
			return instance.request(error.config); // Thực hiện lại yêu cầu gốc
		}
	}

	// Nếu gặp lỗi 400 khi làm mới token, điều hướng người dùng về login
	if (
		error.config && error.response
		&& error.response.status === 400
		&& error.config.url === '/auth/refresh_token'
	) {
		window.location.href = '/login'; // Chuyển đến trang login nếu refresh thất bại
	}

	// Trả về dữ liệu lỗi hoặc từ chối promise
	return error?.response?.data ?? Promise.reject(error);
});

export default instance;