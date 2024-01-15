"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import RenderProductList from "../product/RenderProductList";

const Trending = ({ products }) => {
  const [data, setData] = useState(products);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (selected === "") {
      setData(products);
      return;
    } else {
      const filterData = products.filter((item) => {
        return item.category[0].toLowerCase() === selected.toLowerCase();
      });
      setData(filterData);
    }
  }, [selected]);

  return (
    <section className="montserrat lg:container flex-col px-6 lg:px-0">
      <div className="border-b-[1px] py-3 montserrat flex-item justify-between">
        <h3 className="lg:text-xl  font-bold">Trending Products</h3>
        <div className="flex-item gap-4">
          <p className="border-r-2 pr-3 border-primary text-xs">Sort by</p>
          <select
            className="px-4 font-bold outline-none"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}>
            <option value="">All Products</option>
            <option value="apparel">Apparel</option>
            <option value="equipment">Equipment</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>
      </div>
      <div className="mt-10 flex gap-6">
        <div className="lg:w-[20%] relative hidden lg:block lg:h-[920px]">
          <Image
            src="/img/client/promo-banner.png"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="banner ad"
          />
        </div>
        <div className="flex flex-wrap md:gap-4 gap-2 w-full lg:w-[80%]">
          {data?.slice(0, 6).map((item, index) => (
            <div key={index} className="lg:w-[32%] w-[48%]">
              <RenderProductList product={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
