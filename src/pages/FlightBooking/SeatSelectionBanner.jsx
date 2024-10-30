import React, { useState, useEffect } from 'react';
import { Button, Modal, notification } from 'antd';
import axios from "axios"

const SeatSelectionBanner = ({ customerCount, adultData, contactData }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [seatData, setSeatData] = useState([]);
	const [selectedSeats, setSelectedSeats] = useState([]);

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
			hoTen: adultData[index].fullName,
			ngaySinh: adultData[index].birthDate,
			soDienThoai: contactData.phone,
			email: contactData.email,
			cccd: adultData[index].cccd,
			hoChieu: adultData[index].passPort,
			gioiTinhEnum: adultData[index].gender === 'male' ? 'NAM' : adultData[index].gender === 'female' ? 'NU' : 'KHAC',
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

	const handleSeatClick = (seat) => {
		if (seat.trangThaiChoNgoi === 'BOOKED') return;

		const isSelected = selectedSeats.find(s => s.idChoNgoi === seat.idChoNgoi);

		if (isSelected) {
			setSelectedSeats(selectedSeats.filter(s => s.idChoNgoi !== seat.idChoNgoi));
		} else if (selectedSeats.length < customerCount) {
			setSelectedSeats([...selectedSeats, seat]);
		}
	};

	const maxColumn = Math.max(...seatData.map(seat => seat.row));
	const columnsCount = maxColumn;
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
										<div className="seat-selection--model__left--item">
											<img src="public/icons/ghetieuchuan.svg" alt="" className="seat-selection--model__left--icon selected-seat-icon" />
											<p className="seat-selection--model__left--desc">Ghế tiêu chuẩn</p>
										</div>
										<div className="seat-selection--model__left--item">
											<img src="public/icons/gheyentinh.svg" alt="" className="seat-selection--model__left--icon selected-seat-icon" />
											<p className="seat-selection--model__left--desc">
												Ghế ngồi yên tĩnh</p>
										</div>
										<div className="seat-selection--model__left--item">
											<img src="public/icons/booked-seat.svg" alt="" className="seat-selection--model__left--icon selected-seat-icon" />
											<p className="seat-selection--model__left--desc">Không còn trống</p>
										</div>
										<div className="seat-selection--model__left--item">
											<img src="public/icons/available-seat.svg" alt="" className="seat-selection--model__left--icon selected-seat-icon" />
											<p className="seat-selection--model__left--desc">Ghế ngồi ưa thích</p>
										</div>
										<div className="seat-selection--model__left--item">
											<img src="public/icons/exit-seat.svg" alt="" className="seat-selection--model__left--icon selected-seat-icon" />
											<p className="seat-selection--model__left--desc">Hàng ghế lối thoát hiểm</p>
										</div>
										<div className="seat-selection--model__left--item">
											<img src="public/icons/selected-seat.svg" alt="" className="seat-selection--model__left--icon selected-seat-icon selected-seat-icon" />
											<p className="seat-selection--model__left--desc">
												Ghế đang chọn</p>
										</div>
										<div className="seat-selection--model__left--item space"></div>
										<div className="seat-selection--model__left--item">
											<img src="public/icons/left-svgrepo-com (3).svg" alt="" className="seat-selection--model__left--icon selected-seat-icon  exit-icon-menu" />
											<p className="seat-selection--model__left--desc">Lối thoát hiểm
											</p>
										</div>
										<div className="seat-selection--model__left--item">
											<img src="public/icons/wc-svgrepo-com.svg" alt="" className="seat-selection--model__left--icon selected-seat-icon selected-seat-icon wc-icon-left" />
											<p className="seat-selection--model__left--desc">
												Nhà vệ sinh</p>
										</div>
									</div>
								</div>
								<div className="seat-selection__right">
									<div className="seat-grid">
										<div className='body-plane'><img className='body-plane-icon' src="public/icons/up-direction-svgrepo-com.svg" alt="" /><div className='body-plane-desc'>Đầu máy bay</div><img className='body-plane-icon' src="public/icons/up-direction-svgrepo-com.svg" alt="" />
										</div>
										<div className="seat-grid__header">
											{['A', 'B', 'C'].map((letter) => (
												<div key={letter} className="seat-grid__header-cell">{letter}</div>
											))}
											<div className="seat-grid__header-spacer" /> {/* Cell tạo khoảng cách */}
											{['D', 'E', 'F'].map((letter) => (
												<div key={letter} className="seat-grid__header-cell">{letter}</div>
											))}
										</div>

										{/* Phân loại và hiển thị ghế */}
										{Array.from({ length: columnsCount }, (_, index) => (
											<>
												{/* Hiển thị icon WC sau mỗi 3 hàng */}
												{index % 3 === 0 && index !== 0 && (
													<div className="seat-grid__wc-row">
														<img src="/public/icons/wc-svgrepo-com.svg" alt="WC Icon Left" className="wc-icon-left" />
														<img src="/public/icons/wc-svgrepo-com.svg" alt="WC Icon Right" className="wc-icon-right" />
													</div>
												)}

												{/* Hàng ghế */}
												<div key={index + 1} className="seat-grid__row">
													{/* Hiển thị icon exit ở hàng 4, 7, 10, 13 */}
													{[4, 7, 10, 13].includes(index + 1) && (
														<>
															<img src="/public/icons/left-svgrepo-com (3).svg" alt="Exit Icon Left" className="exit-icon--left" />
														</>
													)}

													{['A', 'B', 'C'].map(column => {
														const seat = seatData.find(seat => seat.row === (index + 1) && seat.column === column);
														if (seat) {
															const isSelected = selectedSeats.find(s => s.idChoNgoi === seat.idChoNgoi);
															return (
																<div
																	key={seat.idChoNgoi}
																	className={`seat ${seat.trangThaiChoNgoi === 'BOOKED' ? 'booked' : isSelected ? 'selected' : 'available'}`}
																	onClick={() => handleSeatClick(seat)}
																>
																	{seat.trangThaiChoNgoi === 'BOOKED' ? (
																		<img className='seat-icon' src="/public/icons/booked-seat.svg" alt="Ghế đã đặt" />
																	) : isSelected ? (
																		<img className='seat-icon' src="/public/icons/selected-seat.svg" alt="Ghế đang chọn" />
																	) : (
																		<img className='seat-icon' src="/public/icons/available-seat.svg" alt="Ghế có sẵn" />
																	)}
																</div>
															);
														}
														return null;
													})}
													<div className="seat-grid__row-label">{index + 1}</div>
													<div className="seat-grid__spacer" /> {/* Cell tạo khoảng cách */}
													{['D', 'E', 'F'].map(column => {
														const seat = seatData.find(seat => seat.row === (index + 1) && seat.column === column);
														if (seat) {
															const isSelected = selectedSeats.find(s => s.idChoNgoi === seat.idChoNgoi);
															return (
																<div
																	key={seat.idChoNgoi}
																	className={`seat ${seat.trangThaiChoNgoi === 'BOOKED' ? 'booked' : isSelected ? 'selected' : 'available'}`}
																	onClick={() => handleSeatClick(seat)}
																>
																	{seat.trangThaiChoNgoi === 'BOOKED' ? (
																		<img className='seat-icon' src="/public/icons/booked-seat.svg" alt="Ghế đã đặt" />
																	) : isSelected ? (
																		<img className='seat-icon' src="/public/icons/selected-seat.svg" alt="Ghế đang chọn" />
																	) : (
																		<img className='seat-icon' src="/public/icons/available-seat.svg" alt="Ghế có sẵn" />
																	)}
																</div>
															);
														}
														return null;
													})}

													{/* Hiển thị icon exit ở hàng 4, 7, 10, 13 bên phải */}
													{[4, 7, 10, 13].includes(index + 1) && (
														<>
															<img src="/public/icons/left-svgrepo-com (2).svg" alt="Exit Icon Right" className="exit-icon exit-icon--right" />
														</>
													)}
												</div>
											</>
										))}
										<div className='body-plane'><img className='body-plane-icon' src="public/icons/up-direction-svgrepo-com (1).svg" alt="" /><div className='body-plane-desc'>Đuôi máy bay</div><img className='body-plane-icon' src="public/icons/up-direction-svgrepo-com (1).svg" alt="" />
										</div>
									</div>
									<p className='num-seat-selected'>Số ghế đã chọn: {selectedSeats.length}</p>
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
