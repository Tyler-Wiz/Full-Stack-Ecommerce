"use client";

import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/shared/TextInput";
import { productSchema } from "@/validators/ProductValidator";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { FaImages } from "react-icons/fa";
import axios from "axios";

const AddProductForm = ({ categories, brands, attributes, discounts }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const [images, setImages] = useState([]);
  const attributeRef = useRef();

  const handleImageChange = (e) => {
    const files = e.target.files;
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const promise = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({ name: file.name, image: event.target.result });
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
      promises.push(promise);
    }

    Promise.all(promises)
      .then((results) => {
        setImages(results);
      })
      .catch((error) => {
        console.error("Error converting images to Base64:", error);
      });
  };

  const onSubmit = async (data, e) => {
    console.log(data);
    try {
      const res = await axios.post(`http://localhost:4002/api/products`, data, {
        withCredentials: true,
      });
      const product = res.data;
      if (product) {
        const data = {
          product_id: product.id,
          images,
        };
        const res = await axios.post(
          "http://localhost:4002/api/images/",
          data,
          {
            withCredentials: true,
          }
        );
        if (res.data) {
          setImages([]);
          e.target.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-between gap-10 bg-white px-5 py-6 rounded-lg shadow-xl">
      <div className="w-3/5">
        <div className="mb-3">
          <p className="mb-2 text-sm">Product Images</p>
          <div className="flex gap-2">
            <div className="flex justify-center items-center mb-10 w-64 h-64 border-[1px] p-3 rounded-lg">
              {images[0]?.image ? (
                <img
                  src={images[0]?.image}
                  alt={images[0]?.image}
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              ) : (
                <FaImages size={40} />
              )}
            </div>
            <div className="flex justify-center items-center mb-10 w-64 h-64 border-[1px] p-3 rounded-lg">
              {images[1]?.image ? (
                <img
                  src={images[1]?.image}
                  alt={images[1]?.image}
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              ) : (
                <FaImages size={40} />
              )}
            </div>
            <div className="flex flex-col gap-7">
              <div className="flex justify-center items-center w-32 h-28 border-[1px] p-3 rounded-lg">
                {images[2]?.image ? (
                  <img
                    src={images[2]?.image}
                    alt={images[2]?.image}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                ) : (
                  <FaImages size={40} />
                )}
              </div>
              <div className="flex justify-center items-center  w-32 h-28 border-[1px] p-3 rounded-lg">
                {images[3]?.image ? (
                  <img
                    src={images[3]?.image}
                    alt={images[3]?.image}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                ) : (
                  <FaImages size={40} />
                )}
              </div>
            </div>
          </div>
          <input
            type="file"
            multiple
            name="image"
            accept="image/png, image/gif, image/jpeg, image/webp"
            onChange={handleImageChange}
            placeholder="image upload"
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          />
        </div>
        <div className="flex gap-3">
          <div className="w-1/2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="color">
              Color
            </label>
            <select
              className={`w-full p-2 border rounded-md outline-none focus:border-blue-500`}
              ref={attributeRef}>
              {attributes.map((attribute) => {
                if (attribute.name === "Color") {
                  return (
                    <option key={attribute.id} value={attribute.id}>
                      {attribute.value}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="w-1/2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="color">
              Size
            </label>
            <select
              className={`w-full p-2 border rounded-md outline-none focus:border-blue-500`}>
              {attributes.map((attribute) => {
                if (attribute.name === "Size") {
                  return (
                    <option key={attribute.id} value={attribute.id}>
                      {attribute.value}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        </div>
        <label htmlFor="description" className="ml-3 text-sm">
          Description
          <textarea
            className="outline-none w-full h-20 block rounded-lg border-[1px] p-6"
            {...register("description")}></textarea>
        </label>
      </div>
      <div className="w-2/5">
        <Input
          register={register}
          name="name"
          label="Product Name"
          error={errors.name?.message}
        />
        <div className="flex justify-between">
          <Input
            register={register}
            name="price"
            label="Price"
            error={errors.price?.message}
          />
          <Input
            register={register}
            name="stock"
            label="Stock"
            error={errors.stock?.message}
          />
        </div>
        <div className="flex justify-between gap-3">
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender">
              Category
            </label>
            <Controller
              name="category_id"
              control={control}
              rules={{ required: "Please select a category" }}
              render={({ field }) => (
                <select
                  {...field}
                  id="gender"
                  className={`w-full p-2 border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } rounded-md outline-none focus:border-blue-500`}>
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender">
              Brand
            </label>
            <Controller
              name="brand_id"
              control={control}
              rules={{ required: "Please select a brand" }}
              render={({ field }) => (
                <select
                  {...field}
                  id="brand"
                  className={`w-full p-2 border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } rounded-md outline-none focus:border-blue-500`}>
                  <option value="">Select a brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>
        <div className="mb-4 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="gender">
            Discount
          </label>
          <Controller
            name="discount_id"
            control={control}
            rules={{ required: "Please select a brand" }}
            render={({ field }) => (
              <select
                {...field}
                id="brand"
                className={`w-full p-2 border ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                } rounded-md outline-none focus:border-blue-500`}>
                <option value="">Select a discount</option>
                {discounts.map((discount) => (
                  <option key={discount.id} value={discount.id}>
                    {discount.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
          )}
        </div>
        <PrimaryButton name="Publish product" color="bg-tahiti" />
      </div>
    </form>
  );
};

export default AddProductForm;
