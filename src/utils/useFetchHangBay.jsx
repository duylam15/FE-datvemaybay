import { useState, useEffect } from 'react';
import { getHangBay } from '../services/airlinesServices';

export const useFetchHangBay = () => {
    const [listHangBay, setListHangBay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHangBay();
                setListHangBay(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return { listHangBay, loading, error };
};
