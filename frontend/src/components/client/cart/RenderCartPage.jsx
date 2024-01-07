"use client";

import { useState, useLayoutEffect } from "react";
import ClientLayout from "../shared/ClientLayout";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { IoCheckmarkCircleOutline, IoLogoDropbox } from "react-icons/io5";
import { FaShippingFast } from "react-icons/fa";
import {
  decreaseQuantity,
  addToCart,
  removeFromCart,
} from "@/store/features/cartSlice";
import Button from "../shared/Button";

const RenderCartPage = () => {
  const { cartItem, cartTotalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState(false);

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ClientLayout>
      {isClient && (
        <section>
          {cartItem.length === 0 ? (
            <div className="h-96 flex justify-center items-center">
              <h2>Cart is empty</h2>
            </div>
          ) : (
            <div className="container items-start my-5 gap-6">
              <table className="divide-y divide-gray-200 text-sm w-[70%]">
                <thead className="capitalize">
                  <tr>
                    <th className="text-left p-4 capitalize">Product</th>
                    <th className="text-left p-4 capitalize">Price</th>
                    <th className="text-left p-4 capitalize">Quantity</th>
                    <th className="text-left p-4 capitalize ">SubTotal</th>
                    <th className="text-left p-4 capitalize "></th>
                  </tr>
                </thead>
                <tbody className="min-w-full bg-white divide-y divide-gray-200 capitalize jost">
                  {cartItem?.map((product, index) => (
                    <tr key={product.id}>
                      <td className="p-4 whitespace-nowrap flex items-center gap-6 font-bold text-[1rem]">
                        <div className="relative w-20 h-20">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="rounded-full"
                          />
                        </div>
                        {product.name}
                      </td>
                      <td className="p-4 whitespace-nowrap text-[1rem] font-medium text-gray-400">
                        <p>{product.price}</p>
                      </td>
                      <td className="p-4 whitespace-nowrap text-xs font-medium items-center">
                        <button
                          className="bg-black p-2 rounded-full text-white"
                          onClick={() =>
                            dispatch(decreaseQuantity(product.id))
                          }>
                          <FaMinus />
                        </button>
                        <span className="mx-3 text-lg py-2 rounded-full text-black">
                          {product.cartQuantity}
                        </span>
                        <button
                          className="bg-black p-2 rounded-full text-white"
                          onClick={() => dispatch(addToCart(product))}>
                          <FaPlus />
                        </button>
                      </td>
                      <td className="p-4 whitespace-nowrap text-[1rem] font-medium text-gray-400">
                        <p>
                          {(product.price * product.cartQuantity).toFixed(2)}
                        </p>
                      </td>
                      <td className="p-4 whitespace-nowrap text-4xl text-black">
                        <button
                          onClick={() => dispatch(removeFromCart(product.id))}>
                          <IoIosCloseCircle />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-[30%] jost p-4">
                <h3 className="text-lg font-bold mb-2">Cart Total</h3>
                <div className="flex flex-col gap-3 px-4 py-6 border-[1px] rounded-xl">
                  <div className="border-[1px] p-3 text-center rounded-xl">
                    <p className="font-bold">Bank Offer 5% Cashback</p>
                  </div>
                  <div className="border-[1px] p-3 rounded-xl flex items-center justify-center gap-4">
                    <span>
                      <FaShippingFast size={20} />
                    </span>
                    <p className="font-bold">Free Shipping</p>
                  </div>
                  <div className="border-[1px] p-3 rounded-xl flex items-center gap-4 ">
                    <IoLogoDropbox size={50} />
                    <div>
                      <p className="font-bold">Enjoy The Product</p>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting
                      </p>
                    </div>
                  </div>
                  <p className="my-4 flex items-center gap-2">
                    <span>
                      <IoCheckmarkCircleOutline size={20} />
                    </span>
                    You will save ₹504 on this order
                  </p>
                  <div className="flex-item justify-between text-lg font-bold">
                    <p>Total Amount</p>
                    <p>{cartTotalAmount}</p>
                  </div>
                  <Button
                    name="Place Order"
                    backgroundColor="bg-primary"
                    color="text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </ClientLayout>
  );
};

export default RenderCartPage;
