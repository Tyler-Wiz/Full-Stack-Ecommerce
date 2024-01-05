"use client";

import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "@/validators/ProductValidator";
import Input from "@/components/shared/TextInput";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Image from "next/image";

const EditProductForm = ({ product }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    },
  });

  const onSubmit = async (data, e) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-10 mt-10 rounded-xl p-4">
      <div className="w-3/4">
        <Input
          register={register}
          name="name"
          label="Name"
          error={errors.name?.message}
        />
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
          error={errors.price?.message}
        />
        <label htmlFor="description" className="ml-3 text-sm">
          Description
          <textarea
            className="outline-none w-full min-h-40 block rounded-lg border-[1px] px-6 py-3 resize-none"
            {...register("description")}></textarea>
        </label>
      </div>
      <div className="w-1/4 self-center">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-center items-center border-[1px] p-4 border-gray-300 bg-white">
            <p className="capitalize text-center">featured Image</p>
            <hr className="w-full border-[.5px] border-gray-300 mb-3" />
            <Image
              src={product.image_urls[0]}
              alt="Image products"
              objectFit="cover"
              width={200}
              height={200}
            />
          </div>
          <PrimaryButton name="Edit product" color="bg-button" />
          <PrimaryButton name="Delete product" color="bg-red-900" />
        </div>
      </div>
    </form>
  );
};

export default EditProductForm;
