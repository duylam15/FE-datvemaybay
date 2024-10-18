import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { getListMenuPost } from '../../services/homePageServices';
import { Dropdown, message, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { callInfoUser, callLogout } from '../../services/authServeices';
import { doLogoutAction } from '../../redux/account/accountSlice';

const Navbar = () => {
	const dispatch = useDispatch(); // Khởi tạo hook dispatch để gửi các action đến Redux store
	const navigate = useNavigate();
	const [menuPost, setMenuPost] = useState([]);
	const [loading, setLoading] = useState(true);
	const [hoTen, setHoTen] = useState("");
	const isAuthenticated = useSelector(state => state.account.isAuthenticated); // Kiểm tra trạng thái đăng nhập của người dùng từ Redux
	const token = localStorage.getItem('access_token')
	const user = useSelector(state => state.account.user); // Lấy thông tin người dùng từ Redux
	const fetchMenuPost = async () => {
		try {
			const response = await getListMenuPost();
			const userHoTen = await callInfoUser(token);
			setHoTen(userHoTen?.data?.khachHang?.hoTen)
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


	if (!menuPost || menuPost.length === 0) {
		return <div>Không có dữ liệu menu</div>;
	}

	let items = [
		{
			label: <label
				style={{ cursor: 'pointer' }}
				onClick={() => {
					window.scrollTo(0, 0); navigate(`/post`)
				}}
			>Quản lý tài khoản</label>, // Item quản lý tài khoản
			key: 'account',
		},
		{
			label: <Link to="/history">Lịch sử mua hàng</Link>, // Item lịch sử mua hàng
			key: 'history',
		},
		{
			label: <label
				style={{ cursor: 'pointer' }}
				onClick={() => handleLogout()}
			>Đăng xuất</label>, // Item đăng xuất
			key: 'logout',
		},
	];

	// Hàm xử lý khi nhấn logout
	const handleLogout = async () => {
		const res = await callLogout(token); // Gọi API logout
		console.log("dang xuat",res)
		if (res) {
			dispatch(doLogoutAction()); // Dispatch action logout
			message.success('Đăng xuất thành công'); // Hiển thị thông báo đăng xuất thành công
			navigate('/'); // Điều hướng đến trang chính
		}
	}


	// Nếu người dùng là admin, thêm item trang quản trị vào menu
	if (user?.role === 'ADMIN') {
		items.unshift({
			label: <Link to='/admin'>Trang quản trị</Link>,
			key: 'admin',
		})
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
						{!isAuthenticated ?
							<>
								<span className="navbar__login" onClick={() => navigate('/login')}>Đăng nhập</span>
								<span className="navbar__register" onClick={() => navigate('/register')}>Đăng kí</span>
							</>
							:
							<>
								{hoTen}
								<label
									style={{ cursor: 'pointer' }}
									onClick={() => handleLogout()}
								>Đăng xuất</label>,
							</>
						}

					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
