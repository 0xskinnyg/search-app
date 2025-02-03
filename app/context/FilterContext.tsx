"use client";

import { createContext, useContext, useEffect, useState } from "react";

type GeoAPIResponse = {
  name: string;
  id: string;
  children: [
    {
      name: string;
      id: string;
      postal_code: string;
    }
  ];
};

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
  menuItems: { name: string; id: string; postal_code: string }[];
  setMenuItems: (
    menuItems: { name: string; id: string; postal_code: string }[]
  ) => void;
  popularLocations: GeoAPIResponse[];
  priceHistogram: {
    range: number[];
    histogram: number[];
  };
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
  menuItems: [],
  setMenuItems: () => {},
  setSearchResults: () => {},
  popularLocations: [],
  priceHistogram: {
    range: [],
    histogram: [],
  },
});

const priceHistogramMock = {
  range: [100, 10000],
  histogram: [0, 4, 8, 6, 4, 2, 0, 2, 0, 1],
};

const FilterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [withinId, setWithinId] = useState<string[]>([]);
  const [type, setType] = useState<number[]>([]);
  const [rentType, setRentType] = useState<string[]>(["rent"]);
  const [rent, setRent] = useState<number[]>([100, 10000]);
  const [searchResults, setSearchResults] = useState<{ count: number }>({
    count: 0,
  });
  const [menuItems, setMenuItems] = useState<
    { name: string; id: string; postal_code: string }[]
  >([]);
  const [popularLocations, setPopularLocations] = useState([]);
  const [priceHistogram, setPriceHistogram] = useState<{
    range: number[];
    histogram: number[];
  }>({
    range: [],
    histogram: [],
  });
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const fetchPopularLocations = async () => {
      const response = await fetch("/api/geo/boundary/popular");
      const data = await response.json();
      setPopularLocations(data);
    };
    fetchPopularLocations();
  }, []);

  useEffect(() => {
    const fetchHistogram = async () => {
      const response = await fetch("/api/tenement/search/histogram", {
        method: "POST",
        body: JSON.stringify({ withinId, type, rentType }),
      });

      const data = await response.json();
      // if data is empty, mock price histogram
      if (
        data.length === 0 ||
        data.histogram?.every((value: number) => value === 0)
      ) {
        setPriceHistogram(priceHistogramMock);
        return;
      }
      setPriceHistogram(data);
    };

    fetchHistogram();
  }, [withinId, type, rentType]);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      const response = await fetch("/api/geo/search/recent");
      const data = await response.json();
      setRecentSearches(data);
    };
    fetchRecentSearches();
  }, []);

  // both always empty
  console.log(priceHistogram, "price histogram");
  console.log(recentSearches, "recent searches");

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
        menuItems,
        setMenuItems,
        popularLocations,
        priceHistogram,
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
