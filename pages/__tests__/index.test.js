import { render, screen } from '@testing-library/react';
import IndexPage from '../index';

jest.mock('../../components/Home');

describe('Index Page', () => {
  it('renders the index page correctly', () => {
    render(<IndexPage />);
    
    const homeComponent = screen.getByTestId('home-component');
    expect(homeComponent).toBeDefined();
  });
});