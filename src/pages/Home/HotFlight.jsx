import { AutoComplete, Carousel, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHotFlightsData } from '../../services/homePageServices';

export default function HotFlight() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isRoundTrip, setIsRoundTrip] = useState(false);
	const [departureLocation, setDepartureLocation] = useState('');
	const [arrivalLocation, setArrivalLocation] = useState('');
	const [departureDate, setDepartureDate] = useState('');
	const [returnDate, setReturnDate] = useState('');
	const [numberOfTickets, setNumberOfTickets] = useState('1');
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate()

	const handleTripChange = (e) => {
		setIsRoundTrip(e.target.value === 'round-trip');
	};

	const handleChange = (state, setState) => {
		setState(state);
	};

	// Hàm validate form
	const validateForm = () => {
		if (!departureLocation) {
			setErrorMessage("Vui lòng nhập điểm đi.");
			return false;
		}
		if (!arrivalLocation) {
			setErrorMessage("Vui lòng nhập điểm đến.");
			return false;
		}
		if (!departureDate) {
			setErrorMessage("Vui lòng chọn ngày đi.");
			return false;
		}
		if (!numberOfTickets || numberOfTickets < 1) {
			setErrorMessage("Vui lòng nhập số lượng hành khách.");
			return false;
		}
		if (isRoundTrip && !returnDate) {
			setErrorMessage("Vui lòng chọn ngày về cho chuyến khứ hồi.");
			return false;
		}
		setErrorMessage(""); // Xóa thông báo lỗi nếu form hợp lệ
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // Ngăn form reload lại trang

		if (validateForm()) {
			window.scrollTo(0, 0);
			navigate(`/flightResult`, { state: { departureLocation, arrivalLocation, departureDate, returnDate, numberOfTickets } });
		}
	};

	const handleSwapAirport = () => {
		setDepartureLocation(arrivalLocation);
		setArrivalLocation(departureLocation);
	}

	const [hotFlightsData, setHotFlightsData] = useState([]);
	const hotFlightsDataaa = [
		{
			"id": 1,
			"title": "Quà tặng Bamboo",
			"departureLocation": "ha noi",
			"arrivalLocation": "hcm",
			"description": "Những món quà lưu niệm của Bamboo Airways luôn nhận được sự yêu thích của hành khách.",
			"imgSrc": "public/images/portlet-01.png",
			"departureDate": "2024-02-20",
			"price": "200.000"
		},
		{
			"id": 2,
			"title": "Quà tặng Hè",
			"description": "Món quà tuyệt vời cho mùa hè.",
			"departureDate": "2024-02-20",
			"departureLocation": "ha noi",
			"arrivalLocation": "hcm",
			"price": "200.000",
			"imgSrc": "public/images/portlet-01.png"
		},
		{
			"id": 3,
			"title": "Quà tặng Tết",
			"description": "Quà Tết ý nghĩa dành cho người thân.",
			"departureDate": "2024-02-20",
			"departureLocation": "ha noi",
			"arrivalLocation": "hcm",
			"price": "200.000",
			"imgSrc": "public/images/portlet-01.png"
		},
		{
			"id": 4,
			"title": "Quà tặng Noel",
			"description": "Món quà thú vị cho dịp lễ Giáng sinh.",
			"departureDate": "2024-02-20",
			"departureLocation": "ha noi",
			"arrivalLocation": "hcm",
			"price": "200.000",
			"imgSrc": "public/images/portlet-01.png"
		},
		{
			"id": 5,
			"title": "Quà tặng Sinh Nhật",
			"description": "Món quà độc đáo cho ngày sinh nhật.",
			"departureDate": "2024-02-20",
			"departureLocation": "ha noi",
			"arrivalLocation": "hcm",
			"price": "200.000",
			"imgSrc": "public/images/portlet-01.png"
		},
		{
			"id": 6,
			"title": "Quà tặng Khuyến Mãi",
			"description": "Món quà hấp dẫn trong các chương trình khuyến mãi.",
			"departureDate": "2024-02-20",
			"departureLocation": "ha noi",
			"arrivalLocation": "hcm",
			"price": "200.000",
			"imgSrc": "public/images/portlet-01.png"
		}
	]
	// useEffect(() => {
	// 	const fetchServiceData = async () => {
	// 		try {
	// 			const response = await getHotFlightsData()
	// 			setHotFlightsData(response.data);
	// 		} catch (error) {
	// 			console.error("Error fetching service data:", error);
	// 		}
	// 	};
	// 	fetchServiceData();
	// }, []);

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

	const handleItemClick = (item) => {
		console.log("Item clicked:", item); // Kiểm tra item đã được click
		setSelectedItem(item);
		setDepartureLocation(item.departureLocation); // Cập nhật giá trị departureLocation từ item
		setArrivalLocation(item.arrivalLocation); // Cập nhật giá trị arrivalLocation từ item
		setDepartureDate(item.departureDate);
		setIsModalVisible(true);
	};

	const handleModalClose = () => {
		setIsModalVisible(false);
	};

	return (
		<div className="hotflight">
			<div className="container">
				<div className="hotflight__inner">
					<h1 className="hotflight__heading">CHUYẾN BAY HOT</h1>
					<Carousel
						className="hotflight__list"
						infinite={true}
						slidesToShow={4}
						slidesToScroll={1}
						autoplay={true}
						autoplaySpeed={3000}
						arrows
						prevArrow={<CustomPrevArrow />}
						nextArrow={<CustomNextArrow />}
						dots
					>
						{hotFlightsDataaa?.map((item) => (
							<div
								className="hotflight__item"
								key={item.id}
								onClick={() => handleItemClick(item)} // Xử lý click vào item
							>
								<img src={item.imgSrc} alt="" className="hotflight__img" />
								<section className="hotflight__section">
									<h3 className="hotflight__section--heading">{item.title}</h3>
									<p className="hotflight__section--desc">{item.description}</p>
								</section>
							</div>
						))}
					</Carousel>
				</div>
			</div>
			{selectedItem && (
				<Modal
					title={selectedItem.title}
					open={isModalVisible} // Sử dụng visible để hiển thị modal
					onCancel={handleModalClose}
					footer={null}
					className='model'
				>
					<form className="hotflight-form" onSubmit={handleSubmit} noValidate>
						<h2>Đặt vé máy bay</h2>

						{/* Hiển thị thông báo lỗi ngay dưới "Đặt vé máy bay" */}
						{errorMessage && (
							<div className="error-message">
								<img src="public/icons/warning.svg" alt="Error" style={{ marginRight: '5px' }} />
								Aleart:
								<span className='error-message--text'>{errorMessage}</span>
							</div>
						)}

						<div className="trip-type">
							<label>
								<input
									type="radio"
									name="tripType"
									value="one-way"
									onChange={handleTripChange}
									checked={!isRoundTrip}
								/>
								Một chiều
							</label>
							<label>
								<input
									type="radio"
									name="tripType"
									value="round-trip"
									onChange={handleTripChange}
									checked={isRoundTrip}
								/>
								Khứ hồi
							</label>
						</div>

						<div className="input__inner">
							<div className="input__book">

								<div className='input-field-wrap'>
									<div className="input-field">
										<label>TỪ:</label>
										<AutoComplete
											className='input__form'
											onChange={(value) => handleChange(value, setDepartureLocation)}
											value={selectedItem.departureLocation} disabled>
											<Input value={selectedItem.departureLocation} />
										</AutoComplete>
									</div>

									<div className="input-field">
										<label>ĐẾN:</label>
										<AutoComplete
											className="input__form"
											onChange={(value) => handleChange(value, setArrivalLocation)}
											value={selectedItem.arrivalLocation} disabled>
											<Input value={selectedItem.arrivalLocation} />
										</AutoComplete>
									</div>
								</div>

								<div className='input-field-wrap'>
									<div className="input-field ">
										<label>Ngày đi:</label>
										<Input
											type="date"
											value={selectedItem.departureDate} // Đặt giá trị ngày đi từ selectedItem
											onChange={(e) => handleChange(e.target.value, setDepartureDate)}
										/>
									</div>

									{isRoundTrip && (
										<div className="input-field">
											<label>Ngày về:</label>
											<Input
												type="date"
												value={returnDate}
												onChange={(e) => handleChange(e.target.value, setReturnDate)}
											/>
										</div>
									)}

									<div className="input-field">
										<label>Số lượng hành khách:</label>
										<Input
											type="number"
											value={numberOfTickets}
											onChange={(e) => handleChange(e.target.value, setNumberOfTickets)}
											min={1}
										/>
									</div>
								</div>
							</div>
						</div>
						<button type="submit" className="hotflight__btn">
							Xác nhận
						</button>
					</form>
				</Modal>
			)}
		</div>
	);
}
