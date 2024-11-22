import { Area, Column, Line } from '@ant-design/charts';
import { Card, Select, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios-80802';
import './Thongke.scss';
import XuatExcel from './XuatExcel/XuatExcel';
import dataFlightStatus from './flightStatus/dataFilightStatus';
import loadYearListFLightStatus from './flightStatus/loadYearListFLightStatus';

const { Option } = Select;

export default function ThongKe() {
	const [timeFrame, setTimeFrame] = useState('monthly');
	const [revenueView, setRevenueView] = useState('Tháng'); // Trạng thái hiển thị doanh thu
	const [timePeriod, setTimePeriod] = useState('monthly');
	// Cấu hình biểu đồ
	const commonConfig = {
		height: 300,
		autoFit: true,
	};
	// Dữ liệu mẫu
	const customerDataSets = {
		Tháng: [
			{ time: 'Jan', customers: 120, type: '%' },
			{ time: 'Feb', customers: 140, type: '%' },
			{ time: 'Mar', customers: 150, type: '%' },
		],
		Quý: [
			{ time: 'Q1', customers: 400, type: '2023' },
			{ time: 'Q2', customers: 450, type: '2023' },
		],
		Năm: [{ time: '2023', customers: 1000, type: '2023' }],
	};

	const ratingData = [
		{ category: '5 sao', value: 45 },
		{ category: '4 sao', value: 30 },
		{ category: '3 sao', value: 15 },
		{ category: '2 sao', value: 5 },
		{ category: '1 sao', value: 5 },
	];


	// let flightStatusData = [
	// 	{ time: "January", status: "Đúng giờ", value: 80 },
	// 	{ time: "January", status: "Trễ giờ", value: 10 },
	// 	{ time: "January", status: "Hủy", value: 10 },
	// 	{ time: "February", status: "Đúng giờ", value: 85 },
	// 	{ time: "February", status: "Trễ giờ", value: 8 },
	// 	{ time: "February", status: "Hủy", value: 7 },
	// 	{ time: "March", status: "Đúng giờ", value: 75 },
	// 	{ time: "March", status: "Trễ giờ", value: 15 },
	// 	{ time: "March", status: "Hủy", value: 10 },
	// ];

	const [timeFlightStatus, setTimeFlightStatus] = useState('monthly');
	const [viewFlightStatus, setViewFlightStatus] = useState('Chart');
	const yearListFLightStatus = loadYearListFLightStatus();
	const [selectYearFLightStatus, setSelectYearFLightStatus] = useState("2024")

	//load data trang thai chuyen bay
	let flightStatusData = dataFlightStatus(timeFlightStatus, selectYearFLightStatus, viewFlightStatus);
	const flightStatusConfig = {
		data: flightStatusData,
		xField: "time", // Trục hoành
		yField: "value", // Trục tung
		seriesField: "status", // Phân nhóm theo trạng thái
		smooth: true, // Đường cong mềm mại
		colorField: "status",// Màu sắc cho từng trạng thái
		isGroup: true,
	};

	let columnsFlightStatus = [
		{
			title: 'Thời gian',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Số chuyến bay',
			dataIndex: 'value',
			key: 'value',
		},
	];

	console.log("data trang thai cua chuyen bay : ");


	const flightRouteData = [
		{ route: 'Hà Nội - TP HCM', frequency: 100, type: 'Số lượng' },
		{ route: 'Hà Nội - Đà Nẵng', frequency: 50, type: 'Số lượng' },
		{ route: 'TP HCM - Đà Nẵng', frequency: 80, type: 'Số lượng' },
		{ route: 'TP HCM - Bình Định', frequency: 70, type: 'Số lượng' },
		{ route: 'TP HCM - Huế', frequency: 60, type: 'Số lượng' },
	];

	const revenueDataSets = {
		Tháng: [
			{ time: 'Tháng 1', revenue: 1000000, type: 'Đồng' },
			{ time: 'Tháng 2', revenue: 1200000, type: 'Đồng' },
			{ time: 'Tháng 3', revenue: 1100000, type: 'Đồng' },
		],
		Quý: [
			{ time: 'Q1', revenue: 3500000, type: 'Đồng' },
			{ time: 'Q2', revenue: 4000000, type: 'Đồng' },
		],
		Năm: [
			{ time: '2023', revenue: 15000000, type: '2023' },
			{ time: '2022', revenue: 14000000, type: '2022' },
		],
	};
	// Lựa chọn dữ liệu theo thời gian
	const customerData = customerDataSets[timeFrame] || [];

	const customerConfig = {
		...commonConfig,
		data: customerData,
		xField: 'time',
		yField: 'customers',
		seriesField: 'type',
		smooth: true,
		point: { size: 5, shape: 'diamond' },
	};

	const ratingConfig = {
		...commonConfig,
		data: ratingData,
		angleField: 'value',
		colorField: 'category',
		radius: 1,
		label: { type: 'outer', content: '{name} {percentage}' },
	};

	const seatUtilizationConfig = {
		percent: 0.75,
		range: { color: 'l(0) 0:#B8E1FF 1:#3D76DD' },
		indicator: {
			pointer: { style: { stroke: '#D0D0D0' } },
			pin: { style: { stroke: '#D0D0D0' } },
		},
		statistic: { content: { style: { fontSize: '36px', lineHeight: '36px' } } },
	};

	const flightRouteFrequencyConfig = {
		...commonConfig,
		data: flightRouteData,
		xField: 'route',
		yField: 'frequency',
		seriesField: 'type',
		legend: { position: 'top-left' },
	};

	// --------------------------------------------------------------------------------------------------
	const [viewType, setViewType] = useState('Chart'); // Chart, Table
	const [customerCount, setCustomerCount] = useState(null); // Số khách hàng tổng cộng
	const [growthData, setGrowthData] = useState([]); // Dữ liệu tăng trưởng
	const [loading, setLoading] = useState(false); // Loading state
	// Fetch tổng số khách hàng
	useEffect(() => {
		const fetchTotalCustomers = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8080/khachhang/totalKhachHang'
				);
				setCustomerCount(response.data);
			} catch (error) {
				console.error('Error fetching total customers:', error);
			}
		};
		fetchTotalCustomers();
	}, []);
	// Fetch dữ liệu tăng trưởng
	useEffect(() => {
		const fetchGrowthRate = async () => {
			setLoading(true); // Bắt đầu loading ngay lập tức
			try {
				const response = await axios.get(
					'http://localhost:8080/khachhang/growthRate',
					{
						params: { period: timeFrame.toLowerCase() },
					}
				);
				const formattedData = Object.entries(response.data.data).map(
					([time, rate]) => ({
						time,
						growthRate: rate,
					})
				);
				setGrowthData(formattedData); // Cập nhật dữ liệu
			} catch (error) {
				console.error('Error fetching growth rate:', error); // Xử lý lỗi nếu có
			} finally {
				// Đảm bảo loading luôn hiển thị ít nhất 1 giây
				setTimeout(() => {
					setLoading(false); // Tắt loading sau 1 giây
				}, 300);
			}
		};

		fetchGrowthRate(); // Gọi hàm fetchGrowthRate khi timeFrame thay đổi
	}, [timeFrame]); // Chạy lại effect khi timeFrame thay đổi

	// Cấu hình biểu đồ
	const growthRateConfig = {
		data: growthData,
		xField: 'time',
		yField: 'growthRate',
		smooth: true,
		point: { size: 5, shape: 'diamond' },
		tooltip: {
			showMarkers: false,
		},
		areaStyle: { fillOpacity: 0.2 },
	};
	// Cấu hình bảng
	const columns = [
		{ title: 'Thời gian', dataIndex: 'time', key: 'time' },
		{ title: 'Tỉ lệ tăng (%)', dataIndex: 'growthRate', key: 'growthRate' },
	];

	// ------------------------------------------------------------------------------------------------

	const [viewKind, setViewKind] = useState('Chart'); // Chuyển đổi giữa biểu đồ và bảng
	const [ageGroupData, setAgeGroupData] = useState([]);
	const [loadData, setLoadData] = useState(false);

	// Lấy dữ liệu từ API
	useEffect(() => {
		const fetchAgeGroupData = async () => {
			setLoadData(true);
			try {
				const response = await axios.get(
					'http://localhost:8080/getTicketsByAgeGroup',
					{
						params: { period: timePeriod.toLowerCase() },
					}
				);

				const rawData = response.data.data;

				// Lọc và chuẩn hóa dữ liệu để đảm bảo tất cả các tháng, quý, năm đều xuất hiện
				const formattedData = Object.entries(rawData).map(
					([time, ageGroups]) => {
						// Nếu không có dữ liệu cho nhóm tuổi, gán mặc định là 0
						const formattedAgeGroups = Object.entries(ageGroups).map(
							([ageGroup, count]) => ({
								ageGroup,
								count: count || 0, // Đảm bảo giá trị count là 0 nếu không có dữ liệu
							})
						);

						// Nếu không có nhóm tuổi nào, đảm bảo thời gian vẫn có dữ liệu (ví dụ: thời gian "Month 1" vẫn có giá trị mặc định)
						return {
							time,
							ageGroups: formattedAgeGroups.length
								? formattedAgeGroups
								: [{ ageGroup: 'All Ages', count: 0 }],
						};
					}
				);

				setAgeGroupData(formattedData); // Cập nhật dữ liệu
			} catch (error) {
				console.error('Error fetching age group data:', error);
			} finally {
				setTimeout(() => setLoadData(false), 300); // Đảm bảo loading hiển thị tối thiểu 300ms
			}
		};

		fetchAgeGroupData();
	}, [timePeriod]); // Mỗi lần timePeriod thay đổi, gọi lại useEffect

	// Dữ liệu bảng
	const formattedTableData = ageGroupData.flatMap(({ time, ageGroups }) =>
		ageGroups.map(({ ageGroup, count }) => ({
			time,
			ageGroup,
			count,
		}))
	);

	// Cấu hình bảng
	const ageColumns = [
		{
			title: 'Thời gian',
			dataIndex: 'time',
			key: 'time',
			render: (value, row, index) => {
				const currentRowSpan =
					index === 0 || formattedTableData[index - 1].time !== value
						? formattedTableData.filter((item) => item.time === value).length
						: 0;

				return {
					children: value,
					props: {
						rowSpan: currentRowSpan,
					},
				};
			},
		},
		{
			title: 'Nhóm tuổi',
			dataIndex: 'ageGroup',
			key: 'ageGroup',
		},
		{
			title: 'Số lượng',
			dataIndex: 'count',
			key: 'count',
		},
	];

	// Cấu hình biểu đồ
	// Lọc dữ liệu để chỉ giữ lại những đối tượng có count > 0
	const filteredTableData = formattedTableData.filter((item) => item.count > 0);

	// Cấu hình biểu đồ
	const ageGroupConfig = {
		data: filteredTableData, // Sử dụng filteredTableData đã lọc
		xField: 'ageGroup',
		yField: 'count',
		seriesField: 'time',
		colorField: 'ageGroup',
		label: {
			position: 'middle',
			content: '{value}',
		},
		columnStyle: { radius: [8, 8, 0, 0] },
	};

	// ------------------------------------------------------------------------------------------------

	const [viewPattern, setViewPattern] = useState('Chart'); // Chuyển đổi giữa biểu đồ và bảng
	const [topRouteData, setTopRouteData] = useState([]);
	const [loadingData, setLoadingData] = useState(false);
	const [period, setPeriod] = useState('monthly');

	// Lấy dữ liệu từ API
	// Lấy dữ liệu từ API
	useEffect(() => {
		const fetchTopRoute = async () => {
			setLoadingData(true);
			try {
				const response = await axios.get('http://localhost:8080/top-routes', {
					params: { period: period.toLowerCase() },
				});

				const rawData = response.data.data;

				// Chuyển đổi dữ liệu từ backend thành mảng
				const formattedData = Object.entries(rawData)
					.map(([time, routes]) => ({
						time, // Ví dụ: "Month 1"
						routes: routes.length
							? routes
							: [{ route: 'No data', countFlight: 0 }], // Nếu không có dữ liệu thì trả về giá trị mặc định
					}))
					.flatMap(({ time, routes }) =>
						routes.map((routeData) => ({
							time,
							route: routeData.route,
							countFlight: routeData.countFlight,
						}))
					);

				// Nhóm các route giống nhau và tính tổng số chuyến bay cho mỗi nhóm
				const groupedRoutes = formattedData.reduce(
					(acc, { route, countFlight }) => {
						if (!acc[route]) {
							acc[route] = 0;
						}
						acc[route] += countFlight; // Tính tổng số chuyến bay cho route này
						return acc;
					},
					{}
				);

				// Sắp xếp các nhóm route theo tổng số chuyến bay
				const sortedRoutes = Object.entries(groupedRoutes)
					.map(([route, totalFlights]) => ({ route, totalFlights }))
					.sort((a, b) => b.totalFlights - a.totalFlights) // Sắp xếp giảm dần
					.slice(0, 5); // Chỉ lấy 5 tuyến bay có số chuyến bay cao nhất

				// Lưu 5 nhóm tuyến bay vào mảng đầu
				const top5Routes = new Set(sortedRoutes.map((route) => route.route));

				// Lấy tất cả các khoảng thời gian theo `period`
				const allPeriods = Object.keys(rawData);

				// Lọc dữ liệu để đảm bảo tất cả khoảng thời gian đều có giá trị
				const filteredData = allPeriods.flatMap((time) => {
					const routesInTime = formattedData.filter(
						(data) => data.time === time
					);

					// Nếu thời gian không có route nào trong top 5
					if (!routesInTime.some((data) => top5Routes.has(data.route))) {
						return [{ time, route: 'No data', countFlight: 0 }];
					}

					// Lọc các route thuộc top 5
					return routesInTime.filter((data) => top5Routes.has(data.route));
				});

				setTopRouteData(filteredData); // Cập nhật dữ liệu
			} catch (error) {
				console.error('Error fetching top routes:', error);
			} finally {
				setTimeout(() => setLoadingData(false), 300); // Đảm bảo loading hiển thị tối thiểu 300ms
			}
		};

		fetchTopRoute();
	}, [period]);

	// Cấu hình bảng
	const routeColumns = [
		{
			title: 'Thời gian',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: 'Tuyến bay',
			dataIndex: 'route',
			key: 'route',
		},
		{
			title: 'Số chuyến bay',
			dataIndex: 'countFlight',
			key: 'countFlight',
		},
	];

	// Lọc dữ liệu cho biểu đồ
	const filteredTopRouteData = topRouteData.filter(
		(data) => data.countFlight > 0
	);

	// Cấu hình biểu đồ
	const topRouteConfig = {
		data: filteredTopRouteData,
		xField: 'time', // Trục x: tuyến bay
		yField: 'countFlight', // Trục y: số chuyến bay
		seriesField: 'route', // Màu sắc phân biệt theo thời gian
		colorField: 'route', // Màu dựa trên số chuyến bay
		label: {
			position: 'middle',
			content: '{value}', // Hiển thị giá trị trên cột
		},
		columnStyle: { radius: [8, 8, 0, 0] }, // Bo góc các cột
	};

	// ------------------------------------------------------------------------------------------------
	// top 1 may bay co so gio bay cao nhat theo bang, so do( theo thang, quy, nam)
	const [viewTypeMB, setViewTypeMB] = useState('Chart'); // Chart, Table
	const [mayBay, setMayBay] = useState([]);
	const [hourOfPlaneMonthly, setHourOfPlaneMonthly] = useState([]);
	const [hourOfPlaneQuarterly, setHourOfPlaneQuarterly] = useState([]);
	const [hourOfPlaneYearly, setHourOfPlaneYearly] = useState([]);
	const [loadingMayBay, setLoadingMayBay] = useState(false); // Loading for MayBay
	const [loadingHour, setLoadingHour] = useState(false); // Loading for Hour of Plane

	const [planeInfoMap, setPlaneInfoMap] = useState({});

	useEffect(() => {
		const fetchPlaneDetails = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8080/admin/maybay/getAllPlane'
				);
				const planes = response.data.data;

				const planeMap = planes.reduce((acc, plane) => {
					acc[plane.idMayBay] = plane.tenMayBay; // Sửa nếu key đúng là `idMayBay`
					return acc;
				}, {});

				// Cập nhật state
				setPlaneInfoMap(planeMap);
			} catch (error) {
				console.error('Error fetching plane details:', error);
			}
		};

		fetchPlaneDetails();
	}, []);

	const fetchHourOfPlaneData = async (period) => {
		setLoadingHour(true); // Start loading for hour data
		try {
			const response = await axios.get(
				`http://localhost:8080/admin/maybay/calculateHourOfPlane?period=${period}`
			);
			console.log('Response: ', response.data.data);

			const formattedData = Object.entries(response.data.data)
				.map(([time, planes]) => {
					return Object.entries(planes).map(([planeId, hours]) => ({
						time: parseInt(time),
						planeId: parseInt(planeId),
						hours: hours,
					}));
				})
				.flat();

			if (period === 'monthly') setHourOfPlaneMonthly(formattedData);
			if (period === 'quarterly') setHourOfPlaneQuarterly(formattedData);
			if (period === 'yearly') setHourOfPlaneYearly(formattedData);
		} catch (error) {
			console.error(`Error fetching data for ${period}:`, error);
		} finally {
			setLoadingHour(false);
		}
	};

	useEffect(() => {
		if (timeFrame) {
			fetchHourOfPlaneData(timeFrame);
		}
	}, [timeFrame]);

	const flightHoursData = (period) => {
		switch (period) {
			case 'monthly':
				return hourOfPlaneMonthly.map((item) => ({
					...item,
					month: item.time,
				}));
			case 'quarterly':
				return hourOfPlaneQuarterly.map((item) => ({
					...item,
					quarter: Math.ceil(item.time / 3),
				}));
			case 'yearly':
				return hourOfPlaneYearly.map((item) => ({
					...item,
					year: item.time,
				}));
			default:
				return [];
		}
	};

	const flightHoursConfig = {
		...commonConfig,
		data: flightHoursData(timeFrame), // Dữ liệu tùy thuộc vào thời gian
		yField: 'hours', // Trục Y là số giờ bay
		xField: 'month', // Trục X là tháng (Month 1, Month 2, ...)
		seriesField: 'planeId', // Nhóm theo ID máy bay
		legend: { position: 'top-left' },
		xAxis: {
			title: {
				text: 'Tháng', // Tiêu đề cho trục X
			},
			label: {
				rotate: -90, // Xoay nhãn trục X 90 độ để hiển thị theo chiều dọc
				style: {
					textAlign: 'center', // Căn giữa nhãn trục X
				},
			},
			tickInterval: 1, // Một tick cho mỗi tháng
			range: [0, 1], // Điều chỉnh phạm vi cho trục X để các cột được căn chỉnh chính giữa
		},
		columnWidthRatio: 0.8, // Điều chỉnh độ rộng cột để chúng không quá rộng, giúp căn giữa tốt hơn
	};

	const flightHoursColumns = [
		{
			title: 'Thời gian',
			dataIndex: 'time',
			key: 'time',
			render: (value) => {
				return timeFrame === 'monthly'
					? `Tháng ${value}`
					: timeFrame === 'quarterly'
						? `Quý ${Math.ceil(value / 3)}`
						: `Năm ${value}`;
			},
		},
		{
			title: 'ID Máy Bay',
			dataIndex: 'planeId',
			key: 'planeId',
		},
		{
			title: 'Tên Máy Bay',
			dataIndex: 'planeId',
			key: 'planeId',
			render: (planeId) => {
				return planeInfoMap[planeId] || 'Không xác định'; // Sử dụng planeInfoMap để tìm tên máy bay
			},
		},
		{
			title: 'Số Giờ Bay',
			dataIndex: 'hours',
			key: 'hours',
			render: (value) => `${value} giờ`, // Hiển thị giá trị kèm chữ "giờ"
		},
	];
	const [planeInfoCache, setPlaneInfoCache] = useState({}); // Cache thông tin máy bay

	const fetchPlaneInfo = async (planeId) => {
		if (planeInfoCache[planeId]) {
			// Nếu đã có trong cache, không gọi lại API
			return planeInfoCache[planeId];
		}
		try {
			const response = await axios.get(
				`http://localhost:8080/admin/maybay/getPlane/${planeId}`
			);
			const planeInfo = response.data;
			setPlaneInfoCache((prevCache) => ({
				...prevCache,
				[planeId]: planeInfo,
			}));
			return planeInfo;
		} catch (error) {
			console.error(`Error fetching plane info for ID ${planeId}:`, error);
			return null;
		}
	};

	const [viewMode, setViewMode] = useState('Chart');
	const [revenueData, setRevenueData] = useState([]);
	// Khai báo các biến `month` và `year` (có thể lấy từ state hoặc input)
	const [year, setYear] = useState(new Date().getFullYear()); // Năm hiện tại

	const [yearList, setYearList] = useState([]);
	useEffect(() => {
		const fetchYear = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					'http://localhost:8080/thongke/namhoadon'
				);

				setYearList(response.data.data);
			} catch (error) {
				console.error('Error fetching year list:', error);
			}
		};
		fetchYear();
	}, []);

	const fetchRevenueData = async (timeFrame) => {
		setLoading(true);

		const endpoint = {
			Tháng: `/thongke/theothang?year=${year}`,
			Quý: `/thongke/theoquy?year=${year}`,
			Năm: `/thongke/theonam`,
		};

		try {
			const response = await axios.get(
				`http://localhost:8080${endpoint[timeFrame]}`
			);

			if (timeFrame === 'Tháng') {
				const formattedData = response.data.data.map((revenue, index) => ({
					time: `Tháng ${index + 1}`,
					revenue: revenue,
					type: 'Đồng',
				}));

				setRevenueData(formattedData);
			} else if (timeFrame === 'Quý') {
				const formattedData = [1, 2, 3, 4].map((qtr, index) => ({
					time: `Quý ${qtr} / ${year}`,
					revenue: response.data.data[index],
					type: 'Đồng',
				}));
				setRevenueData(formattedData);
			} else if (timeFrame === 'Năm') {
				const formattedData = Object.keys(response.data.data).map((year) => ({
					time: `Năm ${year}`,
					revenue: response.data.data[year],
					type: 'Đồng',
				}));
				setRevenueData(formattedData);
			}
		} catch (error) {
			console.error('Error fetching revenue data:', error);
		} finally {
			setLoading(false);
		}
	};

	// Gọi hàm fetchRevenueData khi `revenueView` thay đổi
	useEffect(() => {
		fetchRevenueData(revenueView); // Gọi API khi thay đổi giá trị
	}, [year, revenueView]);

	// Cấu hình biểu đồ doanh thu
	const revenueConfig = {
		...commonConfig,
		data: revenueData,
		xField: 'time',
		yField: 'revenue',
		seriesField: 'type',
		areaStyle: { fillOpacity: 0.2 },
		smooth: true,
	};
	const revenueColumns = [
		{
			title: 'Thời gian',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: 'Doanh thu(VND)',
			dataIndex: 'revenue',
			key: 'revenue',
		},
	];

	// ------------------------------------------------------------------------------------------------

	return (
		<div className='thongke'>
			<div className='stats-container'>
				<Card className='card blue' title='Số chuyến bay' bordered>
					<div className='card-wrap'>
						100{' '}
						<img
							className='icon'
							src='/public/icons/flight-ticket-svgrepo-com.svg'
							alt=''
						/>
					</div>
				</Card>
				<Card className='card orange' title='Tổng số khách hàng' bordered>
					<div className='card-wrap'>
						{customerCount !== null ? customerCount : <Spin />}{' '}
						<img
							className='icon'
							src='/public/icons/people-svgrepo-com.svg'
							alt=''
						/>
					</div>
				</Card>
				<Card className='card pink' title='Số máy bay' bordered>
					<div className='card-wrap'>
						10{' '}
						<img
							className='icon'
							src='/public/icons/domestic-flight-tourism-svgrepo-com.svg'
							alt=''
						/>
					</div>
				</Card>
				<Card className='card green' title='Số nhân viên' bordered>
					<div className='card-wrap'>
						90{' '}
						<img
							className='icon'
							src='/public/icons/hotel-man-3-svgrepo-com.svg'
							alt=''
						/>
					</div>
				</Card>
			</div>

			{/* Phần biểu đồ */}
			<div className='chart-container'>
				{/* Cột trái (chiếm 2 cột) */}
				<div className='chart-left'>
					<div className='chart-item'>
						<h2>Doanh thu theo {revenueView.toLowerCase()}</h2>
						<Select
							defaultValue='Tháng'
							style={{ width: 200, marginBottom: 20 }}
							onChange={(value) => setRevenueView(value)}
						>
							<Option value='Tháng'>Tháng</Option>
							<Option value='Quý'>Quý</Option>
							<Option value='Năm'>Năm</Option>
						</Select>
						{/* Thêm chọn tháng và năm nếu là "Tháng" */}
						{revenueView === 'Tháng' && (
							<>
								<Select
									value={year}
									style={{ width: 100, marginBottom: 20 }}
									onChange={(value) => setYear(value)}
								>
									{yearList.map((y) => (
										<Option key={y} value={y}>
											{y}
										</Option>
									))}
								</Select>
							</>
						)}
						{/* Hiển thị combobox cho quý khi revenueView là "Quý" */}
						{revenueView === 'Quý' && (
							<>
								<Select
									value={year}
									style={{ width: 100, marginBottom: 20 }}
									onChange={(value) => setYear(value)}
								>
									{yearListFLightStatus.map((y) => (
										<Option key={y} value={y}>
											{y}
										</Option>
									))}
								</Select>
							</>
						)}
						{/* Combobox chọn hiển thị dưới dạng Biểu đồ hoặc Bảng */}
						<Select
							defaultValue='Chart'
							style={{ width: 150, marginBottom: 20, marginTop: 20 }}
							onChange={(value) => setViewMode(value)} // Cập nhật viewMode
						>
							<Option value='Chart'>Biểu đồ</Option>
							<Option value='Table'>Bảng</Option>
						</Select>
						{/* Render dữ liệu theo mode */}
						{viewMode === 'Chart' ? (
							<Area {...revenueConfig} /> // Hiển thị biểu đồ nếu chọn 'Chart'
						) : (
							<Table
								dataSource={revenueData}
								columns={revenueColumns}
								pagination={revenueData.length > 4 ? { pageSize: 4 } : false}
							/> // Hiển thị bảng nếu chọn 'Table'
						)}
					</div>
					<div className='chart-row'>
						<div className='chart-item'>
							<h2>Số chuyến bay đúng giờ, trễ, hoặc bị hủy</h2>
							<div
								style={{
									display: 'flex',
									marginBottom: '20px',
									marginTop: '10px',
								}}
							>
								<Select
									value={timeFlightStatus}
									style={{ width: 100, marginRight: 10 }}
									onChange={(value) => setTimeFlightStatus(value)}
								>
									<Option value='monthly'>Tháng</Option>
									<Option value='quarterly'>Quý</Option>
									<Option value='yearly'>Năm</Option>
								</Select>
								{timeFlightStatus !== 'yearly' && (
									<>
										<Select
											value={selectYearFLightStatus}
											style={{ width: 100, marginBottom: 20 }}
											onChange={(value) => setSelectYearFLightStatus(value)}
										>
											{yearListFLightStatus.map((y) => (
												<Option key={y} value={y}>
													{y}
												</Option>
											))}
										</Select>
									</>
								)}
								{/* Hiển thị combobox cho quý khi revenueView là "Quý" */}
								<Select
									value={viewFlightStatus}
									style={{ width: 100 }}
									onChange={(value) => setViewFlightStatus(value)}
								>
									<Option value='Chart'>Biểu đồ</Option>
									<Option value='Table'>Bảng</Option>
								</Select>
							</div>
							{flightStatusData.length == 0 && (<div style={{ textAlign: 'center' }}>Không có dữ liệu</div>)}
							{viewFlightStatus === 'Chart' && (<Column {...flightStatusConfig} />)}
							{viewFlightStatus === 'Table' && (
								<Table
									dataSource={flightStatusData.map((item, index) => ({
										key: index,
										...item,
									}))}
									columns={columnsFlightStatus}
									pagination={{
										pageSize: 4,
										showSizeChanger: false,
									}}
								/>
							)}

						</div>

						{/* Biểu đồ độ tuổi */}
						<div className='chart-item'>
							<h2>Số hành khách theo độ tuổi</h2>
							<div
								style={{
									display: 'flex',
									marginBottom: '20px',
									marginTop: '10px',
								}}
							>
								<Select
									value={timePeriod}
									style={{ width: 100, marginRight: 10 }}
									onChange={(value) => setTimePeriod(value)}
								>
									<Option value='monthly'>Tháng</Option>
									<Option value='quarterly'>Quý</Option>
									<Option value='yearly'>Năm</Option>
								</Select>
								<Select
									value={viewKind}
									style={{ width: 100 }}
									onChange={(value) => setViewKind(value)}
								>
									<Option value='Chart'>Biểu đồ</Option>
									<Option value='Table'>Bảng</Option>
								</Select>
							</div>

							<div style={{ height: '430px', position: 'relative' }}>
								{loadData ? (
									<div
										style={{
											position: 'absolute',
											top: '50%',
											left: '50%',
											transform: 'translate(-50%, -50%)',
										}}
									>
										<Spin />
									</div>
								) : viewKind === 'Chart' ? (
									<Column {...ageGroupConfig} />
								) : (
									<Table
										dataSource={formattedTableData.map((item, index) => ({
											key: index,
											...item,
										}))}
										columns={ageColumns}
										pagination={{
											pageSize: 4,
											showSizeChanger: false,
										}}
									/>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Cột phải (chiếm 1 cột) */}
				<div className='chart-right' style={{ height: '105%' }}>
					<div className='chart-item'>
						<h2>Tỉ lệ tăng trưởng khách hàng</h2>
						<div
							style={{
								display: 'flex',
								marginBottom: '20px',
								marginTop: '10px',
							}}
						>
							<Select
								value={timeFrame}
								style={{ width: 100, marginRight: 10 }}
								onChange={(value) => setTimeFrame(value)}
							>
								<Option value='monthly'>Tháng</Option>
								<Option value='quarterly'>Quý</Option>
								<Option value='yearly'>Năm</Option>
							</Select>
							<Select
								value={viewType}
								style={{ width: 100 }}
								onChange={(value) => setViewType(value)}
							>
								<Option value='Chart'>Biểu đồ</Option>
								<Option value='Table'>Bảng</Option>
							</Select>
						</div>

						{/* Cố định chiều cao của container */}
						<div style={{ height: '430px', position: 'relative' }}>
							{/* Hiển thị loading hoặc dữ liệu */}
							{loading ? (
								<div
									style={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
									}}
								>
									<Spin />
								</div>
							) : viewType === 'Chart' ? (
								<Line {...growthRateConfig} />
							) : (
								<Table
									dataSource={growthData.map((item, index) => ({
										key: index,
										...item,
									}))}
									columns={columns}
									pagination={{
										pageSize: 4,
										showSizeChanger: false,
									}}
								/>
							)}
						</div>
					</div>

					{/* Biểu đồ tuyến bay tần suất */}
					<div className='chart-item'>
						<h2>Top 5 tuyến bay tần suất cao nhất</h2>
						<div
							style={{
								display: 'flex',
								marginBottom: '20px',
								marginTop: '10px',
							}}
						>
							<Select
								value={period}
								style={{ width: 100, marginRight: 10 }}
								onChange={(value) => setPeriod(value)}
							>
								<Option value='monthly'>Tháng</Option>
								<Option value='quarterly'>Quý</Option>
								<Option value='yearly'>Năm</Option>
							</Select>
							<Select
								value={viewPattern}
								style={{ width: 100 }}
								onChange={(value) => setViewPattern(value)}
							>
								<Option value='Chart'>Biểu đồ</Option>
								<Option value='Table'>Bảng</Option>
							</Select>
						</div>

						<div style={{ height: '430px', position: 'relative' }}>
							{loadingData ? (
								<div
									style={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
									}}
								>
									<Spin />
								</div>
							) : viewPattern === 'Chart' ? (
								<Column {...topRouteConfig} />
							) : (
								<Table
									dataSource={topRouteData.map((item, index) => ({
										key: index,
										...item,
									}))}
									columns={routeColumns}
									pagination={{
										pageSize: 4,
										showSizeChanger: false,
									}}
								/>
							)}
						</div>
					</div>
				</div>
				<div className='chart-right'>
					<div className='chart-item'>
						<h2>Top 1 máy bay có giờ bay cao nhất</h2>
						<div
							style={{
								display: 'flex',
								marginBottom: '20px',
								marginTop: '10px',
							}}
						>
							<Select
								value={timeFrame}
								style={{ width: 100, marginRight: 10 }}
								onChange={(value) => setTimeFrame(value)}
							>
								<Option value='monthly'>Tháng</Option>
								<Option value='quarterly'>Quý</Option>
								<Option value='yearly'>Năm</Option>
							</Select>
							<Select
								value={viewTypeMB}
								style={{ width: 100 }}
								onChange={(value) => setViewTypeMB(value)}
							>
								<Option value='Chart'>Biểu đồ</Option>
								<Option value='Table'>Bảng</Option>
							</Select>
						</div>
						<div style={{ height: '430px', position: 'relative' }}>
							{loading ? (
								<div
									style={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
									}}
								>
									<Spin />
								</div>
							) : viewTypeMB === 'Chart' ? (
								<Column {...flightHoursConfig} />
							) : (
								<Table
									dataSource={flightHoursData(timeFrame).map((item, index) => ({
										key: index,
										...item,
									}))}
									columns={flightHoursColumns}
									pagination={{
										pageSize: 4,
										showSizeChanger: false,
									}}
								/>
							)}
						</div>
					</div>
					<XuatExcel></XuatExcel>
				</div>
			</div>

			{/* CSS */}
			<style jsx>{`
        .stats-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* 4 ô thống kê */
          gap: 20px;
          margin-bottom: 20px;
        }

        .chart-container {
          display: grid;
          grid-template-columns: 2fr 1fr; /* Cột trái (2 phần), cột phải (1 phần) */
          gap: 20px;
        }

        .chart-left {
          display: grid;
          grid-template-rows: auto auto; /* 2 hàng */
          gap: 20px;
        }

        .chart-row {
          display: grid;
          grid-template-columns: 1fr 1fr; /* Chia hàng 2 thành 2 cột con */
          gap: 20px;
        }

        .chart-right {
          display: grid;
          grid-template-rows: auto auto; /* 2 hàng */
          gap: 20px;
        }

        .chart-item {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
      `}</style>
		</div>
	);
}
