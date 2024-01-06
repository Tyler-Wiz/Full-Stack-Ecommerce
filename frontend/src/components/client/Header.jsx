"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import Nav from "./Nav";
import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getTotal } from "@/store/features/wishSlice";

const Header = ({ setOpenWishList }) => {
  const dispatch = useDispatch();
  const { itemsTotal, wishList } = useSelector((state) => state.wish);

  useEffect(() => {
    dispatch(getTotal());
  }, [wishList]);

  return (
    <header className="jost border-b-[1px] py-5">
      <div className="header-container">
        <div className="flex-item">
          <div className="relative w-32 h-7">
            <Image
              src="/img/client/logo.png"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Website logo"
            />
          </div>
          <Nav />
        </div>
        <div className="flex-item gap-7">
          <p className="mr-6">Login/Register</p>
          <div
            className="relative transition cursor-pointer "
            onClick={() => setOpenWishList(true)}>
            <FaRegHeart size={20} />
            <span className="absolute -top-4 -right-5">
              {itemsTotal > 0 && (
                <span className="bg-primary text-white text-xs px-1.5 py-.3 rounded-full">
                  {itemsTotal}
                </span>
              )}
            </span>
          </div>
          <IoCartOutline size={20} />
          <IoSearch size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
