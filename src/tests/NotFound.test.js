import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('NotFound', () => {
  it('deve exibir o heading "Page requested not found"', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Page requested not found');
  });

  it('deve exibir a imagem correta', () => {
    const { getByAltText } = render(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

