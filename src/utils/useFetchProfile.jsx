import { useState, useEffect } from 'react';
import { getMyProfile } from '../services/myProfileService';

export const useFetchProfile = () => {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Lấy token từ localStorage
		const token = localStorage.getItem("access_token");

		// Hàm lấy dữ liệu hồ sơ
		const fetchData = async () => {
			try {
				setLoading(true);
				if (!token) {
					throw new Error("Không có token");
				}
				console.log("token goi cua api /me: " + token);

				// Gọi API để lấy thông tin hồ sơ
				const data = await getMyProfile();
				setProfile(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		// Chỉ gọi API nếu token có tồn tại
		if (token) {
			fetchData();
		} else {
			setLoading(false);
		}
	}, []); // Không thêm token vào dependency để tránh lặp vô hạn

	console.log("profile from fetch ", profile);

	return { profile, loading, error }; // Trả về thông tin hồ sơ, trạng thái loading và lỗi (nếu có)
};