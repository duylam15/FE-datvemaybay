import React, { useState, useEffect } from 'react';
import { Line, Pie, Bar, Gauge, Column, Area } from '@ant-design/charts';
import { Select, Card, Spin, Table } from 'antd';
import axios from '../../../utils/axios-80802';
import './Thongke.scss';
import { fetchRevenueByTimeFrame } from '../../../services/hoaDonService';
import XuatExcel from './XuatExcel/XuatExcel';

const { Option } = Select;

export default function ThongKe() {
  const [timeFrame, setTimeFrame] = useState('monthly');
  const [revenueView, setRevenueView] = useState('Tháng'); // Trạng thái hiển thị doanh thu
  const [timePeriod, setTimePeriod] = useState('monthly');

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

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchAgeGroupData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://localhost:8080/getTicketsByAgeGroup',
          {
            params: { period: timePeriod.toLowerCase() },
          }
        );

        const rawData = response.data.data;

        // Chuyển đổi dữ liệu sang mảng
        const formattedData = Object.entries(rawData).map(
          ([time, ageGroups]) => ({
            time, // Thời gian (ví dụ: "Month 1")
            ageGroups: Object.entries(ageGroups).map(([ageGroup, count]) => ({
              ageGroup,
              count,
            })),
          })
        );

        setAgeGroupData(formattedData); // Cập nhật dữ liệu
      } catch (error) {
        console.error('Error fetching age group data:', error);
      } finally {
        setTimeout(() => setLoading(false), 300); // Đảm bảo loading hiển thị tối thiểu 300ms
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
      render: (value) => Math.round(value), // Làm tròn giá trị count về số nguyên
    },
  ];

  // Cấu hình biểu đồ
  const ageGroupConfig = {
    data: formattedTableData,
    xField: 'ageGroup',
    yField: 'count',
    seriesField: 'time',
    colorField: 'ageGroup',
    label: {
      position: 'middle',
      content: '{value}',
    },
    columnStyle: { radius: [8, 8, 0, 0] },
    scales: {
      y: {
        min: 0, // Đảm bảo trục Y bắt đầu từ 0
        nice: true, // Làm tròn trục Y sao cho hiển thị số nguyên
        tickInterval: 1, // Chỉ hiển thị số nguyên
      },
    },
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

      const formattedData = Object.entries(response.data.data).map(([time, planes]) => {
        return Object.entries(planes).map(([planeId, hours]) => ({
          time: parseInt(time),
          planeId: parseInt(planeId),
          hours: hours,
        }));
      }).flat();

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
        return hourOfPlaneMonthly.map(item => ({
          ...item,
          month: item.time,
        }));
      case 'quarterly':
        return hourOfPlaneQuarterly.map(item => ({
          ...item,
          quarter: Math.ceil(item.time / 3),
        }));
      case 'yearly':
        return hourOfPlaneYearly.map(item => ({
          ...item,
          year: item.time,
        }));
      default:
        return [];
    }
  };

  const flightHoursConfig = {
    ...commonConfig,
    data: flightHoursData(timeFrame),  // Dữ liệu tùy thuộc vào thời gian
    yField: 'hours',                   // Trục Y là số giờ bay
    xField: 'month',                   // Trục X là tháng (Month 1, Month 2, ...)
    seriesField: 'planeId',            // Nhóm theo ID máy bay
    legend: { position: 'top-left' },
    xAxis: {
      title: {
        text: 'Tháng',  // Tiêu đề cho trục X
      },
      label: {
        rotate: -90,   // Xoay nhãn trục X 90 độ để hiển thị theo chiều dọc
        style: {
          textAlign: 'center',  // Căn giữa nhãn trục X
        },
      },
      tickInterval: 1,  // Một tick cho mỗi tháng
      range: [0, 1],    // Điều chỉnh phạm vi cho trục X để các cột được căn chỉnh chính giữa
    },
    columnWidthRatio: 0.8,  // Điều chỉnh độ rộng cột để chúng không quá rộng, giúp căn giữa tốt hơn
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
    }, {
      title: 'ID Máy Bay',
      dataIndex: 'planeId',
      key: 'planeId'
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
      const response = await axios.get(`http://localhost:8080/admin/maybay/getPlane/${planeId}`);
      const planeInfo = response.data;
      setPlaneInfoCache((prevCache) => ({ ...prevCache, [planeId]: planeInfo }));
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
        const response = await axios.get('http://localhost:8080/thongke/namhoadon');

        setYearList(response.data.data);
      } catch (error) {
        console.error('Error fetching year list:', error);
      }
    }
    fetchYear();
  }, [])


  const fetchRevenueData = async (timeFrame) => {

    setLoading(true);

    const endpoint = {
      Tháng: `/thongke/theothang?year=${year}`,
      Quý: `/thongke/theoquy?year=${year}`,
      Năm: `/thongke/theonam`,
    };

    try {
      const response = await axios.get(`http://localhost:8080${endpoint[timeFrame]}`);

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
              <Table dataSource={revenueData} columns={revenueColumns} pagination={revenueData.length > 4 ? { pageSize: 4 } : false} /> // Hiển thị bảng nếu chọn 'Table'
            )}
          </div>
          <div className='chart-row'>
            <div className='chart-item'>
              <h2>Tỷ lệ chuyến bay đúng giờ, trễ, hoặc bị hủy Phúc Lâm</h2>
              <Pie {...flightStatusConfig} />
            </div>
            {/* Biểu đồ độ tuổi */}
            <div className='chart-container'>
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

        </div>

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

          <div className='chart-item'>
            <h2>Top 5 tuyến bay tần suất cao Hưng Lộc</h2>
            <Column {...flightRouteFrequencyConfig} />
          </div>

        </div>
        <div className='chart-right'>
          <div className='chart-item'>
            <h2>Top 1 máy bay có giờ bay cao nhất</h2>
            <div style={{ display: 'flex', marginBottom: '20px', marginTop: '10px' }}>
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
