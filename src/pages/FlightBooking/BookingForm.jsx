import React, { useState } from 'react';
import AdultForm from './AdultForm';
import ContactInfoForm from './ContactInfoForm';
import SeatSelectionBanner from './SeatSelectionBanner';

const BookingForm = () => {
	const [adults, setAdults] = useState(2); // Set số người lớn
	const [adultData, setAdultData] = useState(Array(adults).fill({ fullName: '', lastName: '', cccd: '', passPort: '', gender: '', birthDate: '' }));
	const [contactData, setContactData] = useState({
		email: '',
		phoneType: 'personal',
		countryCode: '',
		phone: '',
	});

	return (
		<div className="booking-form">
			{[...Array(adults)].map((_, index) => (
				<AdultForm key={index + 1} index={index + 1} adultData={adultData} setAdultData={setAdultData} />
			))}
			<ContactInfoForm contactData={contactData} setContactData={setContactData} />
			<SeatSelectionBanner
				customerCount={2}
				adultData={adultData} // Truyền dữ liệu người lớn
				contactData={contactData} // Truyền dữ liệu liên lạc
			/>
		</div>
	);
};

export default BookingForm
