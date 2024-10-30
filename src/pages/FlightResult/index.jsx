import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FlightResult = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const flights = location.state?.flights || []; // Lấy dữ liệu chuyến bay từ state

	// Hàm xử lý khi nhấn nút "Đặt vé"
	const handleBookFlight = (flight) => {
		navigate("/flightDetails", { state: { flight } }); // Chuyển đến trang FlightDetails và gửi thông tin chuyến bay
	};

	return (
		<div>
			<h2>Kết quả tìm kiếm chuyến bay</h2>
			{flights.length === 0 ? (
				<p>Không tìm thấy chuyến bay nào.</p>
			) : (
				<ul>
					{flights.map((flight, index) => (
						<li key={index}>
							<h3>{flight.airline}</h3>
							<p>Chuyến bay: {flight.flightNumber}</p>
							<p>Điểm đi: {flight.departure}</p>
							<p>Điểm đến: {flight.arrival}</p>
							<p>Giờ đi: {new Date(flight.departureTime).toLocaleString()}</p>
							<p>Giờ đến: {new Date(flight.arrivalTime).toLocaleString()}</p>
							<p>Giá: {flight.price} VND</p>
							<button onClick={() => handleBookFlight(flight)}>Đặt vé</button> {/* Nút đặt vé */}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default FlightResult;
