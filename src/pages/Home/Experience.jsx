import { Carousel } from 'antd';
import React, { useEffect, useState } from 'react';
import { getExperienceData } from '../../services/homePageServices';

export default function Experience() {

	const contentStyle = {
		margin: 0,
		height: '160px',
		color: '#fff',
		lineHeight: '160px',
		textAlign: 'center',
		background: '#364d79',
	};

	const CustomPrevArrow = ({ className, style, onClick }) => {
		return (
			<div
				className={className}
				style={{
					...style,
					top: "131px",
					left: '-44px',
					zIndex: 1,
					color: "black", // Màu cho mũi tên
					cursor: "pointer",
				}}
				onClick={onClick}
			>
				{/* Thêm biểu tượng hoặc nội dung cho mũi tên trái ở đây */}
			</div>
		);
	};

	const CustomNextArrow = ({ className, style, onClick }) => {
		return (
			<div
				className={className}
				style={{
					...style,
					top: "131px",
					right: '-44px',
					zIndex: 1,
					color: "black", // Màu cho mũi tên
					cursor: "pointer",
				}}
				onClick={onClick}
			>
				{/* Thêm biểu tượng hoặc nội dung cho mũi tên phải ở đây */}
			</div>
		);
	};

	const [currentIndex, setCurrentIndex] = useState(0); // Lưu chỉ số slide hiện tại

	const handleAfterChange = (current) => {
		setCurrentIndex(current); // Cập nhật chỉ số slide hiện tại
	};

	const [experienceData, setExperienceData] = useState([])
	const experienceDataaa = [
		{
			"id": 1,
			"title": "Quà tặng Bamboo",
			"description": "Những món quà lưu niệm của Bamboo Airways luôn nhận được sự yêu thích của hành khách.",
			"imgSrc": "public/images/experience-01.png"
		},
		{
			"id": 2,
			"title": "Quà tặng Hè",
			"description": "Các món quà tặng cho mùa hè đầy năng lượng và vui tươi.",
			"imgSrc": "public/images/experience-02.png"
		},
		{
			"id": 3,
			"title": "Quà tặng Tết",
			"description": "Những món quà ý nghĩa cho mùa Tết cổ truyền.",
			"imgSrc": "public/images/experience-03.png"
		},
		{
			"id": 4,
			"title": "Quà tặng Noel",
			"description": "Món quà tuyệt vời cho mùa Giáng sinh.",
			"imgSrc": "public/images/experience-04.png"
		},
		{
			"id": 5,
			"title": "Quà tặng Sinh Nhật",
			"description": "Món quà đầy bất ngờ cho ngày sinh nhật của bạn bè.",
			"imgSrc": "public/images/experience-05.png"
		}
	]
	// useEffect(() => {
	// 	const fetchServiceData = async () => {
	// 		try {
	// 			const response = await getExperienceData()
	// 			setExperienceData(response.data);
	// 		} catch (error) {
	// 			console.error("Error fetching service data:", error);
	// 		}
	// 	};
	// 	fetchServiceData();
	// }, []);


	return (
		<>
			<div className="experience-section">
				<div className="container">
					<div className="experience-section__inner">
						<h1 className="experience-section__heading">BAMBOO EXPERIENCE</h1>
						<div>
							<Carousel
								className="experience-list"
								arrows
								prevArrow={<CustomPrevArrow />}
								nextArrow={<CustomNextArrow />}
								dots
								infinite={false}
								slidesToShow={2}
								slidesToScroll={1}
								afterChange={handleAfterChange}
							>
								{experienceDataaa?.map((item, index) => (
									<div
										className={`experience-section__item ${index === currentIndex ? 'active' : ''}`}
										key={item.id}
									>
										<img src={item.imgSrc} alt={item.title} className="experience-section__img" />
										<section className="experience-section__section">
											<h3 className="experience-section__item--heading">{item.title}</h3>
											<p className="experience-section__item--desc">{item.description}</p>
											<p onClick={() => {
												window.scrollTo(0, 0); navigate(`/post`)
											}} className="experience-section__item--action">Nhận ưu đãi </p>
										</section>
									</div>
								))}
							</Carousel>



						</div>
					</div>
				</div>
			</div>
		</>
	);
}
