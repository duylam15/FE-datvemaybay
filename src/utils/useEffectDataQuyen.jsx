import { useState, useEffect } from 'react';
import { getAllQuyen } from '../services/quyenService';

export const useEffectDataQuyen = ({page, size}) => {
	const [nhomQuyen, setNhomQuyen] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await getAllQuyen(page, size);
				setNhomQuyen(response);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData(); // Call fetchData inside useEffect
	}, [page, size]);

	return { nhomQuyen, loading, error };
};