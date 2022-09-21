import React, {useState} from 'react';
import { PresentationalProps, ResultState } from '../PokemonGuesser/types';
import { InfinitySpin } from 'react-loader-spinner';
import { PokemonGuessingImage } from '../PokemonGuesser/components/PokemonGuessingImage';

export const PokemonGuesserPresentational = (props: PresentationalProps) => {

  const [stateGuess, setStateGuess] = useState<ResultState>(
    ResultState.GUESSING
  );
  const [pokemonName, setPokemonName] = useState('');

  const onCheck = () => { 
    if (pokemonName.toLowerCase() === props.pokemon?.name.toLowerCase()) {
      setStateGuess(ResultState.SUCCESS);
    } else {
      setStateGuess(ResultState.ERROR);
    }
  }

  const onRetry = () => { 
    setStateGuess(ResultState.GUESSING);
    setPokemonName('');
    props.onRetry();
  }

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <React.Fragment>
      {props.isLoading ? (
        <InfinitySpin width="80" color="green" />
      ) : (
        <React.Fragment>
          <div>
            <PokemonGuessingImage state={stateGuess} pokemon={props.pokemon!} />
          </div>
          <div>
            {stateGuess === ResultState.ERROR && (
              <span>Oops, That's wrong</span>
            )}
            {stateGuess === ResultState.SUCCESS && <span>Excellent!!</span>}
          </div>
          <div>
            {stateGuess === ResultState.GUESSING && (
              <div>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Who's that Pokemon?"
                  value={pokemonName}
                  onChange={(e) => setPokemonName(e.target.value)}
                />
                {stateGuess === ResultState.GUESSING && (
                  <button onClick={(e) => onCheck()} data-testid='check-button'>Check</button>
                )}
              </div>
            )}
            {stateGuess === ResultState.ERROR && (
              <button onClick={e => onRetry()}>Try again</button>
            )}
            {stateGuess === ResultState.SUCCESS && (
              <button onClick={e => onRetry()}>Keep playing</button>
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
