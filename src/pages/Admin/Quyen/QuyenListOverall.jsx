import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import QuyenList from "./QuyenList";
import Pagination from "@mui/material/Pagination"; // Import Pagination
import Stack from "@mui/material/Stack"; // Import Stack
import "./quyen.css";
import { searchQuyen } from "../../../services/quyenService";
import IconLabelButtons from "../../../components/Admin/ColorButtons";

const QuyenListOverall = ({ size = 2 }) => {
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [searchName, setSearchName] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [nhomQuyen, setNhomQuyen] = useState([]);
  const [sortField, setSortField] = useState("");
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const navigate = useNavigate();

  // Fetch permissions based on current page and search term
  const fetchQuyen = async (searchName, page) => {
    try {
      const result = await searchQuyen(searchName, page - 1, size); // API usually uses 0-based indexing
      if (result && result.data) {
        setNhomQuyen(result.data.content);
        setTotalPages(result.data.totalPages); // Update total pages based on API response
      } else {
        setNhomQuyen([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  // Fetch data when currentPage changes or when searchName changes
  useEffect(() => {
    // When searchName changes, reset to page 1
    if (searchName !== "") {
      setCurrentPage(1); // Reset to page 1 when searchName changes
    }
  }, [searchName]); // Only listen to searchName changes

  useEffect(() => {
    fetchQuyen(searchName, currentPage); // Fetch with the current page
  }, [currentPage, searchName]); // Fetch data when currentPage or searchName changes

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    // Add sorting logic here if needed
  };
  
  const handleEdit = (idQuyen) => {
    navigate(`/admin/quyen/edit/${idQuyen}`); // Điều hướng đến trang sửa
  };

  const handleBlock = async (idQuyen) => {
    console.log("Block permission:", idQuyen);
  };
  console.log("nhom quyen chuan: ~", nhomQuyen);
  return (
    <>
      <h1>Danh sách nhóm quyền</h1>

      <Link to="add">
        <IconLabelButtons></IconLabelButtons>
      </Link>
      <div className="separate_block"></div>
      <QuyenList
        nhomQuyen={nhomQuyen}
        searchName={searchName}
        setSearchName={setSearchName}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortField={sortField}
        onEdit={handleEdit}
        onBlock={handleBlock}
      />

      {/* Pagination Component */}
      <Stack spacing={2}>
        <Pagination
          count={totalPages} // Total number of pages
          page={currentPage} // Current page
          variant="outlined"
          shape="rounded"
          onChange={(event, value) => setCurrentPage(value)} // Update current page
        />
      </Stack>
    </>
  );
};

export default QuyenListOverall;
