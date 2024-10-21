import React, { useEffect, useState } from 'react';
import Table from '../../../components/QL/Table';
import Actions from '../../../components/QL/Actions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StyleHangHoa.scss';
import { FaPlus } from 'react-icons/fa';
import DeleteConfirmation from '../../../components/QL/DeleteConfirmation'; // Import DeleteConfirmation

const MerchandiseTable = () => {
  const [merchans, setMerchans] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for delete confirmation modal
  const [selectedMerchandiseId, setSelectedMerchandiseId] = useState(null); // State to hold the selected merchandise ID for deletion

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
    try {
      await axios.delete(
        `http://localhost:8080/deleteMerchandise/${idHangHoa}`
      );
      setMerchans(merchans.filter((merch) => merch.idHangHoa !== idHangHoa)); // Update state to remove the deleted merchandise
      setShowDeleteConfirm(false); // Close the confirmation dialog
    } catch (error) {
      console.error('Error deleting merchandise:', error);
    }
  };

  const showDeleteModal = (idHangHoa) => {
    setSelectedMerchandiseId(idHangHoa); // Set the selected merchandise ID
    setShowDeleteConfirm(true); // Show the confirmation modal
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false); // Close the confirmation dialog
    setSelectedMerchandiseId(null); // Clear the selected ID
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
          onDelete={() => showDeleteModal(item.idHangHoa)} // Show delete confirmation modal
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
      {/* Display the delete confirmation modal */}
      <DeleteConfirmation
        show={showDeleteConfirm}
        onDeleteConfirm={() => handleDelete(selectedMerchandiseId)}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default MerchandiseTable;
