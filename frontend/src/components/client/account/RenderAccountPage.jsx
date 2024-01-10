"use client";

import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

const RenderAccountPage = ({ user }) => {
  return (
    <section>
      <h1 className="text-4xl font-bold">Welcome, {user?.username}</h1>
      <h1 className="text-xl font-bold my-3">Your Account Homepage</h1>
      <h3 className="text-xl my-2">
        Here you can view and track past orders, and control the emails we send
        you. You can also manage the account details we use to speed you through
        checkout.
      </h3>
      <h3 className="text-xl font-bold my-8">Personal Details</h3>
      <div className="flex justify-between border-[1px] px-6 py-3 rounded-lg">
        <div className="flex-item w-[60%]">
          <p className="w-[30%]">Name</p>
          <p className="text-xl ">{user?.username}</p>
        </div>
        <Link href={`/account/edit-profile/${user.id}`}>
          <p className="flex-item gap-2 text-primary">
            <FaEdit />
            <span>Edit</span>
          </p>
        </Link>
      </div>
      <div className="flex justify-between border-[1px] px-6 py-3 my-6 rounded-lg">
        <div className="flex-item w-[60%]">
          <p className="w-[30%]">Email Address</p>
          <p className="lowercase text-xl">{user?.email}</p>
        </div>
        <Link href={`/account/edit-profile/${user.id}`}>
          <p className="flex-item gap-2 text-primary">
            <FaEdit />
            <span>Edit</span>
          </p>
        </Link>
      </div>
    </section>
  );
};

export default RenderAccountPage;
