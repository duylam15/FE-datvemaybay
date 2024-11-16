import React from 'react';
import { PermissionEditButton } from '../Admin/Sidebar';

const Table = ({
  columns,
  data,
  onSortClick,
  currentSortField,
  currentSortOrder,
  type
}) => {
  const renderHeader = (header, sortField) => {
    const isActiveSort = currentSortField === sortField;
    const sortArrow = isActiveSort
      ? currentSortOrder === 'asc'
        ? '↑'
        : '↓'
      : '';

    return (
      <span>
        {header} {sortArrow}
      </span>
    );
  };
  return (
    <table className='table'>
      <thead className='thead-dark'>
        <tr>
          {columns.map((column) => {
            // Logic riêng cho "Quản lí tuyến bay"
            if (type == "Quản lí tuyến bay") {
              console.log("vaof tuyen bay");
              if (column.header != "Actions") {
                return (
                  <th
                    key={column.sortField}
                    onClick={() => onSortClick(column.sortField)}
                    style={column.style}
                  >
                    {renderHeader(column.header, column.sortField)}
                  </th>
                );
              } else {
                return (
                  <PermissionEditButton feature="Quản lí tuyến bay">
                    <th key={column.sortField} style={column.style}>
                      {renderHeader(column.header, column.sortField)}
                    </th>
                  </PermissionEditButton>
                );
              }
            }
            if (type == "Quản lí hàng hoá") {
              console.log("vaof hang hoas");
              if (column.header != "Actions") {
                
                return (
                  <th
                    key={column.sortField}
                    onClick={() => onSortClick(column.sortField)}
                    style={column.style}
                  >
                    {renderHeader(column.header, column.sortField)}
                  </th>
                );
              } else {
                return (
                  <>
                  <PermissionEditButton feature="Quản lí hàng hoá">
                    <th key={column.sortField} style={column.style}>
                      {renderHeader(column.header, column.sortField)}
                    </th>
                  </PermissionEditButton>
                  </>
                );

              }
            }
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => {
              const isLastColumn = colIndex === columns.length - 1; // Kiểm tra cột cuối cùng

              return isLastColumn ? (
                <PermissionEditButton feature={type}>
                  <td key={column.sortField}>
                    {column.render(item, rowIndex)}
                  </td>
                </PermissionEditButton>
              ) : (
                <td key={column.sortField}>{column.render(item, rowIndex)}</td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
