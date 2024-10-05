const useLocalStorage = (key: string, initialValue: string) => {
  const data = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("storage", onChange);
      return () => {
        window.removeEventListener("storage", onChange);
      };
    },
    () => {
      const data = localStorage.getItem(key);
      return data || initialValue;
    },
    () => initialValue
  );

  const setData = useCallback(
    (value: string) => {
      localStorage.setItem(key, value);
    },
    [key]
  );

  return [data, setData] as const;
};
