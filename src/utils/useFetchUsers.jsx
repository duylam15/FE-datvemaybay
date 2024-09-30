// useFetchUsers.js
import { useState, useEffect } from 'react';
import { getUsers } from '../services/userServices';

export const useFetchUsers = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getUsers();
			setUsers(data);
		};
		fetchData();
	}, []);

	return { users };
};
