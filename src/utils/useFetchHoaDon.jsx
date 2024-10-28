// utils/useFetchPhuongThucTT.js
import { useState, useEffect } from 'react';
import { getHoaDon } from '../services/hoaDonService';

export const useFetchHoaDon = () => {
    const [hoaDon, setHoaDon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHoaDon();
                setHoaDon(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { hoaDon, loading, error };
};