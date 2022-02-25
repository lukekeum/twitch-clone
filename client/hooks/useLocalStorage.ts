import { useCallback, useEffect, useState } from 'react';
import LocalStorage from '../utils/localStorage';

export default function useLocalStorage(key: string, value?: any) {
  const [storedValue, setStoredValue] = useState<Object | string | undefined>();

  useEffect(() => {
    const value = LocalStorage.get(key);
    if (value) {
      if (typeof value === 'object') {
        setStoredValue(JSON.parse(value));
      } else {
        setStoredValue(value);
      }
    }
  }, []);

  const setValue = useCallback((value: any) => {
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    LocalStorage.set(key, val);
    setStoredValue(val);
  }, []);

  const clearValue = useCallback(() => {
    LocalStorage.delete(key);
    setStoredValue(undefined);
  }, []);

  return {
    value: storedValue,
    setValue,
    clearValue,
  } as const;
}
