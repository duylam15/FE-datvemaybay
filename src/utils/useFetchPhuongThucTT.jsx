// utils/useFetchPhuongThucTT.js
import { useState, useEffect } from 'react';
import { getPhuongThucTT } from '../services/phuongThucThanhToanService';

export const useFetchPTTT = () => {
    const [phuongThucTT, setPhuongThucTT] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error khi bắt đầu fetch

            try {
                const data = await getPhuongThucTT();

                // Kiểm tra nếu `data` là một mảng trước khi cập nhật state
                if (Array.isArray(data)) {
                    setPhuongThucTT(data);
                } else {
                    setError("Dữ liệu trả về không đúng định dạng.");
                    setPhuongThucTT([]); // Đảm bảo dữ liệu là mảng rỗng nếu không hợp lệ
                }
            } catch (error) {
                if (error.response && error.response.status === 204) {
                    setPhuongThucTT([]);
                } else {
                    console.error("An error occurred:", error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { phuongThucTT, loading, error };
};
