import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react'; 
import {PokemonGuesserPresentational} from '../components/PokemonGuesser/PokemonGuesserPresentational';

const mockProps = {
    pokemon: { 
        id:25,
        name: 'Pikachu'
    },
    isLoading: false,
    onRetry: jest.fn(),
}

describe('Renders user personal information', () => {
    const renderPokemonGuesserSection = () =>
        render(<PokemonGuesserPresentational {...mockProps} />);

    it('render initial form', () => {
        const { queryByPlaceholderText, queryByTestId } = renderPokemonGuesserSection();

        expect(queryByPlaceholderText("Who's that Pokemon?")).toBeTruthy();
        expect(queryByTestId("check-button")).toBeTruthy();
    })

    it('check pokemon to be right', () => { 
        const { queryByPlaceholderText, queryByTestId } = renderPokemonGuesserSection();

        const checkButton = queryByTestId("check-button") as HTMLInputElement;
        const checkInput = queryByPlaceholderText("Who's that Pokemon?") as HTMLInputElement;

        fireEvent.change(checkInput, {target: {value: "pikachu"}});
        fireEvent.click(checkButton);
        
        expect(screen.getByText(/Excellent!!/));
    })

    it('check pokemon to be wrong', () => { 
        const { queryByPlaceholderText, queryByTestId } = renderPokemonGuesserSection();

        const checkButton = queryByTestId("check-button") as HTMLInputElement;
        const checkInput = queryByPlaceholderText("Who's that Pokemon?") as HTMLInputElement;

        fireEvent.change(checkInput, {target: {value: "Raichu"}});
        fireEvent.click(checkButton);
        
        expect(screen.getByText(/Oops, That's wrong/));
    })
})
