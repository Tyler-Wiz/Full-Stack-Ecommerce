"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import Nav from "./Nav";
import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getTotal } from "@/store/features/wishSlice";
import { getCartTotal } from "@/store/features/cartSlice";
import Link from "next/link";

const Header = ({ setOpenWishList, setOpenCartList }) => {
  const dispatch = useDispatch();
  const { itemsTotal, wishList } = useSelector((state) => state.wish);
  const { cartItem, cartTotalQuantity } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotal());
    dispatch(getCartTotal());
  }, [wishList, cartItem]);

  return (
    <header className="jost border-b-[1px] py-5">
      <div className="header-container container">
        <div className="flex-item">
          <Link href="/" className="relative w-32 h-7">
            <Image
              src="/img/client/logo.png"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Website logo"
            />
          </Link>
          <Nav />
        </div>
        <div className="flex-item gap-7">
          <Link href="/login">
            <p className="mr-6 text-[2px]">Login/Register</p>
          </Link>
          <button className="relative" onClick={() => setOpenWishList(true)}>
            <FaRegHeart size={20} />
            <span className="absolute -top-4 -right-5">
              {itemsTotal > 0 && (
                <span className="bg-primary text-white text-xs px-1.5 py-.3 rounded-full">
                  {itemsTotal}
                </span>
              )}
            </span>
          </button>
          <button className="relative" onClick={() => setOpenCartList(true)}>
            <IoCartOutline size={20} />
            <span className="absolute -top-4 -right-5">
              {cartTotalQuantity > 0 && (
                <span className="bg-primary text-white text-xs px-1.5 py-.3 rounded-full">
                  {cartTotalQuantity}
                </span>
              )}
            </span>
          </button>
          <IoSearch size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
