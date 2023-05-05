import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonType from '../data';

describe('Teste do componente Pokedex', () => {
  it('Deve ter um heading h2 com o texto Encontered Pokémon', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(heading).toBeInTheDocument();
  });

  test('Exibe o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    // Localizar o botão e clicá-lo
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(nextButton);

    // Verificar se o próximo Pokémon é exibido
    const nextPokemonName = screen.getByText('Charmander');
    expect(nextPokemonName).toBeInTheDocument();

    // Clicar no botão novamente e verificar se o próximo Pokémon é exibido
    fireEvent.click(nextButton);
    const anotherNextPokemonName = screen.getByText('Caterpie');
    expect(anotherNextPokemonName).toBeInTheDocument();

    // Clicar no botão até que o último Pokémon da lista seja exibido e verificar se o primeiro Pokémon é exibido novamente
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    const lastPokemonName = screen.getByText('Rapidash');
    expect(lastPokemonName).toBeInTheDocument();
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    const firstPokemonName = screen.getByText('Pikachu');
    expect(firstPokemonName).toBeInTheDocument();
  });

  it('Deve renderizar apenas um Pokémon de cada vez.', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);
    const pokemons = queryAllByTestId('pokemon-name');
    expect(pokemons.length).toBe(1);
  });

  test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<App />);
    const pokemonTypes = [...new Set(pokemonType.map((tp) => tp.type))];

    const buttonElements = screen.getAllByTestId('pokemon-type-button');
    const buttonTypes = buttonElements.map((element) => element.textContent);
    expect(pokemonTypes).toEqual(buttonTypes);

    pokemonTypes.forEach((type) => {
      const allButton = screen.getByRole('button', { name: /all/i });
      const typeButton = screen.getByRole('button', { name: type });
      fireEvent.click(typeButton);
      const firstPoke = pokemonType.find((pokemon) => pokemon.type === type)?.name;
      if (firstPoke) {
        screen.getByText(firstPoke);
      }
      fireEvent.click(allButton);
    });

    expect(screen.queryAllByTestId('pokemon-type-button').length).toBe(pokemonTypes.length);
    // botão all sempre visivel
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeVisible();
  });

  test('Botão All reseta o filtro corretamente', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    // Verifica se o filtro "All" está selecionado por padrão ao carregar a página
    expect(allButton).toHaveClass('button-text filter-button');
    // Verifica se a lista de Pokémon é atualizada corretamente
    const pokemonName = screen.getByTestId('pokemon-name');
    const electricButton = screen.getByRole('button', { name: /electric/i });
    fireEvent.click(electricButton);
    expect(pokemonName).toHaveTextContent('Pikachu');
    fireEvent.click(allButton);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
