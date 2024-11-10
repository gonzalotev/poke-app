import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemons } from '@/services/poke-api';
import { Card, Pagination, Toast, Loading } from '@/components';
import { useTheme } from '@/context/ThemeContext';

const Home = () => {
  const { isDarkMode } = useTheme();
  const countItems = process.env.REACT_APP_API_ITEMS_PER_PAGE;

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const offset = (currentPage - 1) * countItems;

  const { data, error, isLoading } = useQuery({
    queryKey: ['pokemons', currentPage],
    queryFn: () => fetchPokemons(offset, countItems),
  });

  useEffect(() => {
    sessionStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  if (isLoading) return <Loading />;
  if (error) Toast('error', 'Hubo un error al cargar el Pokémon.');

  const totalPages = Math.ceil(data.count / countItems);

  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{
        backgroundImage: isDarkMode
          ? "url('/assets/pokeballs-black.jpg')"
          : "url('/assets/pokeballs.jpg')",
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'top left',
      }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full max-w-screen-xl">
        {data.results.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
