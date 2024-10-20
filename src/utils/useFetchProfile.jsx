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
	console.log("token", token)
	console.log("profile from fetch ", profile)

	return { profile, loading, error }; // Trả về thông tin hồ sơ, trạng thái loading và lỗi (nếu có)
};



// Gọi hàm với dữ liệu cụ thể