import { debounce } from "lodash";

import { useEffect, useMemo, useRef } from "react";

type Callable = () => void;

/**
 * Custom hook that returns a debounced version of the provided callback function.
 *
 * @param callback - The callback function to be debounced.
 * @param timeout - The debounce timeout in milliseconds.
 * @returns The debounced callback function.
 */
export const useDebounce = (callback: () => void, timeout: number) => {
    const ref = useRef<Callable>();

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debouncedCallback = useMemo(() => {
        const func = () => {
            ref.current?.();
        };

        return debounce(func, timeout);
    }, []);

    return debouncedCallback;
};
