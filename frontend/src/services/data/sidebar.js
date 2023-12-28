import { RiDashboardLine } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdStats, IoIosStarHalf } from "react-icons/io";
import { FaUsersBetweenLines } from "react-icons/fa6";

export const sidebarData = [
  {
    id: 1,
    title: "Dashboard",
    icon: <RiDashboardLine size={25} />,
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Products",
    icon: <BiSolidShoppingBags size={25} />,
    path: "/dashboard/Products",
    submenu: true,
    subMenuItems: [
      {
        id: 21,
        title: "Top Products",
        path: "/dashboard/products",
      },
      {
        id: 22,
        title: "Product Grid",
        path: "/dashboard/products",
      },
      {
        id: 23,
        title: "Product Management",
        path: "/dashboard/products",
      },
      {
        id: 24,
        title: "Product Categories",
        path: "/dashboard/products",
      },
      {
        id: 25,
        title: "Add New Product +",
        path: "/dashboard/products/add",
      },
    ],
  },
  {
    id: 3,
    title: "Orders",
    icon: <MdOutlineShoppingCart size={25} />,
    path: "/dashboard/Products",
    submenu: true,
    subMenuItems: [
      {
        id: 31,
        title: "Top Products",
        path: "/dashboard/Products",
      },
    ],
  },
  {
    id: 4,
    title: "Statistics",
    icon: <IoMdStats size={25} />,
    path: "/stats",
  },
  {
    id: 5,
    title: "Reviews",
    icon: <IoIosStarHalf size={25} />,
    path: "/review",
  },
  {
    id: 6,
    title: "Customers",
    icon: <FaUsersBetweenLines size={25} />,
    path: "/customers",
  },
  {
    id: 6,
    title: "Brands",
    icon: <FaUsersBetweenLines size={25} />,
    path: "/customers",
  },
];
