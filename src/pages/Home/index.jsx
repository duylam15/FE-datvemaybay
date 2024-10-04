import { useNavigate, useParams } from 'react-router-dom';
import React, { PureComponent } from 'react'
import "./Home.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Carousel } from 'antd';
const Home = () => {
	const params = useParams();
	const navigate = useNavigate();

	const serviceData = [
		{
			id: 1,
			title: "Hành lí",
			icons: "public/icons/service-01.svg"
		},
		{
			id: 2,
			title: "Chọn chỗ ngồi",
			icons: "public/icons/service-01.svg"
		},
		{
			id: 3,
			title: "Chọn chỗ ngồi",
			icons: "public/icons/service-01.svg"
		},
		{
			id: 4,
			title: "Chọn chỗ ngồi",
			icons: "public/icons/service-01.svg"
		},
		{
			id: 5,
			title: "Chọn chỗ ngồi",
			icons: "public/icons/service-01.svg"
		},
		{
			id: 6,
			title: "Chọn chỗ ngồi",
			icons: "public/icons/service-01.svg"
		},
		{
			id: 7,
			title: "Chọn chỗ ngồi",
			icons: "public/icons/service-01.svg"
		},
		{
			id: 8,
			title: "Chọn chỗ ngồi",
			icons: "public/icons/service-01.svg"
		},
	]
	const contentStyle = {
		color: '#fff',
		lineHeight: '68px',  // Căn giữa nội dung theo chiều dọc
		textAlign: 'center',
		background: '#364d79',
	};

	// Custom Arrow Component
	const CustomPrevArrow = ({ className, style, onClick }) => {
		return (
			<div
				className={className}
				style={{ ...style, left: '10px', zIndex: 1 }}
				onClick={onClick}
			>
				<img src="public/icons/next-light-svgrepo-com.svg" alt="Previous" />
			</div>
		);
	};

	const CustomNextArrow = ({ className, style, onClick }) => {
		return (
			<div
				className={className}
				style={{ ...style, top: "50px", right: "20px", right: '20px', zIndex: 1, color: "red", width: "2px", height: "2px" }}
				onClick={onClick}
			>
			</div>
		);
	};
	return (
		<>
			<div className="home-header">
				<div className="container">
					<div className="home-header__inner">
					</div>
				</div>
			</div>
			<div className="service">
				<div className="container">
					<div className="service__inner">
						<div className="service__list">
							{serviceData.map(service => (
								<div className="service__item" key={service.id}
									onClick={() => navigate(`/post/${service.id}`)} >
									<img src={service.icons} alt="" className="service__icon" />
									<p className="service__title">{service.title}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="banner-explore">
				<div className="container">
					<div className="banner-explore__inner">
						<div className="banner-explore__section">
							<h1 className="banner-explore__heading heading">Thông tin hữu ích cho chuyến bay của bạn</h1>
							<p className="banner-explore__desc desc">Tiêu chuẩn hành lý, điều kiện vé bay,... đều có ở đây!</p>
						</div>
						<button className="banner-explore__action" onClick={() => navigate(`/post`)}>
							Tra cứu <img src="public/icons/next-icon.svg" alt="" />
						</button>
					</div>
				</div>
			</div>

			<div className="news">
				<div className="container">
					<div className="news__inner">
						<div className="news__header">
							<img src="public/icons/news.svg" alt="" className="news__icon" />
							<h4 className="news__heading">Tin tức</h4>
						</div>
						<Carousel
							arrows
							prevArrow={<CustomPrevArrow />}
							nextArrow={<CustomNextArrow />}
							dots={false}
							infinite={false}
						>
							<div>
								<h3 style={contentStyle}>1</h3>
							</div>
							<div>
								<h3 style={contentStyle}>2</h3>
							</div>
							<div>
								<h3 style={contentStyle}>3</h3>
							</div>
							<div>
								<h3 style={contentStyle}>4</h3>
							</div>
						</Carousel>
						<div className="news__header">
							<img src="public/icons/news.svg" alt="" className="news__icon" />
							<h4 className="news__heading">Tin tức</h4>
						</div>
					</div>
				</div>
			</div>

			<div className="portlet">
				<div className="container">
					<div className="portlet__inner">
						<div className="portlet__top">
							<h1 className="portlet__heading heading">Ưu đãi</h1>
							<div className="tips">
								<img src="public/icons/tips-icon.svg" alt="" className="tips__icon" />
								<p className="tips__desc">
									Tham khảo  <span className="highlight">các ưu đãi</span> hấp dẫn!
								</p>
							</div>
						</div>
						<div className="portlet__content">
							<div className="portlet__left">
								<div className="portlet__item">
									<img src="public/images/portlet-01.png" alt="" className="portlet__img" />
									<p onClick={() => navigate(`/post`)} className="portlet__action">Nhận ưu đãi <img src="public/icons/arrow.svg" alt="" /></p>
								</div>
							</div>
							<div className="portlet__right">
								<div className="portlet__item">
									<img src="public/images/portlet-02.png" alt="" className="portlet__img" />
									<p onClick={() => navigate(`/post`)} className="portlet__action">Nhận ưu đãi <img src="public/icons/arrow.svg" alt="" /></p>
								</div>
								<div className="portlet__item">
									<img src="public/images/portlet-03.png" alt="" className="portlet__img" />
									<p onClick={() => navigate(`/post`)} className="portlet__action">Nhận ưu đãi <img src="public/icons/arrow.svg" alt="" /></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};


export default Home