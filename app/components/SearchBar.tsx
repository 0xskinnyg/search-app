"use client";
import { useMemo } from "react";
import SearchBarItem from "./SearchBarItem";
import Image from "next/image";
import categories from "../categories.json";

import Popover from "./Popover";
import { PopoverType, usePopover } from "../context/PopoverContext";
import LocationPopoverContent from "./LocationPopoverContent";
import { useFilter } from "../context/FilterContext";

import CategoriesPopoverContent from "./CategoriesPopoverContent";
import PricePopoverContent from "./PricePopoverContent";

const SearchBar = () => {
  const { activePopover, setActivePopover } = usePopover();
  const {
    withinId,
    type,
    setType,
    rentType,
    rent,
    setRent,
    setSearchResults,
    menuItems,
  } = useFilter();

  const selectedCategories = useMemo(() => {
    return categories.filter((category) => type.includes(category.id));
  }, [type]);

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

  // Get selected districts names
  const selectedDistrictsText = useMemo(() => {
    if (!withinId.length) return "";

    const selectedDistricts = menuItems
      .filter((item) => withinId.includes(item.id))
      .map((item) => item.name);

    return selectedDistricts.join(", ");
  }, [withinId, menuItems]);

  // Update input placeholder/value based on selection
  const inputText = useMemo(() => {
    if (selectedDistrictsText) {
      return selectedDistrictsText;
    }
  }, [selectedDistrictsText]);

  return (
    <div className="bg-white md:rounded-full border md:border-primary border-1 border-solid px-4 sm:px-8 py-3 sm:py-4 md:py-5 w-full max-w-[1624px]">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 xl:gap-40"
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
              className="text-secondary cursor-pointer truncate max-w-40 md:max-w-60 lg:max-w-96 text-sm sm:text-base popover-trigger"
              onClick={() => {
                setActivePopover((prevState: PopoverType) =>
                  prevState !== "location" ? ("location" as PopoverType) : null
                );
              }}
            >
              {inputText
                ? inputText
                : "Search address, neighbourhood, city, or ZIP code"}
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
                <CategoriesPopoverContent
                  categories={categories}
                  type={type}
                  setType={setType}
                />
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
              {rent[0] === 100 && rent[1] === 10000
                ? "Select Price"
                : `€${rent[0]} - €${rent[1]}`}
            </p>
            {activePopover === "price" && (
              <Popover>
                <PricePopoverContent rent={rent} setRent={setRent} />
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
