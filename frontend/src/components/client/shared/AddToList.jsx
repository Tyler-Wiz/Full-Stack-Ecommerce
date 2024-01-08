"use client";

import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline, IoShare } from "react-icons/io5";
import { addToWishList } from "@/store/features/wishSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/features/cartSlice";

const AddToList = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToWishList = (item) => {
    dispatch(addToWishList(item));
  };

  return (
    <section className="">
      <button
        className="bg-white text-2xl p-3 hover:bg-black hover:text-white"
        onClick={() => handleAddToWishList(product)}>
        <FaRegHeart />
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
