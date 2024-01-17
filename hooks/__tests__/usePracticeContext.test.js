import { renderHook, act } from '@testing-library/react';
import { usePracticeContext, AlphabetProvider } from '../usePracticeContext';
import { AlphabetType } from '../../constants/AlphabetType';
import { PracticeType } from '../../constants/PracticeType';

jest.mock('../../components/Home');

describe('usePracticeContext', () => {
    it('throws an error when used outside of AlphabetProvider', () => {
        let error;
        renderHook(() => {
            try {
                usePracticeContext();
            } catch (err) {
                error = err;
            }
        }, {
            wrapper: ({ children }) => <>{children}</>,
        });

        expect(error).toEqual(
            Error('usePracticeContext must be used within an AlphabetProvider')
        );
    });

    it('returns the context value within AlphabetProvider', () => {
        const { result } = renderHook(() => usePracticeContext(), {
            wrapper: AlphabetProvider,
        });

        expect(result.current.selectedAlphabetType).toBe(AlphabetType.HIRAGANA);
        expect(typeof result.current.updateSelectedAlphabetType).toBe('function');
        expect(result.current.AlphabetType).toEqual(AlphabetType);
    });

    it('updates the selectedAlphabetType when updateSelectedAlphabetType is called', () => {
        const { result } = renderHook(() => usePracticeContext(), {
            wrapper: AlphabetProvider,
        });
        const alphabetType = AlphabetType.KATAKANA
        const practiceType = PracticeType.KANA

        act(() => {
            result.current.updateSelectedAlphabetType({
                alphabetType,
                practiceType
            });
        });

        expect(result.current.selectedAlphabetType).toBe(alphabetType);
        expect(result.current.selectedPracticeType).toBe(practiceType);
    });
});