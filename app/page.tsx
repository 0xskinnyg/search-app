"use client";

import Image from "next/image";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import { useFilter } from "./context/FilterContext";
import Tab from "./components/Tab";

export type TabType = "rent" | "buy" | "discover";

const tabs = [
  {
    name: "Rent",
    value: "rent" as TabType,
  },
  {
    name: "Buy",
    value: "buy" as TabType,
  },
  {
    name: "Lystio AI",
    value: "discover" as TabType,
  },
] as const;

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<TabType>("rent");
  const { searchResults } = useFilter();

  return (
    <div className="font-PlusJakartaSans">
      <header>
        <div className="flex flex-row justify-between py-4 px-2 pl-11">
          <Image
            className="h-[53px]"
            src="/images/logo.png"
            alt="logo"
            width={112}
            height={53}
          />
          <div className="flex items-center gap-8 font-semibold">
            <p className="text-[18px]">Rent/Buy</p>
            <p className="text-[18px]">For Owners</p>
            <p className="text-[18px]">For Brokers</p>
            <p className="text-[18px]">About Us</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="py-4 px-16 border border-[#4F4040] rounded-full">
              Log In
            </button>
            <button className="py-4 px-16 border border-[#4F4040] rounded-full bg-primary text-white">
              Register
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="flex flex-col items-start bg-[url('/images/hero.jpeg')] min-h-screen bg-cover bg-opacity-100 bg-center pt-20 pb-40 lg:px-80">
          <h1 className="font-VCHenrietta font-medium text-[90px] mb-20 text-white">
            Rent faster, Buy smarter
          </h1>
          <div className="flex flex-col gap-8">
            <div className="flex flex-row bg-white border border-primary border-1 border-solid rounded-full max-w-fit">
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  tab={tab}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              ))}
            </div>
            <SearchBar content={selectedTab} />
            <p className="text-center text-2xl text-white">
              {searchResults.count} verified listings for apartments, houses,
              office and more
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
