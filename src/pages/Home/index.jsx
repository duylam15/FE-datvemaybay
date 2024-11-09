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
import Chat from './Chat';

const Home = () => {
	const navigate = useNavigate();
	const [statusCode, setStatusCode] = useState(null);
	const [message, setMessage] = useState('');
	const [ticketIds, setTicketIds] = useState([]);
	const { search } = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(search);
		const newStatusCode = params.get('statusCode');
		const newMessage = decodeURIComponent(params.get('message') || "");
		const newTicketIds = params.get('ticketIds') ? params.get('ticketIds').split(',') : [];

		const currentDate = new Date();
		const thoiGianLap = currentDate.toISOString().split('.')[0];

		if (!newStatusCode && !newMessage && newTicketIds.length == 0) {
			return
		} else {
			localStorage.setItem('statusCode', newStatusCode);
			localStorage.setItem('message', newMessage);
			localStorage.setItem('ticketIds', JSON.stringify(newTicketIds));
			if (newStatusCode === "200") {
				notification.success({
					message: 'Đăt vé thành công',
					description: `Đặt vé thành công vui lòng kiểm tra email`,
					duration: 3,
				});

				const hoaDonDTO = {
					khachHang: {
						idKhachHang: 3
					},
					nhanVien: {
						idNhanVien: 1
					},
					soLuongVe: 2,
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

			<Chat />

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
