import { Carousel } from 'antd'
import React, { useEffect, useState } from 'react'
import { getPopularData } from '../../services/homePageServices';
import { useNavigate } from 'react-router-dom';

export default function Popular() {
	const navigate = useNavigate()
	const [popularData, setPopularData] = useState([]);

	useEffect(() => {
		const fetchServiceData = async () => {
			try {
				const response = await getPopularData()
				setPopularData(response.data);
			} catch (error) {
				console.error("Error fetching service data:", error);
			}
		};
		fetchServiceData();
	}, []);
	return (
		<>
			<div className="popular">
				<div className="container">
					<div className="popular__inner">
						<div className="popular__top">
							<h1 className="popular__heading heading">Điểm đến phổ biến</h1>
							<div className="tips">
								<img src="public/icons/tips-icon.svg" alt="" className="tips__icon" />
								<p className="tips__desc">
									Tham khảo  <span className="highlight">các ưu đãi</span> hấp dẫn!
								</p>
							</div>
						</div>

						<div className="popular__content">
							<Carousel
								className="popular__list"
								infinite={true}
								slidesToShow={1}
								slidesToScroll={1}
								fade
								dots
								autoplay={true}
								autoplaySpeed={3000}

							>
								{popularData?.map((item, index) => (
									<div
										className={`popular__item `}
										key={item.id}
									>
										<img src={item.imgSrc} alt={item.title} className="popular__img" />
										<section className="popular__section">
											<h3 className="popular__item--heading">{item.title}</h3>
											<p className="popular__item--desc">{item.description}</p>
											<p onClick={() => navigate(`/post`)} className="popular__item--action">Nhận ưu đãi<img src="public/icons/arrow.svg" alt="" /></p>
										</section>
										<div className="popular__thumb">
											<img
												src={index + 1 < popularData.length ? popularData[index + 1].imgSrc : popularData[0].imgSrc}
												alt={`Thumbnail for ${index + 1 < popularData.length ? popularData[index + 1].title : popularData[0].title}`}
												className="popular__thumb--img"
											/>
											<div className="popular__thumb--title">
												<p className="popular__thumb--text">Bạn cũng có thể thích</p>
												{index + 1 < popularData.length ? popularData[index + 1].title : popularData[0].title}
											</div>
										</div>
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
