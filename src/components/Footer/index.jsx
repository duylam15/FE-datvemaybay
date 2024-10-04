// UserItem.jsx
import React from 'react';
import "./Footer.scss"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const Footer = ({ }) => {

	const menuData = {
		"menu": [
			{
				"h1title": "Khám phá",
				"items": [ // Sử dụng một mảng cho các mục
					{
						"id": 1,
						"title": "Thông tin đặt vé",
						"subTitle": [
							"Điều kiện giá vé",
							"Giá vé đặc biệt",
							"Hoàn, hủy, đổi vé",
							"Thuế, phí và phụ thu",
							"Trễ chuyến, Go - show",
							"Vé giờ chót",
							"Phương thức thanh toán"
						]
					},
					{
						"id": 2,
						"title": "Thông tin đặt vé",
						"subTitle": [
							"Điều kiện giá vé",
							"Giá vé đặc biệt",
							"Hoàn, hủy, đổi vé",
							"Thuế, phí và phụ thu",
							"Trễ chuyến, Go - show",
							"Vé giờ chót",
							"Phương thức thanh toán"
						]
					},
					{
						"id": 3,
						"title": "Thông tin đặt vé",
						"subTitle": [
							"Điều kiện giá vé",
							"Giá vé đặc biệt",
							"Hoàn, hủy, đổi vé",
							"Thuế, phí và phụ thu",
							"Trễ chuyến, Go - show",
							"Vé giờ chót",
							"Phương thức thanh toán"
						]
					},
					{
						"id": 4,
						"title": "Thông tin đặt vé",
						"subTitle": [
							"Điều kiện giá vé",
							"Giá vé đặc biệt",
							"Hoàn, hủy, đổi vé",
							"Thuế, phí và phụ thu",
							"Trễ chuyến, Go - show",
							"Vé giờ chót",
							"Phương thức thanh toán"
						]
					}
				]
			}

		]
	}
	return (
		<div className='footer'>
			<div className="footer_logo">
				<div className="container">
					<img src="/public/icons/logo.svg" alt="" onClick={() => navigate('/')} />
				</div>
			</div>

			<div className="footer__menu">
				<div className="container">
					{menuData.menu.map((section, sectionIndex) => (
						<div key={sectionIndex} className="footer__menu-item">
							<div className="footer__submenu--list">
								<div className="footer__submenu">
									{section.items.map((item, itemIndex) => (
										<div key={itemIndex} className="footer__submenu-item">
											<p className="footer__submenu-item--heading">
												{item.title}
											</p>
											{item.subTitle.map((subTitle, subIndex) => (
												<p key={subIndex} className="footer__submenu-item-desc">
													<Link to={"/post/" + sectionIndex + "/" + subIndex}>{subTitle}</Link>
												</p>
											))}
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

		</div>
	);
};

export default Footer;
