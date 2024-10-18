import React, { useState } from 'react';
import Navigate from '../../components/Navbar'; // Đường dẫn đúng đến component Navbar
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';

export default function LayoutDefault() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className='layout-app'>
			<Navigate />
			<Outlet />
			<Footer />
		</div>
	);
}
