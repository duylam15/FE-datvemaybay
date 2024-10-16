// TableComponent.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dataNhanVienSorted } from '../../services/nhanVienServices';
import './table.css';

const TableComponent = (props) => {

  function getNestedValue(obj, key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== 'undefined' ? o[k] : null), obj);
  }

  const [sortField, setSortField] = useState(props.dataKeys[0]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() =>{
      dataNhanVienSorted(sortField,sortOrder)
            .then((response) => {
              props.setData(response.data.data);
            })
            
  },[sortField,sortOrder]);

  const handleSortField= (nameSortField) => {

    if(nameSortField == sortField){
      setSortOrder(sortOrder == "asc" ? "desc" : "asc") ;
    }
    else{
      setSortField(nameSortField);
      setSortOrder("asc");
    }

    console.log(nameSortField + ":" + sortOrder);
  }

  return (
    <table>
      <thead>
        <tr style={{ borderBottom:'1px solid rgba(0, 0, 0, 0.2)' }}>
          {props.columns.map((col, index) => (
            <th key={index} onClick={() => handleSortField(props.dataKeys[index])}>{col}{sortField == props.dataKeys[index] && sortOrder == "asc" ? '\u2191' : '\u2193'}</th>
          ))}
          {props.editLink &&(<th>Hành động</th>)}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(props.data) && props.data.map((item, index) => (
          <tr key={item.id} style={{ borderBottom: index === props.data.length -1  ? 'none' : '1px solid rgba(0, 0, 0, 0.2)' }}>
            {props.dataKeys.map((key1, idx) => (
              <td key={idx} style={key1 === 'trangThaiActive' ? { color: item[key1] === 'ACTIVE' ? 'green' : 'red' } : {}}>
              {key1 === 'ngaySinh' ? item[key1].toString().split("T")[0] : getNestedValue(item,key1)} {/* Định dạng ngày sinh */}
            </td>
            ))}
            {props.editLink && ( // Chỉ hiển thị ô Hành động nếu editLink tồn tại
              <td>
                <Link to={`${props.editLink}?id=${item[props.dataKeys[0]]}`}>Sửa</Link>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
