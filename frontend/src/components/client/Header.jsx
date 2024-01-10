"use client";
import Image from "next/image";
import React, { useLayoutEffect, useState, useRef } from "react";
import Nav from "./Nav";
import { FaRegHeart } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getTotal } from "@/store/features/wishSlice";
import { getCartTotal } from "@/store/features/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUser, getGoogleUser } from "@/store/features/authSlice";

const Header = ({ setOpenWishList, setOpenCartList }) => {
  // Instance of Dispatch
  const dispatch = useDispatch();
  // States from Redux
  const { itemsTotal, wishList } = useSelector((state) => state.wish);
  const { cartItem, cartTotalQuantity } = useSelector((state) => state.cart);
  const { user_id, googleUser } = useSelector((state) => state.auth);

  // Search Loading State and Ref
  const [isSearch, setIsSearch] = useState(false);
  const searchQueryRef = useRef(null);

  useLayoutEffect(() => {
    // Get Cart Total
    dispatch(getTotal());
    // Get Cart Quantity Total
    dispatch(getCartTotal());
    // Get Local User
    dispatch(getUser());
    // Get Google User
    dispatch(getGoogleUser());
  }, [wishList, cartItem]);

  // instance of next router
  const router = useRouter();

  // Handle Search
  const HandleSearch = (e) => {
    e.preventDefault();
    // Get Search Query
    const query = searchQueryRef.current.value;
    // Redirect to search page
    if (query.length > 0) {
      router.push(`/search/${query}`);
    }
  };

  const handleGoogleUserSignOut = () => {
    window.open(`http://localhost:4002/auth/logout`, "_self");
  };

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
          <div className="flex items-center gap-6">
            <button className="relative">
              <IoSearch size={20} onClick={() => setIsSearch(!isSearch)} />
              {isSearch && (
                <form onSubmit={HandleSearch}>
                  <input
                    className="absolute top-9 w-52 border-[2px] right-0 outline-none px-3 py-1 "
                    ref={searchQueryRef}
                  />
                </form>
              )}
            </button>
            {user_id ? (
              <Link href="/account">
                <FaUserCircle size={35} />
              </Link>
            ) : googleUser ? (
              <p className="text-[2px]">Hello, {googleUser.name}</p>
            ) : (
              <Link href="/login">
                <p className="text-[2px]">Login/Register</p>
              </Link>
            )}
            {googleUser && (
              <button
                className="text-primary text-xs"
                onClick={handleGoogleUserSignOut}>
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
