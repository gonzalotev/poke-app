import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PokemonProvider } from './context/PokemonContext';
import './tailwind.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PokemonProvider>
        <App />
      </PokemonProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
