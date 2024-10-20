// utils/useFetchPhuongThucTT.js
import { useState, useEffect } from 'react';
import {getChiTietHoaDon} from '../services/chiTietHoaDonService.js';

export const useFetchChiTietHoaDon = (idHoaDon) => {
    const [chiTietHoaDon, setChiTietHoaDon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getChiTietHoaDon(idHoaDon);
                setChiTietHoaDon(data);
                console.log(chiTietHoaDon);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { chiTietHoaDon, loading, error };
};