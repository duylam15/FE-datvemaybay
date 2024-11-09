import React, { useEffect, useState } from 'react';
import './Flight.scss';
import BookingForm from './BookingForm';
import FlightTimeLine from './FlightTimeLine';
import { useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function FlightDetails() {
	const location = useLocation();
	const { selectedTicket, numberOfTicketsToDetail } = location.state || {};
	console.log("selectedTicket", selectedTicket)
	console.log("selectednumberOfTicketsToDetailTicket", numberOfTicketsToDetail)

	
	
	return (
		<>
			<FlightTimeLine selectedTicket={selectedTicket} numberOfTicketsToDetail={numberOfTicketsToDetail} />
			<BookingForm selectedTicket={selectedTicket} numberOfTicketsToDetail={numberOfTicketsToDetail} />
		</>
	);
}

export default FlightDetails;
