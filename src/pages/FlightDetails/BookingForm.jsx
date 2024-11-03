import React, { useState } from 'react';
import AdultForm from './AdultForm';
import ContactInfoForm from './ContactInfoForm';
import SeatSelectionBanner from './SeatSelectionBanner';

const BookingForm = ({ selectedTicket, numberOfTicketsToDetail }) => {

	const numberOfTicketsToDetailNumber = Number(numberOfTicketsToDetail);
	console.log("numberOfTicketsToDetailNumber", numberOfTicketsToDetailNumber)

	const [adults, setAdults] = useState(numberOfTicketsToDetailNumber); // Set số người lớn
	console.log("adultsadults", adults)
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
					selectedTicket={selectedTicket} numberOfTicketsToDetailNumber={numberOfTicketsToDetailNumber}
				/>
			))}
			<ContactInfoForm contactData={contactData} setContactData={setContactData}
				selectedTicket={selectedTicket} numberOfTicketsToDetailNumber={numberOfTicketsToDetailNumber}
			/>
			<SeatSelectionBanner
				customerCount={adults}
				setAdultData={setAdultData}
				setContactData={setContactData}
				adultData={adultData} // Truyền dữ liệu người lớn
				contactData={contactData} // Truyền dữ liệu liên lạc
				selectedTicket={selectedTicket} numberOfTicketsToDetailNumber={numberOfTicketsToDetailNumber}
			/>
		</div>
	);
};

export default BookingForm
