"use client";
import { useState } from "react";
import RenderSizeColor from "./RenderSizeColor";
import Button from "../shared/Button";
import Image from "next/image";
import SecureShipping from "../shared/SecureShipping";
import { FaArrowRightLong } from "react-icons/fa6";
import RenderProductList from "./RenderProductList";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/features/cartSlice";
import StarRating from "@/components/shared/StarRating";
import axios from "axios";
import { toast } from "react-toastify";

const RenderSingleProduct = ({ product, productsInCategory }) => {
  const [selected_size, setSelectedSize] = useState("");
  const [selected_color, setSelectedColor] = useState("");
  const [selectedError, setSelectedError] = useState("");

  const handleDiscount = (product) => {
    return parseFloat(product.price - product.price * (product.discount / 100));
  };

  const filterOutProduct = productsInCategory.filter(
    (item) => item.id !== product.id
  );

  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    try {
      const product_id = product.id;
      if (!selected_color || !selected_size) {
        setSelectedError("Please select size and color");
        return;
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}api/cart`,
          {
            product_id,
            selected_size,
            selected_color,
          },
          {
            withCredentials: true,
          }
        );
        if (res.data) {
          dispatch(addToCart({ ...product, selected_color, selected_color }));
          setSelectedError("");
        }
      }
    } catch (error) {
      toast.error(error.response.data.errorMessage, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <section className="lg:container lg:px-0 px-6 flex-col">
      <div className="flex gap-16 montserrat my-16 ">
        <div className="lg:w-[40%] flex flex-col gap-6">
          <div className="flex justify-center items-center lg:hidden">
            <div className="relative w-[95%] h-[400px]">
              <Image src={product.images[0]} alt={product.name} fill />
            </div>
          </div>
          <p className="text-sm uppercase text-primary font-bold tracking-widest">
            {product.category[0]}
          </p>
          <h3 className="text-4xl capitalize font-bold jost">{product.name}</h3>
          <p className="text-xs text-gray-600 leading-5">
            {product.description}
          </p>
          <StarRating initialRating={product.rating} />
          <RenderSizeColor
            product={product}
            setSelectedSize={setSelectedSize}
            selectedSize={selected_size}
            selectedColor={selected_color}
            setSelectedColor={setSelectedColor}
          />
          <div className="flex gap-10 items-center">
            {product.discount !== "0" ? (
              <div className="flex gap-4  text-primary text-xl font-bold ">
                <p>£{handleDiscount(product).toFixed(2)}</p>
                <p className="line-through text-gray-400 text-xl font-bold">
                  £{product.price}
                </p>
              </div>
            ) : (
              <p className="text-primary text-xl font-bold">
                £{parseFloat(product.price).toFixed(2)}
              </p>
            )}
            <Button
              backgroundColor="bg-black"
              name="ADD TO CART"
              color="text-white"
              width="w-[200px]"
              onClick={() => handleAddToCart()}
            />
          </div>
          {selectedError && <p className="text-primary">{selectedError}</p>}
        </div>

        <div className="lg:flex w-[60%] gap-5 hidden">
          <div className="relative w-[60%] h-full">
            <Image src={product.images[0]} alt={product.name} fill />
          </div>
          <div className="flex flex-col w-[40%] h-full gap-5">
            <div className="relative w-full h-1/2">
              <Image src={product.images[1]} alt={product.name} fill />
            </div>
            <div className="relative w-full h-1/2">
              <Image src={product.images[2]} alt={product.name} fill />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-[1px]">
        <SecureShipping />
      </div>
      <div className="flex items-center justify-between border-b-[1px] pb-4">
        <h3 className="text-2xl font-bold jost">Related Products</h3>
        <Link href={`/products/${product.category[0]}`}>
          <button className="flex-item gap-2">
            View All
            <span className="text-primary">
              <FaArrowRightLong />
            </span>
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-4 w-full my-10">
        {filterOutProduct.slice(0, 4).map((item, index) => (
          <div key={index} className="w-[24%]">
            <RenderProductList product={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RenderSingleProduct;
