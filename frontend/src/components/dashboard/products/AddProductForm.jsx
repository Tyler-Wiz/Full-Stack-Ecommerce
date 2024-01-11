"use client";

import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/shared/TextInput";
import { productSchema } from "@/validators/ProductValidator";
import { FaImages } from "react-icons/fa";
import axios from "axios";
import PrimaryButton from "@/components/shared/PrimaryButton";

const AddProductForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const {
    fields: colorsFields,
    append: appendColors,
    remove: removeColors,
  } = useFieldArray({
    control,
    name: "colors", // The name of the third array in the form data
  });

  const {
    fields: sizesFields,
    append: appendSizes,
    remove: removeSizes,
  } = useFieldArray({
    control,
    name: "sizes", // The name of the first array in the form data
  });

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control,
    name: "category", // The name of the second array in the form data
  });

  const [images, setImages] = useState([]);

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
    const colorsArray = data.colors.map((color) => color.name);
    const sizeArray = data.sizes.map((size) => size.name);
    const categoryArray = data.category.map((cat) => cat.name);
    const formData = {
      ...data,
      colors: colorsArray,
      sizes: sizeArray,
      category: categoryArray,
      images,
    };
    console.log(formData);
    try {
      const res = await axios.post(
        `http://localhost:4002/api/products`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        setImages([]);
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-between gap-10 bg-white px-5 py-6 rounded-lg shadow-xl mt-6">
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
                <FaImages color={40} />
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
                <FaImages color={40} />
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
                  <FaImages color={40} />
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
                  <FaImages color={40} />
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
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-black focus:text-neutral-700 focus:shadow-te-black focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-black"
          />
        </div>
        <div className="border-[1px] p-4 text-white mb-5 rounded-lg">
          <div className="flex items-center text-white">
            <label className="text-sm text-black">Colors:</label>
            {colorsFields.map((product, index) => (
              <div key={product.id} className="flex items-center ">
                <input
                  {...register(`colors.${index}.name`)}
                  placeholder="Color"
                  className="outline-none w-16 block border-[1px] text-center ml-2 text-black"
                />
                <button
                  type="button"
                  onClick={() => removeColors(index)}
                  className=" bg-black px-2">
                  X
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className=" bg-black p-2 block text-sm mt-3"
            onClick={() => appendColors({ colors: "" })}>
            Add Color
          </button>
        </div>
        <label htmlFor="description" className="ml-3 text-sm">
          Description
          <textarea
            className="outline-none w-full h-44 block rounded-lg border-[1px] px-6 py-3 resize-none"
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
        <div className="flex justify-between gap-4">
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
        <div className="flex justify-between gap-4">
          <Input
            register={register}
            name="discount_name"
            label="Discount Name"
            error={errors.discount_name?.message}
          />
          <Input
            register={register}
            name="discount"
            label="Discount"
            error={errors.discount?.message}
          />
        </div>
        <div className="border-[1px] p-4 text-white mb-5 rounded-lg">
          <div className="flex items-center flex-wrap gap-2">
            <label className="text-sm text-black">Sizes:</label>
            {sizesFields.map((product, index) => (
              <div key={product.id} className="flex items-center">
                <input
                  {...register(`sizes.${index}.name`)}
                  placeholder="Sizes"
                  className="outline-none w-12 block border-[1px] text-center text-black"
                />
                <button
                  type="button"
                  onClick={() => removeSizes(index)}
                  className=" bg-black px-2">
                  X
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className=" bg-black p-2 block text-sm mt-3"
            onClick={() => appendSizes({ sizes: "" })}>
            Add Sizes
          </button>
        </div>
        <div className="border-[1px] p-4 text-white mb-5 rounded-lg">
          <div className="flex items-center flex-wrap gap-2">
            <label className="text-sm text-black">Category:</label>
            {categoryFields.map((product, index) => (
              <div key={product.id} className="flex items-center ">
                <input
                  {...register(`category.${index}.name`)}
                  placeholder="Category"
                  className="outline-none w-20 block border-[1px] text-center ml-2 text-black"
                />
                <button
                  type="button"
                  onClick={() => removeCategory(index)}
                  className=" bg-black px-2">
                  X
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className=" bg-black p-2 block text-sm mt-3"
            onClick={() => appendCategory({ category: "" })}>
            Add Category
          </button>
        </div>

        <PrimaryButton
          name="Publish product"
          color="text-white"
          background="bg-primary"
        />
      </div>
    </form>
  );
};

export default AddProductForm;
