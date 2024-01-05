"use client";

import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline, IoShare } from "react-icons/io5";

const AddToList = ({ id }) => {
  return (
    <section className="">
      <button
        className="bg-white text-2xl p-3 hover:bg-black hover:text-white"
        onClick={() => console.log(id)}>
        <FaRegHeart />
      </button>
      <button
        className="bg-white text-2xl p-3 hover:bg-black hover:text-white"
        onClick={() => console.log(id)}>
        <IoCartOutline />
      </button>
      <button
        className="bg-white text-2xl p-3 hover:bg-black hover:text-white"
        onClick={() => console.log(id)}>
        <IoShare />
      </button>
    </section>
  );
};

export default AddToList;
