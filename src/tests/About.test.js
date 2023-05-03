import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Página About', () => {
  test('contém informações sobre a Pokédex', () => {
    render(<About />);
    const pokedexInfo = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    expect(pokedexInfo).toBeInTheDocument();
  });

  test('contém um heading h2 com o texto "About Pokédex"', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  test('contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragraphsOne = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const paragraphsTwo = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    expect(paragraphsOne).toBeInTheDocument();
    expect(paragraphsTwo).toBeInTheDocument();
  });

  test('contém uma imagem da Pokédex', () => {
    render(<About />);
    const image = screen.getByAltText('Pokédex');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
