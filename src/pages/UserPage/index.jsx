// UsersPage.jsx
import React from 'react';
import { useFetchUsers } from '../../hooks/useFetchUsers';
import UserList from '../../components/UserList';

const UsersPage = () => {
	const { users } = useFetchUsers();

	return (
		<div className="users-page">
			<h1>Users List</h1>
			<UserList users={users} />
		</div>
	);
};

export default UsersPage;
