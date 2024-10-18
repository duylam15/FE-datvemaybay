import React, { useState } from 'react';
import "./Flight.scss";

function FlightDetails() {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleFareClick = () => {
		setIsExpanded(!isExpanded); // Đảo trạng thái khi click
	};

	return (
		<>
			<div className="flightDetail">
				<div className={`container ${isExpanded ? 'expanded' : ''}`}>
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
									06:45
									HAN
									Bay thẳng
									08:55
									SGN
									Nhà ga 1
									Nhà ga 1
								</div>
								<div className="flightDetail__flight--bound-details">
									Thời gian bay
									2h 10min
									2 giờ và 10 phút
									QH 201 được Bamboo Airways khai thác.
								</div>
								<div className="flightDetail__flight--bound-fare" onClick={handleFareClick}>
									Economy Flex
								</div>
							</div>

						</div>
						<div className="flightDetail__flight--breakdown">
							<div className="flightDetail__flight--breakdown-details">
								itinerary-details
							</div>
							<div className="flightDetail__flight--breakdown-fare">
								your-fare
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default FlightDetails;
