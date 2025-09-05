import React from 'react';
import Button from './Button';
import './Pagination.css';

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50]
}) => {
  // Safety checks
  const safePage = Math.max(1, currentPage || 1);
  const safeTotal = Math.max(0, totalItems || 0);
  const safePages = Math.max(1, totalPages || 1);
  
  // Add debug logging
  console.log('Pagination props:', { 
    currentPage: safePage, 
    totalPages: safePages, 
    totalItems: safeTotal,
    originalProps: { currentPage, totalPages, totalItems }
  });
  
  if (safePages <= 1) {
    return null; // Don't show pagination if there's only one page
  }
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    
    for (
      let i = Math.max(2, safePage - delta);
      i <= Math.min(safePages - 1, safePage + delta);
      i++
    ) {
      range.push(i);
    }

    if (safePage - delta > 2) {
      range.unshift('...');
    }
    if (safePage + delta < safePages - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (safePages !== 1) {
      range.push(safePages);
    }

    return range;
  };

  const startItem = (safePage - 1) * itemsPerPage + 1;
  const endItem = Math.min(safePage * itemsPerPage, safeTotal);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <span>
          Showing {startItem} to {endItem} of {safeTotal} entries
        </span>
      </div>
      
      <div className="pagination-controls">
        <div className="page-size-selector">
          <label htmlFor="pageSize">Show:</label>
          <select
            id="pageSize"
            value={itemsPerPage}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="page-size-select"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="pagination-buttons">
          <Button
            variant="outline"
            size="small"
            onClick={() => onPageChange(safePage - 1)}
            disabled={safePage <= 1}
          >
            Previous
          </Button>

          {getPageNumbers().map((page, index) => (
            <span key={index}>
              {page === '...' ? (
                <span className="pagination-ellipsis">...</span>
              ) : (
                <Button
                  variant={page === safePage ? 'primary' : 'outline'}
                  size="small"
                  onClick={() => onPageChange(page)}
                  className="pagination-page-btn"
                >
                  {page}
                </Button>
              )}
            </span>
          ))}

          <Button
            variant="outline"
            size="small"
            onClick={() => onPageChange(safePage + 1)}
            disabled={safePage >= safePages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
