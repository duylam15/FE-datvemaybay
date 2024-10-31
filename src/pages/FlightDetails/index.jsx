import React from 'react';
import './Flight.scss';
import BookingForm from './BookingForm';
import FlightTimeLine from './FlightTimeLine';

function FlightDetails() {
	return (
		<>
			<FlightTimeLine />
			<BookingForm />
		</>
	);
}

export default FlightDetails;
