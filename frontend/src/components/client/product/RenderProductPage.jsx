"use client";
import { useEffect, useState } from "react";
import ClientLayout from "../shared/ClientLayout";
import RenderProductList from "./RenderProductList";

const RenderProductPage = ({ products }) => {
  const [data, setData] = useState(products);
  const [selected, setSelected] = useState({
    category: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
      const filterData = products.filter((item) => {
        return (
          item.category[0].toLowerCase() === selected.category.toLowerCase()
        );
      });
      setData(filterData);
    } else {
      setData(products);
    }
  }, [selected]);

  return (
    <ClientLayout>
      <section className="lg:container px-6 lg:px-0 flex-col">
        <h1 className="lg:text-4xl font-bold montserrat my-10">Products</h1>
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
        <div className="flex flex-wrap lg:gap-4 gap-2 w-full my-10">
          {paginateData().map((item, index) => (
            <div key={index} className="lg:w-[24%] w-[48%] ">
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
