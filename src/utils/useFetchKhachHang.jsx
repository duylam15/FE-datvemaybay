// utils/useFetchKhachHang.js
import { useState, useEffect } from 'react';
import { getKhachHang } from '../services/customersServices';

export const useFetchKhachHang = () => {
    const [khachHang, setKhachHang] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getKhachHang();
                setKhachHang(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { khachHang, loading, error };
};
