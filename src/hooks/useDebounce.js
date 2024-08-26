import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value) => {
    const [DebouncedVal, setDebouncedVal] = useState(value);
    const blocker = useRef(null);

    useEffect(() => {
        blocker.current = setTimeout(() => {
            setDebouncedVal(value);
        }, 500);
        return () => {
            clearTimeout(blocker.current);
        };
    }, [value]);

    return DebouncedVal;
};