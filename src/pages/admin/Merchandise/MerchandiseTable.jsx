import React, { useEffect, useState, useCallback } from 'react';
import Table from '../../../components/QL/Table';
import Actions from '../../../components/QL/Actions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StyleHangHoa.scss';
import { FaPlus } from 'react-icons/fa';
import DeleteConfirmation from '../../../components/QL/DeleteConfirmation';
import FailToast from '../../../components/FailToast';
import { searchMerchans } from '../../../services/MerchandiseService';

const BASE_URL = 'http://localhost:8080';

const MerchandiseTable = () => {
  const [merchans, setMerchans] = useState([]);
  const [typeMerchans, setTypeMerchans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [originalMerchans, setOriginalMerchans] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFailToast, setShowFailToast] = useState(false);
  const [selectedMerchandiseId, setSelectedMerchandiseId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMerchans = useCallback(async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${BASE_URL}/getAllMerchandises`);
      if (result.status === 200) {
        setMerchans(result.data.data);
        setOriginalMerchans(result.data.data);
      }
    } catch (error) {
      console.error('Error loading merchandise:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadTypeMerchandises = useCallback(async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/loaiHangHoa/all`);
      if (result.status === 200) {
        setTypeMerchans(result.data.data);
      }
    } catch (error) {
      console.error('Error loading merchandise types:', error);
    }
  }, []);

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
          setShowFailToast(true); // Optional: display a toast on search failure
        }
      }
    },
    [originalMerchans]
  );

  const handleDelete = async (idHangHoa) => {
    try {
      await axios.delete(`${BASE_URL}/deleteMerchandise/${idHangHoa}`);
      setShowDeleteConfirm(false);
      loadMerchans();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setShowDeleteConfirm(false);
        setShowFailToast(true); // Show FailToast on 409 error
      } else {
        console.error('Error deleting merchandise:', error);
      }
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

  const sortData = useCallback((data, field, order) => {
    return data.sort((a, b) => {
      const aValue =
        typeof a[field] === 'string' ? a[field].toLowerCase() : a[field];
      const bValue =
        typeof b[field] === 'string' ? b[field].toLowerCase() : b[field];

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, []);

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
  }, [loadMerchans, loadTypeMerchandises]);

  return (
    <div>
      <div className='button-container'>
        <div className='search-sort-controls'>
          <input
            type='text'
            placeholder='Nhập tên hàng hoá'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Link to='add' className='add-btn'>
          <FaPlus /> Thêm
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
      <FailToast
        message='Không thể xoá dữ liệu đã liên kết với dữ liệu khác'
        show={showFailToast}
        onClose={() => setShowFailToast(false)}
      />
    </div>
  );
};

export default MerchandiseTable;
