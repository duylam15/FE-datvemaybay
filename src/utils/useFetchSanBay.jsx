import { useState, useEffect } from 'react';
import { getSanBay } from '../services/airportsServices';

export const useFetchSanBay = () => {
    const [sanBay, setSanBay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSanBay();
                setSanBay(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { sanBay, loading, error };
};
