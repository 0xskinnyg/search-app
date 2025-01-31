type TabsProps = {
  tabs: {
    tab: string;
    content: React.ReactNode;
    customLeftLogo?: React.ReactNode;
  }[];
  selectedTab: number;
  setSelectedTab: (tab: number) => void;
};

const Tabs = (props: TabsProps) => {
  return (
    <div className="flex flex-row bg-white border border-[#A540F3] border-1 border-solid rounded-full max-w-fit">
      {props.tabs.map((tab) => (
        <div
          className={`flex items-center px-16 py-4 rounded-full data-[selected]:bg-[#A540F3] data-[selected]:text-white cursor-pointer ${
            props.selectedTab === props.tabs.indexOf(tab)
              ? "bg-[#A540F3] text-white"
              : ""
          }`}
          onClick={() => props.setSelectedTab(props.tabs.indexOf(tab))}
        >
          {tab.customLeftLogo}
          <p className="text-[16px]">{tab.tab}</p>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
