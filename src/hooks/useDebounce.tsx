import { useState, useEffect } from "react";

const useDebounce = (value: any, delay = 500) => {
  const [debounceValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      console.log("setting new timout");
      setDebouncedValue(value);
    }, delay);

    return () => {
      console.log("clearing the timeout");
      clearTimeout(id);
    };
  }, [value, delay]);
  return debounceValue;
};

export default useDebounce;
