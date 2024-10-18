import axios from "axios"; // Nhập thư viện axios để thực hiện các yêu cầu HTTP
import { Mutex } from "async-mutex"; // Nhập Mutex từ thư viện async-mutex để điều phối các yêu cầu đồng thời

const mutex = new Mutex(); // Tạo một đối tượng Mutex để bảo vệ phần xử lý refresh token khỏi các cuộc gọi đồng thời

const baseUrl = import.meta.env.VITE_BACKEND_URL_8080; // Lấy URL cơ sở của API từ biến môi trường

const instance = axios.create({
	baseURL: baseUrl, // Đặt URL cơ sở cho tất cả các yêu cầu được thực hiện bởi axios instance này
	withCredentials: true, // Cho phép gửi cookie và thông tin xác thực từ phía máy khách
});

instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` } // Thiết lập header Authorization chung cho tất cả các yêu cầu, với token từ localStorage

const handleRefreshToken = async () => {
	// Đây là một phương thức để làm mới token nếu cần
	return await mutex.runExclusive(async () => { // Đảm bảo chỉ một yêu cầu refresh token chạy tại một thời điểm
		const res = await instance.post('/auth/refresh_token'); // Gửi yêu cầu để làm mới token
		if (res && res.data) return res.data; // Nếu thành công, trả về token mới
		else return null; // Nếu không thành công, trả về null
	});
}

const NO_RETRY_HEADER = 'x-no-retry'; // Định nghĩa một header tùy chỉnh để kiểm tra xem yêu cầu có nên thử lại không

instance.interceptors.response.use(function (response) {
	// Nếu response không có data hoặc cần trả về toàn bộ response
	if (response && response.data) {
		return response.data;  // Trả về data nếu có
	}
	return response;  // Trả về toàn bộ response nếu không có data
}, async function (error) {
	console.log("error", error)
	// Nếu phản hồi lỗi (trạng thái HTTP ngoài khoảng 2xx), xử lý lỗi
	if (error.config && error.response
		&& +error.response.data.statusCode === 500 // Kiểm tra lỗi xác thực (401 Unauthorized)
		&& !error.config.headers[NO_RETRY_HEADER] // Kiểm tra xem yêu cầu đã thử lại chưa
	) { 
		const access_token = await handleRefreshToken(); // Cố gắng làm mới token
		error.config.headers[NO_RETRY_HEADER] = 'true'; // Đánh dấu yêu cầu này là đã thử lại 
		console.log("access_token", access_token)

		if (access_token) {
			error.config.headers['Authorization'] = `Bearer ${access_token}`; // Cập nhật header Authorization với token mới
			localStorage.setItem('access_token', access_token); // Lưu token mới vào localStorage
			return instance.request(error.config); // Thực hiện lại yêu cầu gốc với token mới
		}
	}
	if (
		error.config && error.response
		&& +error.response.status === 400 // Kiểm tra lỗi yêu cầu không hợp lệ (400 Bad Request)
		&& error.config.url === '/auth/refresh' // Nếu lỗi xảy ra trong khi làm mới token
	) {
		window.location.href = '/login'; // Điều hướng đến trang đăng nhập nếu token refresh không thành công
	}
	return error?.response?.data ?? Promise.reject(error); // Trả về dữ liệu lỗi hoặc từ chối promise nếu không có dữ liệu lỗi
});



export default instance; // Xuất instance axios để sử dụng trong các phần khác của ứng dụng
