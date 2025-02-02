"use client";

import Image from "next/image";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import { useFilter } from "./context/FilterContext";
import Tab from "./components/Tab";
import Header from "./components/Header";

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
      <Header />
      <main>
        <div className="relative flex flex-col items-center bg-[url('/images/hero.jpeg')] min-h-screen bg-cover bg-opacity-100 bg-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/hero-opacity.png')] z-0" />
          <div className="flex flex-col items-center lg:items-start gap-6 py-20 z-10">
            <h1 className="font-VCHenrietta font-medium text-[90px] text-white mb-20 px-4 xl:px-8">
              Rent faster, Buy smarter
            </h1>
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
            <SearchBar />
            <p className="text-center text-2xl text-white self-center">
              {searchResults.count} verified listings for apartments, houses,
              office and more
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
