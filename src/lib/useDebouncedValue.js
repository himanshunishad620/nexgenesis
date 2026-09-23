import { useEffect, useState } from "react";

// Returns `value`, but only after it has stopped changing for `delayMs`.
// The search box uses this so we don't fire an API call on every
// keystroke - only once the user pauses typing.
export default function useDebouncedValue(value, delayMs = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    // If `value` changes again before this timer fires, React tears
    // down this effect and cancels the old timer first. That
    // cancelling is what actually makes this a debounce.
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
