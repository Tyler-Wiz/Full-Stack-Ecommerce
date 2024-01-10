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
import Link from "next/link";

const RenderCartPage = () => {
  // Instance of Dispatch
  const dispatch = useDispatch();
  // States from Redux
  const { cartItem, cartTotalAmount } = useSelector((state) => state.cart);
  const { user_id, googleUser } = useSelector((state) => state.auth);
  // Client State for rendering
  const [isClient, setIsClient] = useState(false);
  useLayoutEffect(() => {
    setIsClient(true);
  }, []);
  // Handle Discount
  const handleDiscount = (product) => {
    return parseFloat(product.price - product.price * (product.discount / 100));
  };

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
                      <td className="p-4 whitespace-nowrap flex items-center gap-6 ">
                        <div className="relative w-20 h-20">
                          <Link
                            href={`/products/${product.category[0]}/${product.slug}`}>
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="rounded-full"
                            />
                          </Link>
                        </div>
                        <div className=" text-[1rem]">
                          <p className="font-bold mb-2"> {product.name}</p>
                          {product.selectedSize && (
                            <p>Size: {product.selectedSize}</p>
                          )}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-[1rem] font-medium text-gray-400">
                        {product.discount ? (
                          <div className="flex gap-4">
                            <p>£{handleDiscount(product).toFixed(2)}</p>
                            <p className="line-through">£{product.price}</p>
                          </div>
                        ) : (
                          <p>£{product.price}</p>
                        )}
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
                        <div>
                          {product.discount ? (
                            <div className="flex gap-4">
                              <p>
                                £
                                {(
                                  handleDiscount(product) * product.cartQuantity
                                ).toFixed(2)}
                              </p>
                            </div>
                          ) : (
                            <p>
                              £
                              {(product.price * product.cartQuantity).toFixed(
                                2
                              )}
                            </p>
                          )}
                        </div>
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
                    <p>{cartTotalAmount.toFixed(2)}</p>
                  </div>
                  {user_id || googleUser ? (
                    <Link href={`/`} className="my-4">
                      <Button
                        name="Place Order"
                        backgroundColor="bg-primary"
                        color="text-white"
                        width="w-full"
                      />
                    </Link>
                  ) : (
                    <Link href={`/login`} className="my-4">
                      <Button
                        name="login to Place order"
                        backgroundColor="bg-primary"
                        color="text-white"
                        width="w-full"
                      />
                    </Link>
                  )}
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
