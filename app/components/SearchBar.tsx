"use client";
import { useEffect } from "react";
import { AddressAutofill } from "@mapbox/search-js-react";
import SearchBarItem from "./SearchBarItem";
import Image from "next/image";
import SearchBarAddressAutofill from "./SearchBarAddressAutofill";
import categories from "../categories.json";

type SearchBarProps = {
  content: string;
};

const SearchBar = (props: SearchBarProps) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("");
    };
  });

  const searchBarItems = [
    {
      title: "Location",
      icon: (
        <Image
          src="/images/search-icon.png"
          alt="location"
          width={22}
          height={22}
        />
      ),
      content: <SearchBarAddressAutofill />,
    },
    {
      title: "Category",
      icon: (
        <Image
          src="/images/category-icon.png"
          alt="location"
          width={22}
          height={22}
        />
      ),
      content: (
        <select className="text-[#787878]">
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>
      ),
    },
    {
      title: "Price",
      icon: (
        <Image
          src="/images/price-icon.png"
          alt="location"
          width={22}
          height={22}
        />
      ),
      content: <div>Price</div>,
    },
  ];

  return (
    <div className="bg-white rounded-full border border-[#A540F3] border-1 border-solid px-20 py-5">
      <form className="grid grid-cols-4 gap-4">
        {searchBarItems.map((item) => (
          <SearchBarItem
            title={item.title}
            icon={item.icon}
            content={item.content}
          />
        ))}
        <button className="rounded-full px-10 py-2 bg-[#A540F3] text-white">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
