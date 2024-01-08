import React from "react";
import Image from "next/image";
import AddToList from "../shared/AddToList";
import Link from "next/link";

const RenderProductList = ({ product }) => {
  const handleDiscount = (product) => {
    return parseFloat(product.price - product.price * (product.discount / 100));
  };

  return (
    <>
      <div className="h-[360px] relative group my-6">
        {product.images && (
          <Link href={`/products/${product.category[0]}/${product.slug}`}>
            <Image
              src={product.images[0]}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="product image"
            />
          </Link>
        )}
        {product.discount && (
          <p className="bg-primary font-bold p-2 text-xs text-white absolute right-3 top-3">
            - {product.discount}%
          </p>
        )}
        <div className="hidden group-hover:block absolute transform -translate-x-1/2 bottom-5 left-1/2">
          <AddToList product={product} />
        </div>
      </div>
      <p className="text-primary uppercase font-bold text-sm tracking-widest my-2">
        {product.category[0]}
      </p>
      <p className="font-bold my-2">{product.name}</p>
      {product.discount ? (
        <div className="flex gap-4">
          <p>£{handleDiscount(product).toFixed(2)}</p>
          <p className="line-through">£{product.price}</p>
        </div>
      ) : (
        <p>£{product.price}</p>
      )}
    </>
  );
};

export default RenderProductList;
