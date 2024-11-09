import { useState, useEffect } from 'react';
import { getDanhGia } from '../services/reviewsService';
export const useFetchDanhGia = () => {
    const [danhGia, setDanhGia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDanhGia();
                setDanhGia(data);
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    console.error("Error 500: Resource not found");
                    setHoaDon([]);
                } else {
                    setError(error);
                    console.error("An error occurred:", error.message);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { danhGia, loading, error };
};