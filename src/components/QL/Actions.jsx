import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Actions = ({ onDelete, editLink }) => {
  return (
    <div className='container-action'>
      <Link to={editLink} className='edit-btn'>
        <FaEdit />
      </Link>
      <span className='delete-btn' onClick={onDelete}>
        <FaTrashAlt />
      </span>
    </div>
  );
};

export default Actions;
