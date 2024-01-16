import React, { createContext, useContext, useState } from 'react';
import { AlphabetType } from '../constants/AlphabetType';

const AlphabetContext = createContext();

export const useAlphabetContext = () => {
  const context = useContext(AlphabetContext);

  if (!context) {
    throw new Error('useAlphabetContext must be used within an AlphabetProvider');
  }

  return context;
};

export const AlphabetProvider = ({ children }) => {
  const [selectedAlphabetType, setSelectedAlphabetType] = useState(AlphabetType.HIRAGANA);

  const updateSelectedAlphabetType = (alphabetType) => {
    setSelectedAlphabetType(alphabetType);
  };

  const value = {
    selectedAlphabetType,
    updateSelectedAlphabetType,
    AlphabetType, // Include the alphabet type enum in the context value
  };

  return (
    <AlphabetContext.Provider value={value}>
      {children}
    </AlphabetContext.Provider>
  );
};