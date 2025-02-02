"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type PopoverType = "location" | "category" | "price" | null;

const PopoverContext = createContext<{
  activePopover: PopoverType;
  setActivePopover: Dispatch<SetStateAction<PopoverType>>;
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
