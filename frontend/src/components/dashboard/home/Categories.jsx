import React from "react";
import Table from "../shared/Table";

const Categories = ({ categories }) => {
  const headers = ["id", "name", "description"];
  const additionalHeaders = [""];
  return (
    <div className="w-1/2 my-10">
      <div className="p-4 bg-white">
        <h1 className=" text-secondary font-bold">Product Categories</h1>
        <p className="text-xs my-2">Product Categories in store</p>
      </div>
      <Table
        headers={headers}
        data={categories}
        additionalHeaders={additionalHeaders}
      />
    </div>
  );
};

export default Categories;
