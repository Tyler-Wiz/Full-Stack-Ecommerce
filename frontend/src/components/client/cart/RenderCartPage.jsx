"use client";

import { useLayoutEffect } from "react";
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
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import PayButton from "./PayButton";
import { toast } from "react-toastify";

const RenderCartPage = ({ cartItem }) => {
  // Instance of Dispatch
  const dispatch = useDispatch();
  const router = useRouter();
  // States from Redux
  const { cartTotalAmount } = useSelector((state) => state.cart);
  const { user_id, googleUser } = useSelector((state) => state.auth);
  // Client State for rendering
  useLayoutEffect(() => {
    router.refresh();
  }, []);
  // Handle Discount
  const handleDiscount = (product) => {
    return parseFloat(product.price - product.price * (product.discount / 100));
  };

  // Handle Delete Item from In Local and Database
  const handleDeleteItemFromCart = async (id, cart_item_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4002/api/cart/items/${cart_item_id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        dispatch(removeFromCart(id));
        router.refresh();
      }
    } catch (error) {
      toast.error(error.response.data.errorMessage, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  // Handle Add to Cart Local and Database
  const handleAddToCart = async (product) => {
    try {
      const product_id = product.id;
      const res = await axios.post(
        `http://localhost:4002/api/cart`,
        {
          product_id,
          user_id,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        dispatch(addToCart(product));
        router.refresh();
      }
    } catch (error) {
      toast.error(error.response.data.errorMessage, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  // handle Decrease Quantity
  const handleDecreaseQuantity = async (id, cart_item_id) => {
    try {
      const res = await axios.post(
        `http://localhost:4002/api/cart/items/quantity/${cart_item_id}`,
        { user_id: user_id }
      );
      if (res.data) {
        dispatch(decreaseQuantity(id));
        router.refresh();
      }
    } catch (error) {
      toast.error(error.response.data.errorMessage, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <ClientLayout>
      <section>
        {cartItem.length === 0 ? (
          <div className="h-96 flex justify-center items-center">
            <h2>Cart is empty</h2>
          </div>
        ) : (
          <div className="lg:container items-start my-5 gap-6">
            <table className="divide-y divide-gray-200 text-sm w-[70%] hidden lg:block">
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
                        {product.selected_size && (
                          <p>Size: {product.selected_size}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap text-[1rem] font-medium text-gray-400">
                      {product.discount !== "0" ? (
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
                          handleDecreaseQuantity(
                            product.id,
                            product.cart_item_id
                          )
                        }>
                        <FaMinus />
                      </button>
                      <span className="mx-3 text-lg py-2 rounded-full text-black">
                        {product.cartquantity}
                      </span>
                      <button
                        className="bg-black p-2 rounded-full text-white"
                        onClick={() => handleAddToCart(product)}>
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
                                handleDiscount(product) * product.cartquantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        ) : (
                          <p>
                            £{(product.price * product.cartQuantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap text-4xl text-black ">
                      <button
                        onClick={() => {
                          handleDeleteItemFromCart(
                            product.id,
                            product.cart_item_id
                          );
                        }}>
                        <IoIosCloseCircle size={30} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="lg:hidden px-6 ">
              <div className=" my-16 flex flex-col gap-6">
                {cartItem?.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex gap-4 items-center border-[1px] rounded-lg p-2">
                    <div className="flex gap-2 items-center text-[13px]">
                      <div className="relative w-28 h-28">
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
                      <div>
                        <p className="font-bold mb-2">{product.name}</p>
                        <div>
                          {product.discount !== "0" ? (
                            <div className="flex gap-4">
                              <p>£{handleDiscount(product).toFixed(2)}</p>
                              <p className="line-through">£{product.price}</p>
                            </div>
                          ) : (
                            <p>£{product.price}</p>
                          )}
                        </div>
                        <div className="mt-2">
                          <button
                            className="bg-black p-2 rounded-full text-white"
                            onClick={() =>
                              handleDecreaseQuantity(
                                product.id,
                                product.cart_item_id
                              )
                            }>
                            <FaMinus />
                          </button>
                          <span className="mx-3 text-lg py-2 rounded-full text-black">
                            {product.cartquantity}
                          </span>
                          <button
                            className="bg-black p-2 rounded-full text-white"
                            onClick={() => handleAddToCart(product)}>
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-4xl text-black">
                      <button
                        onClick={() => {
                          handleDeleteItemFromCart(
                            product.id,
                            product.cart_item_id
                          );
                        }}>
                        <IoIosCloseCircle size={30} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-[30%] jost p-4">
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
                <PayButton
                  cartItem={cartItem}
                  user_id={user_id}
                  googleUser={googleUser}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </ClientLayout>
  );
};

export default RenderCartPage;
