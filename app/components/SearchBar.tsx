"use client";
import { useMemo, useState } from "react";
import SearchBarItem from "./SearchBarItem";
import Image from "next/image";
import categories from "../categories.json";

import { Slider } from "@mui/material";
import Popover from "./Popover";
import { usePopover } from "../context/PopoverContext";
import LocationPopoverContent from "./LocationPopoverContent";
import { useFilter } from "../context/FilterContext";
import { twMerge } from "tailwind-merge";

type SearchBarProps = {
  content: string;
};

const SearchBar = (props: SearchBarProps) => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedLocation, setSelectedLocation] = useState("");

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

  return (
    <div className="bg-white rounded-full border border-primary border-1 border-solid px-20 py-5">
      <form className="grid grid-cols-5 gap-40" onSubmit={handleSubmit}>
        <SearchBarItem
          className="col-span-2"
          title={"Location"}
          icon={
            <Image
              src="/images/search-icon.png"
              alt="Location"
              width={22}
              height={22}
            />
          }
        >
          <div className="relative">
            <p
              className="text-secondary cursor-pointer text-nowrap whitespace-nowrap"
              onClick={() => setActivePopover("location")}
            >
              {selectedLocation ||
                "Search address, neighbourhood, city, or ZIP code"}
            </p>
            {activePopover === "location" && (
              <Popover>
                <LocationPopoverContent />
              </Popover>
            )}
          </div>
        </SearchBarItem>
        <SearchBarItem
          title="Category"
          icon={
            <Image
              src="/images/category-icon.png"
              alt="Category"
              width={22}
              height={22}
            />
          }
        >
          <div className="relative lg:min-w-96">
            <p
              className="text-secondary cursor-pointer max-w-48 text-nowrap text-ellipsis overflow-hidden"
              onClick={() => setActivePopover("category")}
            >
              {selectedCategories.length === 0
                ? "Select Category"
                : selectedCategories
                    .map((category) => category.name)
                    .join(", ")}
            </p>
            {activePopover === "category" && (
              <Popover>
                <div className="flex flex-col gap-2 max-h-80 overflow-y-scroll">
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
          title="Price"
          icon={
            <Image
              src="/images/price-icon.png"
              alt="Location"
              width={22}
              height={22}
            />
          }
        >
          <div className="relative">
            <p
              className="text-secondary cursor-pointer text-nowrap whitespace-nowrap"
              onClick={() => setActivePopover("price")}
            >
              {priceRange[0] === 0 && priceRange[1] === 1000000
                ? "Select Price"
                : `$${priceRange[0]} - $${priceRange[1]}`}
            </p>
            {activePopover === "price" && (
              <Popover>
                <div className="p-4 w-64">
                  <Slider
                    aria-label="Price Range"
                    name="price"
                    value={priceRange}
                    valueLabelDisplay="auto"
                    onChange={handlePriceRangeChange}
                    min={0}
                    max={1000000}
                  />
                </div>
              </Popover>
            )}
          </div>
        </SearchBarItem>
        <button className="rounded-full py-2 bg-primary text-white">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
