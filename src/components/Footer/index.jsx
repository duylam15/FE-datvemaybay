// UserItem.jsx
import React, { useEffect, useState } from 'react';
import "./Footer.scss"
import { useNavigate } from 'react-router-dom';
import { getFooterMenuPost } from '../../services/homePageServices';
const Footer = ({ }) => {
	const navigate = useNavigate()

	const [footerMenuPost, setFooterMenuPost] = useState([]);

	useEffect(() => {
		const fetchServiceData = async () => {
			try {
				const response = await getFooterMenuPost()
				setFooterMenuPost(response.data);
			} catch (error) {
				console.error("Error fetching service data:", error);
			}
		};
		fetchServiceData();
	}, []);

	return (
		<div className='footer'>
			<div className="footer_logo">
				<div className="container">
					<div className="footer_logo__inner">
						<img className='footer_logo__img' src="/public/icons/logo.svg" alt="" onClick={() => navigate('/')} />
						<h1 className="footer_logo__heading">HƠN CẢ MỘT CHUYẾN BAY
						</h1>
					</div>
				</div>
			</div>

			<div className="footer__menu">
				<div className="container">
					{footerMenuPost?.map((section, sectionIndex) => (
						<div key={sectionIndex} className="footer__menu-item">
							<div className="footer__submenu--list">
								<div className="footer__submenu">
									{section.items.map((item, itemIndex) => (
										<div key={itemIndex} className="footer__submenu-item">
											<p className="footer__submenu-item--heading">
												{item.title}
											</p>
											{item.subTitle.map((subTitle) => (
												<p key={subTitle.id} className="footer__submenu-item-desc" onClick={() => {
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
			</div>

			<div className="footer__award">
				<div className="container">
					<div className="footer__award--inner">
						<div className="footer__award--left">
							<img src="public/images/footer-award-01.png" alt="" className="footer__award--left-img" />
							<img src="public/images/footer-award-02.png" alt="" className="footer__award--left-img" />
							<img src="public/images/footer-award-03.png" alt="" className="footer__award--left-img" />
							<img src="public/images/footer-award-04.png" alt="" className="footer__award--left-img" />
						</div>
						<div className="footer__award--right">
							<div className="footer__award--right-item">
								Theo dõi trên mạng xã hội
							</div>
							<div className="footer__award--right-item">
								<img src="public/images/footer-award-05.png" alt="" className="footer__award--right-img" />
								<img src="public/images/footer-award-06.png" alt="" className="footer__award--right-img" />
								<img src="public/images/footer-award-07.png" alt="" className="footer__award--right-img" />
								<img src="public/images/footer-award-08.png" alt="" className="footer__award--right-img" />
								<img src="public/images/footer-award-09.png" alt="" className="footer__award--right-img" />


							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="footer__copyright">
				<div className="container">
					<div className="footer__copyright--inner">
						<div className="footer__copyright--left">
							<div className="footer__copyright--text">
								Sơ đồ website
							</div>
							<div className="footer__copyright--text">
								@ 2023 Bamboo Airways Copyright. All Rights Reserved.
								Business Registration Code: 0107867370
							</div>
						</div>
						<div className="footer__copyright--right">
							<img src="public/images/footer-copyright-01.png" alt="" className="footer__copyright--right--img" />
							<img src="public/images/footer-copyright-02.png" alt="" className="footer__copyright--right--img" />
						</div>
					</div>
				</div>
			</div>

		</div >
	);
};

export default Footer;
