import { RiDashboardLine } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";

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
    path: "/dashboard/products/add",
    submenu: true,
    subMenuItems: [
      {
        id: 25,
        title: "Add New Product +",
        path: "/dashboard/products/add",
      },
    ],
  },
];
