import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({ pokemon }) => {
  const typeStyle = getTypeStyles(pokemon.types[0]);
  const attacks = pokemon.moves.slice(0, 2);

  return (
    <Link
      to={`/${pokemon.name}`}
      className={`block border-2 rounded-lg p-4 transition-transform duration-300 ease-in-out transform hover:scale-150 hover:shadow-lg hover:z-10 w-full sm:w-1/2 md:w-1/3 lg:w-full ${typeStyle}`}
      style={{ position: 'relative' }}
    >
      <div
        className={
          'bg-transparent border-2 border-gray-700 mb-2 rounded-lg p-2 flex justify-between items-center text-white'
        }
      >
        <span className="text-sm sm:text-base md:text-xl font-semibold uppercase truncate">
          {pokemon.name}
        </span>
        {pokemon.stats.length > 0 ? (
          <span className="text-sm sm:text-base md:text-xl font-semibold truncate">{`HP ${getStat(pokemon.stats, 'hp')}`}</span>
        ) : (
          <span className="text-sm sm:text-base md:text-xl font-semibold truncate">
            HP ?
          </span>
        )}
      </div>

      <div
        className="relative border-2 border-gray-700 w-full h-48 mb-2 bg-cover bg-center rounded-lg shadow-md"
        style={{ backgroundImage: `url(/assets/fondo-card.jpg)` }}
      >
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>

      <div className="border-2 border-gray-700 bg-gray-200 rounded-lg p-4 mb-2">
        <div className="flex justify-center flex-wrap mb-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`px-3 py-1 text-xs font-medium rounded-full text-white ${getTypeStyles(type)} mx-1 uppercase`}
            >
              {type}
            </span>
          ))}
        </div>

        <div className="flex flex-col items-center">
          {attacks.length > 0 ? (
            attacks.map((attack, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium rounded-lg text-gray-700 bg-gray-100 mb-1 w-full text-center uppercase"
              >
                {attack}
              </span>
            ))
          ) : (
            <>
              <span className="px-2 py-1 text-xs font-medium rounded-lg text-gray-700 bg-gray-100 mb-1 w-full text-center">
                ataque no registrado
              </span>
              <span className="px-2 py-1 text-xs font-medium rounded-lg text-gray-700 bg-gray-100 mb-1 w-full text-center">
                ataque no registrado
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

const getTypeStyles = (type) => {
  const typeStyles = {
    grass: 'bg-green-300',
    fire: 'bg-red-600',
    water: 'bg-blue-300',
    electric: 'bg-yellow-300',
    ice: 'bg-teal-200',
    ghost: 'bg-purple-900',
    ground: 'bg-gray-600',
    flying: 'bg-indigo-200',
    bug: 'bg-green-600',
    normal: 'bg-gray-400',
    fighting: 'bg-gray-900',
    poison: 'bg-purple-700',
    psychic: 'bg-pink-700',
    rock: 'bg-gray-400',
    fairy: 'bg-pink-300',
    steel: 'bg-gray-300',
    dark: 'bg-gray-500',
    dragon: 'bg-blue-300',
  };

  return typeStyles[type] || 'bg-gray-200';
};

const getStat = (stats, statName) => {
  const stat = stats.find((stat) => stat.name === statName);
  return stat ? stat.baseStat : 0;
};

Card.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        baseStat: PropTypes.number.isRequired,
      })
    ).isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    moves: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Card;
