// utils/useFetchTaiKhoan.jsx
import { useState, useEffect } from 'react';
import { getTaiKhoan } from '../services/qlTaiKhoanService';

export const useFetchTaiKhoan = () => {
    const [taiKhoan, setTaiKhoan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTaiKhoan();
                setTaiKhoan(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { taiKhoan, loading, error };
};