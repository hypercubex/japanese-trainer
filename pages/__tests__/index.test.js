import { render, screen } from '@testing-library/react';
import IndexPage from '../index';

jest.mock('../../components/RomajiPractice');

describe('Index Page', () => {
  it('renders the index page correctly', () => {
    render(<IndexPage />);

    const homeComponent = screen.getByTestId('romaji-practice-component');
    expect(homeComponent).toBeDefined();
  });
});