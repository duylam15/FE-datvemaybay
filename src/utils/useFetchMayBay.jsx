import { useState, useEffect } from 'react';
import { getMayBay } from '../services/planesServices';

export const useFetchMayBay = () => {
    const [mayBay, setMayBay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMayBay();
                setMayBay(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { mayBay, loading, error };
};
