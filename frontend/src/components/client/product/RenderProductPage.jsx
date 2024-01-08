"use client";
import { useEffect, useState } from "react";
import ClientLayout from "../shared/ClientLayout";
import { productData } from "@/services/data/product";
import Image from "next/image";
import AddToList from "../shared/AddToList";
import RenderProductList from "./RenderProductList";

const RenderProductPage = () => {
  const [data, setData] = useState(productData);
  const [selected, setSelected] = useState({
    category: "",
    brand: "",
    size: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginateData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setSelected((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  useEffect(() => {
    if (selected.category !== "") {
      const filterData = productData.filter((item) => {
        return item.category[0] === selected.category;
      });
      setData(filterData);
    } else {
      setData(productData);
    }
  }, [selected]);

  return (
    <ClientLayout>
      <section className="container flex-col">
        <h1 className="text-4xl font-bold montserrat my-10 ">Products</h1>
        <div className="flex-item gap-4 text-sm text-gray-500 montserrat border-b-[1px] py-5">
          <p className="">Sort by</p>
          <span className="bg-primary w-1 ">|</span>
          <select
            className="px-4 outline-none"
            value={selected.category}
            name="category"
            onChange={handleChange}>
            <option value="">All Products</option>
            <option value="apparel">Apparel</option>
            <option value="equipment">Equipment</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-4 w-full my-10">
          {paginateData().map((item, index) => (
            <div key={index} className="w-[24%]">
              <RenderProductList product={item} />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
          <ul className="flex  items-center gap-3">
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={
                  number === currentPage
                    ? "px-3 bg-black text-white text-lg cursor-pointer"
                    : "px-3 text-black text-lg cursor-pointer"
                }
                onClick={() => handlePageChange(number)}>
                {number}
              </li>
            ))}
          </ul>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </div>
      </section>
    </ClientLayout>
  );
};

export default RenderProductPage;
