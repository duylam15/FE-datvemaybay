import React, { useState, useEffect } from 'react';
import { Button, Modal, notification } from 'antd';
import { useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from "axios";
import { useSelector } from 'react-redux';


const SeatSelectionBanner = ({ numberOfTicketsToDetailNumber, adultData, contactData, selectedTicket, setAdultData,
	setContactData, customers, setCustomers }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [seatData, setSeatData] = useState([]);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [columns, setColumns] = useState([]);
	const [firstHalf, setFirstHalf] = useState([]);
	const [secondHalf, setSecondHalf] = useState([]);
	const isAuthenticated = useSelector(state => state.account.isAuthenticated);
	const idKhachHangIslog = useSelector(state => state.account.user.khachHang.idKhachHang);
	const [idKhachHangState, setIdKhachHangState] = useState()

	console.log("isAuthenticated from seat", isAuthenticated)
	console.log("idKhachHangIslog from seat", idKhachHangIslog)
	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		if (selectedSeats.length < numberOfTicketsToDetailNumber) {
			// Nếu chưa chọn đủ ghế, hiển thị thông báo
			notification.warning({
				message: 'Chưa chọn đủ ghế',
				description: `Bạn cần chọn ${numberOfTicketsToDetailNumber} ghế cho ${numberOfTicketsToDetailNumber} khách hàng.`,
				duration: 3,
			});
			return;
		}
		const holdData = selectedSeats.map((seat, index) => ({
			seatId: seat.idChoNgoi,
			idVe: seat.idVe,
			flightId: selectedTicket.flightId.idChuyenBay,
			userId: 1
		}));
		console.log(holdData)
		axios.post(
			'http://localhost:8080/holdSeats',
			holdData,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		).then((response) => {
			console.log('Data submitted successfully:', response.data);
		}).catch((error) => {
			console.error('Error submitting data:', error);
			notification.error({
				message: 'Lỗi',
				description: 'Không thể chọn ghế đang được giữ',
			});
		});
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		// setSelectedSeats([]); // Xóa ghế đã chọn khi đóng modal
	};

	// socket from kiet code
	const [stompClient, setStompClient] = useState(null);
	const [messages, setMessages] = useState([]);
	const [isSeatHoldExpired, setIsSeatHoldExpired] = useState(false);


	useEffect(() => {
		const socket = new SockJS('http://localhost:8080/ws');
		const stompClientInstance = Stomp.over(socket);
		stompClientInstance.connect({}, (frame) => {
			console.log('Connected: ' + frame);
			stompClientInstance.subscribe('/topic/seatHeld', (message) => {

				// alert('Seat held:' + message.body);
			});
			stompClientInstance.subscribe('/topic/seatCancelHold', (message) => {
				setIsSeatHoldExpired(true); // Cập nhật trạng thái giữ ghế đã hết hạn
				// alert('Canceled seat after 20 seconds:' + message.body);
				// console.log("alert('Canceled seat after 20 seconds:' + message.body);")
				// setMessages(prevMessages => [...prevMessages, message.body]);
			});
		});
		setStompClient(stompClientInstance);

		// Ngắt kết nối khi component bị hủy
		return () => {
			if (stompClientInstance) stompClientInstance.disconnect();
		};
	}, []);


	console.log("customers", customers)
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
		if (!contactData.email || !contactData.soDienThoai) {
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
		if (!phonePattern.test(contactData.soDienThoai)) {
			notification.warning({
				message: 'Nhập địa chỉ số điện thoại chưa hợp lệ',
				description: `Vui lòng nhập số điện thoại hợp lệ (10 chữ số).`,
				duration: 3,
			});
			return;
		}

		// Kiểm tra trùng email hoặc số điện thoại
		const isEmailDuplicate = customers.some(customer =>
			customer.email === contactData.email && customer.cccd !== contactData.cccd
		);
		const isPhoneDuplicate = customers.some(customer =>
			customer.soDienThoai === contactData.soDienThoai && customer.cccd !== contactData.cccd
		);

		if (isEmailDuplicate) {
			notification.warning({
				message: 'Email đã tồn tại',
				description: `Email này đã được sử dụng bởi khách hàng khác.`,
				duration: 3,
			});
			return;
		}

		if (isPhoneDuplicate) {
			notification.warning({
				message: 'Số điện thoại đã tồn tại',
				description: `Số điện thoại này đã được sử dụng bởi khách hàng khác.`,
				duration: 3,
			});
			return;
		}

		if (selectedSeats.length < numberOfTicketsToDetailNumber) {
			// Nếu chưa chọn đủ ghế, hiển thị thông báo
			notification.warning({
				message: 'Chưa chọn đủ ghế',
				description: `Bạn cần chọn ${numberOfTicketsToDetailNumber} ghế cho ${numberOfTicketsToDetailNumber} khách hàng.`,
				duration: 3,
			});
			return;
		}

		if (isSeatHoldExpired) {
			notification.error({
				message: 'Thời gian giữ ghế đã hết',
				description: 'Vui lòng chọn lại ghế để tiếp tục.',
				duration: 3,
			});
			setIsSeatHoldExpired(false); // Cập nhật trạng thái giữ ghế đã hết hạn
			return; // Ngăn việc submit nếu ghế đã hết hạn
		}

		// Nếu tất cả đều hợp lệ, gửi dữ liệu
		const bookingData = selectedSeats.map((seat, index) => ({
			idHanhKhach: null,
			idVe: seat.idVe,
			hoTen: adultData[index]?.fullName,
			ngaySinh: adultData[index]?.birthDate,
			soDienThoai: contactData.soDienThoai,
			email: contactData.email,
			cccd: adultData[index]?.cccd,
			gioiTinhEnum: adultData[index]?.gender === 'male' ? 'NAM' : adultData[index]?.gender === 'female' ? 'NU' : 'KHAC',
			trangThaiActive: "ACTIVE"
		}));

		console.log("selectedSeats", selectedSeats)

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
			).then((response) => {
				console.log("Response from server:", response);
				console.log("Response from server:", response?.data?.data?.paymentUrl);
				const paymentUrl = response?.data?.data?.paymentUrl;
				// Reset form state after successful submission
				localStorage.setItem("bookingData", JSON.stringify(bookingData, null, 2))
				localStorage.setItem("isAuthenticated", isAuthenticated)
				localStorage.setItem("idKhachHangIslog", idKhachHangIslog)
				localStorage.setItem("contactDataCccd", contactData.cccd)
				console.log(localStorage.getItem("contactDataCccd"))
				console.log('Booking Data:', bookingData); // Check if the data exists and is correctly fetched
				const contactDataCccd = localStorage.getItem("contactDataCccd")
				console.log("contactDataCccdcontactDataCccdcontactDataCccd", contactDataCccd)
				if (bookingData) {
					console.log(bookingData[0].ngaySinh);  // Accessing the first item's 'ngaySinh' value
					const dataKhachHang = {
						ngaySinh: bookingData[0].ngaySinh,
						hoTen: bookingData[0].hoTen,
						email: bookingData[0].email,
						cccd: contactDataCccd,
						soDienThoai: bookingData[0].soDienThoai
					};
					const cccd = dataKhachHang.cccd
					console.log("contactDataCccd from home", localStorage.getItem("contactDataCccd"))
					console.log("dataKhachHangdataKhachHangdataKhachHang", dataKhachHang)
					let flag = 0
					let idkh = 1;

					const checkCccd = async () => {
						console.log("idkh from check cccd", idkh)
						try {
							console.log("Starting API call with cccd:", contactDataCccd); // Log giá trị trước khi gọi API
							const response = await axios.get(`http://localhost:8080/khachhang/findByCccd?cccd=${contactDataCccd}`);
							console.log("API Response:", response); // Log kết quả nếu thành công
						} catch (error) {
							if (error.response) {
								console.log("error.response)", error.response)
								const idkh = error.response?.data?.data?.idKhachHang
								console.log("idKh from check cccd ", idkh)
								console.log("error", error?.response?.data?.data?.idKhachHang)
								flag = 1
								console.log("flag checkCccd", flag)
								localStorage.setItem("idKh", idkh);
								console.error("API Error Response:", error.response.status, error.response.data);
							} else {
								console.error("Network/Error:", error.message);
							}
						}

					}
					checkCccd();
					console.log("flag", flag)
					const postAndLogCustomer = async () => {
						try {
							console.log("flag postAndLogCustomer", flag)
							const response = await axios.post('http://localhost:8080/khachhang/addCustomer', dataKhachHang);
							console.log("response postAndLogCustomer", response)
							const idkh = response.data?.data?.idKhachHang;
							console.log("Customer ID 1:", idkh);
							setIdKhachHangState(idkh)
							localStorage.setItem("idKh", idkh);
						} catch (error) {
							console.error("Error:", error.response ? error.response.data : error.message);
						}
					}
					console.log("idKhachHangState outt", idKhachHangState)
					console.log("idkh out outoutout", idkh)

					if (flag === 0) {
						console.log("flag000", flag)

						postAndLogCustomer();
					}
				} else {
					console.log('No booking data found in localStorage.');
				}
				window.location.href = paymentUrl
			}).catch((error) => {
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
			axios.get(`http://localhost:8080/getChoNgoiByChuyenBayAndHangVe?idChuyenBay=${selectedTicket.flightId.idChuyenBay}&idHangVe=${selectedTicket.classTicketId}`)
				.then((response) => {
					console.log("response getChoNgoiByChuyenBayAndHangVe", response.data.data)
					setSeatData(response.data.data)
				})
				.catch((error) => {
					console.error('Error fetching seat data:', error);
				});
		}
	}, [isModalVisible]);

	useEffect(() => {
		if (seatData.length > 0) {
			const uniqueColumns = [...new Set(seatData.map(seat => seat.columnIndex))]; // Lấy các cột duy nhất

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
		if (seat.trangThai === 'BOOKED' || seat.trangThai === 'HOLD') return;

		const isSelected = selectedSeats.find(s => s.idChoNgoi === seat.idChoNgoi);

		if (isSelected) {
			setSelectedSeats(selectedSeats.filter(s => s.idChoNgoi !== seat.idChoNgoi));
		} else if (selectedSeats.length < numberOfTicketsToDetailNumber) {
			setSelectedSeats([...selectedSeats, seat]);
		}
	};

	const maxRow = Math.max(...seatData.map(seat => seat.rowIndex));
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
																const seat = seatData.find(seat => seat.rowIndex === (currentRowIndex + 1) && seat.columnIndex === column);

																return seat ? (
																	<div
																		key={seat.idChoNgoi}
																		className={`seat ${seat.trangThai === 'BOOKED'
																			? 'booked'
																			: selectedSeats.find(s => s.idChoNgoi === seat.idChoNgoi)
																				? 'selected'
																				: 'empty'
																			}`}
																		onClick={() => seat.trangThai !== 'BOOKED' && handleSeatClick(seat)}
																	>
																		{seat.trangThai === 'BOOKED' ? (
																			<img src="public/icons/booked-seat.svg" alt="Booked Seat" className="seat--icon" />
																		) : selectedSeats.find(s => s.idChoNgoi === seat.idChoNgoi) ? (
																			<img src="public/icons/selected-seat.svg" alt="Selected Seat" className="seat--icon" />
																		) : seat.trangThai === 'EMPTY' ? (
																			<img src="public/icons/available-seat.svg" alt="Available Seat" className="seat--icon" />
																		) : seat.trangThai === 'HOLD' ? (
																			<img src="public/icons/booked-seat.svg" alt="Available Seat" className="seat--icon" />
																		) : (
																			<img src="public/icons/booked-seat.svg" alt="Available Seat" className="seat--icon" />
																		)}
																	</div>
																) : (
																	<div key={`${column}-${currentRowIndex}`} className="seat empty-seat"></div>
																);
															})}

															<div className='numRow'>{currentRowIndex + 1}</div>

															{secondHalf.map(column => {
																const seat = seatData.find(seat => seat.rowIndex === (currentRowIndex + 1) && seat.columnIndex === column);
																return seat ? (
																	<div
																		key={seat.idChoNgoi}
																		className={`seat ${seat.trangThai === 'BOOKED'
																			? 'booked'
																			: selectedSeats.find(s => s.idChoNgoi === seat.idChoNgoi)
																				? 'selected'
																				: 'empty'
																			}`}
																		onClick={() => seat.trangThai !== 'BOOKED' && handleSeatClick(seat)}
																	>
																		{seat.trangThai === 'BOOKED' ? (
																			<img src="public/icons/booked-seat.svg" alt="Booked Seat" className="seat--icon" />
																		) : selectedSeats.find(s => s.idChoNgoi === seat.idChoNgoi) ? (
																			<img src="public/icons/selected-seat.svg" alt="Selected Seat" className="seat--icon" />
																		) : seat.trangThai === 'EMPTY' ? (
																			<img src="public/icons/available-seat.svg" alt="Available Seat" className="seat--icon" />
																		) : (
																			<img src="public/icons/booked-seat.svg" alt="Available Seat" className="seat--icon" />
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
