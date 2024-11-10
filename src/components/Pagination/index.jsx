import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@/context/ThemeContext';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { isDarkMode } = useTheme(); // Accede al contexto de tema

  return (
    <div className="flex justify-center items-center mt-4 mb-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mr-4 p-3 ${
          isDarkMode
            ? 'bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50'
            : 'bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50'
        } font-semibold rounded shadow transition-colors duration-300`}
      >
        Anterior
      </button>

      <span
        className={`text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}
      >
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`ml-4 p-3 ${
          isDarkMode
            ? 'bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50'
            : 'bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50'
        } font-semibold rounded shadow transition-colors duration-300`}
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
