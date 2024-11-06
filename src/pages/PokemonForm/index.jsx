import React, { useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PokemonContext } from '@/context/PokemonContext';
import { createData } from '@/services/poke-api';
import { Input, Toast } from '@/components';

const PokemonForm = () => {
  const { types } = useContext(PokemonContext);
  const navigate = useNavigate();
  const methods = useForm();

  const onSubmit = async (data) => {
    const body = {
      name: data.name,
      order: Number(data.order),
      weight: Number(data.weight),
      image: data.image,
      types: [data.primaryType, data.secondaryType],
      team: 2,
    };

    try {
      await createData(body);
      Toast('success', 'Pokémon agregado con éxito!');
      navigate('/');
    } catch (error) {
      Toast('error', 'Hubo un error al agregar el Pokémon.');
    }
  };

  return (
    <FormProvider {...methods}>
      <div
        className="flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/fondo-pokemon.jpg')`,
          minHeight: '100vh',
        }}
      >
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="bg-white bg-opacity-70 border border-gray-300 rounded-lg shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 max-w-lg mx-auto w-full"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
            Crear Pokémon
          </h2>
          <Input name="name" label="Nombre" required />
          <Input name="order" label="Número" type="number" required />
          <Input name="weight" label="Peso" type="number" required />
          <Input name="image" label="Imagen URL" required />

          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Tipo Principal
            </label>
            <select
              {...methods.register('primaryType', { required: true })}
              className={`w-full p-3 border rounded ${methods.formState.errors.primaryType ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Selecciona un tipo</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {methods.formState.errors.primaryType && (
              <span className="text-red-500 text-sm">
                Tipo principal es obligatorio
              </span>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Tipo Secundario
            </label>
            <select
              {...methods.register('secondaryType')}
              className={`w-full p-3 border rounded ${methods.formState.errors.secondaryType ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Selecciona un tipo (opcional)</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Crear Pokémon
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default PokemonForm;
