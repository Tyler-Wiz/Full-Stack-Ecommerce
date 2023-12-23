"use client";

import Input from "@/components/shared/Input";
import PrimaryButton from "@/components/shared/PrimaryButton";
import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordReset = () => {
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormError("Password does not match");
    } else {
      setFormError("");
    }
  };

  return (
    <section className="flex justify-center items-center ">
      <div className="h-screen w-[55%] bg-hero bg-cover bg-center"></div>
      <div className="flex flex-col w-[30%] justify-center items-center max-w-lg mx-auto h-screen">
        <h2 className="mb-3 capitalize"> Reset your password</h2>
        <form onSubmit={handleSubmit}>
          <div className=" relative">
            <button
              type="button"
              className="absolute top-[50%] right-4"
              onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
            <Input
              label="Password"
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Input
            label="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <PrimaryButton
            name="Change Password"
            background="bg-tahiti"
            color="text-white"
            width="w-[400px]"
          />
          {formError ? (
            <p className=" text-red-900 text-center mt-5">{formError}</p>
          ) : (
            ""
          )}
        </form>
      </div>
    </section>
  );
};

export default PasswordReset;
