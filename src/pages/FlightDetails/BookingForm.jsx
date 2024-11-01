import React, { useState } from 'react';
import AdultForm from './AdultForm';
import ContactInfoForm from './ContactInfoForm';
import SeatSelectionBanner from './SeatSelectionBanner';

const BookingForm = ({ selectedTicket, numberOfTicketsToDetail }) => {
	const [adults, setAdults] = useState(numberOfTicketsToDetail); // Set số người lớn
	const [adultData, setAdultData] = useState(Array(adults).fill({ fullName: '', lastName: '', cccd: '', passPort: '', gender: '', birthDate: '' }));
	const [contactData, setContactData] = useState({
		email: '',
		phoneType: 'personal',
		countryCode: '',
		phone: '',
	});

	return (
		<div className="booking-form__flight">
			{[...Array(adults)].map((_, index) => (
				<AdultForm key={index + 1} index={index + 1} adultData={adultData} setAdultData={setAdultData}
					selectedTicket={selectedTicket} numberOfTicketsToDetail={numberOfTicketsToDetail}
				/>
			))}
			<ContactInfoForm contactData={contactData} setContactData={setContactData}
				selectedTicket={selectedTicket} numberOfTicketsToDetail={numberOfTicketsToDetail}
			/>
			<SeatSelectionBanner
				customerCount={adults}
				adultData={adultData} // Truyền dữ liệu người lớn
				contactData={contactData} // Truyền dữ liệu liên lạc
				selectedTicket={selectedTicket} numberOfTicketsToDetail={numberOfTicketsToDetail}
			/>


		</div>
	);
};

export default BookingForm
