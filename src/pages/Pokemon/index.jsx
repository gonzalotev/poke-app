import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemon } from '@/services/poke-api';
import { Toast, Loading } from '@/components';

const Pokemon = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name),
  });

  const getValueOrDefault = (
    value,
    defaultValue = 'Dato del Pokémon no registrado'
  ) => {
    return value || defaultValue;
  };

  useEffect(() => {
    if (error) {
      Toast('error', 'Hubo un error al cargar el Pokémon.');
      navigate('/');
    }
  }, [error, navigate]);

  if (isLoading) return <Loading />;

  return (
    <div
      className="flex items-center justify-center bg-cover bg-center "
      style={{
        backgroundImage: `url('/assets/fondo-pokemon.jpg')`,
        minHeight: '100vh',
      }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center w-full px-4 sm:px-6 md:px-8">
        <img
          src={getValueOrDefault(data?.image)}
          alt={getValueOrDefault(data?.name)}
          className="w-full sm:w-96 lg:w-[400px] h-auto object-contain rounded-lg shadow-md mb-6 lg:mb-0 lg:mr-8" // Se ajusta el tamaño y márgenes
        />
        <div className="bg-white bg-opacity-70 border border-gray-300 rounded-lg shadow-lg p-4 w-full sm:max-w-md lg:max-w-lg">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-4xl sm:text-5xl font-bold capitalize mr-2 text-center">
              {getValueOrDefault(data?.name)}
            </h2>
            <span className="text-4xl sm:text-5xl font-bold capitalize text-gray-600">
              #{getValueOrDefault(data?.order)}
            </span>
          </div>
          <ul className="list-disc pl-5">
            <li className="text-lg mb-1">
              <strong>Alto:</strong> {getValueOrDefault(data?.height)}
              {data?.height ? ' cm' : ''}
            </li>
            <li className="text-lg mb-1">
              <strong>Peso:</strong> {getValueOrDefault(data?.weight)} lib
            </li>
            <li className="text-lg mb-1">
              <strong>Experiencia Base:</strong>{' '}
              {getValueOrDefault(data?.base_experience)}
            </li>
            <li className="text-lg mb-1">
              <strong>Tipos:</strong>{' '}
              {getValueOrDefault(data?.types?.join(' - '))}
            </li>

            {data?.moves.length > 0 ? (
              <li className="text-lg mb-1">
                <strong>Ataques:</strong>
                <ul className="list-disc pl-5">
                  {(data?.moves || []).slice(0, 4).map((move, index) => (
                    <li key={index} className="text-lg">
                      {move}
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <></>
            )}
            {data?.stats.length > 0 ? (
              <li className="text-lg mb-1">
                <strong>Estadisticas Base:</strong>
                <ul className="list-disc pl-5">
                  {(data?.stats || []).map((stat) => (
                    <li key={stat?.stat?.name} className="text-lg">
                      {getValueOrDefault(stat?.stat?.name)}:{' '}
                      {getValueOrDefault(stat?.base_stat)}
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
