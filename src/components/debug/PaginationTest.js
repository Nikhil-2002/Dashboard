import React from 'react';

const PaginationTest = ({ currentPage, totalPages, totalItems, onPageChange }) => {
  console.log('PaginationTest Debug:', {
    currentPage,
    totalPages,
    totalItems,
    currentPageType: typeof currentPage,
    totalPagesType: typeof totalPages,
    isPrevDisabled: currentPage <= 1,
    isNextDisabled: currentPage >= totalPages
  });

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #007bff', 
      margin: '20px 0',
      background: '#f0f8ff'
    }}>
      <h4>Pagination Debug Info</h4>
      <p><strong>Current Page:</strong> {currentPage} (type: {typeof currentPage})</p>
      <p><strong>Total Pages:</strong> {totalPages} (type: {typeof totalPages})</p>
      <p><strong>Total Items:</strong> {totalItems} (type: {typeof totalItems})</p>
      
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          style={{
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: currentPage <= 1 ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Previous (Disabled: {currentPage <= 1 ? 'Yes' : 'No'})
        </button>
        
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          style={{
            marginLeft: '10px',
            padding: '8px 16px',
            backgroundColor: currentPage >= totalPages ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Next (Disabled: {currentPage >= totalPages ? 'Yes' : 'No'})
        </button>
      </div>
    </div>
  );
};

export default PaginationTest;
