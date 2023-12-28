import Image from "next/image";
import React from "react";

const getProductImage = async (productId) => {
  const response = await fetch(
    `http://localhost:4002/api/images/${productId}/`
  );
  const data = await response.json();
  return data;
};

const getProducts = async () => {
  const response = await fetch("http://localhost:4002/api/products");
  const data = await response.json();
  return data;
};

const TopProducts = async () => {
  const products = await getProducts();

  return (
    <div className=" bg-white rounded-xl w-[50%] px-3">
      {products.map(async (item) => {
        const images = await getProductImage(item.id);
        console.log();
        return (
          <li className=" list-none">
            <p>{item.name}</p>
            {images[0].url && (
              <Image src={images[0].url} width={100} height={100} />
            )}
          </li>
        );
      })}
    </div>
  );
};

export default TopProducts;
