"use client";

import Image from "next/image";
import { useState } from "react";
import Tabs from "./components/Tabs";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [selected, setSelected] = useState("Rent");
  const tabsWithContent = [
    {
      tab: "Rent",
      content: (
        <div className="text-white">
          <SearchBar content="Rent" />
        </div>
      ),
    },
    {
      tab: "Buy",
      content: (
        <div className="text-white">
          <SearchBar content="Buy" />
        </div>
      ),
    },
    {
      tab: "Lystio AI",
      customLeftLogo: (
        <Image
          src="/images/mingcute_ai-fill.png"
          alt="logo"
          width={22}
          height={22}
        />
      ),
      content: (
        <div className="text-white max-w-80">
          Discover your next home near you or your most desired location with
          our AI-powered platform.
        </div>
      ),
    },
  ];
  return (
    <div className="font-[family-name:var(--font-plus-jakarta-sans)]">
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
            <button className="py-4 px-16 border border-[#4F4040] rounded-full bg-[#A540F3] text-white">
              Register
            </button>
          </div>
        </div>
      </header>
      <main className="min-h-screen">
        <div className="flex flex-col items-center justify-center bg-[url('/images/hero.jpeg')] bg-cover bg-center pb-80">
          <h1 className="font-VCHenrietta font-medium text-[90px] mb-20 text-white">
            Rent faster, Buy smarter
          </h1>
          <div className="flex flex-col">
            <Tabs
              tabs={tabsWithContent}
              selectedTab={tabsWithContent.findIndex((t) => t.tab === selected)}
              setSelectedTab={(index) =>
                setSelected(tabsWithContent[index].tab)
              }
            />
            <div className="mt-6">
              {tabsWithContent.find((t) => t.tab === selected)?.content}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
