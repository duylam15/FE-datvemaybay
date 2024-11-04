import React, { useEffect, useState, useCallback } from 'react';
import Table from '../../../components/QL/Table';
import Actions from '../../../components/QL/Actions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StyleQuyDinh.scss';
import { FaPlus } from 'react-icons/fa';
import DeleteConfirmation from '../../../components/QL/DeleteConfirmation';

const RuleTable = () => {
  const [rules, setRules] = useState([]);
  const [typeRules, setTypeRules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [originalRules, setOriginalRules] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedRuleId, setSelectedRuleId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadRules = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        'http://localhost:8080/admin/quydinh/getallquydinh'
      );
      if (result.status === 200) {
        setRules(result.data.data);
        setOriginalRules(result.data.data);
      }
    } catch (error) {
      console.error('Error loading rules:', error);
      alert('Failed to load rules. Please try again.'); // User feedback
    } finally {
      setLoading(false);
    }
  };

  const loadTypeRules = async () => {
    try {
      const result = await axios.get(
        'http://localhost:8080/admin/loaiquydinh/getallloaiquydinh'
      );
      if (result.status === 200) {
        setTypeRules(result.data.data);
      }
    } catch (error) {
      console.error('Error loading rule types:', error);
      alert('Failed to load rule types. Please try again.'); // User feedback
    }
  };

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }

  const handleSearch = useCallback(
    async (event) => {
      const term = event.target.value;
      setSearchTerm(term);
      if (term.trim() === '') {
        setRules(originalRules);
      } else {
        try {
          // Assume you have a searchRules function that handles searching
          const response = await searchRules(term);
          setRules(response.data.data || []);
        } catch (error) {
          console.error('Error in search:', error);
          alert('Search failed. Please try again.'); // User feedback
        }
      }
    },
    [originalRules]
  );

  const handleDelete = async (idQuyDinh) => {
    try {
      await axios.delete(
        `http://localhost:8080/deleteMerchandise/${idQuyDinh}`
      );
      setRules((prevRules) =>
        prevRules.filter((rule) => rule.idQuyDinh !== idQuyDinh)
      );
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting rule:', error);
      alert('Failed to delete the rule. Please try again.'); // User feedback
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedRuleId(null);
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
    const sortedRules = sortData([...rules], field, newSortOrder);
    setRules(sortedRules);
    setSortOrder(newSortOrder);
    setSortField(field);
  };

  const columns = [
    { header: 'ID', render: (item) => item.idQuyDinh, sortField: 'idQuyDinh' },
    {
      header: 'Loại quy định',
      render: (item) => item.loaiQuyDinh.tenLoaiQuyDinh,
      sortField: 'loaiQuyDinh.tenLoaiQuyDinh',
    },
    {
      header: 'Tên quy định',
      render: (item) => item.tenQuyDinh,
      sortField: 'tenQuyDinh',
    },
    {
      header: 'Nội dung',
      render: (item) => item.noiDung,
      sortField: 'noiDung',
    },
    {
      header: 'Thời gian tạo',
      render: (item) => formatDateTime(item.thoiGianTao),
      sortField: 'thoiGianTao',
    },
    {
      header: 'Thời gian cập nhật',
      render: (item) => formatDateTime(item.thoiGianCapNhat),
      sortField: 'thoiGianCapNhat',
    },
    {
      header: 'Nhân viên',
      render: (item) => item.nhanVien.hoTen,
      sortField: 'nhanVien.hoTen',
    },
    {
      header: 'Trạng thái',
      render: (item) => item.trangThaiActive,
    },
    {
      header: 'Actions',
      render: (item) => (
        <Actions
          editLink={`editRule/${item.idQuyDinh}`}
          onDelete={() => {
            setSelectedRuleId(item.idQuyDinh); // Set the selected ID for deletion
            setShowDeleteConfirm(true); // Show the confirmation dialog
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    loadRules();
    loadTypeRules();
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
          data={rules}
          onSortClick={handleSortClick}
          currentSortField={sortField}
          currentSortOrder={sortOrder}
        />
      )}
      <DeleteConfirmation
        show={showDeleteConfirm}
        onDeleteConfirm={() => handleDelete(selectedRuleId)}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default RuleTable;
