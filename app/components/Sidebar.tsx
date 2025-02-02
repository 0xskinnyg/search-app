import Image from "next/image";

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg p-4 transition-transform duration-300 ease-in-out transform z-50 ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center mb-8">
        <Image
          className="h-[53px]"
          src="/images/logo.png"
          alt="logo"
          width={112}
          height={53}
        />
        <button onClick={() => setIsSidebarOpen(false)} className="p-2">
          <Image
            src="/images/close-icon.png"
            alt="close"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-[18px] font-semibold">Rent/Buy</p>
        <p className="text-[18px] font-semibold">For Owners</p>
        <p className="text-[18px] font-semibold">For Brokers</p>
        <p className="text-[18px] font-semibold">About Us</p>
        <div className="flex flex-col gap-4 mt-4">
          <button className="py-3 px-8 border border-[#4F4040] rounded-full">
            Log In
          </button>
          <button className="py-3 px-8 border border-[#4F4040] rounded-full bg-primary text-white">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
