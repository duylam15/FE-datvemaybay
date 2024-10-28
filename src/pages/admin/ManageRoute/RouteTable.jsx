import React, { useEffect, useState } from 'react';
import Table from '../../../components/QL/Table';
import Actions from '../../../components/QL/Actions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteConfirmation from '../../../components/QL/DeleteConfirmation'; // Import DeleteConfirmation component
import './StyleTuyenBay.scss';
import { FaPlus } from 'react-icons/fa';
import { handleSort } from '../../../services/RouteServices';

const RouteTable = () => {
  const [routes, setRoutes] = useState([]);
  const [airports, setAirports] = useState([]);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for showing delete confirmation modal
  const [selectedRouteId, setSelectedRouteId] = useState(null); // State for storing selected route ID for deletion

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

  const handleSortClick = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    handleSort(field, newSortOrder, setRoutes, setSortOrder, setSortField);
  };

  const getAirportNameById = (id) => {
    const airport = airports.find((a) => a.idSanBay === id);
    return airport ? airport.tenSanBay : 'Không tìm thấy'; // Return 'Not found' if airport does not exist
  };

  const handleDelete = async (idTuyenBay) => {
    if (idTuyenBay === null) {
      console.error('No route ID selected for deletion.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/deleteRoute/${idTuyenBay}`);
      setShowDeleteConfirm(false);
      loadRoutes(); // Gọi lại hàm loadRoutes để lấy danh sách mới
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };

  // Show delete confirmation modal
  const showDeleteModal = (idTuyenBay) => {
    setSelectedRouteId(idTuyenBay);
    setShowDeleteConfirm(true);
  };

  // Cancel the delete process
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
    { header: 'STT', render: (item, index) => index + 1 },
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
      sortField: 'status',
    },
    {
      header: 'Actions',
      render: (item) => (
        <Actions
          editLink={`/EditRoute/${item.idTuyenBay}`}
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
        <Link to='/AddForm' className='add-btn'>
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

      {/* Delete confirmation modal */}
      <DeleteConfirmation
        show={showDeleteConfirm}
        onDeleteConfirm={() => handleDelete(selectedRouteId)} // Confirm deletion of selected route
        onCancel={cancelDelete} // Cancel deletion
      />
    </div>
  );
};

export default RouteTable;
