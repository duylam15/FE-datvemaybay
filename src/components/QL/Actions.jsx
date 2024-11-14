import React from 'react';
import { FaUnlock, FaLock } from 'react-icons/fa';
import EditBtn from '../Admin/ColorButtons/EditBtn';
import BlockBtn from '../Admin/ColorButtons/BlockBtn';
import UnBlockBtn from '../Admin/ColorButtons/UnBlockBtn';

import { Link } from 'react-router-dom';

const Actions = ({ onBlock, isBlocked, editLink }) => {
  return (
    <div className='btn_row'>
      <Link to={editLink}>
        <EditBtn></EditBtn>
      </Link>

      {isBlocked === 'ACTIVE' ? (
        <span onClick={onBlock}>
          <BlockBtn></BlockBtn>
        </span>
      ) : (
        <span onClick={onBlock}>
          <UnBlockBtn></UnBlockBtn>
        </span>
      )}
    </div>
  );
};

export default Actions;
