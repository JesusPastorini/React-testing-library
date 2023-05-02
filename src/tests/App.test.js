import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('App', () => {
  test('Deve conter um conjunto de links de navegação', () => {
    const { getByRole } = renderWithRouter(<App />);
    const header = getByRole('navigation');
    const homeLink = getByRole('link', { name: /home/i });
    const aboutLink = getByRole('link', { name: /about/i });
    const favoritePokemonLink = getByRole('link', { name: /favorite pokémon/i });

    expect(header).toContainElement(homeLink);
    expect(header).toContainElement(aboutLink);
    expect(header).toContainElement(favoritePokemonLink);
  });

  test('Deve navegar para a página inicial', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const homeLink = getByRole('link', { name: /home/i });

    fireEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('Deve navegar para a página about', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const aboutLink = getByRole('link', { name: /about/i });

    fireEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('Deve navegar para a página do pokémon favorito quando o link do pokémon favorito for clicado', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const favoritePokemonLink = getByRole('link', { name: /favorite pokémon/i });

    fireEvent.click(favoritePokemonLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Deve renderizar o componente Not Found ao inserir um URL desconhecido', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/not found');
    });
    const notFoundMessage = screen.getByText(/not found/i);

    expect(notFoundMessage).toBeInTheDocument();
  });
});
