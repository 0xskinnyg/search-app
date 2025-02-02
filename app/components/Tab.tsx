"use client";
import Image from "next/image";
import { useFilter } from "../context/FilterContext";
import { Dispatch, SetStateAction } from "react";
import { TabType } from "../page";
import { motion } from "framer-motion";

type TabProps = {
  tab: {
    name: string;
    value: TabType;
  };
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<TabType>>;
};

const Tab = ({ tab, selectedTab, setSelectedTab }: TabProps) => {
  const { setRentType } = useFilter();

  return (
    <div
      className="relative flex items-center px-8 lg:px-16 py-4 rounded-full cursor-pointer"
      onClick={() => {
        setRentType([tab.value]);
        setSelectedTab(tab.value as TabType);
      }}
    >
      {selectedTab === tab.value && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-primary rounded-full"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
      <div className="relative flex items-center gap-2 z-10">
        {tab.value === "discover" && (
          <Image
            src="/images/mingcute_ai-fill.png"
            alt="logo"
            width={22}
            height={22}
          />
        )}
        <p className={`text-[16px] ${selectedTab === tab.value ? "text-white" : ""}`}>
          {tab.name}
        </p>
      </div>
    </div>
  );
};

export default Tab;
