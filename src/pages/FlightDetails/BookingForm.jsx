import React, { useEffect, useState } from 'react';
import AdultForm from './AdultForm';
import ContactInfoForm from './ContactInfoForm';
import SeatSelectionBanner from './SeatSelectionBanner';
import axios from 'axios';

const BookingForm = ({ selectedTicket, numberOfTicketsToDetail }) => {

	const numberOfTicketsToDetailNumber = Number(numberOfTicketsToDetail);
	console.log("numberOfTicketsToDetailNumber", numberOfTicketsToDetailNumber)

	const [adults, setAdults] = useState(numberOfTicketsToDetailNumber); // Set số người lớn
	console.log("adultsadults", adults)
	const [adultData, setAdultData] = useState(Array(adults).fill({ fullName: '', lastName: '', cccd: '', passPort: '', gender: '', birthDate: '' }));
	const [contactData, setContactData] = useState({
		cccd: '',
		email: '',
		phoneType: 'personal',
		soDienThoai: '',
	});

	const [customers, setCustomers] = useState([]); // Lưu thông tin khách hàng từ API

	useEffect(() => {
		// Fetch danh sách khách hàng và lưu thông tin
		const fetchCustomers = async () => {
			try {
				const response = await axios.get('http://localhost:8080/khachhang/getAllCustomer');
				if (response.data.statusCode === 200) {
					setCustomers(response.data.data); // Lưu toàn bộ dữ liệu khách hàng
				} else {
					console.error('Lỗi khi lấy danh sách khách hàng:', response.data.message);
				}
			} catch (error) {
				console.error('Lỗi khi gọi API:', error.message);
			}
		};
		fetchCustomers();
	}, []); // Chỉ gọi API một lần khi component mount

	console.log("contactDatacontactDatacontactData", contactData)

	return (
		<div className="booking-form__flight">
			{[...Array(adults)].map((_, index) => (
				<AdultForm key={index + 1} index={index + 1} adultData={adultData} setAdultData={setAdultData}
					selectedTicket={selectedTicket} numberOfTicketsToDetailNumber={numberOfTicketsToDetailNumber}
				/>
			))}
			<ContactInfoForm contactData={contactData} setContactData={setContactData} customers={customers} setCustomers={setCustomers}
				selectedTicket={selectedTicket} numberOfTicketsToDetailNumber={numberOfTicketsToDetailNumber}
			/>
			<SeatSelectionBanner
				customerCount={adults}
				setAdultData={setAdultData}
				setContactData={setContactData}
				adultData={adultData} // Truyền dữ liệu người lớn
				contactData={contactData} // Truyền dữ liệu liên lạc
				customers={customers}
				setCustomers={setCustomers}
				selectedTicket={selectedTicket} numberOfTicketsToDetailNumber={numberOfTicketsToDetailNumber}
			/>
		</div>
	);
};

export default BookingForm
