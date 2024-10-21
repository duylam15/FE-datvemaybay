import React, { useEffect, useState } from 'react';
import Table from '../../../components/QL/Table';
import Actions from '../../../components/QL/Actions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StyleHangHoa.scss';
import { FaPlus } from 'react-icons/fa';

const MerchandiseTable = () => {
  const [merchans, setMerchans] = useState([]);

  useEffect(() => {
    loadMerchans();
  }, []);

  const loadMerchans = async () => {
    try {
      const result = await axios.get(
        'http://localhost:8080/getAllMerchandises'
      );
      if (result.status === 200) {
        setMerchans(result.data.data);
      }
    } catch (error) {
      console.error('Error loading merchandises:', error);
    }
  };

  const handleDelete = async (idHangHoa) => {
    await axios.delete(`http://localhost:8080/deleteMerchandise/${idHangHoa}`);
    loadMerchans();
  };

  const columns = [
    { header: 'STT', render: (item, index) => index + 1 },
    { header: 'Loại hàng hoá', render: (item) => item.idLoaiHangHoa },
    { header: 'Tên hàng hoá', render: (item) => item.tenHangHoa },
    { header: 'Trọng tải (kg)', render: (item) => item.taiTrong },
    { header: 'Giá phát sinh (VND)', render: (item) => item.giaPhatSinh },
    { header: 'Trạng thái', render: (item) => item.trangThaiActive },
    {
      header: 'Actions',
      render: (item) => (
        <Actions
          editLink={`/EditMerchandise/${item.idHangHoa}`}
          onDelete={() => handleDelete(item.idHangHoa)}
        />
      ),
    },
  ];

  return (
    <div>
      <div className='button-container'>
        <Link to='/addMerchandise' className='add-btn'>
          <FaPlus />
        </Link>
      </div>
      <Table columns={columns} data={merchans} />
    </div>
  );
};

export default MerchandiseTable;
