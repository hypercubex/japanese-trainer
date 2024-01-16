import { renderHook, act } from '@testing-library/react';
import { useAlphabetContext, AlphabetProvider } from '../useAlphabetContext';
import { AlphabetType } from '../../constants/AlphabetType';

jest.mock('../../components/Home');

describe('useAlphabetContext', () => {
    it('throws an error when used outside of AlphabetProvider', () => {
        let error;
        renderHook(() => {
            try {
                useAlphabetContext();
            } catch (err) {
                error = err;
            }
        }, {
            wrapper: ({ children }) => <>{children}</>,
        });

        expect(error).toEqual(
            Error('useAlphabetContext must be used within an AlphabetProvider')
        );
    });

    it('returns the context value within AlphabetProvider', () => {
        const { result } = renderHook(() => useAlphabetContext(), {
            wrapper: ({ children }) => (
                <AlphabetProvider>{children}</AlphabetProvider>
            ),
        });

        expect(result.current.selectedAlphabetType).toBe(AlphabetType.HIRAGANA);
        expect(typeof result.current.updateSelectedAlphabetType).toBe('function');
        expect(result.current.AlphabetType).toEqual(AlphabetType);
    });

    it('updates the selectedAlphabetType when updateSelectedAlphabetType is called', () => {
        const { result } = renderHook(() => useAlphabetContext(), {
            wrapper: ({ children }) => (
                <AlphabetProvider>{children}</AlphabetProvider>
            ),
        });

        act(() => {
            result.current.updateSelectedAlphabetType(AlphabetType.KATAKANA);
        });

        expect(result.current.selectedAlphabetType).toBe(AlphabetType.KATAKANA);
    });
});