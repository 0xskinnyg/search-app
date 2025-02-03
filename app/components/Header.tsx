"use client";

import Image from "next/image";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: "rent-buy", label: "Rent/Buy" },
    { id: "owners", label: "For Owners" },
    { id: "brokers", label: "For Brokers" },
    { id: "about", label: "About Us" },
  ];

  const MenuItem = ({ item }: { item: { id: string; label: string } }) => (
    <div className="relative cursor-pointer px-4 py-2 group">
      <p className="text-[18px] font-semibold relative z-10">{item.label}</p>
      <motion.div
        layoutId="menuUnderline"
        className="absolute left-1/2 -translate-x-1/2 top-[40px] size-4 bg-primary rounded-full hidden group-hover:block"
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 30,
        }}
      />
    </div>
  );

  return (
    <header>
      <div className="flex flex-row justify-between py-4 px-2 pl-4 md:pl-11">
        <div className="flex items-center gap-4">
          <Image
            className="h-[53px]"
            src="/images/logo.png"
            alt="logo"
            width={112}
            height={53}
          />
        </div>
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <button className="py-4 px-16 border border-[#4F4040] rounded-full hover:bg-black hover:text-white">
            Log In
          </button>
          <button className="py-4 px-16 rounded-full bg-primary text-white hover:bg-primary/90">
            Register
          </button>
        </div>
        <button
          className="block lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Image
            src="/images/menu-icon.png"
            alt="menu"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isSidebarOpen ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </header>
  );
}
