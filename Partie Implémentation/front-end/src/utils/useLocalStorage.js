import { useEffect, useState } from "react";


export function useLocalState(defaultValue, key) {
  const [value, setValue] = useState(()=> {
    
    const localStorageValue = localStorage.getItem(key);
    console.log("LocalStorageValue : " + typeof localStorageValue)
    return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue; 
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key,value]);

  return [value, setValue];
}

