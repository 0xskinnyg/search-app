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

const GeoContext = createContext<{
  popularLocations: GeoAPIResponse[];
}>({
  popularLocations: [],
});

export const GeoProvider = ({ children }: { children: React.ReactNode }) => {
  const [popularLocations, setPopularLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/geo/boundary/popular");
      const data = await response.json();
      setPopularLocations(data);
    };
    fetchData();
  }, []);

  return (
    <GeoContext.Provider value={{ popularLocations }}>
      {children}
    </GeoContext.Provider>
  );
};

export const useGeo = () => useContext(GeoContext);
