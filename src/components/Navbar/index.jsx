import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/${searchQuery}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav
      className={`p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}
    >
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src="/assets/pokemon-logo.png" alt="Logo" className="h-10" />
        </Link>

        <ul className="hidden lg:flex items-center space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar Pokémon..."
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={handleSearch}
            className={`${
              isDarkMode
                ? 'bg-white hover:bg-gray-100 text-gray-800'
                : 'bg-gray-800 hover:bg-gray-700 text-white'
            } font-semibold py-2 px-4 border border-gray-400 rounded shadow transition-colors duration-300`}
          >
            Buscar
          </button>
          <li>
            <Link
              to="/crear"
              onClick={() => setIsMenuOpen(false)}
              className={`${
                isDarkMode
                  ? 'bg-white hover:bg-gray-100 text-gray-800'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              } font-semibold py-2 px-4 border border-gray-400 rounded shadow transition-colors duration-300`}
            >
              Crear Pokémon
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-white transition-colors duration-300"
          >
            {isDarkMode ? (
              <FaMoon className="h-6 w-6" />
            ) : (
              <FaSun className={`h-6 w-6 ${isDarkMode ? '' : 'text-black'}`} />
            )}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } lg:hidden mt-4 transition-all duration-500 ease-in-out`}
      >
        <ul className="flex flex-col items-center space-y-2">
          <li>
            <Link
              to="/crear"
              onClick={() => setIsMenuOpen(false)}
              className={`${
                isDarkMode
                  ? 'bg-white hover:bg-gray-100 text-gray-800'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              } font-semibold py-2 px-4 border border-gray-400 rounded shadow transition-colors duration-300`}
            >
              Crear Pokémon
            </Link>
          </li>

          <li className="w-full px-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar Pokémon..."
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
