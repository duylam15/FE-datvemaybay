import React, { useState, useEffect } from "react";
import { useEffectDataQuyen } from "../../../utils/useEffectDataQuyen";
import { useNavigate } from "react-router-dom";
import QuyenList from "./QuyenList";
import "./quyen.css";
import { searchQuyen } from "../../../services/quyenService";

const Quyen = ({ page = 0, size = 2 }) => {
  const {
    nhomQuyen: initialNhomQuyen,
    loadingNhomQuyen,
    errorNhomQuyen,
  } = useEffectDataQuyen(page, size);
  const [searchName, setSearchName] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [nhomQuyen, setNhomQuyen] = useState(initialNhomQuyen);
  const [sortField, setSortField] = useState("");
  const navigate = useNavigate();

  // Function to fetch permissions
  const fetchQuyen = async (searchName, page) => {
    const result = await searchQuyen(searchName, page, size);
    console.log("result ~" , result)
    console.log("totalPage ~ ", result.data.totalPages )
    if (result && result.data) {
      setNhomQuyen(result.data.content); // Update state with new content
    }
  };
  

  // Fetch initial data
  useEffect(() => {
    fetchQuyen(""); // Fetch without search term on mount
  }, []); // Chỉ chạy khi component mount

  useEffect(() => {
    setNhomQuyen(initialNhomQuyen);
  }, [initialNhomQuyen]);

  console.log("NQ: ", nhomQuyen);
  if (loadingNhomQuyen) return <p>Loading...</p>;
  if (errorNhomQuyen) return <p>Error: {errorNhomQuyen}</p>;

  const handleSearch = () => {
    // Add your search logic here
    searchQuyen(searchName, page, size, setNhomQuyen);
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    // Add sorting logic here if needed
  };


  const handleEdit = (idMayBay) => {
    // editPlane(navigate, idMayBay);
    console.log("chay vao ham edit");
  };

  const handleBlock = async (idMayBay) => {
    console.log("handleBlock");
    // try {
    //     const updatedPlane = await blockPlane(idMayBay);
    //     // Cập nhật state mayBay để thay đổi trạng thái máy bay trong giao diện
    //     setMayBay((prevMayBay) =>
    //         prevMayBay.map((mb) =>
    //             mb.idMayBay === idMayBay ? { ...mb, trangThaiActive: updatedPlane.trangThaiActive } : mb
    //         )
    //     );
    // } catch (error) {
    //     console.error('Failed to block the plane!', error);
    // }
  };

  return (
    <div className="may-bay-page">
      <h1>Danh sách nhóm quyền</h1>
      <button
        onClick={() => navigate("/admin/quyen/add")}
        className="btn them-button"
      >
        Thêm nhóm quyền
      </button>

      <QuyenList
        nhomQuyen={nhomQuyen}
        searchName={searchName}
        setSearchName={setSearchName}
        handleSearch={handleSearch}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortField={sortField}
        onEdit={handleEdit}
        onBlock={handleBlock}
        fetchQuyen={fetchQuyen}
      />
    </div>
  );
};

export default Quyen;
