"use client";

import { createContext, useContext, useState } from "react";

const FilterContext = createContext<{
  withinId: string[];
  type: number[];
  rentType: string[];
  rent: number[];
  setWithinId: (withinId: string[]) => void;
  setType: (type: number[]) => void;
  setRentType: (rentType: string[]) => void;
  setRent: (rent: number[]) => void;
  searchResults: { count: number };
  setSearchResults: (searchResults: { count: number }) => void;
}>({
  withinId: [],
  type: [],
  rentType: [],
  rent: [],
  setWithinId: () => {},
  setType: () => {},
  setRentType: () => {},
  setRent: () => {},
  searchResults: { count: 0 },
  setSearchResults: () => {},
});

const FilterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [withinId, setWithinId] = useState<string[]>([]);
  const [type, setType] = useState<number[]>([]);
  const [rentType, setRentType] = useState<string[]>(["rent"]);
  const [rent, setRent] = useState<number[]>([]);
  const [searchResults, setSearchResults] = useState<{ count: number }>({
    count: 0,
  });

  return (
    <FilterContext.Provider
      value={{
        withinId,
        setWithinId,
        type,
        setType,
        rentType,
        setRentType,
        rent,
        setRent,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  return useContext(FilterContext);
};

export default FilterContextProvider;
