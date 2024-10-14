import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { getListMenuPost } from '../../services/homePageServices';

const Navbar = () => {
	const navigate = useNavigate();
	const [menuPost, setMenuPost] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchMenuPost = async () => {
		try {
			const response = await getListMenuPost();
			setMenuPost(response.data || []);
		} catch (error) {
			console.error('Lỗi khi fetch menuPost:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMenuPost();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!menuPost || menuPost.length === 0) {
		return <div>Không có dữ liệu menu</div>;
	}

	return (
		<nav className="navbar">
			<div className="container">
				<div className="navbar__inner">
					<div className="navbar__logo" onClick={() => {
						window.scrollTo(0, 0);
						navigate('/');
					}}>
						<img src="/public/icons/logo.svg" alt="" />
					</div>
					<div className="navbar__menu">
						{menuPost.map((section, sectionIndex) => (
							<div key={sectionIndex} className="navbar__menu-item">
								<span className="navbar__menu-link" onClick={() => {
									window.scrollTo(0, 0);
									navigate("/post/" + sectionIndex);
								}}>
									{section.h1title}
								</span>
								<div className="navbar__submenu--list">
									<div className="navbar__submenu">
										{section.items.map((item, itemIndex) => (
											<div key={itemIndex} className="navbar__submenu-item">
												<p className="navbar__submenu-item navbar__submenu-item--heading">
													{item.title}
												</p>
												{item.subTitle.map((subTitle) => (
													<p key={subTitle.id} className="navbar__submenu-item" onClick={() => {
														window.scrollTo(0, 0);
														navigate("/post/" + sectionIndex + "/" + itemIndex + "/" + subTitle.id);
													}}>
														{subTitle.text}
													</p>
												))}
											</div>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="navbar__auth">
						<span className="navbar__login" onClick={() => navigate('/login')}>Đăng nhập</span>
						<span className="navbar__register" onClick={() => navigate('/register')}>Đăng kí</span>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
