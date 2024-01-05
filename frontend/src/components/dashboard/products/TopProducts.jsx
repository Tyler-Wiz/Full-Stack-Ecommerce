import Image from "next/image";
import React from "react";
import { FaShirt } from "react-icons/fa6";
import { MdOutlinePhonelink } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import StarRating from "@/components/shared/StarRating";

const TopProducts = ({ products }) => {
  const getTopProducts = (array, conditionState) => {
    const condition = (item) => item.category_id === conditionState;
    const result = [];
    let count = 0;

    for (const item of array) {
      if (condition(item)) {
        result.push(item);
        count++;
        if (count === 3) {
          break;
        }
      }
    }
    return result;
  };

  const fashionProducts = getTopProducts(products, 6);
  const electronicsProducts = getTopProducts(products, 5);
  const foodProducts = getTopProducts(products, 7);
  const bookProducts = getTopProducts(products, 8);

  const Content = ({ title, icon, background, data, rating }) => {
    return (
      <>
        <div className="flex gap-5 ml-3 items-center">
          <div className={`p-2 ${background} w-8 flex justify-center`}>
            {icon}
          </div>
          <p className=" font-bold text-secondary">{title}</p>
        </div>
        <div className="flex justify-between mt-5 gap-2 h-64">
          {data?.map((product) => (
            <div
              key={product.id}
              className="flex justify-center gap-3 p-4 bg-white rounded-lg text-center shadow-md flex-col w-1/3">
              <div className="flex justify-center">
                <Image
                  src={product.image_urls[0]}
                  alt={product.name}
                  width={50}
                  height={30}
                />
              </div>
              <p className="text-xs font-bold capitalize text-secondary">
                {product.name}
              </p>
              <StarRating initialRating={rating} />
              <p className="text-sm font-medium text-green-800 drop-shadow-sm">
                Available: {product.stock}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <section>
      <div className="flex justify-between mt-10 gap-10">
        <div className="w-1/2">
          <Content
            title="Electronics"
            icon={<MdOutlinePhonelink size={18} color="white" />}
            background={"bg-blue-500"}
            data={electronicsProducts}
            rating={4}
          />
        </div>
        <div className="w-1/2">
          <Content
            title="Fashion"
            icon={<FaShirt size={18} color="white" />}
            background={"bg-pink-600"}
            data={fashionProducts}
            rating={3}
          />
        </div>
      </div>
      <div className="flex justify-between mt-10 gap-10">
        <div className="w-1/2">
          <Content
            title="Food And Drinks"
            icon={<IoFastFood size={18} color="white" />}
            background={"bg-blue-950"}
            data={foodProducts}
            rating={5}
          />
        </div>
        <div className="w-1/2">
          <Content
            title="Books"
            icon={<ImBooks size={18} color="white" />}
            background={"bg-orange-600"}
            data={bookProducts}
            rating={4}
          />
        </div>
      </div>
    </section>
  );
};

export default TopProducts;
