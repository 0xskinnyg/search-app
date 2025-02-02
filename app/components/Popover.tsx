"use client";
import { useEffect, useRef } from "react";
import { usePopover } from "../context/PopoverContext";

const Popover = ({
  children,
  excludeClass,
}: {
  children: React.ReactNode;
  excludeClass?: string;
}) => {
  const { setActivePopover } = usePopover();
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const parentElement = target.parentElement;

      console.log(target.className);
      console.log(parentElement?.className);
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        !target.className.includes("--MapboxSearch") &&
        !parentElement?.className.includes("--SuggestionText")
      ) {
        setActivePopover(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setActivePopover, excludeClass]);

  return (
    <div
      ref={popoverRef}
      className="absolute z-10 bg-white shadow-lg rounded-lg py-8 px-4"
    >
      {children}
    </div>
  );
};

export default Popover;
