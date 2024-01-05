"use client";

import Image from "next/image";
import { productData } from "@/services/data/product";
import AddToList from "../shared/AddToList";
import { useEffect, useState } from "react";

const Trending = () => {
  const [data, setData] = useState(productData);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (selected === "") {
      setData(productData);
      return;
    } else {
      const filterData = productData.filter((item) => {
        return item.category[0] === selected;
      });
      setData(filterData);
    }
  }, [selected]);

  return (
    <section className="montserrat container flex-col">
      <div className="border-b-[1px] py-3 montserrat flex-item justify-between">
        <h3 className="text-xl font-bold">Trending Products</h3>
        <div className="flex-item gap-4">
          <p className="border-r-2 pr-3 border-primary text-xs ">Sort by</p>
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
      <div className="mt-10 flex gap-4">
        <div className="h-[920px] w-[20%] relative">
          <Image src="/img/client/promo-banner.png" fill={true} />
        </div>
        <div className="flex flex-wrap gap-4 w-[80%]">
          {data?.slice(0, 6).map((item, index) => (
            <div key={index}>
              <div className="h-[360px] w-80 relative group">
                <span className="bg-white px-3 py-2 absolute left-0 top-0 z-50 group-hover:bg-black group-hover:text-white">
                  {index + 1}
                </span>
                {item.images && (
                  <Image src={item.images[0]} fill={true} objectFit="fill" />
                )}
                <div className="hidden group-hover:block absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <AddToList id={item.id} />
                </div>
              </div>
              <p className="text-primary uppercase font-bold text-sm tracking-widest my-2">
                {item.category[0]}
              </p>
              <p className="font-bold my-2">{item.name}</p>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
