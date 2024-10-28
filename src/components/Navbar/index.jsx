import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { getListMenuPost } from '../../services/homePageServices';
import { Button, Dropdown, Menu, message, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { callInfoUser, callLogout } from '../../services/authServeices';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { DownOutlined } from '@ant-design/icons';

const Navbar = () => {
	const dispatch = useDispatch(); // Khởi tạo hook dispatch để gửi các action đến Redux store
	const navigate = useNavigate();
	const [menuPost, setMenuPost] = useState([]);
	const [loading, setLoading] = useState(true);
	const [hoTen, setHoTen] = useState("");
	const [quyen, setQuyen] = useState("");

	const isAuthenticated = useSelector(state => state.account.isAuthenticated); // Kiểm tra trạng thái đăng nhập của người dùng từ Redux+
	const user = useSelector(state => state.account.user);
	const token = localStorage.getItem('access_token')
	const fetchMenuPost = async () => {
		try {
			const response = await getListMenuPost();
			let userHoTen
			if(token) {
				userHoTen = await callInfoUser(token);
			}
			setHoTen(userHoTen?.data?.khachHang?.hoTen)
			setQuyen(userHoTen?.data?.quyen?.tenQuyen)
			setMenuPost(response.data || []);
		} catch (error) {
			console.error('Lỗi khi fetch menuPost:', error);
		} finally {
			setLoading(false);
		}
	};

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Hàm bật dropdown khi hover
	const handleMouseEnter = () => {
		setIsDropdownOpen(true); // Hiển thị dropdown
	};

	// Hàm tắt dropdown khi rời khỏi vùng dropdown
	const handleMouseLeave = () => {
		setIsDropdownOpen(false); // Ẩn dropdown
	};


  useEffect(() => {
    fetchMenuPost();
  }, []);


	if (!menuPost || menuPost.length === 0) {
		return <div>Không có dữ liệu menu</div>;
	}

	// Hàm xử lý khi nhấn logout
	const handleLogout = async () => {
		const token = localStorage.getItem('access_token')
		const res = await callLogout(token); // Gọi API logout
		if (res.statusCode === 200) {
			dispatch(doLogoutAction()); // Dispatch action logout
			message.success('Đăng xuất thành công'); // Hiển thị thông báo đăng xuất thành công
			navigate('/'); // Điều hướng đến trang chính
		} else {
			message.error('Đăng xuất thất bại'); // Hiển thị thông báo đăng xuất thành công
		}
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
						{!isAuthenticated ? (
							<>
								<span className="navbar__login" onClick={() => navigate('/login')}>Đăng nhập</span>
								<span className="navbar__register" onClick={() => navigate('/register')}>Đăng kí</span>
							</>
						) : (
							<>
								<span>{hoTen}</span>
								<div
									className="navbar__dropdown"
									onMouseEnter={handleMouseEnter}  // Bật dropdown khi hover vào
									onMouseLeave={handleMouseLeave} // Ẩn dropdown khi hover ra
								>
									<img src="/public/icons/avatar.svg" alt="" />

									{isDropdownOpen && ( // Hiển thị dropdown khi đang hover
										<div className="navbar__dropdown-menu">
											<div onClick={() => navigate('/my_profile')} className="navbar__dropdown-item">Quản lí tài khoản</div>
											{quyen === "admin" && (
												<div onClick={() => navigate('/admin')} className="navbar__dropdown-item">Quản lí Admin</div>
											)}
											<div onClick={handleLogout} className="navbar__dropdown-item">Đăng xuất</div>
											<div onClick={() => navigate('/quanlidatve')} className='navbar__dropdown-item'>Quản lí đặt vé</div>
										</div>
									)}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
