"use client";
import { useEffect, useRef, useState } from "react";
import { usePopover } from "../context/PopoverContext";

const Popover = ({
  children,
  excludeClass,
}: {
  children: React.ReactNode;
  excludeClass?: string;
}) => {
  const { activePopover, setActivePopover } = usePopover();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const parentElement = target.parentElement;

      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        !target.className.includes("--MapboxSearch") &&
        !parentElement?.className.includes("--SuggestionText") &&
        !target.className?.includes("popover-trigger")
      ) {
        setIsClosing(true);
        setTimeout(() => {
          setActivePopover(null);
          setIsClosing(false);
        }, 200);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setActivePopover, excludeClass]);

  return (
    <div
      ref={popoverRef}
      className={`absolute bg-white shadow-lg rounded-lg py-8 px-4 max-w-60 xs:max-w-80  md:max-w-none transform transition-all duration-200 ease-out origin-top ${
        isClosing ? 'animate-out' : 'animate-in'
      }`}
    >
      <style jsx>{`
        @keyframes popoverIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes popoverOut {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
        }
        .animate-in {
          animation: popoverIn 0.2s ease-out forwards;
        }
        .animate-out {
          animation: popoverOut 0.2s ease-out forwards;
        }
      `}</style>
      {children}
    </div>
  );
};

export default Popover;
