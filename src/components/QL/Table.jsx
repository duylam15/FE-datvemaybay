import React from 'react';

const Table = ({
  columns,
  data,
  onSortClick,
  currentSortField,
  currentSortOrder,
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
          {columns.map((column) => (
            <th
              key={column.sortField}
              onClick={() => onSortClick(column.sortField)}
            >
              {renderHeader(column.header, column.sortField)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.sortField}>{column.render(item, index)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
