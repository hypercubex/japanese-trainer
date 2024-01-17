import { mockAlphabetType } from './mockAlphabetType';

export const usePracticeContext = jest.fn(() => ({
  alphabetType: mockAlphabetType,
  setAlphabetType: jest.fn(),
}));