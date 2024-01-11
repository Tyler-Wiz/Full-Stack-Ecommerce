import React from "react";
import { MdClose, MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

const RenderCartList = ({ setOpenCartList, openCartList }) => {
  const { cartItem, cartTotalAmount } = useSelector((state) => state.cart);
  const { user_id } = useSelector((state) => state.auth);

  return (
    <>
      {openCartList ? (
        <div className="fixed z-[9998] top-0 right-0 w-[100%] h-[100%] ">
          <div className=" fixed w-1/4 h-full bg-white top-0 right-0 z-[9999] p-5 animate-slide shadow-lg overflow-scroll ">
            <div className="flex justify-between mt-1 border-b-[1px] pb-4">
              <p className="text-md font-medium ">Cart</p>
              <MdClose
                size={25}
                className="text-black cursor-pointer"
                onClick={() => {
                  setOpenCartList(false);
                }}
              />
            </div>
            {cartItem.length === 0 ? (
              <div className="flex flex-col mt-16">
                <p className="text-center my-4">No item in Cart</p>
                <Button
                  name="shop now"
                  color="text-white"
                  backgroundColor="bg-primary"
                />
              </div>
            ) : (
              <div className="my-6">
                {cartItem?.map((item, index) => (
                  <div className="flex my-6 border-b-[1px] pb-4" key={index}>
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={() => {
                        setModalVisible(false);
                      }}>
                      <Image
                        src={item.images[0]}
                        width={80}
                        height={80}
                        alt={item.name}
                      />
                    </Link>
                    <div className="ml-2 flex flex-col text-[12px] gap-1 pt-2 ">
                      <div className="flex justify-between gap-5 w-[80%]">
                        <p className="text-xs font-bold">{item.name}</p>
                      </div>
                      <div className="flex flex-row">
                        <p className="mr-1">{item.cartQuantity} x</p>
                        <p>£{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between text-sm border-b-[1px] pb-4">
                  <p>Subtotal</p>
                  <p className="font-bold">£{cartTotalAmount}</p>
                </div>
                <div className="flex flex-col">
                  <Link href={`/cart/${user_id}`}>
                    <button
                      type="button"
                      className="bg-primary w-[100%] text-white text-sm my-4 py-2 font-display uppercase montserrat">
                      View Cart
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RenderCartList;
