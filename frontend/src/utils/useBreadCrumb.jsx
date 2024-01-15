"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const Breadcrumb = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div>
      {paths !== "/" && (
        <ul className="flex jost text-sm py-5 bg-gradient-to-r from-purple-600 to-blue-600">
          <li className="hover:underline mx-2 text-gray-500 ">
            <Link href={"/"} className="flex items-center gap-2">
              <FaHome size={20} />
              Home
            </Link>
          </li>
          {pathNames.length > 0 && <span className=" text-gray-300"> | </span>}
          {pathNames.map((link, index) => {
            const numberLink = parseFloat(link);
            if (!isNaN(numberLink)) return null;
            let href = `/${pathNames.slice(0, index + 1).join("/")}`;
            let itemClasses =
              paths === href
                ? "hover:underline mx-2 font-bold text-primary"
                : "hover:underline mx-2 text-gray-500 ";
            let itemLink = true
              ? link[0].toUpperCase() + link.slice(1, link.length)
              : link;
            return (
              <div key={index}>
                <li className={itemClasses}>
                  <Link href={href}>{itemLink}</Link>
                  {pathNames.length !== index + 1 && (
                    <span className=" text-gray-300"> | </span>
                  )}
                </li>
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Breadcrumb;
