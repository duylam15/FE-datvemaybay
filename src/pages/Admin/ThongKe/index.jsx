import React, { useState, useEffect } from 'react';
import { Line, Pie, Bar, Gauge, Column, Area } from '@ant-design/charts';
import { Select, Card, Spin, Table } from 'antd';
import axios from 'axios';
import "./Thongke.scss"

import { fetchRevenueByTimeFrame } from '../../../services/hoaDonService';

const { Option } = Select;


export default function ThongKe() {
  const [timeFrame, setTimeFrame] = useState('monthly');
  const [revenueView, setRevenueView] = useState('Tháng'); // Trạng thái hiển thị doanh thu

<<<<<<< HEAD
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
=======

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
>>>>>>> 2f375e7eda2a0fc5192cfe70537e701fda359de2

  const ratingData = [
    { category: '5 sao', value: 45 },
    { category: '4 sao', value: 30 },
    { category: '3 sao', value: 15 },
    { category: '2 sao', value: 5 },
    { category: '1 sao', value: 5 },
  ];

  const flightHoursData = [
    { employee: 'dưới 16', hours: 120, type: 'số lượng' },
    { employee: '16 - 35', hours: 150, type: 'số lượng' },
    { employee: 'trên 35', hours: 90, type: 'số lượng' },
  ];

  const flightStatusData = [
    { status: 'Đúng giờ', value: 70 },
    { status: 'Trễ', value: 20 },
    { status: 'Hủy', value: 10 },
  ];

  const flightRouteData = [
    { route: 'Hà Nội - TP HCM', frequency: 100, type: 'Số lượng' },
    { route: 'Hà Nội - Đà Nẵng', frequency: 50, type: 'Số lượng' },
    { route: 'TP HCM - Đà Nẵng', frequency: 80, type: 'Số lượng' },
    { route: 'TP HCM - Bình Định', frequency: 70, type: 'Số lượng' },
    { route: 'TP HCM - Huế', frequency: 60, type: 'Số lượng' },
  ];

<<<<<<< HEAD
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
  const revenueData = revenueDataSets[revenueView];
=======
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
	// const revenueData = revenueDataSets[revenueView];
>>>>>>> 2f375e7eda2a0fc5192cfe70537e701fda359de2

  // Cấu hình biểu đồ
  const commonConfig = {
    height: 300,
    autoFit: true,
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

<<<<<<< HEAD
  const revenueConfig = {
    ...commonConfig,
    data: revenueData,
    xField: 'time',
    yField: 'revenue',
    seriesField: 'type',
    areaStyle: { fillOpacity: 0.2 },
    smooth: true,
  };
=======
	
>>>>>>> 2f375e7eda2a0fc5192cfe70537e701fda359de2

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
  return (
    <div className='thongke'>
      <div className='stats-container'>
        <Card title='Số chuyến bay' bordered>
          100
        </Card>
        <Card title='Tổng số khách hàng' bordered>
          {customerCount !== null ? customerCount : <Spin />}
        </Card>
        <Card title='Số máy bay' bordered>
          10
        </Card>
        <Card title='Số nhân viên' bordered>
          90
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
            <Area {...revenueConfig} />
          </div>
          <div className='chart-row'>
            <div className='chart-item'>
              <h2>Tỷ lệ chuyến bay đúng giờ, trễ, hoặc bị hủy Phúc Lâm</h2>
              <Pie {...flightStatusConfig} />
            </div>
            <div className='chart-item'>
              <h2>Số hành khách theo độ tuổi</h2>
              <Bar {...flightHoursConfig} />
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Cột phải (chiếm 1 cột) */}
        <div className='chart-right'>
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
=======
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
	const [viewMode, setViewMode] = useState('Chart');
	const [revenueData, setRevenueData] = useState([]);

	// Khai báo các biến `month` và `year` (có thể lấy từ state hoặc input)
    const [year, setYear] = useState(new Date().getFullYear()); // Năm hiện tại
	console.log(year);
	const [yearList, setYearList] = useState([]);

	useEffect(() => {
		const fetchYear = async () => {
			setLoading(true);
			try {
				const response = await axios.get('http://localhost:8080/thongke/namhoadon');
				console.log(response.data);
				setYearList(response.data.data);
			} catch (error) {
				console.error('Error fetching year list:', error);
			}
		}
		fetchYear();
	}, [])

	console.log(yearList);
	

	const fetchRevenueData = async (timeFrame) => {
		console.log(timeFrame);
		setLoading(true);
	
		const endpoint = {
			Tháng: `/thongke/theothang?year=${year}`,
			Quý: `/thongke/theoquy?year=${year}`,
			Năm: `/thongke/theonam`,
		};
	
		try {
			const response = await axios.get(`http://localhost:8080${endpoint[timeFrame]}`);
			console.log(response.data);
	
			if (timeFrame === 'Tháng') {
				// Giả sử response.data.data là mảng doanh thu của 12 tháng
				const formattedData = response.data.data.map((revenue, index) => ({
					time: `Tháng ${index + 1}`,  // Tên tháng
					revenue: revenue,                      // Doanh thu của tháng
					type: 'Đồng',                          // Giá trị mặc định
				}));
	
				// Cập nhật state với dữ liệu doanh thu của 12 tháng
				setRevenueData(formattedData);
	
			} else if (timeFrame === 'Quý') {
				// Giả sử doanh thu của quý được trả về dạng mảng với 4 phần tử
				const formattedData = [1, 2, 3, 4].map((qtr, index) => ({
					time: `Quý ${qtr} / ${year}`,    // Tên quý
					revenue: response.data.data[index],  // Doanh thu của quý đó
					type: 'Đồng',                     // Giá trị mặc định
				}));
				setRevenueData(formattedData);
	
			} else if (timeFrame === 'Năm') {
				// Giả sử doanh thu của từng năm được trả về trong một đối tượng hoặc mảng
				const formattedData = Object.keys(response.data.data).map((year) => ({
					time: `Năm ${year}`,  // Tên năm
					revenue: response.data.data[year],  // Doanh thu của năm đó
					type: 'Đồng',          // Giá trị mặc định
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
		<div className="thongke">
			<div className="stats-container">
				<Card className="card blue" title="Số chuyến bay" bordered>
					<div className='card-wrap'>
						100 <img className='icon' src="/public/icons/flight-ticket-svgrepo-com.svg" alt="" />
					</div>
				</Card>
				<Card className="card orange" title="Tổng số khách hàng" bordered>
					<div className='card-wrap'>
						{customerCount !== null ? customerCount : <Spin />} <img className='icon' src="/public/icons/people-svgrepo-com.svg" alt="" />
					</div>
				</Card>
				<Card className="card pink" title="Số máy bay" bordered>
					<div className='card-wrap'>
						10 <img className='icon' src="/public/icons/domestic-flight-tourism-svgrepo-com.svg" alt="" />
					</div>
				</Card>
				<Card className="card green" title="Số nhân viên" bordered>
					<div className='card-wrap'>
						90 <img className='icon' src="/public/icons/hotel-man-3-svgrepo-com.svg" alt="" />
					</div>
				</Card>
			</div>

			{/* Phần biểu đồ */}
			<div className="chart-container">
				{/* Cột trái (chiếm 2 cột) */}
				<div className="chart-left">
					<div className="chart-item">
						<h2>Doanh thu theo {revenueView.toLowerCase()}</h2>
						
						<Select
							defaultValue="Tháng"
							style={{ width: 200, marginBottom: 20 }}
							onChange={(value) => setRevenueView(value)}
						>
							<Option value="Tháng">Tháng</Option>
							<Option value="Quý">Quý</Option>
							<Option value="Năm">Năm</Option>
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
								{yearList.map((y) => (
								<Option key={y} value={y}>
									{y}
								</Option>
								))}
							</Select>
							</>
						)}

						{/* Combobox chọn hiển thị dưới dạng Biểu đồ hoặc Bảng */}
						<Select
							defaultValue="Chart"
							style={{ width: 150, marginBottom: 20, marginTop: 20 }}
							onChange={(value) => setViewMode(value)} // Cập nhật viewMode
						>
							<Option value="Chart">Biểu đồ</Option>
							<Option value="Table">Bảng</Option>
						</Select>

						{/* Render dữ liệu theo mode */}
						{viewMode === 'Chart' ? (
							<Area {...revenueConfig} /> // Hiển thị biểu đồ nếu chọn 'Chart'
						) : (
							<Table dataSource={revenueData} columns={revenueColumns} /> // Hiển thị bảng nếu chọn 'Table'
						)}
					</div>

					
					<div className="chart-row">
						<div className="chart-item">
							<h2>Tỷ lệ chuyến bay đúng giờ, trễ, hoặc bị hủy Phúc Lâm</h2>
							<Pie {...flightStatusConfig} />
						</div>
						<div className="chart-item">
							<h2>Số hành khách theo độ tuổi</h2>
							<Bar {...flightHoursConfig} />
						</div>
					</div>
				</div>
>>>>>>> 2f375e7eda2a0fc5192cfe70537e701fda359de2

          <div className='chart-item'>
            <h2>Top 5 tuyến bay tần suất cao Hưng Lộc</h2>
            <Column {...flightRouteFrequencyConfig} />
          </div>
        </div>
        <div className='chart-right'>
          <div className='chart-item'>
            <h2>Top 5 máy bay có giờ bay cao : biểu đồ của tri</h2>
            <Column {...flightRouteFrequencyConfig} />
          </div>
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
