import React from "react";
import "./quyen.css";

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
  currentPage,
  totalPages,
  handlePageChange,
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
          nhomQuyen.data.length === 0
          ? (
            <tr>
              <td colSpan="4" className="text-center">
                Không tìm thấy kết quả tìm kiếm!
              </td>
            </tr>
          ) : (
            nhomQuyen &&
            nhomQuyen.data &&
            nhomQuyen.data.content.map((nq) => (
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
      {/* Phân trang */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 0}
        >
          Trang đầu
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Trước đó
        </button>
        <span>
          Trang {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          Tiếp theo
        </button>
        <button
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={currentPage >= totalPages - 1}
        >
          Trang cuối
        </button>
      </div>
    </div>
  );
};

export default QuyenList;