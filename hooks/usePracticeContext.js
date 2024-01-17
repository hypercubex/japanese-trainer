import React, { createContext, useContext, useState } from 'react';
import { AlphabetType } from '../constants/AlphabetType';
import { PracticeType } from '../constants/PracticeType';

const practiceContext = createContext();

export const usePracticeContext = () => {
  const context = useContext(practiceContext);

  if (!context) {
    throw new Error('usePracticeContext must be used within an AlphabetProvider');
  }

  return context;
};

export const AlphabetProvider = ({ children }) => {
  const [selectedPracticeType, setSelectedPracticeType] = useState(PracticeType.ROMAJI);
  const [selectedAlphabetType, setSelectedAlphabetType] = useState(AlphabetType.HIRAGANA);

  const updateSelectedPracticeType = ({ alphabetType, practiceType }) => {
    setSelectedAlphabetType(alphabetType);
    setSelectedPracticeType(practiceType)
  };

  const value = {
    selectedAlphabetType,
    selectedPracticeType,
    updateSelectedAlphabetType: updateSelectedPracticeType,
    AlphabetType,
  };

  return (
    <practiceContext.Provider value={value}>
      {children}
    </practiceContext.Provider>
  );
};