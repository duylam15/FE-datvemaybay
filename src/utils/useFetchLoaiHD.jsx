// utils/useFetchloaiHD.js
import { useState, useEffect } from 'react';
import { getLoaiHoaDon } from '../services/loaiHoaDonService.js'

export const useFetchLoaiHoaDon = () => {
    const [loaiHoaDon, setLoaiHoaDon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getLoaiHoaDon();
                setLoaiHoaDon(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { loaiHoaDon, loading, error };
};