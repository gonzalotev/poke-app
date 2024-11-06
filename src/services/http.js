import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_POKEMON,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiClientSecondary = axios.create({
  baseURL: process.env.REACT_APP_API_FACU,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'HzUES4ruMsTus9BLhBsFu85f0gEAzvdy',
  },
});

export const getPokemon = async (url) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getPokemonSecondary = async (url) => {
  try {
    const response = await apiClientSecondary.get(url);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const postApi = async (url, data) => {
  try {
    const response = await apiClientSecondary.post(url, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
