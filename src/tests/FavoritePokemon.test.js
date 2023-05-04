import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemon from '../pages/FavoritePokemon';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('FavoritePokemon', () => {
  it('deve renderizar a mensagem "No favorite Pokémon found" quando a lista de pokémons favoritos estiver vazia', () => {
    render(<FavoritePokemon />);
    const message = screen.getByText(/No favorite Pokémon found/i);
    expect(message).toBeInTheDocument();
  });

  it('deve renderizar apenas os pokémons favoritos quando a lista não estiver vazia', () => {
    const { getByRole, queryByText } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favoritCheck = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoritCheck);

    const favoritPoke = getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritPoke);

    const noMessage = queryByText(/No favorite Pokémon found/i);
    expect(noMessage).not.toBeInTheDocument();

    getByRole('img', { name: /pikachu is marked as favorite/i });
  });
});
