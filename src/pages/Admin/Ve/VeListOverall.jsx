import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination"; // Import Pagination
import Stack from "@mui/material/Stack"; // Import Stack
import "./ve.css";
import { searchQuyen } from "../../../services/quyenService";
import IconLabelButtons from "../../../components/Admin/ColorButtons";
import VeList from "./VeList";
import { searchVe } from "../../../services/veService";

const VeListOverall = ({ size = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [searchName, setSearchName] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [ve, setVe] = useState([]);
  const [sortField, setSortField] = useState("");
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const navigate = useNavigate();

  // Fetch permissions based on current page and search term
  const fetchVe = async (searchName, page) => {
    try {
      const result = await searchVe(searchName, page - 1, size); // API usually uses 0-based indexing
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
    // When searchName changes, reset to page 1
    if (searchName !== "") {
      setCurrentPage(1); // Reset to page 1 when searchName changes
    }
  }, [searchName]); // Only listen to searchName changes

  useEffect(() => {
    fetchVe(searchName, currentPage); // Fetch with the current page
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
  console.log("ve: ~", ve);
  return (
    <>
      <h1>Danh sách vé</h1>

      <Link to="add">
        <IconLabelButtons></IconLabelButtons>
      </Link>
      <div className="separate_block"></div>

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
