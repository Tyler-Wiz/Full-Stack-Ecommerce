"use client";

import { MdClose, MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { removeWish, clearWishList } from "@/store/features/wishSlice";
import Button from "./Button";

const RenderWishList = ({ openWishList, setOpenWishList }) => {
  const { wishList } = useSelector((state) => state.wish);
  const dispatch = useDispatch();

  return (
    <>
      {openWishList ? (
        <div className="fixed z-[9998] top-0 right-0 w-[100%] h-[100%] montserrat">
          <div className="fixed lg:w-1/4 w-2/3 h-full bg-white top-0 right-0 z-[9999] p-5 shadow-lg animate-slide overflow-y-auto">
            <div className="flex justify-between mt-1 border-b-[1px] pb-4">
              <p className="text-md font-medium ">WishList</p>
              <MdClose
                size={25}
                className="text-black cursor-pointer"
                onClick={() => {
                  setOpenWishList(false);
                }}
              />
            </div>
            {wishList.length === 0 ? (
              <p className="text-center my-4">No item in Wishlist</p>
            ) : (
              <div className="my-6">
                {wishList?.map((item, index) => (
                  <>
                    <div className="flex my-6 border-b-[1px] pb-4" key={index}>
                      <Link
                        href={`/products/${item.category[0]}/${item.slug}`}
                        className="w-32 h-24 relative"
                        onClick={() => {
                          setOpenWishList(false);
                        }}>
                        <Image src={item.images[0]} fill={true} size="" />
                      </Link>
                      <div className="ml-2 flex flex-col text-[12px] gap-1 pt-2">
                        <div className="flex justify-between w-56">
                          <p className="text-xs font-bold">{item.name}</p>
                          <div
                            className="text-lg text-primary cursor-pointer"
                            onClick={() => {
                              dispatch(removeWish(item.id));
                            }}>
                            <MdDelete />
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <p className="mr-1">{item.itemsQuantity} x</p>
                          <p>£{item.price}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
                <div className="flex flex-col">
                  <button
                    type="button"
                    className="bg-primary montserrat w-[100%] text-white text-sm my-4 py-2 font-display uppercase"
                    onClick={() => {
                      dispatch(clearWishList());
                    }}>
                    Clear Wishlist
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RenderWishList;
