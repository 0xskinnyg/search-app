import Image from "next/image";
import { useFilter } from "../context/FilterContext";
import { Dispatch, SetStateAction } from "react";
import { TabType } from "../page";

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
      className={`flex items-center px-16 py-4 rounded-full data-[selected]:bg-primary data-[selected]:text-white cursor-pointer ${
        selectedTab === tab.value ? "bg-primary text-white" : ""
      }`}
      onClick={() => {
        setRentType([tab.value]);
        setSelectedTab(tab.value as TabType);
      }}
    >
      {tab.value === "discover" ? (
        <Image
          src="/images/mingcute_ai-fill.png"
          alt="logo"
          width={22}
          height={22}
        />
      ) : null}
      <p className="text-[16px]">{tab.name}</p>
    </div>
  );
};

export default Tab;
