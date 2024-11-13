import React, { useEffect, useState, useCallback } from 'react';
import Table from '../../../components/QL/Table';
import Actions from '../../../components/QL/Actions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StyleTuyenBay.scss';
import { FaPlus } from 'react-icons/fa';
import { block } from '../../../services/tuyenBayService';

const BASE_URL = 'http://localhost:8080';

const RouteTable = () => {
  const [routes, setRoutes] = useState([]);
  const [airports, setAirports] = useState([]);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

  const getAirportNameById = (id) => {
    const airport = airports.find((a) => a.idSanBay === id);
    return airport ? airport.tenSanBay : 'Không tìm thấy';
  };

  const formatFlightTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours}h ${mins}'`;
  };

  const filteredRoutes = routes.filter((route) =>
    getAirportNameById(route.idSanBayBatDau)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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
        <Link to='add' className='add-btn'>
          <FaPlus /> Thêm
        </Link>
      </div>
      <Table
        columns={columns}
        data={filteredRoutes}
        onSortClick={handleSortClick}
        currentSortField={sortField}
        currentSortOrder={sortOrder}
      />
    </div>
  );
};

export default RouteTable;
