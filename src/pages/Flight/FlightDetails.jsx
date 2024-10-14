import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Flight.scss";

function FlightDetails() {
	const navigate = useNavigate();
	const location = useLocation();
	const flight = location.state?.flight; // Lấy dữ liệu chuyến bay từ state

	const seats = Array.from({ length: 10 }, (_, index) => ({
		seatNumber: index + 1,
		isSelected: false,
		isLocked: false, // Bạn có thể điều chỉnh khóa ghế theo yêu cầu
	}));

	const [seatSelection, setSeatSelection] = useState(seats);

	const handleSeatSelect = (seatNumber) => {
		const updatedSeats = seatSelection.map((seat) =>
			seat.seatNumber === seatNumber ? { ...seat, isSelected: !seat.isSelected } : seat
		);
		setSeatSelection(updatedSeats);
	};

	const handleCheckout = () => {
		const selectedSeats = seatSelection
			.filter((seat) => seat.isSelected)
			.map((seat) => seat.seatNumber);

		if (selectedSeats.length === 0) {
			alert("Vui lòng chọn ít nhất 1 ghế.");
			return;
		}

		// Chuyển thông tin vé đến trang Checkout
		navigate("/checkout", { state: { flight, selectedSeats } });
	};

	return (
		<div className="flight-details">
			<h3>{flight.airline}</h3>
			<p>Chuyến bay: {flight.flightNumber}</p>
			<p>Điểm đi: {flight.departure}</p>
			<p>Điểm đến: {flight.arrival}</p>
			<p>Giờ đi: {new Date(flight.departureTime).toLocaleString()}</p>
			<p>Giờ đến: {new Date(flight.arrivalTime).toLocaleString()}</p>
			<p>Giá: {flight.price} VND</p>

			<div className="seat-selection">
				<h3>Chọn ghế của bạn</h3>
				<div className="seats">
					{seatSelection.map((seat) => (
						<button
							key={seat.seatNumber}
							className={`seat ${seat.isSelected ? "selected" : ""}`}
							onClick={() => handleSeatSelect(seat.seatNumber)}
						>
							{seat.seatNumber}
						</button>
					))}
				</div>
			</div>

			<button onClick={handleCheckout}>Tiến hành thanh toán</button>
		</div>
	);
}

export default FlightDetails;
