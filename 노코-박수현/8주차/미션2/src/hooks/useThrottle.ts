import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number = 500): T {
    const [throttledValue, setThrottledValue] = useState<T>(value);
    const lastExecuted = useRef<number>(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const now = Date.now();
        const timeSinceLast = now - lastExecuted.current;

        if (timeSinceLast >= delay) {
            lastExecuted.current = now;
            setThrottledValue(value);
        } else if (!timeoutRef.current) {
            const remaining = delay - timeSinceLast;
            timeoutRef.current = setTimeout(() => {
                lastExecuted.current = Date.now();
                setThrottledValue(value);
                timeoutRef.current = null;
            }, remaining);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [value, delay]);

    return throttledValue;
}

export default useThrottle;
