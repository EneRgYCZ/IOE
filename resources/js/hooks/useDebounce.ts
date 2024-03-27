import { debounce } from "lodash";

import { useEffect, useMemo, useRef } from "react";

type Callable = () => void;

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
