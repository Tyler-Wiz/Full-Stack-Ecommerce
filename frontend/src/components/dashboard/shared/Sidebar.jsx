"use client";

import { sidebarData } from "@/services/data/sidebar";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { BiSolidChevronLeftSquare } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";

const Sidebar = ({ expanded, toggleSidebar }) => {
  return (
    <aside className={expanded ? "sidebar" : "sidebar w-[4%]"}>
      <div className="logo">
        {expanded ? (
          <Image src="/slogo.png" alt="logo" width={160} height={200} />
        ) : (
          <Image src="/collapsedLogo.png" alt="logo" width={50} height={50} />
        )}
      </div>
      <div className="mt-10">
        {sidebarData.map((item, idx) => (
          <>
            {expanded ? (
              <MenuItem key={idx} item={item} />
            ) : (
              <IconItem key={idx} item={item} />
            )}
          </>
        ))}
      </div>

      <button onClick={toggleSidebar} className="flex gap-3 px-2 mt-48">
        <BiSolidChevronLeftSquare color="#3ab7bf" size={25} />
        {expanded && <span>Collapse Me</span>}
      </button>
    </aside>
  );
};

export default Sidebar;

const IconItem = ({ item }) => {
  return (
    <div className="mt-2">
      <Link
        href={item.path}
        className={`flex flex-row space-x-4 mb-6 items-center p-2 rounded-lg hover:bg-zinc-100 relative group`}>
        {item.icon}
        <span className="tooltiptext hidden group-hover:block left-12 ">
          {item.title}
        </span>
      </Link>
    </div>
  );
};

const MenuItem = ({ item }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="mt-2">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 mb-6 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}>
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-md flex">{item.title}</span>
            </div>
            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <FaChevronDown color="#3ab7bf" size={10} />
            </div>
          </button>
          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}>
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 mb-6 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}>
          {item.icon}
          <span className="font-semibold text-md flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
