"use client";
import { useEffect, useRef, useState } from "react";
import { usePopover } from "../context/PopoverContext";

const Popover = ({ children }: { children: React.ReactNode }) => {
  const { setActivePopover } = usePopover();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!popoverRef.current?.contains(target)) {
        setIsClosing(true);
        setActivePopover(null);
        setIsClosing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setActivePopover]);

  return (
    <div
      ref={popoverRef}
      className={`absolute min-w-64 xs:min-w-80 md:min-w-96 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.5)] rounded-lg py-8 px-4 max-h-[400px] 2xl:max-h-[430px]  overflow-y-auto lg:max-w-none transform transition-all duration-200 ease-out origin-top z-10 ${
        isClosing ? "animate-out" : "animate-in"
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

        /* Webkit scrollbar styling */
        div::-webkit-scrollbar {
          width: 8px;
        }

        div::-webkit-scrollbar-track {
          background: transparent;
        }

        div::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          border: 2px solid white;
        }

        /* Firefox scrollbar styling */
        div {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
        }
      `}</style>
      {children}
    </div>
  );
};

export default Popover;
