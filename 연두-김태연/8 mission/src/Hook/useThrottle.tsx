import { useRef, useCallback } from 'react';

export default function useThrottle(callback: () => void, delay: number) {
  const lastCall = useRef<number>(0);

  const throttledFn = useCallback(() => {
    const now = new Date().getTime();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback();
    }
  }, [callback, delay]);

  return throttledFn;
}
