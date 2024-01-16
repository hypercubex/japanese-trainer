import { render, screen, fireEvent } from '@testing-library/react';
import NavigationMenu from '../NavigationMenu';
import { useAlphabetContext} from '../../hooks/useAlphabetContext';

jest.mock('../../hooks/useAlphabetContext');

describe('Menu', () => {
  const mockUpdateSelectedAlphabetType = jest.fn();
  const mockSelectedAlphabetType = 'hiragana';

  beforeEach(() => {
    useAlphabetContext.mockReturnValue({
      selectedAlphabetType: mockSelectedAlphabetType,
      updateSelectedAlphabetType: mockUpdateSelectedAlphabetType,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders menu items with correct selection', () => {
    render(<NavigationMenu />);

    const hiraganaItem = screen.getByText('Hiragana');
    const katakanaItem = screen.getByText('Katakana');

    expect(hiraganaItem).toBeDefined()
    expect(katakanaItem).toBeDefined()
  });

  it('calls updateSelectedAlphabetType with correct value when menu item is clicked', () => {
    render(<NavigationMenu />);

    const katakanaItem = screen.getByText('Katakana');

    fireEvent.click(katakanaItem);

    expect(mockUpdateSelectedAlphabetType).toHaveBeenCalledWith('katakana');
  });
});