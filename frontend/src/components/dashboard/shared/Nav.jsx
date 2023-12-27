import React from "react";
import { FaSearch, FaUser, FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";

const Nav = () => {
  return (
    <div className="navContainer">
      <div className="relative">
        <input className="nav-search" placeholder="Search For.." />
        <button className="absolute top-[30%] right-3 ">
          <FaSearch size={13} color="gray" />
        </button>
      </div>
      <div className="nav-icons-container">
        <button>
          <IoSunnyOutline size={20} color="gray" />
        </button>
        <button>
          <FaMessage size={20} color="gray" />
        </button>
        <button className="p-3 bg-tahiti rounded-full">
          <FaUser color="white" />
        </button>
      </div>
    </div>
  );
};

export default Nav;
