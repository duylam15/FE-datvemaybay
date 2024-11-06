import React, { useEffect, useState, useCallback } from 'react';
import Table from '../../../components/QL/Table';
import Actions from '../../../components/QL/Actions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StyleHangHoa.scss';
import { FaPlus } from 'react-icons/fa';
import DeleteConfirmation from '../../../components/QL/DeleteConfirmation';
import {
  searchMerchans,
  handleSort as serverSort,
} from '../../../services/MerchandiseService';

const MerchandiseTable = () => {
  const [merchans, setMerchans] = useState([]);
  const [typeMerchans, setTypeMerchans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [originalMerchans, setOriginalMerchans] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedMerchandiseId, setSelectedMerchandiseId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMerchans = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        'http://localhost:8080/getAllMerchandises'
      );
      if (result.status === 200) {
        setMerchans(result.data.data);
        setOriginalMerchans(result.data.data);
      }
    } catch (error) {
      console.error('Error loading merchandise:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTypeMerchandises = async () => {
    try {
      const result = await axios.get(
        'http://localhost:8080/api/loaiHangHoa/all'
      );
      if (result.status === 200) {
        setTypeMerchans(result.data.data);
      }
    } catch (error) {
      console.error('Error loading merchandise types:', error);
    }
  };

  const getNameById = (id) => {
    const typeItem = typeMerchans.find((a) => a.idLoaiHangHoa === id);
    return typeItem ? typeItem.tenLoaiHangHoa : 'Not Found';
  };

  const handleSearch = useCallback(
    async (event) => {
      const term = event.target.value;
      setSearchTerm(term);

      if (term.trim() === '') {
        setMerchans(originalMerchans);
      } else {
        try {
          const response = await searchMerchans(term);
          setMerchans(response.data.data || []);
        } catch (error) {
          console.error('Error in search:', error);
        }
      }
    },
    [originalMerchans, setMerchans]
  );

  const handleDelete = async (idHangHoa) => {
    try {
      await axios.delete(
        `http://localhost:8080/deleteMerchandise/${idHangHoa}`
      );
      setMerchans((prevMerchans) =>
        prevMerchans.filter((merch) => merch.idHangHoa !== idHangHoa)
      );
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting merchandise:', error);
    }
  };

  const showDeleteModal = (idHangHoa) => {
    setSelectedMerchandiseId(idHangHoa);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedMerchandiseId(null);
  };

  const sortData = (data, field, order) => {
    return data.sort((a, b) => {
      const aValue =
        typeof a[field] === 'string' ? a[field].toLowerCase() : a[field];
      const bValue =
        typeof b[field] === 'string' ? b[field].toLowerCase() : b[field];

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSortClick = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedMerchans = sortData([...merchans], field, newSortOrder);

    setMerchans(sortedMerchans);
    setSortOrder(newSortOrder);
    setSortField(field);
  };

  const columns = [
    { header: 'ID', render: (item) => item.idHangHoa, sortField: 'idHangHoa' },
    {
      header: 'Loại hàng hoá',
      render: (item) => getNameById(item.idLoaiHangHoa),
      sortField: 'idLoaiHangHoa',
    },
    {
      header: 'Mã hàng hoá',
      render: (item) => item.maHangHoa,
      sortField: 'maHangHoa',
    },
    {
      header: 'Tên hàng hoá',
      render: (item) => item.tenHangHoa,
      sortField: 'tenHangHoa',
    },
    {
      header: 'Trọng tải (kg)',
      render: (item) => item.taiTrong,
      sortField: 'taiTrong',
    },
    {
      header: 'Giá phát sinh (VND)',
      render: (item) => item.giaPhatSinh,
      sortField: 'giaPhatSinh',
    },
    {
      header: 'Trạng thái',
      render: (item) => item.trangThaiActive,
    },
    {
      header: 'Actions',
      render: (item) => (
        <Actions
          editLink={`editMerchandise/${item.idHangHoa}`}
          onDelete={() => showDeleteModal(item.idHangHoa)}
        />
      ),
    },
  ];

  useEffect(() => {
    loadMerchans();
    loadTypeMerchandises();
  }, []);

  return (
    <div>
      <div className='button-container'>
        <div className='search-sort-controls'>
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Link to='add' className='add-btn'>
          <FaPlus />
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          columns={columns}
          data={merchans}
          onSortClick={handleSortClick}
          currentSortField={sortField}
          currentSortOrder={sortOrder}
        />
      )}
      <DeleteConfirmation
        show={showDeleteConfirm}
        onDeleteConfirm={() => handleDelete(selectedMerchandiseId)}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default MerchandiseTable;
