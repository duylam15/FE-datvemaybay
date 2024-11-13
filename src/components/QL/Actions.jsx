import React from 'react';
import { FaEdit, FaUnlock, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Actions = ({ onBlock, isBlocked, editLink }) => {
  return (
    <div className='container-action'>
      <Link to={editLink} className='edit-btn'>
        <FaEdit />
      </Link>

      {isBlocked === 'ACTIVE' ? (
        <span className='block-btn' onClick={onBlock}>
          <FaUnlock />
        </span>
      ) : (
        <span className='block-btn' onClick={onBlock}>
          <FaLock />
        </span>
      )}
    </div>
  );
};

export default Actions;
