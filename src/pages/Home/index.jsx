import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemons } from '@/services/poke-api';
import { Card, Pagination, Toast, Loading } from '@/components';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const countItems = process.env.REACT_APP_API_ITEMS_PER_PAGE;
  const offset = (currentPage - 1) * countItems;

  const { data, error, isLoading } = useQuery({
    queryKey: ['pokemons', currentPage],
    queryFn: () => fetchPokemons(offset, countItems),
  });

  if (isLoading) return <Loading />;
  if (error) Toast('error', 'Hubo un error al cargar el Pokémon.');

  const totalPages = Math.ceil(data.count / countItems);

  return (
    <div
      className="flex flex-col items-center"
      style={{
        backgroundImage: "url('/assets/pokeballs-black.jpg')",
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