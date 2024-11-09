import { getPokemon, getPokemonSecondary, postApi } from './http';

export const fetchPokemons = async (offset = 0, limit = 20) => {
  const data = await getPokemon(`pokemon/?offset=${offset}&limit=${limit}`);

  const secondaryPokemons = await getPokemonSecondary('pokemon?equipo=2');
  const additionalPokemons = secondaryPokemons.map((pokemon) => ({
    name: pokemon.name,
    order: pokemon.order,
    weight: pokemon.weight,
    image: pokemon.image,
    types: pokemon.types,
    team: pokemon.team,
    height: [],
    moves: [],
    stats: [],
  }));

  const pokemonPromises = data.results.map(async (pokemon) => {
    try {
      const pokemonData = await getPokemon(pokemon.url);

      const image =
        pokemonData.sprites?.other?.showdown?.front_default ||
        'default-image-url';
      const types =
        pokemonData.types?.map((typeInfo) => typeInfo.type.name) || [];

      const height = pokemonData.height || 'Unknown';
      const moves = pokemonData.moves?.map((move) => move.move.name) || [];
      const stats =
        pokemonData.stats?.map((stat) => ({
          name: stat.stat.name,
          baseStat: stat.base_stat,
        })) || [];

      return {
        name: pokemonData.name,
        order: pokemonData.order,
        weight: pokemonData.weight,
        height,
        moves,
        stats,
        image,
        types,
      };
    } catch (error) {
      console.error('Error al obtener los detalles del Pokémon:', error);
      return null;
    }
  });

  const pokemonDetails = await Promise.all(pokemonPromises);

  const validPokemonDetails = pokemonDetails.filter(
    (pokemon) => pokemon !== null
  );

  let combinedResults = [];
  if (offset === 0) {
    combinedResults = [...additionalPokemons, ...validPokemonDetails];
  } else {
    combinedResults = validPokemonDetails;
  }

  combinedResults = combinedResults.slice(0, limit);

  const totalCount = data.count + additionalPokemons.length;

  return {
    count: totalCount,
    results: combinedResults,
  };
};

export const fetchPokemon = async (name) => {
  try {
    // Intentar obtener el Pokémon desde la API principal
    const response = await getPokemon(`pokemon/${name}`);

    return {
      name: response.name,
      order: response.order,
      weight: response.weight,
      image: response.sprites.other.showdown.front_default,
      types: response.types.map((typeInfo) => typeInfo.type.name),
      height: response.height,
      moves: response.moves.map((move) => move.move.name),
      base_experience: response.base_experience,
      stats: response.stats.map((stat) => ({
        base_stat: stat.base_stat,
        effort: stat.effort,
        stat: {
          name: stat.stat.name,
          url: stat.stat.url,
        },
      })),
    };
  } catch (error) {
    console.warn('Error al obtener el Pokémon de la API principal:', error);

    try {
      const secondaryResponse = await getPokemonSecondary(
        `pokemon?equipo=2&name=${name}`
      );
      const pokemon = secondaryResponse[0];

      return {
        name: pokemon.name,
        order: pokemon.order,
        weight: pokemon.weight,
        image: pokemon.image,
        types: pokemon.types,
        height: pokemon.height,
        moves: pokemon.moves || [],
        base_experience: pokemon.base_experience,
        stats: pokemon.stats || [],
      };
    } catch (secondaryError) {
      console.error(
        'Error al obtener el Pokémon de la API secundaria:',
        secondaryError
      );
      return null;
    }
  }
};

export const createData = async (data) => {
  const response = await postApi('pokemon/', data);
  return response.data;
};

export const fetchTypes = async () => {
  const data = await getPokemon('type');
  return data.results.map((type) => ({
    name: type.name,
    url: type.url,
  }));
};

export const fetchPokemonsByType = async (type) => {
  if (!type) return [];
  const response = await getPokemon(`type/${type}`);
  return response.pokemon.map((poke) => poke.pokemon);
};
