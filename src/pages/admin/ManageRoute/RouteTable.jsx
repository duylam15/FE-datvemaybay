import React, { useEffect, useState } from 'react';
import Table from '../../../components/QL/Table';
import Actions from '../../../components/QL/Actions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StyleTuyenBay.scss';
import { FaPlus } from 'react-icons/fa';

const RouteTable = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    loadRoutes();
  }, []);

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

  const handleDelete = async (idTuyenBay) => {
    await axios.delete(`http://localhost:8080/deleteRoute/${idTuyenBay}`);
    loadRoutes();
  };

  const columns = [
    { header: 'STT', render: (item, index) => index + 1 },
    {
      header: 'Thời gian chuyến bay (phút)',
      render: (item) => item.thoiGianChuyenBay,
    },
    { header: 'Khoảng cách (km)', render: (item) => item.khoangCach },
    { header: 'Sân bay BĐ', render: (item) => item.idSanBayBatDau },
    { header: 'Sân bay KT', render: (item) => item.idSanBayKetThuc },
    { header: 'Trạng thái', render: (item) => item.status },
    {
      header: 'Actions',
      render: (item) => (
        <Actions
          editLink={`/EditRoute/${item.idTuyenBay}`}
          onDelete={() => handleDelete(item.idTuyenBay)}
        />
      ),
    },
  ];

  return (
    <div>
      <div className='button-container'>
        <Link to='/AddForm' className='add-btn'>
          <FaPlus />
        </Link>
      </div>
      <Table columns={columns} data={routes} />
    </div>
  );
};

export default RouteTable;
