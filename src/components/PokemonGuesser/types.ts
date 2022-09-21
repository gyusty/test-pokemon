import { Pokemon } from 'pokenode-ts';

export enum ResultState {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  GUESSING = 'GUESSING',
}

export type PresentationalProps = {
  isLoading: boolean;
  pokemon: Pick<Pokemon, 'id'| 'name'> | null;
  onRetry: () => void;
};

export type PokemonGuessingImageProps = {
  state: ResultState;
  pokemon: Pick<Pokemon, 'id'>;
};
