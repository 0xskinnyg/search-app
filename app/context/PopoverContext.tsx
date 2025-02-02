"use client";
import { createContext, useContext, useState } from "react";

type PopoverType = "location" | "category" | "price" | null;

const PopoverContext = createContext<{
  activePopover: PopoverType;
  setActivePopover: (type: PopoverType) => void;
}>({
  activePopover: null,
  setActivePopover: () => {},
});

export const PopoverProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activePopover, setActivePopover] = useState<PopoverType>("location");
  return (
    <PopoverContext.Provider value={{ activePopover, setActivePopover }}>
      {children}
    </PopoverContext.Provider>
  );
};

export const usePopover = () => useContext(PopoverContext);
