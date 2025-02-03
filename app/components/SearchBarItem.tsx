import { twMerge } from "tailwind-merge";

type SearchBarItemProps = {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

const SearchBarItem = (props: SearchBarItemProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-row items-center gap-4 lg:gap-7 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-[#C6C6C6] lg:[&:not(:first-child)]:pl-4",
        props.className
      )}
    >
      {props.icon}
      <div className="flex flex-col">
        <p className="text-black font-semibold">{props.title}</p>
        {props.children}
      </div>
    </div>
  );
};

export default SearchBarItem;
