"use client";

import StoreLocation from "./StoreLocation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "@/validators/contactValidator";
import Input from "@/components/shared/TextInput";
import Button from "../shared/Button";

const RenderContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset();
  };
  return (
    <section className="relative">
      <div className="max-w-screen-lg px-6 mx-auto my-12 montserrat lg:flex lg:px-0 lg:gap-16">
        <div className="lg:w-[50%]">
          <h3 className="text-2xl font-bold my-3">DISCOVER US</h3>
          <p className="my-6 text-xl">
            Untouch is here to help you; Our experts are available to answer any
            questions you might have. We’ve got the answers.
          </p>
          <div>
            <h5 className="text-xl font-bold my-3">Call Us</h5>
            <p>+44-123-456-7890</p>
            <p>+44-123-456-7890</p>
          </div>
        </div>
        <div className="bg-black p-6 rounded-xl mt-10 lg:mt-0 lg:w-[35%]">
          <form
            className="self-center w-full"
            onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register}
              name="name"
              labelColor="text-white"
              label="Your Name"
              color={"text-white"}
              backgroundColor={"bg-black"}
              error={errors.name?.message}
            />
            <Input
              register={register}
              name="email"
              labelColor="text-white"
              label="Email Address"
              backgroundColor={"bg-black"}
              color={"text-white"}
              error={errors.email?.message}
            />
            <label htmlFor="" className="text-white text-xs ml-2">
              Message:
              <textarea
                {...register("message")}
                name="message"
                className="w-full h-32 p-2 my-2 rounded-xl outline-none resize-none bg-black border-[1px]"></textarea>
            </label>
            {errors.message && (
              <span role="alert" className="error-message">
                {errors.message?.message}
              </span>
            )}
            <Button
              name="Submit"
              width="w-full"
              backgroundColor="bg-white"
              color="text-black"
            />
          </form>
        </div>
      </div>
      <div className="w-full">
        <StoreLocation />
      </div>
    </section>
  );
};

export default RenderContactPage;
