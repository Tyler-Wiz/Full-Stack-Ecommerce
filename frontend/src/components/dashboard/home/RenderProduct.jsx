import React from "react";
import Image from "next/image";
import StarRating from "@/components/shared/StarRating";

const RenderProduct = ({ title, icon, background, data, rating }) => {
  return (
    <>
      <div className="flex gap-5 ml-3 items-center">
        <div className={`p-2 ${background} w-8 flex justify-center`}>
          {icon}
        </div>
        <p className=" font-bold text-secondary">{title}</p>
      </div>
      <div className="flex justify-between mt-5 gap-2 h-64">
        {data
          .reverse()
          .slice(0, 6)
          .map((product) => (
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

export default RenderProduct;
