import React from 'react';
import './DeleteConfirmation.scss';

const DeleteConfirmation = ({ show, onDeleteConfirm, onCancel }) => {
  if (!show) {
    return null; // Không hiển thị gì nếu không cần xác nhận
  }

  return (
    <div className='delete-confirmation-overlay'>
      <div className='delete-confirmation-box'>
        <h3>Xác nhận xóa</h3>
        <p>Bạn có chắc chắn muốn xóa mục này không?</p>
        <div className='button-container'>
          <button className='btn btn-confirm' onClick={onDeleteConfirm}>
            Xác nhận
          </button>
          <button className='btn btn-cancel' onClick={onCancel}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
