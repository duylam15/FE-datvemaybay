import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Flight.scss";

function Checkout() {
	const { state } = useLocation();
	const { flight, selectedSeats } = state;

	const handlePayment = () => {
		alert(`Payment successful! Seats booked: ${selectedSeats.join(", ")}`);
	};

	return (
		<div className="checkout">
			<h2>Checkout</h2>
			<p>Airline: {flight.airline}</p>
			<p>Price: ${flight.price}</p>
			<p>Selected Seats: {selectedSeats.join(", ")}</p>
			<button onClick={handlePayment}>Make Payment</button>
		</div>
	);
}

export default Checkout;
