"use client";

import { useState, useEffect } from "react";
import Button from "../shared/Button";
import Link from "next/link";

const PersonalDetails = ({ user }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}api/user/${user.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return (
      <div>
        <h1 className="mb-4">No Personal details</h1>
        <Link href={`/account/edit-profile/${user.id}`}>
          <Button
            name="Edit info"
            width="w-[30%]"
            backgroundColor="bg-primary"
            color="text-white"
          />
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h1 className="mb-4">No Personal details</h1>
        <Link href={`/account/edit-profile/${user.id}`}>
          <Button
            name="Edit info"
            width="w-[30%]"
            backgroundColor="bg-primary"
            color="text-white"
          />
        </Link>
      </div>
    );
  }

  const RenderUserInfoList = ({ data, name }) => {
    return (
      <div className="flex justify-between border-[1px] px-6 py-3 rounded-lg lg:w-[90%] my-3">
        <div className="flex-item w-[90%]">
          <p className="lg:w-[30%] w-[35%]">{name}</p>
          <p className="text-sm font-bold">{data}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <h1 className="mb-4">Personal details</h1>
        <RenderUserInfoList
          data={data.first_name + " " + data.last_name}
          name="Name"
        />
        <RenderUserInfoList data={data.address_line1} name="Address Line 1" />
        <RenderUserInfoList data={data.address_line2} name="Address Line 2" />
        <RenderUserInfoList
          data={data.city + ", " + data.country}
          name="City & Country"
        />
        <RenderUserInfoList data={data.postal_code} name="Postcode" />
        <RenderUserInfoList data={data.telephone} name="Telephone" />
        <Link href={`/account/edit-profile/${user.id}`}>
          <Button
            name="Edit info"
            width="w-[30%]"
            backgroundColor="bg-primary"
            color="text-white"
          />
        </Link>
      </div>
    </div>
  );
};

export default PersonalDetails;
