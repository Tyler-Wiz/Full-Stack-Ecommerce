import Input from "@/components/shared/Input";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthForm = ({
  togglePasswordVisibility,
  showPassword,
  formData,
  handleChange,
  formType,
}) => {
  return (
    <section className="h-screen w-[45%]">
      <div className="flex flex-col justify-center items-center max-w-lg mx-auto h-screen">
        <div className="my-6">
          {formType === "register" ? <h2>Register</h2> : <h2>Welcome back!</h2>}
          <p className="text-description">
            {formType === "register"
              ? "Register an account to get started"
              : "Login to your admin dashboard to continue"}
          </p>
        </div>
        <form className="self-center">
          <Input
            type="text"
            name="username"
            placeholder="Username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {formType === "register" && (
            <Input
              type="email"
              name="email"
              placeholder="example@email.com"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
          )}
          <div className="my-2 text-sm relative">
            <button
              type="button"
              className="absolute top-[50%] right-4"
              onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password 8(Characters)"
              label="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {formType === "login" && (
            <Link href="/dashboard/forgot-password">
              <p
                className="capitalize text-midnight font-bold text-center
                cursor-pointer"
                aria-label="forgot-button">
                forgot password?
              </p>
            </Link>
          )}
          {formType === "register" && (
            <label className="inline-flex items-center mt-4">
              <input
                type="checkbox"
                className="hidden"
                name="is_admin"
                checked={formData.is_admin}
                onChange={handleChange}
              />
              <span className="relative inline-block w-6 h-6 border-2 border-gray-400 rounded-md transition duration-300">
                <span
                  className={`${
                    formData.is_admin ? "opacity-100" : "opacity-0"
                  } absolute inset-0 flex items-center justify-center transition duration-300`}>
                  <svg
                    className="w-4 h-4 text-green-500 fill-current"
                    viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
              </span>
              <span className="ml-2 text-gray-700">Admin</span>
            </label>
          )}
          <PrimaryButton
            name={formType === "register" ? "Register" : "Login"}
            background="bg-tahiti"
            color="text-white"
          />
        </form>
        <div className="mt-10">
          <p className="text-description">
            {formType === "register"
              ? "Do you have an account? "
              : "Don't have an account?"}
            {formType === "register" ? (
              <Link href="/dashboard/login">
                <span className="text-midnight font-bold cursor-pointer ml-2">
                  Sign In
                </span>
              </Link>
            ) : (
              <Link href="/dashboard/register">
                <span className="text-midnight font-bold cursor-pointer ml-2">
                  Sign Up
                </span>
              </Link>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
