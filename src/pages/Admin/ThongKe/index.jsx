import React from 'react';
// import { Line, Pie, Bar, Gauge, Column, Area } from '@ant-design/charts';

export default function ThongKe() {
	// Dữ liệu mẫu cho các biểu đồ
	const customerData = [
		{ time: 'Jan', customers: 120, type: '2023' },
		{ time: 'Feb', customers: 140, type: '2023' },
		// ...
	];

	const ratingData = [
		{ category: '5 sao', value: 45 },
		{ category: '4 sao', value: 30 },
		{ category: '3 sao', value: 15 },
		{ category: '2 sao', value: 5 },
		{ category: '1 sao', value: 5 },
	];

	const flightHoursData = [
		{ employee: 'John Doe', hours: 120, type: '2023' },
		{ employee: 'Jane Smith', hours: 150, type: '2023' },
		// ...
	];

	const flightStatusData = [
		{ status: 'Đúng giờ', value: 70 },
		{ status: 'Trễ', value: 20 },
		{ status: 'Hủy', value: 10 },
	];

	const flightRouteData = [
		{ route: 'Hà Nội - TP HCM', frequency: 100, type: 'Tháng 1' },
		{ route: 'Hà Nội - Đà Nẵng', frequency: 50, type: 'Tháng 1' },
		// ...
	];

	const revenueData = [
		{ time: 'Tháng 1', revenue: 1000, type: '2023' },
		{ time: 'Tháng 2', revenue: 1200, type: '2023' },
		{ time: 'Tháng 2', revenue: 1200, type: '2023' },
		{ time: 'Tháng 2', revenue: 1200, type: '2023' },
		// ...
	];

	// Cấu hình biểu đồ
	const commonConfig = {
		width: 500,
		height: 500,
	};

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

	const flightHoursConfig = {
		...commonConfig,
		data: flightHoursData,
		xField: 'hours',
		yField: 'employee',
		seriesField: 'type',
		legend: { position: 'top-left' },
	};

	const flightStatusConfig = {
		...commonConfig,
		data: flightStatusData,
		angleField: 'value',
		colorField: 'status',
		radius: 1,
		label: { type: 'outer', content: '{name} {percentage}' },
	};

	const seatUtilizationConfig = {
		...commonConfig,
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

	const revenueConfig = {
		...commonConfig,
		data: revenueData,
		xField: 'time',
		yField: 'revenue',
		seriesField: 'type',
		areaStyle: { fillOpacity: 0.2 },
		smooth: true,
	};

	return (
		<div className="thongke">
			<div className="container">
				<div className="thongke__inner">
					<div className="chart-item">
						<h2>Số khách hàng</h2>
						<Line {...customerConfig} />
					</div>

					<div className="chart-item">
						<h2>Tỷ lệ đánh giá theo số sao</h2>
						<Pie {...ratingConfig} />
					</div>

					<div className="chart-item">
						<h2>Số giờ bay của mỗi nhân viên</h2>
						<Bar {...flightHoursConfig} />
					</div>

					<div className="chart-item">
						<h2>Tỷ lệ chuyến bay đúng giờ, trễ, hoặc bị hủy</h2>
						<Pie {...flightStatusConfig} />
					</div>

					<div className="chart-item">
						<h2>Tỷ lệ sử dụng ghế ngồi</h2>
						<Gauge {...seatUtilizationConfig} />
					</div>

					<div className="chart-item">
						<h2>Tần suất chuyến bay theo tuyến</h2>
						<Column {...flightRouteFrequencyConfig} />
					</div>

					<div className="chart-item">
						<h2>Doanh thu theo tháng/quý/năm</h2>
						<Area {...revenueConfig} />
					</div>
				</div>
			</div>
		</div>
	);
}
