"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/store/features/authSlice";

const AccountLayout = ({ children }) => {
  const { user_id } = useSelector((state) => state.auth);
  const accountRoutes = [
    {
      path: "/account",
      component: "My Account Homepage",
    },
    {
      path: "/account/personal-details",
      component: "Personal details",
    },
    {
      path: `/account/my-orders/${user_id}`,
      component: "Your orders",
    },
    {
      path: "/delivery",
      component: "Delivery & collection",
    },
    {
      path: "/contact",
      component: "Contact Us",
    },
  ];

  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = () => {
    dispatch(logOut());
    router.push("/");
  };

  return (
    <section className="lg:container montserrat lg:my-12 gap-10 lg:px-0 px-6">
      <aside className="lg:border-[1px] w-[25%] p-4 rounded-lg">
        <div className="my-6 jost lg:flex lg:flex-col hidden">
          {accountRoutes.map((route) => (
            <div
              key={route.path}
              className={`${
                route.path === pathname
                  ? "text-primary ml-1 relative before:content-[''] before:block before:absolute before:-left-1 before:text-lg before:bg-primary before:w-1 before:h-[50%]"
                  : ""
              } cursor-pointer p-2 rounded-lg my-3`}>
              <Link href={`${route.path}`}>{route.component}</Link>
            </div>
          ))}
        </div>
        <button
          className="jost text-sm text-primary ml-2 hidden lg:block"
          onClick={handleLogOut}>
          Sign Out
        </button>
      </aside>
      <main className="jost lg:w-[75%]">{children}</main>
    </section>
  );
};

export default AccountLayout;
