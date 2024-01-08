"use client";
import { useState } from "react";

const RenderSizeColor = ({
  product,
  setSelectedSize,
  selectedSize,
  selectedColor,
  setSelectedColor,
}) => {
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const getColorClass = (color) => {
    switch (color) {
      case "red":
        return "bg-red-900";
      case "blue":
        return "bg-blue-900";
      case "green":
        return "bg-green-900";
      case "black":
        return "bg-black";
      default:
        return "bg-white";
    }
  };

  return (
    <div>
      <div className="mb-10">
        <p className="font-bold my-3">Size</p>
        <div className="text-xs text-gray-600 leading-5 flex gap-4">
          {product.sizes.map((size, index) => (
            <div key={index}>
              <button
                className={
                  selectedSize === size
                    ? "font-bold border-[1px] p-2 min-w-10 bg-black text-white"
                    : "border-[1px] p-2 min-w-10"
                }
                onClick={() => handleSizeClick(size)}>
                {size}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="font-bold my-3">Color</p>
        <div className="leading-5 flex gap-4">
          {product.colors.map((color, index) => {
            const colorClass = getColorClass(color);
            return (
              <div
                key={index}
                className="border-[1px] border-black rounded-full w-8 flex justify-center items-center">
                <button
                  className={
                    selectedColor === color
                      ? `p-3 rounded-full ${colorClass}`
                      : `p-4 rounded-full ${colorClass}`
                  }
                  onClick={() => handleColorClick(color)}></button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RenderSizeColor;
