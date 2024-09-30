// api.js
const API_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = async () => {
	const response = await fetch(`${API_URL}/users`);
	if (!response.ok) {
		throw new Error('Failed to fetch users');
	}
	return await response.json();
};
