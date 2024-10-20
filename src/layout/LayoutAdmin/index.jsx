import React from 'react'
import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../../components/NavbarAdmin';
import { useSelector } from 'react-redux';

export default function LayoutAdmin() {
	const isAdminRoute = window.location.pathname.startsWith('/admin');
	const user = useSelector(state => state.account.user);
	console.log("user from layout admin", user)
	const userRole = user?.quyen?.tenQuyen;
	return (
		<div className='layout-app'>
			{isAdminRoute && userRole === 'admin' ? <NavbarAdmin /> : <></>}
			<Outlet />
		</div>
	);
}
