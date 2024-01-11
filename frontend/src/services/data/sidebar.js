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
    path: "/dashboard/products",
    submenu: true,
    subMenuItems: [
      {
        id: 21,
        title: "Top Products",
        path: "/dashboard/products",
      },
      {
        id: 22,
        title: "Product Management",
        path: "/dashboard/products/manage",
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
  },
];
