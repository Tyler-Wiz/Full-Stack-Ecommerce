"use client";

import PrimaryButton from "@/components/shared/PrimaryButton";
import React, { useRef } from "react";

const ForgotPassword = () => {
  const usernameRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
    };
    console.log(data);
    usernameRef.current.value = "";
  };
  return (
    <section className="flex justify-center items-center ">
      <div className="h-screen w-[55%] bg-hero bg-cover bg-center"></div>
      <div className="flex flex-col w-[30%] justify-center items-center max-w-lg mx-auto h-screen">
        <h2 className="mb-3 capitalize"> Set or reset your password</h2>
        <p className="text-description text-center mb-10">
          Enter the email address associated with your account. We’ll email you
          instructions on how to set or reset your password.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center">
          <label htmlFor="username" className="text-sm">
            Username
            <input
              ref={usernameRef}
              className={`block outline-none border-[1px] border-gray-400 rounded-lg px-3 py-3 w-[400px] `}
              id="username"
            />
          </label>
          <PrimaryButton
            name="Send Email"
            background="bg-tahiti"
            color="text-white"
            width="w-[400px]"
          />
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
