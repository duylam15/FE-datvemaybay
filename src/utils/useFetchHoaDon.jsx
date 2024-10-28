// utils/useFetchHoaDon.js
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
            } catch (error) {
                if (error.response && error.response.status === 204) {
                    console.error("Error 404: Resource not found");
                    // Xử lý lỗi 404
                    setHoaDon([]);
                } else {
                    console.error("An error occurred:", error.message);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { hoaDon, loading, error };
};