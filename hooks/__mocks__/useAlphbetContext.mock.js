import { mockAlphabetType } from './mockAlphabetType';

export const useAlphabetContext = jest.fn(() => ({
  alphabetType: mockAlphabetType,
  setAlphabetType: jest.fn(),
}));