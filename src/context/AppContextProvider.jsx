import React from 'react';
import PropTypes from 'prop-types';
import { PokemonProvider } from './PokemonContext';
import { ThemeProvider } from './ThemeContext';

const AppContextProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <PokemonProvider>{children}</PokemonProvider>
    </ThemeProvider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
