// utils/useFetchTaiKhoan.jsx
import { useState, useEffect } from 'react';
import { getTaiKhoan } from '../services/qlTaiKhoanService';

export const useFetchTaiKhoan = (page, size) => {
    const [taiKhoan, setTaiKhoan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTaiKhoan(page, size);
                setTaiKhoan(data);
            } catch (error) {
                if (error.response && error.response.status === 204) {
                    setTaiKhoan([]);
                } else {
                    console.error("An error occurred:", error.message);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { taiKhoan, loading, error };
};