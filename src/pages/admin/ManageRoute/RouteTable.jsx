import React, { useEffect, useState } from 'react';
import Table from '../../../components/QL/Table';
import Actions from '../../../components/QL/Actions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteConfirmation from '../../../components/QL/DeleteConfirmation';
import './StyleTuyenBay.scss';
import { FaPlus } from 'react-icons/fa';

const RouteTable = () => {
  const [routes, setRoutes] = useState([]);
  const [airports, setAirports] = useState([]);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const loadRoutes = async () => {
    try {
      const result = await axios.get('http://localhost:8080/getAllRoutes');
      if (result.status === 200) {
        setRoutes(result.data.data);
      }
    } catch (error) {
      console.error('Error loading routes:', error);
    }
  };

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
      const aValue = field === 'idTuyenBay' ? Number(a[field]) : a[field]; // Chuyển ID thành số
      const bValue = field === 'idTuyenBay' ? Number(b[field]) : b[field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return order === 'asc' ? aValue - bValue : bValue - aValue;
    });
  };

  const handleSortClick = (field) => {
    // Kiểm tra xem cột có thể sắp xếp không
    if (!field || field === 'status' || field === 'Actions') {
      return; // Không thực hiện sắp xếp
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

  const handleDelete = async (idTuyenBay) => {
    if (idTuyenBay === null) {
      console.error('No route ID selected for deletion.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/deleteRoute/${idTuyenBay}`);
      setShowDeleteConfirm(false);
      loadRoutes(); // Reload routes after deletion
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };

  const showDeleteModal = (idTuyenBay) => {
    setSelectedRouteId(idTuyenBay);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedRouteId(null);
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
          onDelete={() => showDeleteModal(item.idTuyenBay)}
        />
      ),
    },
  ];

  useEffect(() => {
    loadAirport();
  }, []);

  useEffect(() => {
    loadRoutes();
  }, []);

  return (
    <div>
      <div className='button-container'>
        <Link to='add' className='add-btn'>
          <FaPlus />
        </Link>
      </div>
      <Table
        columns={columns}
        data={routes}
        onSortClick={handleSortClick}
        currentSortField={sortField}
        currentSortOrder={sortOrder}
      />

      <DeleteConfirmation
        show={showDeleteConfirm}
        onDeleteConfirm={() => handleDelete(selectedRouteId)}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default RouteTable;
