import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchTypes } from '@/services/poke-api';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      try {
        const data = await fetchTypes();
        const uniqueTypes = [...new Set(data.map((type) => type.name))];
        setTypes(uniqueTypes);
      } catch (error) {
        console.error('Error al obtener los tipos de Pokémon:', error);
      }
    };

    fetchPokemonTypes();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        types,
        selectedType,
        setSelectedType,
        filteredPokemons,
        setFilteredPokemons,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  return useContext(PokemonContext);
};

PokemonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
