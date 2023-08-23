import React, { createContext, useContext, useState, useEffect } from 'react';

const BlurContext = createContext();

export function BlurProvider({ children }) {
  const [isBlur, setIsBlur] = useState(false);

  const toggleBlur = () => {
    setIsBlur(prevIsBlur => !prevIsBlur);
  };

  return (
    <BlurContext.Provider value={{ isBlur, toggleBlur, setIsBlur }}>
      {children}
    </BlurContext.Provider>
  );
}

export function useBlur() {
  return useContext(BlurContext);
}