import React, { createContext, useState, useContext } from 'react';

const HoverContext = createContext();

export const HoverProvider = ({ children }) => {
  const [hoveredId, setHoveredId] = useState(null);
  return (
    <HoverContext.Provider value={{ hoveredId, setHoveredId }}>
      {children}
    </HoverContext.Provider>
  );
};

export const useHover = () => useContext(HoverContext);