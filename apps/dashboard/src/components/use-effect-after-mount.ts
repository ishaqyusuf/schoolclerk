import { useEffect, useRef } from "react";

export function useEffectAfterMount(fn, deps: any[] = []) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    fn();
  }, deps);
}
