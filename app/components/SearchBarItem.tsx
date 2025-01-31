type SearchBarItemProps = {
  title: string;
  icon: React.ReactNode;
  content?: React.ReactNode;
};

const SearchBarItem = (props: SearchBarItemProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      {props.icon}
      <div className="flex flex-col">
        <p className="text-black font-semibold">{props.title}</p>
        {props.content}
      </div>
    </div>
  );
};

export default SearchBarItem;
