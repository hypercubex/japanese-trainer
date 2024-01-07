import React, { createContext, useContext, useState } from 'react';

const AlphabetContext = createContext();

export const useAlphabetContext = () => {
  const context = useContext(AlphabetContext);

  if (!context) {
    throw new Error('useAlphabetContext must be used within an AlphabetProvider');
  }

  return context;
};

export const AlphabetProvider = ({ children }) => {
  const [selectedAlphabetType, setSelectedAlphabetType] = useState('hiragana');

  const updateSelectedAlphabetType = (alphabetType) => {
    setSelectedAlphabetType(alphabetType);
  };

  const value = {
    selectedAlphabetType,
    updateSelectedAlphabetType,
  };

  return (
    <AlphabetContext.Provider value={value}>
      {children}
    </AlphabetContext.Provider>
  );
};