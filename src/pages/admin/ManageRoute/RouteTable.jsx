import React, { useEffect, useState, useCallback } from 'react';
import Table from '../../../components/QL/Table';
import Actions from '../../../components/QL/Actions';
import CustomPagination from '../../../components/QL/Pagination';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StyleTuyenBay.scss';
import { block } from '../../../services/tuyenBayService';
import { PermissionAddButton } from '../../../components/Admin/Sidebar';
import IconLabelButtons from '../../../components/Admin/ColorButtons';

const BASE_URL = 'http://localhost:8080';

const RouteTable = () => {
  const [routes, setRoutes] = useState([]);
  const [airports, setAirports] = useState([]);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const itemsPerPage = 10; // Số mục trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const getAirportNameById = (id) => {
    const airport = airports.find((a) => a.idSanBay === id);
    return airport ? airport.tenSanBay : 'Không tìm thấy';
  };

  const filteredRoutes = routes.filter((route) =>
    getAirportNameById(route.idSanBayBatDau)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Các mục hiển thị trên trang hiện tại
  const currentRoutes = filteredRoutes.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(filteredRoutes.length / itemsPerPage);

  // Reset về trang đầu tiên khi tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Chuyển sang trang mới
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const loadRoutes = useCallback(async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${BASE_URL}/getAllRoutes`);
      if (result.status === 200) {
        setRoutes(result.data.data);
      }
    } catch (error) {
      console.error('Error loading routes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadAirport = async () => {
    try {
      const result = await axios.get(
        'http://localhost:8080/admin/sanbay/getAllAirport'
      );
      if (result.status === 200) {
        setAirports(result.data.data);
      }
    } catch (error) {
      console.error('Error loading airports:', error);
    }
  };

  const sortRoutes = (field, order, routes) => {
    return [...routes].sort((a, b) => {
      const aValue = field === 'idTuyenBay' ? Number(a[field]) : a[field];
      const bValue = field === 'idTuyenBay' ? Number(b[field]) : b[field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return order === 'asc' ? aValue - bValue : bValue - aValue;
    });
  };

  const handleBlock = async (idTuyeBay) => {
    try {
      const updateRoute = await block(idTuyeBay);
      setRoutes(updateRoute);
    } catch (error) {
      console.error('Error blocking route:', error);
    }
  };

  const handleSortClick = (field) => {
    if (!field || field === 'status' || field === 'Actions') {
      return;
    }

    const newSortOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedRoutes = sortRoutes(field, newSortOrder, routes);
    setRoutes(sortedRoutes);
    setSortOrder(newSortOrder);
    setSortField(field);
  };

  const formatFlightTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours}h ${mins}'`;
  };

  const columns = [
    {
      header: 'ID',
      render: (item) => item.idTuyenBay,
      sortField: 'idTuyenBay',
    },
    {
      header: 'Thời gian chuyến bay (phút)',
      render: (item) => formatFlightTime(item.thoiGianChuyenBay),
      sortField: 'thoiGianChuyenBay',
    },
    {
      header: 'Khoảng cách (km)',
      render: (item) => item.khoangCach,
      sortField: 'khoangCach',
    },
    {
      header: 'Sân bay BĐ',
      render: (item) => getAirportNameById(item.idSanBayBatDau),
      sortField: 'idSanBayBatDau',
    },
    {
      header: 'Sân bay KT',
      render: (item) => getAirportNameById(item.idSanBayKetThuc),
      sortField: 'idSanBayKetThuc',
    },
    {
      header: 'Trạng thái',
      render: (item) => item.status,
    },
    {
      header: 'Actions',
      render: (item) => (
        <Actions
          editLink={`editRoute/${item.idTuyenBay}`}
          onBlock={() => handleBlock(item.idTuyenBay)}
          isBlocked={item.status === 'IN_ACTIVE' ? 'IN_ACTIVE' : 'ACTIVE'}
          type='Quản lí tuyến bay'
        />
      ),
    },
  ];

  useEffect(() => {
    loadAirport();
    loadRoutes();
  }, []);

  return (
    <div>
      <div className='topup-table'>
        <div className='search-sort-controls'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Nhập sân bay bắt đầu'
          />
        </div>
        <PermissionAddButton feature='Quản lí tuyến bay'>
          <Link to='add' className='add-btn'>
            <IconLabelButtons />
          </Link>
        </PermissionAddButton>
      </div>

      {/* Bảng dữ liệu */}
      <Table
        columns={columns}
        data={currentRoutes}
        onSortClick={handleSortClick}
        currentSortField={sortField}
        currentSortOrder={sortOrder}
        type='Quản lí tuyến bay'
      />

      {/* Phân trang */}
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RouteTable;
