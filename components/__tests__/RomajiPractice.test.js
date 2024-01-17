import { render, fireEvent } from '@testing-library/react';
import { AlphabetProvider } from '../../hooks/usePracticeContext';
import Home from '../RomajiPractice'; // Update the import path for the Home component

describe('RomajiPractice', () => {
  it('renders the home component correctly', () => {
    const { getByLabelText, getByText } = render(
      <AlphabetProvider>
        <Home />
      </AlphabetProvider>
    );
    
    const messageInput = getByLabelText('Message');
    expect(messageInput).toBeDefined();
    
    const submitButton = getByText('Submit');
    expect(submitButton).toBeDefined();
    
    const nextButton = getByText('Next');
    expect(nextButton).toBeDefined();
    
    const hintButton = getByText('Hint');
    expect(hintButton).toBeDefined();
  });
  
  it('handles input change correctly', () => {
    const { getByLabelText } = render(
      <AlphabetProvider>
        <Home />
      </AlphabetProvider>
    );
    
    const messageInput = getByLabelText('Message');
    fireEvent.change(messageInput, { target: { value: 'Test Input' } });
    
    expect(messageInput.value).toBe('Test Input');
  });
  
  // Add more test cases for your component's functionality
});