// PaginationComponent.js
import React from 'react';
import './button.css';

const PaginationComponent = (props) => {
  const pages = [];
  const currentPage = props.currentPage;
  const totalPages = props.totalPages;
  const onPageChange = props.onPageChange;

  const renderPagination = () => {
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button key={i} onClick={() => onPageChange(i)} className={`pagination-button ${currentPage === i ? 'active' : ''}`}>
            {i}
          </button>
        );
      }
    } else {
      pages.push(<button key={1} onClick={() => onPageChange(1)} className={`pagination-button ${currentPage === 1 ? 'active' : ''}`}>1</button>);
      if (currentPage > 3) {
        pages.push(<div className='boxBaCham' key="ellipsis1">...</div>);
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <button key={i} onClick={() => onPageChange(i)} className={`pagination-button ${currentPage === i ? 'active' : ''}`} >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(<div className='boxBaCham' key="ellipsis2">...</div>);
      }

      pages.push(<button key={totalPages} onClick={() => onPageChange(totalPages)} className={`pagination-button ${currentPage === totalPages ? 'active' : ''}`}>{totalPages}</button>);
    }

    return pages;
  };

  return (
    <>
      {
        totalPages > 1 && (<div className='pagination'>
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={currentPage === 1 ? 'btn-default' : 'btn-move'}>
            &#8249; {/* Mũi tên trái */}
          </button>
          {renderPagination()}
          <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={currentPage === totalPages ? 'btn-default' : 'btn-move'}>
            &#8250; {/* Mũi tên phải */}
          </button>
        </div>)
      }
    </>

  );
};

export default PaginationComponent;
