import Image from "next/image";
import React from "react";
import Nav from "./Nav";
import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline, IoSearch } from "react-icons/io5";

const Header = () => {
  return (
    <header className="jost border-b-[1px] py-5">
      <div className="header-container">
        <div className="flex-item">
          <Image src="/img/client/logo.png" width={100} height={50} />
          <Nav />
        </div>
        <div className="flex-item gap-7 ">
          <p className="mr-6">Login/Register</p>
          <FaRegHeart size={20} />
          <IoCartOutline size={20} />
          <IoSearch size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
