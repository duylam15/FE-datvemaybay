import React, { useEffect, useState } from 'react'
import { Carousel, Modal } from 'antd';
import { getNewsData } from '../../services/homePageServices';

export default function News() {
	const contentStyle = {
		color: '#000',
		height: '68px',
		textAlign: 'center',
		background: '#fff',
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start",
		flexDirection: "column",
	};
	const CustomPrevArrow = ({ className, style, onClick }) => {
		return (
			<div
				className={className}
				style={{ ...style, top: "28px", left: '735px', zIndex: 1, color: "#000", width: "2px", height: "2px" }}
				onClick={onClick}
			>
			</div>
		);
	};
	const CustomNextArrow = ({ className, style, onClick }) => {
		return (
			<div
				className={className}
				style={{ ...style, top: "28px", right: '20px', zIndex: 1, color: "#000", width: "2px", height: "2px" }}
				onClick={onClick}
			>
			</div>
		);
	};

	const [dataNews, setDataNews] = useState([]);

	useEffect(() => {
		const fetchdataNews = async () => {
			try {
				const response = await getNewsData()
				setDataNews(response.data);
			} catch (error) {
				console.error("Error fetching service data:", error);
			}
		};
		fetchdataNews();
	}, []);



	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedNews, setSelectedNews] = useState(null);
	const [currentSlide, setCurrentSlide] = useState(1); // Trạng thái cho số thứ tự slide hiện tại


	// Hàm hiển thị modal khi nhấn vào tiêu đề bài viết
	const showModal = (newsItem) => {
		setSelectedNews(newsItem);
		setIsModalVisible(true);
	};

	// Hàm đóng modal
	const handleCancel = () => {
		setIsModalVisible(false);
		setSelectedNews(null);
	};

	// Hàm cập nhật số thứ tự slide hiện tại
	const onChangeSlide = (current) => {
		setCurrentSlide(current + 1); // Vì index của slide bắt đầu từ 0, nên cần +1
	};

	return (
		<div className="news">
			<div className="container">
				<div className="news__inner">
					<div className="news__header">
						<img src="public/icons/news.svg" alt="" className="news__icon" />
						<h4 className="news__heading">Tin tức</h4>
					</div>
					<div>
						<div className="news_num-slide" >
							{currentSlide}/{dataNews?.length}
						</div>
						<Carousel
							className='Carousel'
							arrows
							prevArrow={<CustomPrevArrow />}
							nextArrow={<CustomNextArrow />}
							dots={false}
							infinite={false}
							afterChange={onChangeSlide}
						>
							{dataNews?.map((newsItem, index) => (
								<div key={index}>
									<div style={contentStyle}>
										<span className='news__date'>{newsItem.date}</span>
										<h3 className='news__title' onClick={() => showModal(newsItem)}>
											{newsItem.title}
										</h3>
									</div>
								</div>
							))}
						</Carousel>


						<Modal
							title={selectedNews?.title}  // Tiêu đề của bài viết
							open={isModalVisible}     // Kiểm soát hiển thị modal
							onCancel={handleCancel}      // Đóng modal
							footer={null}                // Ẩn footer của modal
						>
							{selectedNews && (
								<div>
									<p><strong>Ngày:</strong> {selectedNews.date}</p>
									<p><strong>Nội dung:</strong> {selectedNews.desc}</p>
								</div>
							)}
						</Modal>
					</div>
					<div className="news__action">
						<button className="news__btn">
							Xem thêm
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
