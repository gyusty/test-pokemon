import React from 'react';
import { useGetRandomPokemon } from '../PokemonGuesser/hooks/useGetRandomPokemon';
import { PokemonGuesserPresentational } from './PokemonGuesserPresentational';
import { PokemonContext } from '../../context/PokemonContext';
import { useAllPokemons } from '../../hooks/useAllPokemons';

export const PokemonGuesserContainer = () => {
  const { randomPokemon, changeRandomPokemon } = useGetRandomPokemon();

  const { dispatch } = React.useContext(PokemonContext);

  const getAllPokemons = useAllPokemons(dispatch);

  const onRetry = () => {
    changeRandomPokemon();
  };

  React.useEffect(() => {
    getAllPokemons();
  }, []);

  const isPokemonInfoAvaible = Boolean(randomPokemon);

  console.log(randomPokemon);

  return (
    <PokemonGuesserPresentational
      pokemon={randomPokemon}
      isLoading={!isPokemonInfoAvaible}
      onRetry={onRetry}
    />
  );
};
