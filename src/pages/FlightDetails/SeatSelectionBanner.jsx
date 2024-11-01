import React, { useState, useEffect } from 'react';
import { Button, Modal, notification } from 'antd';
import axios from "axios";

const SeatSelectionBanner = ({ customerCount, adultData, contactData, selectedTicket, numberOfTicketsToDetail }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [seatData, setSeatData] = useState([]);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [columns, setColumns] = useState([]);
	const [firstHalf, setFirstHalf] = useState([]);
	const [secondHalf, setSecondHalf] = useState([]);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setSelectedSeats([]); // Xóa ghế đã chọn khi đóng modal
	};


	const handleSubmit = () => {
		// Kiểm tra thông tin người lớn
		for (let i = 0; i < adultData.length; i++) {
			if (!adultData[i].fullName || !adultData[i].lastName || !adultData[i].gender) {
				notification.warning({
					message: 'Chưa điền đủ thông tin',
					description: `Bạn cần điền thông tin cho Người lớn thứ ${i + 1}`,
					duration: 3,
				});
				return; // Dừng lại nếu thông tin không hợp lệ
			}
		}

		// Kiểm tra thông tin liên lạc
		if (!contactData.email || !contactData.phone) {
			notification.warning({
				message: 'Chưa điền thông tin liên lạc',
				description: `Vui lòng nhập đầy đủ thông tin liên lạc.`,
				duration: 3,
			});
			return; // Dừng lại nếu thông tin không hợp lệ
		}

		// Kiểm tra định dạng email
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(contactData.email)) {
			notification.warning({
				message: 'Nhập địa chỉ email chưa hợp lệ',
				description: `Vui lòng nhập địa chỉ email hợp lệ.`,
				duration: 3,
			});
			return;
		}

		// Kiểm tra số điện thoại
		const phonePattern = /^\d{10}$/; // Chỉ cho phép số điện thoại có 10 chữ số
		if (!phonePattern.test(contactData.phone)) {
			notification.warning({
				message: 'Nhập địa chỉ số điện thoại chưa hợp lệ',
				description: `Vui lòng nhập số điện thoại hợp lệ (10 chữ số).`,
				duration: 3,
			});
			return;
		}

		if (selectedSeats.length < customerCount) {
			// Nếu chưa chọn đủ ghế, hiển thị thông báo
			notification.warning({
				message: 'Chưa chọn đủ ghế',
				description: `Bạn cần chọn ${customerCount} ghế cho ${customerCount} khách hàng.`,
				duration: 3,
			});
			return;
		}

		// Nếu tất cả đều hợp lệ, gửi dữ liệu
		const bookingData = selectedSeats.map((seat, index) => ({
			idHanhKhach: index + 1,
			idVe: index + 1,
			hoTen: adultData[index]?.fullName,
			ngaySinh: adultData[index]?.birthDate,
			soDienThoai: contactData.phone,
			email: contactData.email,
			cccd: adultData[index]?.cccd,
			hoChieu: adultData[index]?.passPort,
			gioiTinhEnum: adultData[index]?.gender === 'male' ? 'NAM' : adultData[index]?.gender === 'female' ? 'NU' : 'KHAC',
			trangThaiActive: "ACTIVE"
		}));

		console.log('Booking Data:', bookingData);

		if (1) {
			axios.post(
				'http://localhost:8080/confirmBooking',
				bookingData,
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
				.then((response) => {
					console.log("Response from server:", response);
					console.log("Response from server:", response?.data?.data?.paymentUrl);
					const paymentUrl = response?.data?.data?.paymentUrl;
				})
				.catch((error) => {
					console.error('Error submitting booking data:', error);
					notification.error({
						message: 'Lỗi',
						description: 'Gửi dữ liệu đặt chỗ thất bại. Vui lòng thử lại.',
					});
				});
		}
	};


	useEffect(() => {
		if (isModalVisible) {
			axios.get('http://localhost:3005/data')
				.then((response) => {
					setSeatData(response.data);
				})
				.catch((error) => {
					console.error('Error fetching seat data:', error);
				});
		}
	}, [isModalVisible]);

	useEffect(() => {
		if (seatData.length > 0) {
			const uniqueColumns = [...new Set(seatData.map(seat => seat.column))]; // Lấy các cột duy nhất

			// Tính chỉ số giữa
			const midIndex = Math.floor(uniqueColumns.length / 2);
			const updatedColumns = [
				...uniqueColumns.slice(0, midIndex),
				" ", // Thêm "them"
				...uniqueColumns.slice(midIndex)
			];

			// Chia thành hai mảng con
			setFirstHalf(uniqueColumns.slice(0, midIndex)); // Mảng đầu tiên
			setSecondHalf(uniqueColumns.slice(midIndex)); // Mảng thứ hai
			setColumns(updatedColumns); // Lưu vào mảng columns

			// In giá trị ngay sau khi cập nhật
			console.log("updatedColumns", updatedColumns);
			console.log("firstHalf", uniqueColumns.slice(0, midIndex));
			console.log("secondHalf", uniqueColumns.slice(midIndex));
		}
	}, [seatData]);

	const handleSeatClick = (seat) => {
		if (seat.trangThaiChoNgoi === 'BOOKED') return;

		const isSelected = selectedSeats.find(s => s.idChoNgoi === seat.idChoNgoi);

		if (isSelected) {
			setSelectedSeats(selectedSeats.filter(s => s.idChoNgoi !== seat.idChoNgoi));
		} else if (selectedSeats.length < customerCount) {
			setSelectedSeats([...selectedSeats, seat]);
		}
	};

	const maxRow = Math.max(...seatData.map(seat => seat.row));
	return (
		<div className="seat-selection">
			<h2 className='book--heading'>Dịch vụ bổ sung</h2>
			<div className='container'>
				<div className='seat-selection__inner'>
					<div className='seat-selection__section'>
						<h2 className='seat-selection__heading'>Chọn chỗ ngồi</h2>
						<p className='seat-selection__desc'>Lựa chọn ghế ngồi ưa thích của quý khách trên chuyến bay.</p>

						<div type="primary" className='seat-selection__btn' onClick={showModal}>
							Chọn ghế
						</div>


						<Modal
							visible={isModalVisible}
							onOk={handleOk}
							onCancel={handleCancel}
							wrapClassName="custom-modal-width"
						>
							<div className="seat-selection--model">
								<div className="seat-selection--model__left">
									<h1 className='seat-selection--model__left--heading'>Chú giải Sơ đồ chỗ ngồi</h1>
									<div className="seat-selection--model__left--list">
										{/* Chú giải chỗ ngồi */}
										{[
											{ icon: "public/icons/ghetieuchuan.svg", desc: "Ghế tiêu chuẩn" },
											{ icon: "public/icons/gheyentinh.svg", desc: "Ghế ngồi yên tĩnh" },
											{ icon: "public/icons/booked-seat.svg", desc: "Không còn trống" },
											{ icon: "public/icons/available-seat.svg", desc: "Ghế ngồi ưa thích" },
											{ icon: "public/icons/exit-seat.svg", desc: "Hàng ghế lối thoát hiểm" },
											{ icon: "public/icons/selected-seat.svg", desc: "Ghế đang chọn" },
											{ icon: "public/icons/exit-to-app-solid-svgrepo-com (1).svg", desc: "Lối thoát hiểm" },
											{ icon: "public/icons/wc-svgrepo-com.svg", desc: "Nhà vệ sinh" }

										].map((item, index) => (
											<div key={index} className="seat-selection--model__left--item">
												<img src={item.icon} alt="" className="seat-selection--model__left--icon selected-seat-icon" />
												<p className="seat-selection--model__left--desc">{item.desc}</p>
											</div>
										))}
									</div>
								</div>
								<div className="seat-selection__right">
									<div className='body-plane'><img className='body-plane-icon' src="public/icons/up-direction-svgrepo-com.svg" alt="" /><div className='body-plane-desc'>Đầu máy bay</div><img className='body-plane-icon' src="public/icons/up-direction-svgrepo-com.svg" alt="" />
									</div>
									<div className="seat-grid">
										<div className="seat-grid__header">
											{columns.map((letter) => (
												<div key={letter} className="seat-grid__header-cell">{letter}</div>
											))}
										</div>

										{/* Hiển thị ghế */}
										{Array.from({ length: Math.ceil(maxRow / 10) }, (_, groupIndex) => (
											<div key={groupIndex} className="seat-grid__group">
												{Array.from({ length: 10 }, (_, rowIndex) => {
													const currentRowIndex = groupIndex * 10 + rowIndex;

													// Kiểm tra nếu currentRowIndex lớn hơn maxRow thì không tạo thêm hàng
													if (currentRowIndex >= maxRow) return null;

													return (
														<div key={currentRowIndex + 1} className="seat-grid__row">
															{firstHalf.map(column => {
																const seat = seatData.find(seat => seat.row === (currentRowIndex + 1) && seat.column === column);

																return seat ? (
																	<div
																		key={seat.idChoNgoi}
																		className={`seat ${seat.trangThaiChoNgoi === 'BOOKED'
																			? 'booked'
																			: selectedSeats.find(s => s.idChoNgoi === seat.idChoNgoi)
																				? 'selected'
																				: 'available'
																			}`}
																		onClick={() => seat.trangThaiChoNgoi !== 'BOOKED' && handleSeatClick(seat)}
																	>
																		{seat.trangThaiChoNgoi === 'BOOKED' ? (
																			<img src="public/icons/booked-seat.svg" alt="Booked Seat" className="seat--icon" />
																		) : selectedSeats.find(s => s.idChoNgoi === seat.idChoNgoi) ? (
																			<img src="public/icons/selected-seat.svg" alt="Selected Seat" className="seat--icon" />
																		) : seat.trangThaiChoNgoi === 'AVAILABLE' ? (
																			<img src="public/icons/available-seat.svg" alt="Available Seat" className="seat--icon" />
																		) : (
																			''
																		)}
																	</div>
																) : (
																	<div key={`${column}-${currentRowIndex}`} className="seat empty-seat"></div>
																);
															})}

															<div className='numRow'>{currentRowIndex + 1}</div>

															{secondHalf.map(column => {
																const seat = seatData.find(seat => seat.row === (currentRowIndex + 1) && seat.column === column);
																return seat ? (
																	<div
																		key={seat.idChoNgoi}
																		className={`seat ${seat.trangThaiChoNgoi === 'BOOKED'
																			? 'booked'
																			: selectedSeats.find(s => s.idChoNgoi === seat.idChoNgoi)
																				? 'selected'
																				: 'available'
																			}`}
																		onClick={() => seat.trangThaiChoNgoi !== 'BOOKED' && handleSeatClick(seat)}
																	>
																		{seat.trangThaiChoNgoi === 'BOOKED' ? (
																			<img src="public/icons/booked-seat.svg" alt="Booked Seat" className="seat--icon" />
																		) : selectedSeats.find(s => s.idChoNgoi === seat.idChoNgoi) ? (
																			<img src="public/icons/selected-seat.svg" alt="Selected Seat" className="seat--icon" />
																		) : seat.trangThaiChoNgoi === 'AVAILABLE' ? (
																			<img src="public/icons/available-seat.svg" alt="Available Seat" className="seat--icon" />
																		) : (
																			''
																		)}
																	</div>
																) : (
																	<div key={`${column}-${currentRowIndex}`} className="seat empty-seat"></div>
																);
															})}
														</div>
													);
												})}

												{/* Dành riêng một hàng cho icon WC */}
												<div className="wc-icon-row">
													<img src="public/icons/wc-svgrepo-com.svg" alt="WC" className="wc-icon-left" />
													<img src="public/icons/wc-svgrepo-com.svg" alt="WC" className="wc-icon-right" />
												</div>
											</div>
										))}

									</div>
									<div className='body-plane'><img className='body-plane-icon' src="public/icons/up-direction-svgrepo-com (1).svg" alt="" /><div className='body-plane-desc'>Đuôi máy bay</div><img className='body-plane-icon' src="public/icons/up-direction-svgrepo-com (1).svg" alt="" />
									</div>
								</div>
							</div>
						</Modal>
					</div>
					<img src="public/images/seat-selection__banner.jpg" alt="" className="seat-selection__banner" />
				</div>
			</div>
			<div className="container">
				<div className='submit-btn--inner'>
					<div className='submit-btn' type="primary" onClick={handleSubmit}>
						Thanh toán
					</div>
				</div>
			</div>


		</div>
	);
};


export default SeatSelectionBanner
