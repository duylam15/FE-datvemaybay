import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination"; // Import Pagination
import Stack from "@mui/material/Stack"; // Import Stack
import "./ve.css";
import IconLabelButtons from "../../../components/Admin/ColorButtons";
import VeList from "./VeList";
import { searchVe } from "../../../services/veService";
import { DatePicker, Space, Input } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SearchBtn from "../../../components/Admin/ColorButtons/SearchBtn";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const VeListOverall = ({ size = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [searchName, setSearchName] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [cccd, setCccd] = useState('')
  const [ve, setVe] = useState([]);
  const [sortField, setSortField] = useState("");
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState(["", ""]); // State để lưu ngày

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2 && dates[0] && dates[1]) {
      // Cập nhật ngày nếu có
      const [startDate, endDate] = dates;
      setSelectedDates([startDate, endDate]);
      fetchVe(searchName, startDate, endDate, cccd, currentPage);
    } else {
      // Nếu ngày bị hủy chọn, đặt thành ["", ""] và lấy tất cả kết quả
      setSelectedDates(["", ""]);
      fetchVe(searchName, "", "", cccd, currentPage);
    }
  };

  // Fetch permissions based on current page and search term
  const fetchVe = async (searchName, startDate, endDate, cccd, page) => {
    try {
      const startDateFormatted = startDate ? startDate.format(dateFormat) : null;
      const endDateFormatted = endDate ? endDate.format(dateFormat) : null;
      console.log("start Date : ", startDate)
      console.log("end Date: ", endDate)

      const result = await searchVe(searchName, startDateFormatted, endDateFormatted, cccd, page - 1, size); // API usually uses 0-based indexing
      if (result && result.data) {
        setVe(result.data.content);
        setTotalPages(result.data.totalPages); // Update total pages based on API response
      } else {
        setVe([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  // Fetch data when currentPage changes or when searchName changes
  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when searchName or selectedDates change
    fetchVe(searchName, selectedDates[0], selectedDates[1], cccd, 1);
  }, [searchName, selectedDates, cccd]);

  useEffect(() => {
    fetchVe(searchName, selectedDates[0], selectedDates[1], cccd, currentPage);
  }, [currentPage]);

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    // Add sorting logic here if needed
  };

  const handleEdit = (idVe) => {
    navigate(`/admin/ve/edit/${idVe}`); // Điều hướng đến trang sửa
  };

  const handleBlock = async (idVe) => {
    console.log("Block permission:", idVe);
  };
  console.log("ve: ~", ve);
  console.log("cccd ~ ", cccd)


  return (
    <>
      <h1>Danh sách vé</h1>

      <div className="separate_block"></div>

      <div className="search-sort-controlsss">
        <div className="blockInput">
          <Input
            name='maVe'
            placeholder="Nhập mã vé cần tìm..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="blockInput">
          <Space direction="vertical" size={12}>
            <RangePicker
              format={dateFormat}
              onChange={handleDateChange}
            />
          </Space>
        </div>
        <div className="blockInput">
          <Input
            name='CCCD'
            placeholder="Nhập CCCD hành khách"
            value={cccd}
            onChange={(e) => {
              const value = e.target.value;
              // Kiểm tra nếu giá trị là một số
              if (/^\d*$/.test(value)) {
                setCccd(value);  // Chỉ cập nhật giá trị nếu là số
              }
            }}
            showCount maxLength={12}
          />
        </div>
        <SearchBtn></SearchBtn>
      </div>
      <VeList
        ve={ve}
        searchName={searchName}
        setSearchName={setSearchName}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortField={sortField}
        onEdit={handleEdit}
        onBlock={handleBlock}
      />

      <div className="center">
        <Stack spacing={2}>
          <Pagination
            count={totalPages} // Total number of pages
            page={currentPage} // Current page
            variant="outlined"
            shape="rounded"
            onChange={(event, value) => setCurrentPage(value)} // Update current page
          />
        </Stack>
      </div>

    </>
  );
};

export default VeListOverall;




