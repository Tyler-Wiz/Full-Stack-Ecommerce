"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaSearch, FaPlus, FaImage, FaEdit } from "react-icons/fa";
import Link from "next/link";

const ManageProducts = ({ products }) => {
  const [data, setData] = useState(products);
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");

  const handleChange = ({ target }) => {
    setSelected(target.value);
  };

  useEffect(() => {
    setData(products);
    if (selected > 0) {
      const filteredProducts = products.filter(
        (item) => item.category_id === parseInt(selected, 10)
      );
      setData(filteredProducts);
    } else if (search) {
      const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setData(filteredProducts);
    }
  }, [selected, search]);

  return (
    <section className="mt-6 px-2">
      <div className="flex items-center justify-between mb-6">
        <Link href="/dashboard/products/add">
          <button className="flex items-center gap-2 text-xs bg-button text-white px-4 py-2 shadow-xl border-white rounded-full">
            <p>Add New Product</p>
            <FaPlus size={10} />
          </button>
        </Link>
        <form className="relative">
          <input
            className="nav-search w-[250px]"
            placeholder="Search Product..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button className="absolute top-[30%] right-3 ">
            <FaSearch size={13} color="gray" />
          </button>
        </form>
      </div>
      <div className="flex justify-between items-center">
        <select
          name=""
          id=""
          value={selected}
          className={`w-1/6 p-2 border rounded-md outline-none focus:border-blue-500 text-sm`}
          onChange={handleChange}>
          <option value="0">Filter by Category</option>
          <option value="5">Electronics</option>
          <option value="6">Fashion</option>
          <option value="7">Food and Drinks</option>
          <option value="8">Books</option>
        </select>
      </div>
      <table className="min-w-full divide-y divide-gray-200 my-6 text-sm">
        <thead className="font-regular bg-white uppercase text-purple">
          <tr>
            <th className="text-left p-4 uppercase "></th>
            <th className="text-left p-4 uppercase">
              <FaImage />
            </th>
            <th className="text-left p-4 uppercase ">Product Name</th>
            <th className="text-left p-4 uppercase">Sku</th>
            <th className="text-left p-4 uppercase">Stock</th>
            <th className="text-left p-4 uppercase">Price</th>
            <th className="text-left p-4 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 capitalize">
          {data?.map((product, index) => (
            <tr
              key={product.id}
              className={index % 2 === 0 ? "bg-gray-50" : ""}>
              <td className="p-4 whitespace-nowrap">
                <input type="checkbox" />
              </td>
              <td className="p-4 whitespace-nowrap">
                <Image
                  src={product.image_urls[0]}
                  alt={product.name}
                  width={40}
                  height={30}
                />
              </td>
              <td className="p-4 whitespace-nowrap text-secondary font-bold">
                {product.name}
              </td>
              <td className="p-4 whitespace-nowrap text-xs font-medium">
                {product.sku}
              </td>
              <td className="p-4 whitespace-nowrap text-xs font-medium">
                <p>
                  <span className="text-button mr-2">In Stock</span>(
                  {product.stock})
                </p>
              </td>
              <td className="p-4 whitespace-nowrap text-xs font-medium">
                £{product.price}
              </td>
              <td className="p-4 whitespace-nowrap text-center">
                <Link href={`/dashboard/products/edit/${product.id}`}>
                  <button>
                    <FaEdit />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ManageProducts;
