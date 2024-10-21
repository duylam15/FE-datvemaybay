import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Actions = ({ onDelete, editLink }) => {
  return (
    <div>
      <Link to={editLink} className='edit-btn'>
        <FaEdit />
      </Link>
      <button className='delete-btn' onClick={onDelete}>
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default Actions;
