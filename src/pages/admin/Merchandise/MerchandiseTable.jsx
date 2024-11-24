import React, { useEffect, useState, useCallback } from 'react';
import Table from '../../../components/QL/Table';
import Actions from '../../../components/QL/Actions';
import CustomPagination from '../../../components/QL/Pagination';
import axios from '../../../utils/axios-80802';
import { Link } from 'react-router-dom';
import './StyleHangHoa.scss';
import { block, searchMerchans } from '../../../services/MerchandiseService';
import { PermissionAddButton } from '../../../components/Admin/Sidebar';
import IconLabelButtons from '../../../components/Admin/ColorButtons';

const BASE_URL = 'http://localhost:8080';

const MerchandiseTable = () => {
  const [merchans, setMerchans] = useState([]);
  const [typeMerchans, setTypeMerchans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [originalMerchans, setOriginalMerchans] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredMerchans = merchans.filter((merchan) =>
    merchan.tenHangHoa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the merchandises for the current page
  const currentMerchans = filteredMerchans.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Total pages based on the filtered merchandises
  const totalPages = Math.ceil(filteredMerchans.length / itemsPerPage);

  const getNameById = (id) => {
    const typeItem = typeMerchans.find((a) => a.idLoaiHangHoa === id);
    return typeItem ? typeItem.tenLoaiHangHoa : 'Not Found';
  };

  // Load merchandise
  const loadMerchans = useCallback(async () => {
    setLoading(true);
    try {
      // Gọi cả hai API đồng thời
      const [merchanResult, hangHoaResult] = await Promise.all([
        axios.get(`${BASE_URL}/getAllMerchandises`),
        axios.get('http://localhost:8080/hanhkhach/hanghoa'),
      ]);

      // Kiểm tra kết quả của từng API
      if (merchanResult.status === 200 && hangHoaResult.status === 200) {
        const merchans = merchanResult.data.data; // Dữ liệu từ API merchandise
        const hangHoas = hangHoaResult.data.data; // Dữ liệu từ API hành khách - hàng hóa

        // Kết hợp dữ liệu dựa trên idHangHoa
        const combinedData = merchans.map((merchandise) => {
          const relatedHangHoa = hangHoas.find(
            (hangHoa) => hangHoa.idHangHoa === merchandise.idHangHoa
          );
          return {
            ...merchandise,
            relatedHangHoa, // Gắn dữ liệu từ bảng hành khách - hàng hóa
          };
        });

        // Lưu dữ liệu kết hợp vào state
        setMerchans(combinedData);
        setOriginalMerchans(combinedData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load merchandise types
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

  // Handle search input change
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
    [originalMerchans]
  );

  // Sort function for merchandise
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

  // Handle sorting click
  const handleSortClick = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedMerchans = sortData([...merchans], field, newSortOrder);

    setMerchans(sortedMerchans);
    setSortOrder(newSortOrder);
    setSortField(field);
  };

  // Columns for the table
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
      header: 'Tên Hành khách',
      render: (item) =>
        item.relatedHangHoa ? item.relatedHangHoa.tenHanhKhach : 'N/A',
    },
    {
      header: 'Cccd',
      render: (item) =>
        item.relatedHangHoa ? item.relatedHangHoa.cccd : 'N/A',
    },
    {
      header: 'Actions',
      render: (item) => (
        <Actions
          editLink={`editMerchandise/${item.idHangHoa}`}
          onBlock={() => handleBlock(item.idHangHoa)}
          isBlocked={
            item.trangThaiActive === 'IN_ACTIVE' ? 'IN_ACTIVE' : 'ACTIVE'
          }
          type='Quản lí hàng hoá'
        />
      ),
    },
  ];

  useEffect(() => {
    loadMerchans();
    loadTypeMerchandises();
  }, []);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className='topup-table'>
        <div className='search-sort-controls'>
          <input
            type='text'
            placeholder='Nhập tên hàng hoá'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <PermissionAddButton feature='Quản lí hàng hoá'>
          <Link to='add' className='add-btn'>
            <IconLabelButtons />
          </Link>
        </PermissionAddButton>
      </div>

      {/* Table Data */}
      <Table
        columns={columns}
        data={currentMerchans}
        onSortClick={handleSortClick}
        currentSortField={sortField}
        currentSortOrder={sortOrder}
        type='Quản lí hàng hoá'
      />

      {/* Pagination Controls */}
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MerchandiseTable;
