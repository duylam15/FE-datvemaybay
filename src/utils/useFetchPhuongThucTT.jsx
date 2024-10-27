// utils/useFetchPhuongThucTT.js
import { useState, useEffect } from 'react';
import { getPhuongThucTT } from '../services/phuongThucThanhToanService';

export const useFetchPTTT = () => {
    const [phuongThucTT, setPhuongThucTT] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPhuongThucTT();
                setPhuongThucTT(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { phuongThucTT, loading, error };
};