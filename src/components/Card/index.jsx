import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({ pokemon }) => {
  return (
    <Link
      to={`/${pokemon.name}`}
      className={`block border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow transform hover:scale-105 ${getTypeStyles(pokemon.types[0])} 
        w-full sm:w-1/2 md:w-1/3 lg:w-full`}
    >
      <div
        className="relative w-full h-48 mb-2 rounded-t-lg bg-cover bg-center shadow-md"
        style={{ backgroundImage: `url(/assets/fondo-card.jpg)` }}
      >
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      <div className="bg-gray-200 rounded-lg p-4 mb-2">
        <h3 className="text-xl font-bold text-center capitalize mb-2 text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">
          {pokemon.name}
        </h3>
        <div
          className={`flex justify-center flex-wrap ${pokemon.types.length === 1 ? 'justify-center' : 'justify-start'}`}
          style={{ minHeight: '2.5rem' }}
        >
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`mr-2 mb-2 inline-flex items-center px-3 py-1 text-xs font-medium rounded-full text-white ${getTypeStyles(type)}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

const getTypeStyles = (type) => {
  const typeStyles = {
    grass: 'bg-green-600',
    fire: 'bg-red-600',
    water: 'bg-blue-600',
    electric: 'bg-yellow-500',
    ice: 'bg-teal-400',
    ghost: 'bg-purple-600',
    ground: 'bg-gray-300',
    flying: 'bg-indigo-500',
    bug: 'bg-emerald-600',
    normal: 'bg-gray-300',
    fighting: 'bg-pink-600',
    poison: 'bg-purple-700',
    psychic: 'bg-pink-500',
    rock: 'bg-gray-600',
    fairy: 'bg-pink-300',
    steel: 'bg-gray-400',
    dark: 'bg-gray-800',
    dragon: 'bg-blue-900',
  };

  return typeStyles[type] || 'bg-gray-400';
};

Card.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Card;
