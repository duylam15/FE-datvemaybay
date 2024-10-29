// TableComponent.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataNhanVienSorted } from '../../services/nhanVienServices';
import './table.css';

const TableComponent = (props) => {
  const navigator = useNavigate();

  function getValue(obj, field) {
    return field.split('.').reduce((o, key) => (o ? o[key] : undefined), obj);
  }

  // Hàm sắp xếp
  function sortFlights(flights, field, order = 'asc') {
    return flights.sort((a, b) => {
      const valueA = getValue(a, field);
      const valueB = getValue(b, field);

      if (typeof valueA === 'string') {
        return order === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  function xuLiDuLieu(obj, key) {

    if (key == "chuyenBay") {
      if (obj[key] == null)
        return "Đang rãnh"
      else return "Đang bay";
    }

    if (key.toString().toLowerCase().includes("id") || key.toString().toLowerCase().includes("iata")) {
      return obj[key];
    }

    const date = new Date(obj[key]);
    if (!isNaN(date.getTime())) {
      // Lấy ngày, tháng, năm
      const day = String(date.getDate()).padStart(2, '0'); // Ngày
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng (tháng bắt đầu từ 0)
      const year = date.getFullYear(); // Năm

      // Lấy giờ, phút, giây
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      // Trả về chuỗi định dạng
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
    return key.split('.').reduce((o, k) => (o && o[k] !== 'undefined' ? o[k] : null), obj);
  }

  const [sortField, setSortField] = useState(props.dataKeys[0]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    switch (props.dataKeys[0]) {
      case "idNhanVien":
        dataNhanVienSorted(sortField, sortOrder)
          .then((response) => {
            props.setData(response.data.data);
          })
        break;
      case "idChuyenBay":
        const data = props.primaryData;
        const sortedFlight = sortFlights(data, sortField, sortOrder);
        props.setData(sortedFlight);
        const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
        navigator(currentPath, { replace: true })
        break;
      default:
        break;
    }

  }, [sortField, sortOrder]);

  const handleSortField = (nameSortField) => {

    if (nameSortField == sortField) {
      setSortOrder(sortOrder == "asc" ? "desc" : "asc");
    }
    else {
      setSortField(nameSortField);
      setSortOrder("asc");
    }

    console.log(nameSortField + ":" + sortOrder);
  }
  const edit = (id) => {
    const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
    const newPath = `${currentPath}/edit/?id=${id}`; // Thêm đoạn mới vào
    navigator(newPath, { replace: true })
  }


  return (
    <table>
      <thead>
        <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)' }}>
          {props.columns.map((col, index) => (
            <th key={index} onClick={() => handleSortField(props.dataKeys[index])}>{col}{sortField == props.dataKeys[index] && sortOrder == "asc" ? '\u2191' : '\u2193'}</th>
          ))}
          {props.editLink && (<th>Hành động</th>)}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(props.data) && props.data.map((item, index) => (
          //tạo boderBottom nếu vẫn còn dữ liệu
          <tr key={item.id} style={{ borderBottom: index === props.data.length - 1 ? 'none' : '1px solid rgba(0, 0, 0, 0.2)' }}>
            {props.dataKeys.map((key1, idx) => (
              <td key={idx} style={key1 === 'trangThaiActive' ? { color: item[key1] === 'ACTIVE' ? 'green' : 'red' } : {}}>
                {xuLiDuLieu(item, key1)}
              </td>
            ))}
            {(
              <td onClick={() => edit(item[props.dataKeys[0]])}>
                <button className='btn'>Sửa</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
