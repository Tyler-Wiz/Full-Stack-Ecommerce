"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "@/validators/userValidator";
import Input from "@/components/shared/TextInput";
import Button from "../shared/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EditProfile = ({ id }) => {
  // Handle form Data and Submit With React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const router = useRouter();
  const onSubmit = async (data, e) => {
    const userData = { first_name: data.first_name, last_name: data.last_name };
    const userInfo = {
      address_line1: data.address_line1,
      address_line2: data.address_line2,
      city: data.city,
      country: data.country,
      postal_code: data.postal_code,
      telephone: data.telephone,
    };
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/user/personal/${id}`,
        userData,
        {
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}api/user/${id}`,
          userInfo,
          {
            withCredentials: true,
          }
        );
        if (res.status === 201) {
          router.push("/account");
          toast("Update successfully");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1>Edit Personal details</h1>
        <form
          className="lg:w-[60%] p-4 border-[1px]"
          onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            name="first_name"
            labelColor="text-black"
            label="First Name"
            color={"text-white"}
            error={errors.first_name?.message}
          />
          <Input
            register={register}
            name="last_name"
            labelColor="text-black"
            label="Last Name"
            error={errors.last_name?.message}
          />
          <Input
            register={register}
            name="address_line1"
            labelColor="text-black"
            label="Address Line 1"
            error={errors.address_line1?.message}
          />
          <Input
            register={register}
            name="address_line2"
            labelColor="text-black"
            label="Address Line 2"
            error={errors.address_line2?.message}
          />
          <Input
            register={register}
            name="city"
            labelColor="text-black"
            label="city"
            error={errors.city?.message}
          />
          <Input
            register={register}
            name="country"
            labelColor="text-black"
            label="country"
            error={errors.country?.message}
          />
          <Input
            register={register}
            name="postal_code"
            labelColor="text-black"
            label="Postcode"
            error={errors.postal_code?.message}
          />
          <Input
            register={register}
            name="telephone"
            labelColor="text-black"
            label="telephone"
            error={errors.telephone?.message}
          />

          <div className="flex-item gap-10 my-6">
            <Button
              name="Cancel"
              width="w-full"
              color="text-black"
              border={"border-2"}
            />
            <Button
              name="Update"
              width="w-full"
              backgroundColor="bg-primary"
              color="text-white"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
