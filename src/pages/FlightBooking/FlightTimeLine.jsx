import React, { useState } from 'react'

export default function FlightTimeLine() {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleFareClick = () => {
		setIsExpanded(!isExpanded);
	};

	const flightData = [
		{
			journeyDetails: {
				timeline: "13 giờ 30 phút",
				departureTime: "18:30",
				departureCity: "TP. Hồ Chí Minh",
				departureAirport: "Sân bay Tân Sơn Nhất, Việt Nam",
				terminal: "Nhà ga 2",
				flightNumber: "VN 98",
				operatedBy: "Vietnam Airlines",
				planeModel: "AIRBUS A350-900",
				stopover: {
					timeline: "15 giờ 21 phút",
					location: "Sân bay San Francisco, Hoa Kỳ",
					stops: 1
				}
			}
		},
		// Thêm chuyến bay thứ hai
		{
			journeyDetails: {
				timeline: "10 giờ 45 phút",
				departureTime: "14:15",
				departureCity: "Hà Nội",
				departureAirport: "Sân bay Nội Bài, Việt Nam",
				terminal: "Nhà ga 1",
				flightNumber: "VN 123",
				operatedBy: "Vietnam Airlines",
				planeModel: "BOEING 787-9",
				stopover: null
			},

		}
	];
	const fareDetails = [{
		class: "Phổ Thông Tiết Kiệm",
		changeFee: "1.500.000 VND",
		refundFee: "2.500.000 VND",
		checkedLuggage: "1 x 23 kg",
		handLuggage: "1 túi",
		mileage: "⭐Tích lũy 50% số dặm"
	}]

	return (
		<div>
			<div className="flightDetail">
				<div className={`container ${isExpanded ? 'expanded' : ''}`}>
					<h2 className='book--heading'>Các chuyến bay</h2>
					<div className={`flightDetail__inner ${isExpanded ? 'expanded' : ''}`}>
						<div className={`flightDetail__flight ${isExpanded ? 'expanded' : ''}`}>
							<div className="flightDetail__flight--bound-information">
								<div className="flightDetail__flight--text">
									Hà Nội đến TP. Hồ Chí Minh
								</div>
								<div className="flightDetail__flight--time">
									-
									Thứ Bảy, 19 tháng 10, 2024
								</div>
							</div>
							<div className="flightDetail__flight--bound">
								<div className="flightDetail__flight--bound-timeline">
									<div className="flightDetail__flight--bound-timeline-from">
										<div className="flightDetail__flight--bound-timeline-time">
											06:45
										</div>
										<div className="flightDetail__flight--bound-timeline-airport">
											HAN
										</div>
										<div className="flightDetail__flight--bound-timeline-gas">
											Nhà ga 10
										</div>
									</div>
									<div className="flightDetail__flight--bound-timeline-transport">
										---------------------------------------------------------------
										{!flightData ? <p>Bay thẳng</p> :
											<div className='flightDetail__flight--bound-timeline-transport-wrap'>
												<div className="flightDetail__flight--bound-timeline-transport-number">
													1
												</div>
												<div className="flightDetail__flight--bound-timeline-transport-code">SFO</div>
												<div className="flightDetail__flight--bound-timeline-transport-time">15 giờ 21 phút
												</div>
											</div>
										}

									</div>
									<div className="flightDetail__flight--bound-timeline-to">
										<div className="flightDetail__flight--bound-timeline-time">
											06:45
										</div>
										<div className="flightDetail__flight--bound-timeline-airport">
											SDD
										</div>
										<div className="flightDetail__flight--bound-timeline-gas">
											Nhà ga 4
										</div>
									</div>
								</div>
								<div className="flightDetail__flight--wrap">
									<div className="flightDetail__flight--bound-details">
										<div className="flightDetail__flight--bound-details-wrap">
											<div className="flightDetail__flight--bound-details-sect">
												<img src="public/icons/clock-ui-web-svgrepo-com.svg" alt="" className="flightDetail__flight--bound-details-icon" />
												<div className="flightDetail__flight--bound-details-text">
													Thời gian bay 2h 10min
												</div>
											</div>
											<div className="flightDetail__flight--bound-details-sect">
												<img src="public/icons/plane-taking-off-svgrepo-com.svg" alt="" className="flightDetail__flight--bound-details-icon" />
												<div className="flightDetail__flight--bound-details-text">
													QH 201 được Bamboo Airways khai thác.
												</div>
											</div>
										</div>

									</div>
									<div className="flightDetail__flight--bound-fare" onClick={handleFareClick}>
										Economy Flex
										{isExpanded ? <img src="public/icons/down-chevron-svgrepo-com (1).svg" alt="" className="flightDetail__flight--bound-fare-icon" /> : <img src="public/icons/down-chevron-svgrepo-com.svg" alt="" className="flightDetail__flight--bound-fare-icon" />}

									</div>
								</div>
							</div>
						</div>
						<div className="flightDetail__flight--breakdown">
							<div className="flightDetail__flight--breakdown-details-list">
								<h4 className="flightDetail__flight--breakdown-details-title">Chi tiết hành trình</h4>
								{flightData.map((flight, index) => (
									<div className="flightDetail__flight--breakdown-details" key={index}>
										<div className="flightDetail__flight--breakdown-details-wrap">
											<div className="flightDetail__flight--breakdown-details-timeline">
												{flight.journeyDetails.timeline}
											</div>
											<div className="flightDetail__flight--breakdown-details-places-wrap">
												<div className="flightDetail__flight--breakdown-details-places">
													<div className="flightDetail__flight--breakdown-details-time">
														{flight.journeyDetails.departureTime} {flight.journeyDetails.departureCity}
													</div>
													<div className="flightDetail__flight--breakdown-details-location">
														{flight.journeyDetails.departureAirport}
													</div>
													<div className="flightDetail__flight--breakdown-details-gas">
														{flight.journeyDetails.terminal}
													</div>
												</div>
												<div className="flightDetail__flight--breakdown-details-places">
													<div className="flightDetail__flight--breakdown-details-time">
														{flight.journeyDetails.departureTime} {flight.journeyDetails.departureCity}
													</div>
													<div className="flightDetail__flight--breakdown-details-location">
														{flight.journeyDetails.departureAirport}
													</div>
													<div className="flightDetail__flight--breakdown-details-gas">
														{flight.journeyDetails.terminal}
													</div>
												</div>
											</div>
										</div>
										<div className="flightDetail__flight--breakdown-details-plane">
											<div className="flightDetail__flight--breakdown-details-number">
												Số hiệu chuyến bay: {flight.journeyDetails.flightNumber}
											</div>
											<div className="flightDetail__flight--breakdown-details-exploit">
												Khai thác bởi: {flight.journeyDetails.operatedBy}
											</div>
											<div className="flightDetail__flight--breakdown-details-code">
												Mẫu máy bay: {flight.journeyDetails.planeModel}
											</div>
										</div>
										{flight.journeyDetails.stopover ? <div className="flightDetail__flight--breakdown-details-transport">
											<div className="flightDetail__flight--breakdown-details-transport-timeline"> {flight.journeyDetails.stopover.timeline}
											</div>
											<img src="public/icons/building-2-svgrepo-com.svg" alt="" className="flightDetail__flight--breakdown-details-transport-icon" />
											<div className="flightDetail__flight--breakdown-details-transport-places">
												{flight.journeyDetails.stopover.stops} điểm dừng tại {flight.journeyDetails.stopover.location}
											</div>
										</div> : <></>}

									</div>
								))}
							</div>

							<div className="flightDetail__flight--breakdown-fare">
								<h4 className="flightDetail__flight--breakdown-details-title">Giá vé của Quý khách</h4>
								{fareDetails.map((flight, index) => (
									<div key={index}>
										<div className="flightDetail__flight--breakdown-fare-price-list">
											<div className="flightDetail__flight--breakdown-fare-text">
												<img src="public/icons/tick-svgrepo-com.svg" alt="" className="flightDetail__flight--breakdown-fare-icon" />
												Thay đổi vé Phí đổi tối đa {flight.changeFee} mỗi hành khách cho toàn bộ vé
											</div>
											<div className="flightDetail__flight--breakdown-fare-text">
												<img src="public/icons/tick-svgrepo-com.svg" alt="" className="flightDetail__flight--breakdown-fare-icon" />
												Hoàn vé Phí hoàn tối đa {flight.refundFee} mỗi hành khách cho toàn bộ vé
											</div>
											<div className="flightDetail__flight--breakdown-fare-text">
												<img src="public/icons/tick-svgrepo-com.svg" alt="" className="flightDetail__flight--breakdown-fare-icon" />
												Hành lý ký gửi {flight.checkedLuggage}
											</div>
											<div className="flightDetail__flight--breakdown-fare-text">
												<img src="public/icons/tick-svgrepo-com.svg" alt="" className="flightDetail__flight--breakdown-fare-icon" />
												Hành lý xách tay {flight.handLuggage}
											</div>
											<div className="flightDetail__flight--breakdown-fare-text">
												<img src="public/icons/tick-svgrepo-com.svg" alt="" className="flightDetail__flight--breakdown-fare-icon" />
												Số dặm tích được {flight.mileage}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>


					</div>
					<h2 className='book--heading'>Hành khách</h2>
				</div>
			</div>
		</div>
	)
}

