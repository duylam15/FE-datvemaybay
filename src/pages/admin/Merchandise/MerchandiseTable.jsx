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
  handleSort,
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
      console.error('Lỗi khi tải hàng hóa:', error);
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
      console.error('Error loading type merchandises:', error);
    }
  };

  const getNameById = (id) => {
    const typeItem = typeMerchans.find((a) => a.idLoaiHangHoa === id);
    return typeItem ? typeItem.tenLoaiHangHoa : 'Không tìm thấy';
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
          console.error('Lỗi trong quá trình tìm kiếm:', error);
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
      console.error('Lỗi khi xóa hàng hóa:', error);
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

  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));

  const handleSortClick = (field) => {
    // Kiểm tra xem cột có thể sắp xếp không
    if (!field || field === 'status' || field === 'Actions') {
      return; // Không thực hiện sắp xếp
    }

    setSortField(field);
    handleSort(
      field,
      sortOrder,
      setMerchans,
      toggleSortOrder,
      setSortField,
      originalMerchans,
      typeMerchans
    );
  };

  const columns = [
    { header: 'ID', render: (item) => item.idHangHoa, sortField: 'idHangHoa' },
    {
      header: 'Loại hàng hoá',
      render: (item) => getNameById(item.idLoaiHangHoa),
      sortField: 'idLoaiHangHoa',
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
  }, []);

  useEffect(() => {
    loadTypeMerchandises();
  }, []);

  return (
    <div>
      <div className='button-container'>
        <div className='search-sort-controls'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Link to='add' className='add-btn'>
          <FaPlus />
        </Link>
      </div>
      {loading ? (
        <p>Đang tải...</p>
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
