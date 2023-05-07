import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Pokemon', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Deve renderizar uma carta com as informações do Pokémon', () => {
    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);
    const pokemonImage = screen.getByAltText('Pikachu sprite');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Deve conter um link de navegação para a página de detalhes do Pokémon', () => {
    const pokemonLink = screen.getByRole('link', { name: /more details/i });
    expect(pokemonLink).toBeInTheDocument();
    expect(pokemonLink.href).toBe('http://localhost/pokemon/25');
  });

  it('Deve exibir um ícone de estrela para o Pokémon favoritado', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);
    const pokeFavorite = screen.getByText(/pokémon favoritado\?/i);
    fireEvent.click(pokeFavorite);
    const starIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
