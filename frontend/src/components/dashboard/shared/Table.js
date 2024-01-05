"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";

const Table = ({
  headers,
  data,
  additionalHeaders,
  headerTitle,
  buttonLink,
  buttonText,
}) => {
  const router = useRouter();
  // const deleteSong = async (id) => {
  //   try {
  //     const res = await axios.delete(`${SERVER_URL}${id}`, {
  //       withCredentials: true,
  //     });
  //     if (res.data) {
  //       router.refresh();
  //     }
  //     console.log(res.data);
  //   } catch (error) {
  //     toast(error.response.data.errorMessage);
  //   }
  // };

  // useEffect(() => {
  //   router.refresh();
  // }, []);

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 text-sm shadow-xl rounded-lg">
        <thead className="font-regular bg-white uppercase text-purple">
          <tr>
            {headers.map((header) => (
              <th key={header} className="text-left p-4 capitalize">
                {header}
              </th>
            ))}
            {additionalHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 capitalize">
          {Array.isArray(data) &&
            data.slice(0, 5).map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td
                    className={`px-4 py-3 whitespace-nowrap text-secondary font-bold ${
                      index % 2 === 0 ? "bg-gray-50" : ""
                    }`}
                    key={header}>
                    {row[header]}
                  </td>
                ))}
                {additionalHeaders && (
                  <>
                    <td className=" text-primary font-bold px-4 whitespace-nowrap">
                      <Link href="">
                        <button className="text-red-900">
                          <FaEdit />
                        </button>
                      </Link>
                    </td>
                  </>
                )}
              </tr>
            ))}
          <tr></tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
