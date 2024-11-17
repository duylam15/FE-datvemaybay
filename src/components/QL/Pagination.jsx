import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function CustomPagination({
  totalPages,
  currentPage,
  onPageChange,
}) {
  // Hàm điều hướng trang
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className='pagination-container'>
      <ul className='pagination pagination-lg'>
        {/* Nút "Trở lại" */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className='page-link'
            href='#'
            onClick={() => paginate(currentPage - 1)}
          >
            <FaAngleLeft />
          </a>
        </li>

        {/* Các trang */}
        {[...Array(totalPages).keys()].map((number) => (
          <li
            key={number + 1}
            className={`page-item ${
              currentPage === number + 1 ? 'active' : ''
            }`}
          >
            <a
              className='page-link'
              href='#'
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </a>
          </li>
        ))}

        {/* Nút "Tiếp theo" */}
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <a
            className='page-link'
            href='#'
            onClick={() => paginate(currentPage + 1)}
          >
            <FaAngleRight />
          </a>
        </li>
      </ul>
    </div>
  );
}
