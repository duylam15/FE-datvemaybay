// TableComponent.js
import { format } from 'date-fns'; // Nếu sử dụng date-fns
import React from 'react';
import { Link } from 'react-router-dom';
import './table.css';

const TableComponent = ({ columns, dataKeys, data, editLink }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy'); // Sử dụng date-fns
  };
  return (
    <table>
      <thead>
        <tr style={{ borderBottom:'1px solid rgba(0, 0, 0, 0.2)' }}>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
          {editLink &&(<th>Hành động</th>)}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(data) && data.map((item, index) => (
          <tr key={item.id} style={{ borderBottom: index === data.length -1  ? 'none' : '1px solid rgba(0, 0, 0, 0.2)' }}>
            {dataKeys.map((key, idx) => (
              <td key={idx}>
              {key === 'ngaySinh' ? formatDate(item[key]) : item[key]} {/* Định dạng ngày sinh */}
            </td>
            ))}
            {editLink && ( // Chỉ hiển thị ô Hành động nếu editLink tồn tại
              <td>
                <Link to={`${editLink}?id=${item[dataKeys[0]]}`}>Sửa</Link>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
