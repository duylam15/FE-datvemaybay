import { Carousel } from 'antd'
import React, { useEffect, useState } from 'react'
import { getBonusServicesData } from '../../services/homePageServices';

export default function BonusService() {

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
			</div>
		);
	};

	const [bonusItems, setBonusItems] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getBonusServicesData();
				setBonusItems(response.data);
			} catch (error) {
				console.error('Lỗi khi lấy dữ liệu dịch vụ bổ trợ:', error);
			}
		};

		fetchData();
	}, []);

	const [currentIndex, setCurrentIndex] = useState(0); // Lưu chỉ số slide hiện tại

	const handleAfterChange = (current) => {
		setCurrentIndex(current); // Cập nhật chỉ số slide hiện tại
	};

	return (
		<>
			<div className="bonus-service">
				<div className="container">
					<div className="bonus-service__inner">
						<h1 className="bonus-service__heading">DỊCH VỤ BỔ TRỢ</h1>
						<div >
							{currentIndex ? <div className="circle__left"></div> : <></>}{
								currentIndex === 3 ? <> </> : <div className="circle__right"></div>
							}

							<Carousel
								arrows
								className="bonus-service__list"
								prevArrow={<CustomPrevArrow />}
								nextArrow={<CustomNextArrow />}
								infinite={false}
								slidesToShow={3}
								slidesToScroll={1}
								afterChange={handleAfterChange}
							>
								{bonusItems?.map(item => (
									<div className="bonus-service__item" key={item.id}>
										<img src={item.imgSrc} alt="" className="bonus-service__img" />
										<section className="bonus-service__section">
											<h3 className="bonus-service__item--heading">{item.heading}</h3>
											<p className="bonus-service__item--desc">{item.desc}</p>
										</section>
									</div>
								))}
							</Carousel>
						</div>
					</div>
				</div>
			</div>



		</>
	)
}
