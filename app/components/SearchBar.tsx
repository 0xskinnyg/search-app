"use client";
import { useMemo, useState } from "react";
import SearchBarItem from "./SearchBarItem";
import Image from "next/image";
import categories from "../categories.json";

import { Slider } from "@mui/material";
import Popover from "./Popover";
import { PopoverType, usePopover } from "../context/PopoverContext";
import LocationPopoverContent from "./LocationPopoverContent";
import { useFilter } from "../context/FilterContext";
import { twMerge } from "tailwind-merge";
import { styled } from "@mui/material/styles";

const CustomSlider = styled(Slider)({
  color: "#A540F3",
  "& .MuiSlider-thumb": {
    "&:hover, &.Mui-focusVisible": {
      boxShadow: `0px 0px 0px 8px rgba(165, 64, 243, 0.16)`,
    },
    "&.Mui-active": {
      boxShadow: `0px 0px 0px 14px rgba(165, 64, 243, 0.16)`,
    },
  },
  "& .MuiSlider-rail": {
    opacity: 0.32,
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: "#A540F3",
  },
});

const SearchBar = () => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  const { activePopover, setActivePopover } = usePopover();
  const { withinId, type, setType, rentType, rent, setRent, setSearchResults } =
    useFilter();

  const selectedCategories = useMemo(() => {
    return categories.filter((category) => type.includes(category.id));
  }, [type]);

  const handlePriceRangeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setPriceRange(newValue as number[]);
    setRent(newValue as number[]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/tenement/search/count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          withinId,
          type,
          rentType,
          rent,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  console.log(activePopover);
  return (
    <div className="bg-white md:rounded-full border md:border-primary border-1 border-solid px-4 sm:px-8 py-3 sm:py-4 md:py-5 w-full max-w-[1624px]">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-8 xl:gap-40"
        onSubmit={handleSubmit}
      >
        <SearchBarItem
          className="col-span-1 sm:col-span-2"
          title={"Location"}
          icon={
            <Image
              src="/images/search-icon.png"
              alt="location"
              width={22}
              height={22}
            />
          }
        >
          <div className="relative max-w-full sm:max-w-96">
            <p
              className="text-secondary cursor-pointer truncate max-w-40 md:max-w-96 text-sm sm:text-base popover-trigger"
              onClick={() => {
                setActivePopover((prevState: PopoverType) =>
                  prevState !== "location" ? ("location" as PopoverType) : null
                );
              }}
            >
              Search address, neighbourhood, city, or ZIP code
            </p>
            {activePopover === "location" && (
              <Popover>
                <LocationPopoverContent />
              </Popover>
            )}
          </div>
        </SearchBarItem>

        <SearchBarItem
          className="col-span-1"
          title="Category"
          icon={
            <Image
              src="/images/category-icon.png"
              alt="category"
              width={22}
              height={22}
            />
          }
        >
          <div className="relative max-w-full sm:max-w-[200px]">
            <p
              className="text-secondary cursor-pointer truncate min-w-40 max-w-40 md:max-w-96 text-sm sm:text-base popover-trigger"
              onClick={() =>
                setActivePopover((prevState: PopoverType) =>
                  prevState !== "category" ? ("category" as PopoverType) : null
                )
              }
            >
              {selectedCategories.length === 0
                ? "Select Category"
                : selectedCategories
                    .map((category) => category.name)
                    .join(", ")}
            </p>
            {activePopover === "category" && (
              <Popover>
                <div className="flex flex-col gap-2  min-w-48 xs:min-w-60 max-h-80 overflow-y-scroll">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={twMerge(
                        "flex items-center gap-2 px-4 py-3 cursor-pointer",
                        type.includes(category.id) && "bg-primaryLight"
                      )}
                      onClick={() => {
                        if (type.includes(category.id)) {
                          setType(type.filter((id) => id !== category.id));
                        } else {
                          setType([...type, category.id]);
                        }
                      }}
                    >
                      <Image
                        src={category.icon}
                        alt={category.name}
                        width={22}
                        height={22}
                      />
                      <p>{category.name}</p>
                    </div>
                  ))}
                </div>
              </Popover>
            )}
          </div>
        </SearchBarItem>

        <SearchBarItem
          className="col-span-1"
          title="Price"
          icon={
            <Image
              src="/images/price-icon.png"
              alt="price"
              width={22}
              height={22}
            />
          }
        >
          <div className="relative max-w-full sm:max-w-[200px]">
            <p
              className="text-secondary cursor-pointer truncate max-w-full text-sm sm:text-base popover-trigger"
              onClick={() =>
                setActivePopover((prevState: PopoverType) =>
                  prevState !== "price" ? ("price" as PopoverType) : null
                )
              }
            >
              {priceRange[0] === 0 && priceRange[1] === 1000000
                ? "Select Price"
                : `$${priceRange[0]} - $${priceRange[1]}`}
            </p>
            {activePopover === "price" && (
              <Popover>
                <div className="flex flex-col items-start gap-4 p-4 w-full min-w-48 xs:min-w-60">
                  <p className="font-semibold">Price Range</p>
                  <div className="flex gap-2 items-baseline">
                    {new Array(20).fill(0).map((_, index) => (
                      <div
                        key={index}
                        className="bg-primary w-1"
                        style={{ height: `${index * 2 + 5}px` }}
                      />
                    ))}
                  </div>
                  <CustomSlider
                    aria-label="Price Range"
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000000}
                  />
                </div>
              </Popover>
            )}
          </div>
        </SearchBarItem>

        <button className="col-span-1 rounded-full py-3 sm:py-4 px-6 sm:px-8 bg-primary text-white font-semibold text-sm sm:text-base">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
