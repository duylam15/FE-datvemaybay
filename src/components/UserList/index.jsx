// UserList.jsx
import React from 'react';
import UserItem from '../UserItem';

const UserList = ({ users }) => {
	return (
		<div className="user-list">
			{users.map(user => (
				<UserItem key={user.id} user={user} />
			))}
		</div>
	);
};

export default UserList;
