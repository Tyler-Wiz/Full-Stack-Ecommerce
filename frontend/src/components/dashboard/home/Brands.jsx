import React from "react";
import Table from "../shared/Table";

const Brands = ({ brands }) => {
  const headers = ["id", "name"];
  const additionalHeaders = [""];
  return (
    <div className="w-1/2 my-10">
      <div className="p-4 bg-white">
        <h1 className=" text-secondary font-bold">Top Brands</h1>
        <p className="text-xs my-2">Top brands in store</p>
      </div>
      <Table
        headers={headers}
        data={brands}
        additionalHeaders={additionalHeaders}
      />
    </div>
  );
};

export default Brands;
