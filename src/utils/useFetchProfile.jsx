// hooks/useFetchProfile.js
import { useState, useEffect } from 'react';
import { getMyProfile } from '../services/myProfileService';

export const useFetchProfile = (token) => {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const data = await getMyProfile(token); // Gọi dịch vụ để lấy thông tin hồ sơ
				setProfile(data);
			} catch (err) {
				setError(err.message); // Bắt lỗi và lưu vào state
			} finally {
				setLoading(false); // Kết thúc trạng thái loading
			}
		};

		if (token) { // Kiểm tra xem token có tồn tại không
			fetchData();
		}
	}, [token]); // Gọi lại khi token thay đổi

	return { profile, loading, error }; // Trả về thông tin hồ sơ, trạng thái loading và lỗi (nếu có)
};


import axiosInstance from './axiosInstance'; // Import axiosInstance đã tạo

// Hàm để đăng bài viết mới
// const postNewArticle = async (title, content) => {
//   try {
//     const response = await axiosInstance.post('/articles', {
//       title: title,        // Tiêu đề bài viết
//       content: content     // Nội dung bài viết
//     });
//     console.log('Bài viết đã được đăng thành công:', response.data);
//   } catch (error) {
//     console.error('Lỗi khi đăng bài viết:', error);
//   }
// };

// // Gọi hàm với dữ liệu cụ thể
// postNewArticle('Bài viết đầu tiên', 'Đây là nội dung của bài viết đầu tiên.');