import { twMerge } from "tailwind-merge";
import Image from "next/image";

type CategoriesPopoverContentProps = {
  categories: { id: number; name: string; icon: string }[];
  type: number[];
  setType: (type: number[]) => void;
};

const CategoriesPopoverContent = (props: CategoriesPopoverContentProps) => {
  const { categories, type, setType } = props;
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-lg">All Categories</p>
      <div className="flex flex-col">

      {categories.map((category) => (
        <div
          key={category.id}
          className={twMerge(
            "flex items-center gap-4 py-3 cursor-pointer",
            type.includes(category.id) && "bg-primaryLight"
          )}
          onClick={() => {
            if (type.includes(category.id)) {
              setType(type.filter((id) => id !== category.id));
            } else {
              setType([...type, category.id]);
            }
          }}
        >
          <Image
            src={category.icon}
            alt={category.name}
            width={30}
            height={30}
          />
          <p>{category.name}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default CategoriesPopoverContent;
