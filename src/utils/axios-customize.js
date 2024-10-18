import axios from "axios"; // Nhập thư viện axios để thực hiện các yêu cầu HTTP

const baseUrl = import.meta.env.VITE_BACKEND_URL; // Lấy URL cơ sở của API từ biến môi trường

const instance = axios.create({
    baseURL: baseUrl, // Đặt URL cơ sở cho tất cả các yêu cầu được thực hiện bởi axios instance này
    withCredentials: true, // Cho phép gửi cookie và thông tin xác thực từ phía máy khách
});

instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` } // Thiết lập header Authorization chung cho tất cả các yêu cầu, với token từ localStorage

instance.interceptors.response.use(function (response) {
    // Nếu response không có data hoặc cần trả về toàn bộ response
    if (response && response.data) {
        return response;  // Trả về data nếu có
    }
    return response;  // Trả về toàn bộ response nếu không có data
}, function (error) {
    return error?.response?.data ?? Promise.reject(error);
});



export default instance; // Xuất instance axios để sử dụng trong các phần khác của ứng dụng
