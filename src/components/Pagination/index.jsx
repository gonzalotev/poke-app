import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-4 mb-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mr-4 p-3 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="text-white text-lg font-semibold">
        Pagina {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="ml-4 p-3 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
