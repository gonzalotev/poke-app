import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, PokemonForm, Pokemon } from '../pages';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crear" element={<PokemonForm />} />
      <Route path="/:name" element={<Pokemon />} />{' '}
    </Routes>
  );
}

export default AppRouter;
