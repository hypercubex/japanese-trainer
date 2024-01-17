import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavigationMenu from '../NavigationMenu';
import { AlphabetProvider } from '../../hooks/usePracticeContext';

describe('NavigationMenu', () => {
  test('renders the menu items', () => {
    render(
      <AlphabetProvider>
        <NavigationMenu />
      </AlphabetProvider>
    );

    // Test rendering of disabled list items
    expect(screen.getByText('Romaji')).toBeDefined();
    expect(screen.getByText('Kana')).toBeDefined()

    // Test rendering of selectable list items
    const hiraganaButtons = screen.getAllByText('Hiragana');
    const katakanaButtons = screen.getAllByText('Katakana');

    expect(hiraganaButtons).toHaveLength(2);
    expect(katakanaButtons).toHaveLength(2);

    // Test item selection
    userEvent.click(hiraganaButtons[0]);
    

    userEvent.click(katakanaButtons[1]);
    
  });
});