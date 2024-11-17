import React from 'react';
import { FaUnlock, FaLock } from 'react-icons/fa';
import EditBtn from '../Admin/ColorButtons/EditBtn';
import BlockBtn from '../Admin/ColorButtons/BlockBtn';
import UnBlockBtn from '../Admin/ColorButtons/UnBlockBtn';

import { Link } from 'react-router-dom';
import { PermissionButton, PermissionEditButton } from '../Admin/Sidebar';

const Actions = ({ onBlock, isBlocked, editLink, type }) => {
  return (
    <>
      {type == 'Quản lí tuyến bay' && (
        <PermissionEditButton feature='Quản lí tuyến bay'>
          <div>
            <div className='btn_row'>
              <Link to={editLink}>
                <EditBtn></EditBtn>
              </Link>

              {/* {isBlocked === 'ACTIVE' ? (
              <span onClick={onBlock}>
                <BlockBtn></BlockBtn>
              </span>
            ) : (
              <span onClick={onBlock}>
                <UnBlockBtn></UnBlockBtn>
              </span>
            )} */}
            </div>
          </div>
        </PermissionEditButton>
      )}
      {type == 'Quản lí hàng hoá' && (
        <PermissionEditButton feature='Quản lí hàng hoá'>
          <div>
            <div className='btn_row'>
              <Link to={editLink}>
                <EditBtn></EditBtn>
              </Link>

              {/* {isBlocked === 'ACTIVE' ? (
                <span onClick={onBlock}>
                  <BlockBtn></BlockBtn>
                </span>
              ) : (
                <span onClick={onBlock}>
                  <UnBlockBtn></UnBlockBtn>
                </span>
              )} */}
            </div>
          </div>
        </PermissionEditButton>
      )}
    </>
  );
};

export default Actions;
