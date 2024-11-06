import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import { usePokemon } from '@/context/PokemonContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const { types, selectedType, setSelectedType } = usePokemon();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src="/assets/pokemon-logo.png" alt="Logo" className="h-10" />
        </Link>

        <ul className="hidden lg:flex items-center space-x-4 text-white">
          <li>
            <Link to="/crear">Crear Pokémon</Link>
          </li>

          {/* Filtro de tipos  TODO
          <li>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Todos los tipos</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </li> */}
        </ul>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden mt-4`}>
        <ul className="flex flex-col items-center text-white space-y-2">
          <li>
            <Link to="/crear" onClick={() => setIsMenuOpen(false)}>
              Crear Pokémon
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
