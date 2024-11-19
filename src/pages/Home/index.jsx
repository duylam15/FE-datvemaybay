import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "./Home.scss";
import Portlet from './Portlet';
import News from './News';
import BannerExplore from './BannerExplore';
import Service from './Service';
import HomeHeader from './HomeHeader';
import BonusService from './BonusService';
import Experience from './Experience';
import Popular from './Popular';
import Promotion from './Promotion';
import HotFlight from './HotFlight';
import { notification } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
	const navigate = useNavigate();
	const [statusCode, setStatusCode] = useState(null);
	const [message, setMessage] = useState('');
	const [ticketIds, setTicketIds] = useState([]);
	const { search } = useLocation();


	useEffect(() => {
		// Hàm để fetch dữ liệu và lưu ID khách hàng cuối cùng vào localStorage
		const fetchAndStoreLastCustomerId = async () => {
			try {
				// Gửi yêu cầu đến API
				const response = await axios.get('http://localhost:8080/khachhang/getAllCustomer');

				// Kiểm tra nếu phản hồi thành công
				if (response.data.statusCode === 200) {
					const customers = response.data.data;

					// Lấy khách hàng cuối cùng nếu danh sách không rỗng
					if (customers.length > 0) {
						const lastCustomer = customers[customers.length - 1];
						const lastCustomerId = lastCustomer.idKhachHang;

						// Lưu ID vào localStorage
						localStorage.setItem('lastCustomerId', lastCustomerId);
						console.log(`Last Customer ID (${lastCustomerId}) saved to localStorage.`);
					} else {
						console.warn('No customers found in the response.');
					}
				} else {
					console.error('Failed to fetch customers:', response.data.message);
				}
			} catch (error) {
				console.error('Error fetching customers:', error.response ? error.response.data : error.message);
			}
		};

		// Gọi hàm fetch khi component mount
		fetchAndStoreLastCustomerId();
	}, []); // useEffect chỉ chạy một lần khi component được mount

	useEffect(() => {
		const bookingData = JSON.parse(localStorage.getItem("bookingData"));
		console.log('Booking Data:', bookingData); // Check if the data exists and is correctly fetched

		if (bookingData) {
			console.log(bookingData[0].ngaySinh);  // Accessing the first item's 'ngaySinh' value
			const dataKhachHang = {
				ngaySinh: bookingData[0].ngaySinh,
				hoTen: bookingData[0].hoTen,
				email: bookingData[0].email,
				cccd: bookingData[0].cccd,
				soDienThoai: bookingData[0].soDienThoai
			};
			let idkh;
			async function postAndLogCustomer() {
				try {
					const response = await axios.post('http://localhost:8080/khachhang/addCustomer', dataKhachHang);
					idkh = response.data?.data?.idKhachHang;
					localStorage.setItem("idKh", idkh + 1);
					console.log("Customer ID:", idkh);
				} catch (error) {
					console.error("Error:", error.response ? error.response.data : error.message);
				}
			}
			postAndLogCustomer();
		} else {
			console.log('No booking data found in localStorage.');
		}
	}, []);


	useEffect(() => {
		const params = new URLSearchParams(search);
		const newStatusCode = params.get('statusCode');
		const vnp_ResponseCode = params.get('vnp_ResponseCode');
		const newMessage = decodeURIComponent(params.get('message') || "");
		const newTicketIds = params.get('ticketIds') ? params.get('ticketIds').split(',') : [];
		console.log("vnp_ResponseCodevnp_ResponseCodevnp_ResponseCode", vnp_ResponseCode)
		const currentDate = new Date();
		const thoiGianLap = currentDate.toISOString().split('.')[0];

		if (!newStatusCode && !newMessage && newTicketIds.length == 0) {
			return
		} else {
			localStorage.setItem('statusCode', newStatusCode);
			localStorage.setItem('message', newMessage);
			localStorage.setItem('ticketIds', JSON.stringify(newTicketIds));
			localStorage.setItem('vnp_ResponseCode', vnp_ResponseCode);
			console.log("newStatusCodenewStatusCodenewStatusCode", newStatusCode)
			if (newStatusCode === "200") {
				notification.success({
					message: 'Đăt vé thành công',
					description: `Đặt vé thành công vui lòng kiểm tra email`,
					duration: 3,
				});
				console.log("bookingDatabookingData", localStorage.getItem("bookingData"))
				const savedTicketIds = JSON.parse(localStorage.getItem('ticketIds')) || [];
				console.log("localStorage.getIt", localStorage.getItem("lastCustomerId"))



				let idkhang
				const isAuthenticated = localStorage.getItem("isAuthenticated")
				const idKhachHangIslog = localStorage.getItem("idKhachHangIslog")
				console.log(isAuthenticated)
				console.log(idKhachHangIslog)
				console.log(localStorage.getItem("idKh"))
				if (isAuthenticated === true) {
					const idKhAuth = idKhachHangIslog;
					idkhang = idKhAuth
				} else {
					idkhang = localStorage.getItem("idKh")
					console.log("aaaaaaaaaaaaaaaaaaaaa")
				}
				console.log("idkhangidkhangidkhangidkhang", idkhang)
				const hoaDonDTO = {
					khachHang: {
						idKhachHang: idkhang
					},
					nhanVien: {
						idNhanVien: 1
					},
					soLuongVe: savedTicketIds.length,
					loaiHoaDon: {
						idLoaiHoaDon: 1
					},
					phuongThucThanhToan: {
						idPhuongThucTT: 1
					},
					thoiGianLap: thoiGianLap,
					status: "PAID"
				}
				const chiTietHoaDonDTOList = newTicketIds.map(idVe => ({
					ve: {
						idVe: parseInt(idVe, 10)
					}
				}));

				const data = {
					hoaDonDTO: hoaDonDTO,
					chiTietHoaDonDTOList: chiTietHoaDonDTOList
				};

				axios.post('http://localhost:8080/createHoaDon', data)
					.then(response => {
						console.log("Response data createHoaDon:", response.data);
					})
					.catch(error => {
						console.error("Error:", error.response ? error.response.data : error.message);
					});

			}
			if (newStatusCode === "400") {
				notification.error({
					message: 'Đăt vé thất bại',
					description: `Đặt vé thất bại`,
					duration: 3,
				});
			}
		}
		// Xóa URL Params (ẩn chúng)
		const newUrl = window.location.origin + window.location.pathname;
		window.history.replaceState({}, document.title, newUrl);
	}, []);

	useEffect(() => {
		// Lấy dữ liệu từ localStorage
		const savedStatusCode = localStorage.getItem('statusCode');
		const savedMessage = localStorage.getItem('message');
		const savedTicketIds = JSON.parse(localStorage.getItem('ticketIds')) || [];

		setStatusCode(savedStatusCode);
		setMessage(savedMessage);
		setTicketIds(savedTicketIds);
	}, []); // Chỉ chạy một lần khi component được mount


	return (
		<>
			<HomeHeader navigate={navigate} />

			<Service navigate={navigate} />

			<BannerExplore navigate={navigate} />

			<News />

			<Portlet navigate={navigate} />

			<BonusService />

			<Experience />

			<Popular />

			<HotFlight />

			<Promotion />

		</>
	);
};

export default Home;
