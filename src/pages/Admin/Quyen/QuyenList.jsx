import React from "react";
import "./quyen.css";
import PaginationRounded from "../../../components/Admin/Pagination";


const QuyenList = ({
  nhomQuyen,
  searchName,
  setSearchName,
  handleSearch,
  handleSort,
  sortOrder,
  sortField,
  loading,
  onEdit,
  onBlock,
}) => {
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="search-sort-controls">
        <input
          type="text"
          placeholder="Tìm kiếm nhóm quyền..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm Kiếm</button>
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th onClick={() => handleSort("idQuyen")}>
              ID{" "}
              {sortField === "idQuyen" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th onClick={() => handleSort("tenQuyen")}>
              Tên nhóm quyền{" "}
              {sortField === "tenQuyen"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th>Trạng Thái</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {nhomQuyen &&
          nhomQuyen == ""
          ? (
            <tr>
              <td colSpan="4" className="text-center">
                Không tìm thấy kết quả tìm kiếm!
              </td>
            </tr>
          ) : (
            nhomQuyen &&
            nhomQuyen.map((nq) => (
              <tr key={nq.idQuyen}>
                <td>{nq.idQuyen}</td>
                <td>{nq.tenQuyen}</td>
                <td>
                  {nq.trangThaiActive === "ACTIVE"
                    ? "Hoạt động"
                    : "Không hoạt động"}
                </td>
                <td>
                  <div className="button-group">
                    <button
                      className="btn btn-primary"
                      onClick={() => onEdit(nq.idQuyen)}
                    >
                      Edit
                    </button>
                    <button
                      className={`btn btn-block`}
                      onClick={() => onBlock(nq.idQuyen)}
                    >
                      {nq.trangThaiActive === "ACTIVE" ? "Block" : "Unblock"}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuyenList;