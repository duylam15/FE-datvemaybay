import axios from 'axios';

// Tạo một instance của Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Thay bằng base URL của bạn
  withCredentials: true, // Để gửi cookie (bao gồm refresh token)
});

// Interceptor cho các request
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken'); // Lấy access token từ localStorage
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token; // Gắn access token vào header
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor cho các response
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    
    // Kiểm tra xem lỗi 401 có xảy ra và yêu cầu chưa được retry lần nào
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu rằng yêu cầu này đã retry một lần

      try {
        // Gửi yêu cầu refresh token để lấy token mới
        const res = await axiosInstance.post('/auth/refresh_token');

        // Lưu lại access token mới vào localStorage
        localStorage.setItem('accessToken', res.data.data); // res.data.data chứa access token mới

        // Gắn lại access token mới vào header và thực hiện lại yêu cầu ban đầu
        originalRequest.headers['Authorization'] = 'Bearer ' + res.data.data;

        // Thực hiện lại yêu cầu ban đầu với dữ liệu đi kèm (nếu có)
        return axiosInstance({
          ...originalRequest, 
          data: originalRequest.data // Đảm bảo dữ liệu gốc vẫn được gửi lại
        });
      } catch (refreshError) {
        // Nếu refresh token cũng thất bại
        console.error('Refresh token failed:', refreshError);

        // Điều hướng người dùng về trang đăng nhập hoặc thực hiện hành động khác
        window.location.href = '/login';
      }
    }
    
    // Nếu không phải lỗi 401 hoặc yêu cầu đã retry, trả về lỗi như bình thường
    return Promise.reject(error);
  }
);

export default axiosInstance;