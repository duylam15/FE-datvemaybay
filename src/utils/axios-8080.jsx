import axios from "axios";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseUrl = import.meta.env.VITE_BACKEND_URL_8080;

const instance = axios.create({
	baseURL: baseUrl,
	withCredentials: true,
});

export const handleRefreshToken = async () => {
	return await mutex.runExclusive(async () => {
		try {
			const res = await instance.post('/auth/refresh_token');
			if (res && res.data) {
				console.log("Token làm mới thành công:", res.data);
				return res.data; // Trả về token mới nếu có
			} else {
				console.log("Không nhận được token mới");
				return null;
			}
		} catch (error) {
			console.error("Làm mới token thất bại:", error);
			return null;
		}
	});
};

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

const NO_RETRY_HEADER = 'x-no-retry';

instance.interceptors.response.use(function (response) {
	if (response && response.data) {
		return response.data;
	}
	return response;
}, async function (error) {
	if (error.config
		&& error.response.data.statusCode != 999 // Kiểm tra lỗi xác thực
		&& !error.config.headers[NO_RETRY_HEADER] // Kiểm tra xem đã thử lại hay chưa
	) {
		console.log("Token hết hạn, thử làm mới token");
		const access_token = await handleRefreshToken(); // Làm mới token
		error.config.headers[NO_RETRY_HEADER] = 'true'; // Đánh dấu đã thử lại

		if (access_token) {
			if (error.config && error.config.headers) {
				console.log("Cập nhật token mới vào headers");
				error.config.headers['Authorization'] = `Bearer ${access_token}`; // Cập nhật token mới
				localStorage.setItem('access_token', access_token); // Lưu token mới vào localStorage
			}
			return instance.request(error.config); // Thực hiện lại yêu cầu gốc
		}
	}

	// Nếu đang cố gắng làm mới token mà thất bại
	if (
		error.config
		&& error.response.data.statusCode === 999
		&& error.config.url === '/auth/refresh_token'
	) {
		if (!localStorage.getItem('access_token')) {
			console.log('Người dùng đã đăng xuất, giữ nguyên trang hiện tại.');
		} else {
			console.log('Làm mới token thất bại, điều hướng tới trang đăng nhập.');
			window.location.href = '/login'; // Điều hướng về login nếu refresh token thất bại
			localStorage.removeItem("access_token")
		}
	}

	// Trả về dữ liệu lỗi hoặc từ chối promise
	console.error("Lỗi trong quá trình xử lý request:", error);
	return error?.response?.data ?? Promise.reject(error);
});

export default instance;