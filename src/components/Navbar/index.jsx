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

	const menuPosttt = [
		{
			"h1title": "Khám phá",
			"items": [
				{
					"id": 1,
					"title": "Thông tin đặt vé",
					"subTitle": [
						{ "id": 1, "text": "Điều kiện giá vé" },
						{ "id": 2, "text": "Giá vé đặc biệt" },
						{ "id": 3, "text": "Hoàn, hủy, đổi vé" },
						{ "id": 4, "text": "Thuế, phí và phụ thu" },
						{ "id": 5, "text": "Trễ chuyến, Go - show" },
						{ "id": 6, "text": "Vé giờ chót" }
					]
				},
				{
					"id": 2,
					"title": "Chính sách vé",
					"subTitle": [
						{ "id": 1, "text": "Chính sách hoàn vé" },
						{ "id": 2, "text": "Chính sách hủy vé" },
						{ "id": 3, "text": "Chính sách đổi vé" },
						{ "id": 4, "text": "Chính sách phí" },
						{ "id": 5, "text": "Chính sách giá vé" },
						{ "id": 6, "text": "Chính sách bảo hiểm" }
					]
				},
				{
					"id": 3,
					"title": "Mẹo du lịch",
					"subTitle": [
						{ "id": 1, "text": "Chuẩn bị hành lý" },
						{ "id": 2, "text": "Điều chỉnh thời gian" },
						{ "id": 3, "text": "Lên kế hoạch cho chuyến đi" },
						{ "id": 4, "text": "Chọn địa điểm" },
						{ "id": 5, "text": "Tìm kiếm thông tin" },
						{ "id": 6, "text": "Đảm bảo an toàn" }
					]
				},
				{
					"id": 4,
					"title": "Những địa điểm du lịch nổi bật",
					"subTitle": [
						{ "id": 1, "text": "Địa điểm tại Hà Nội" },
						{ "id": 2, "text": "Địa điểm tại Đà Nẵng" },
						{ "id": 3, "text": "Địa điểm tại TP.HCM" },
						{ "id": 4, "text": "Địa điểm tại Nha Trang" },
						{ "id": 5, "text": "Địa điểm tại Hội An" },
						{ "id": 6, "text": "Địa điểm tại Phú Quốc" }
					]
				}
			]
		},
		{
			"h1title": "Dịch vụ",
			"items": [
				{
					"id": 1,
					"title": "Dịch vụ ăn uống",
					"subTitle": [
						{ "id": 1, "text": "Thực đơn" },
						{ "id": 2, "text": "Thời gian phục vụ" },
						{ "id": 3, "text": "Dịch vụ đặc biệt" },
						{ "id": 4, "text": "Đặt món" },
						{ "id": 5, "text": "Dịch vụ miễn phí" },
						{ "id": 6, "text": "Đánh giá dịch vụ" }
					]
				},
				{
					"id": 2,
					"title": "Dịch vụ khách sạn",
					"subTitle": [
						{ "id": 1, "text": "Chính sách hủy phòng" },
						{ "id": 2, "text": "Chọn phòng" },
						{ "id": 3, "text": "Dịch vụ giặt là" },
						{ "id": 4, "text": "Thủ tục nhận phòng" },
						{ "id": 5, "text": "Tiện nghi trong phòng" },
						{ "id": 6, "text": "Đánh giá khách sạn" }
					]
				},
				{
					"id": 3,
					"title": "Dịch vụ vận chuyển",
					"subTitle": [
						{ "id": 1, "text": "Đặt xe sân bay" },
						{ "id": 2, "text": "Thuê xe tự lái" },
						{ "id": 3, "text": "Dịch vụ đưa đón" },
						{ "id": 4, "text": "Hướng dẫn viên" },
						{ "id": 5, "text": "Xe buýt" },
						{ "id": 6, "text": "Taxi" }
					]
				},
				{
					"id": 4,
					"title": "Dịch vụ giải trí",
					"subTitle": [
						{ "id": 1, "text": "Chương trình giải trí" },
						{ "id": 2, "text": "Lịch trình sự kiện" },
						{ "id": 3, "text": "Khuyến mãi" },
						{ "id": 4, "text": "Đánh giá dịch vụ giải trí" },
						{ "id": 5, "text": "Tham gia các hoạt động" },
						{ "id": 6, "text": "Dịch vụ thư giãn" }
					]
				}
			]
		},
		{
			"h1title": "Khuyến mãi",
			"items": [
				{
					"id": 1,
					"title": "Khuyến mãi đặt vé",
					"subTitle": [
						{ "id": 1, "text": "Giảm giá" },
						{ "id": 2, "text": "Mã khuyến mãi" },
						{ "id": 3, "text": "Chương trình tích điểm" },
						{ "id": 4, "text": "Khuyến mãi đặc biệt" },
						{ "id": 5, "text": "Khuyến mãi theo mùa" },
						{ "id": 6, "text": "Khuyến mãi nhóm" }
					]
				},
				{
					"id": 2,
					"title": "Khuyến mãi khách sạn",
					"subTitle": [
						{ "id": 1, "text": "Giảm giá phòng" },
						{
							"id": 2,
							"text": "Chương trình khách hàng thân thiết"
						},
						{ "id": 3, "text": "Giá ưu đãi" },
						{ "id": 4, "text": "Mua một tặng một" },
						{ "id": 5, "text": "Giảm giá theo mùa" },
						{ "id": 6, "text": "Khuyến mãi đặt sớm" }
					]
				},
				{
					"id": 3,
					"title": "Khuyến mãi ăn uống",
					"subTitle": [
						{ "id": 1, "text": "Giảm giá món ăn" },
						{ "id": 2, "text": "Thực đơn khuyến mãi" },
						{ "id": 3, "text": "Giảm giá đồ uống" },
						{ "id": 4, "text": "Chương trình thưởng thức" },
						{ "id": 5, "text": "Khuyến mãi buffet" },
						{
							"id": 6,
							"text": "Chương trình khách hàng thân thiết"
						}
					]
				},
				{
					"id": 4,
					"title": "Khuyến mãi tour",
					"subTitle": [
						{ "id": 1, "text": "Giảm giá tour" },
						{ "id": 2, "text": "Combo tour" },
						{ "id": 3, "text": "Khuyến mãi đặc biệt" },
						{ "id": 4, "text": "Khuyến mãi nhóm" },
						{ "id": 5, "text": "Khuyến mãi cho trẻ em" },
						{ "id": 6, "text": "Khuyến mãi theo mùa" }
					]
				}
			]
		},
		{
			"h1title": "Liên hệ",
			"items": [
				{
					"id": 1,
					"title": "Hỗ trợ khách hàng",
					"subTitle": [
						{ "id": 1, "text": "Gọi điện" },
						{ "id": 2, "text": "Chat trực tuyến" },
						{ "id": 3, "text": "Email" },
						{ "id": 4, "text": "Hỏi đáp" },
						{ "id": 5, "text": "Giải quyết khiếu nại" },
						{ "id": 6, "text": "Phản hồi ý kiến" }
					]
				},
				{
					"id": 2,
					"title": "Thông tin công ty",
					"subTitle": [
						{ "id": 1, "text": "Giới thiệu công ty" },
						{ "id": 2, "text": "Địa chỉ" },
						{ "id": 3, "text": "Liên hệ hợp tác" },
						{ "id": 4, "text": "Tin tức công ty" },
						{ "id": 5, "text": "Đánh giá từ khách hàng" },
						{ "id": 6, "text": "Chính sách bảo mật" }
					]
				},
				{
					"id": 3,
					"title": "Theo dõi trên mạng xã hội",
					"subTitle": [
						{ "id": 1, "text": "Facebook" },
						{ "id": 2, "text": "Instagram" },
						{ "id": 3, "text": "Twitter" },
						{ "id": 4, "text": "YouTube" },
						{ "id": 5, "text": "LinkedIn" },
						{ "id": 6, "text": "Pinterest" }
					]
				},
				{
					"id": 4,
					"title": "Địa chỉ văn phòng",
					"subTitle": [
						{ "id": 1, "text": "Văn phòng Hà Nội" },
						{ "id": 2, "text": "Văn phòng TP.HCM" },
						{ "id": 3, "text": "Văn phòng Đà Nẵng" },
						{ "id": 4, "text": "Văn phòng Nha Trang" },
						{ "id": 5, "text": "Văn phòng Hải Phòng" },
						{ "id": 6, "text": "Văn phòng Cần Thơ" }
					]
				}
			]
		}
	]
	const isAuthenticated = useSelector(state => state.account.isAuthenticated); // Kiểm tra trạng thái đăng nhập của người dùng từ Redux+
	const user = useSelector(state => state.account.user);
	const token = localStorage.getItem('access_token')

	useEffect(() => {
		const fetchMenuPost = async () => {
			try {
				let userHoTen
				if (token) {
					userHoTen = await callInfoUser(token);
				}
				setHoTen(userHoTen?.data?.khachHang?.hoTen)
				setQuyen(userHoTen?.data?.quyen?.tenQuyen)
			} catch (error) {
				console.error('Lỗi khi fetch menuPost:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchMenuPost();
	}, []);

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Hàm bật dropdown khi hover
	const handleMouseEnter = () => {
		setIsDropdownOpen(true); // Hiển thị dropdown
	};

	// Hàm tắt dropdown khi rời khỏi vùng dropdown
	const handleMouseLeave = () => {
		setIsDropdownOpen(false); // Ẩn dropdown
	};

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
						{menuPosttt.map((section, sectionIndex) => (
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
