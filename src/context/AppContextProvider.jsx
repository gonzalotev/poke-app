import React from 'react';
import PropTypes from 'prop-types';
import { PokemonProvider } from './PokemonContext';

const AppContextProvider = ({ children }) => {
  return <PokemonProvider>{children}</PokemonProvider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;