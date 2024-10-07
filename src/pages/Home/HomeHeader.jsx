import React, { useState } from 'react'
import { AutoComplete, Input } from 'antd';

export default function HomeHeader() {

	const airports = [
		{ label: 'Tân Sơn Nhất (SGN)', value: 'SGN' },
		{ label: 'Nội Bài (HAN)', value: 'HAN' },
		{ label: 'Đà Nẵng (DAD)', value: 'DAD' },
		{ label: 'Phú Quốc (PQC)', value: 'PQC' },
		{ label: 'Cát Bi (HPH)', value: 'HPH' },
		// Thêm các sân bay khác tùy ý
	];

	const [isRoundTrip, setIsRoundTrip] = useState(false);
	const [fromAirport, setFromAirport] = useState('');
	const [toAirport, setToAirport] = useState('');

	const handleTripChange = (e) => {
		setIsRoundTrip(e.target.value === 'round-trip');
	};

	const handleSelectFromAirport = (value, option) => {
		setFromAirport(`${option.label} (${value})`);
	};

	const handleSelectToAirport = (value, option) => {
		setToAirport(`${option.label} (${value})`);
	};

	const handleChangeFromAirport = (fromAirport) => {
		setFromAirport(fromAirport);
	};
	const handleChangeToAirport = (toAirport) => {
		setToAirport(toAirport);
	};

	return (
		<div className="home-header">
			<div className="container">
				<div className="home-header__inner">
					<form className="booking-form">
						<h2>Đặt vé máy bay</h2>
						<div className="trip-type">
							<label>
								<input
									type="radio"
									name="tripType"
									value="one-way"
									onChange={handleTripChange}
									checked={!isRoundTrip}
								/>
								Một chiều
							</label>
							<label>
								<input
									type="radio"
									name="tripType"
									value="round-trip"
									onChange={handleTripChange}
									checked={isRoundTrip}
								/>
								Khứ hồi
							</label>
						</div>

						<div className="input__inner">
							<div className="input__book">
								<div className="input-field">
									<label>Từ:</label>
									<AutoComplete
										className='input__form'
										options={airports}
										filterOption={(inputValue, option) =>
											option.label.toLowerCase().includes(inputValue.toLowerCase())
										}
										onSelect={handleSelectFromAirport}
										onChange={handleChangeFromAirport}
										value={fromAirport} >
										<Input
										/>
									</AutoComplete>
								</div>

								<div className="input-field">
									<label>Đến:</label>
									<AutoComplete
										className='input__form'
										options={airports}
										filterOption={(inputValue, option) =>
											option.label.toLowerCase().includes(inputValue.toLowerCase())
										}
										onSelect={handleSelectToAirport}
										onChange={handleChangeToAirport}
										value={toAirport} >
										<Input

										/>
									</AutoComplete>
								</div>

								<div className="input-field ">
									<label>Ngày đi </label>
									<input type="date" className='input__form'
										name="departureDate" required />
								</div>

								{isRoundTrip && (
									<div className="input-field">
										<label>Ngày về:</label>
										<input type="date" className='input__form_2' name="returnDate" required />
									</div>
								)}

								<div className="input-field ">
									<label>Hành khách </label>
									<input type="number"
										className={isRoundTrip ? 'input__form_2 ' : 'input__form '} name="passengers" min="1" required
										style={{ border: "none" }}
									/>
								</div>
							</div>

							<button type="submit">Tìm chuyến bay</button>

						</div>

					</form>
				</div>
			</div>
		</div>
	)
}
