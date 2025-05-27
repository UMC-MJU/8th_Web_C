// hooks/useThrottleFn.ts
import { useRef } from "react";

export default function useThrottleFn(fn: () => void, delay: number) {
  const lastCalled = useRef(0);

  return () => {
    const now = Date.now();
    if (now - lastCalled.current >= delay) {
      lastCalled.current = now;
      fn();
    }
  };
}
