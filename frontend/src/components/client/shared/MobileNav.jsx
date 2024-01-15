import React from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaDropbox, FaBasketShopping } from "react-icons/fa6";
import { MdContactPhone, MdAccountCircle, MdLogin } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import { PiSignOutBold } from "react-icons/pi";

const NavData = [
  { name: "Home", link: "/", id: 1, icon: <FaHome size={25} /> },
  { name: "products", link: "/products", id: 2, icon: <FaDropbox size={25} /> },
  {
    name: "contact",
    link: "/contact",
    id: 3,
    icon: <MdContactPhone size={25} />,
  },
];

const MobileNav = ({ hamburger }) => {
  const { user_id } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = () => {
    dispatch(logOut());
    router.push("/");
  };

  const accountRoutes = [
    {
      path: "/account",
      component: "My Account Homepage",
      icon: <MdAccountCircle size={25} />,
    },
    {
      path: "/account/personal-details",
      component: "Personal details",
      icon: <ImProfile size={25} />,
    },
    {
      path: `/account/my-orders/${user_id}`,
      component: "Your orders",
      icon: <FaBasketShopping size={25} />,
    },
  ];
  return (
    <>
      {hamburger && (
        <div className="fixed z-[9998] top-0 right-0 w-[100%] h-[100%] lg:hidden montserrat">
          <div className="fixed w-[60%] h-full bg-white top-0 right-0 z-[9998] p-5 animate-slide shadow-lg overflow-y-auto">
            <p className="mt-16 jost">Browse</p>
            <ul className="mt-3 flex flex-col gap-5 px-2">
              {NavData.map((item, index) => (
                <Link key={index} href={item.link}>
                  <li className="flex items-center gap-3">
                    {item.icon}
                    <p className="text-2xl">{item.name}</p>
                  </li>
                </Link>
              ))}
            </ul>
            {user_id && (
              <>
                <p className="mt-12 jost">My Account</p>
                <ul className="mt-3 flex flex-col gap-3 px-2">
                  {accountRoutes.map((item, index) => (
                    <Link key={index} href={item.path}>
                      <li className="flex items-center gap-3">
                        {item.icon}
                        <p className="text-2xl">{item.component}</p>
                      </li>
                    </Link>
                  ))}
                </ul>
                <button
                  className=" text-primary ml-2 flex items-center gap-3 mt-4"
                  onClick={handleLogOut}>
                  <PiSignOutBold size={25} />
                  <p>Sign Out</p>
                </button>
              </>
            )}
            {!user_id && (
              <Link
                href="/login"
                className=" text-primary ml-2 flex items-center gap-3 mt-4">
                <MdLogin size={25} />
                <p>Log In</p>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
