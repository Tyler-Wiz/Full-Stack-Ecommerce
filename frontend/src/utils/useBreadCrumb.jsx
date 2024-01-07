"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  return (
    <div>
      {paths !== "/" && (
        <ul className="flex jost text-sm py-5 bg-gradient-to-r from-purple-600 to-blue-600">
          <li className="hover:underline mx-2 font-bold">
            <Link href={"/"}>Home</Link>
          </li>
          {pathNames.length > 0 && <span> | </span>}
          {pathNames.map((link, index) => {
            let href = `/${pathNames.slice(0, index + 1).join("/")}`;
            let itemClasses =
              paths === href
                ? "hover:underline mx-2 font-bold text-primary"
                : "hover:underline mx-2 font-bold";
            let itemLink = true
              ? link[0].toUpperCase() + link.slice(1, link.length)
              : link;
            return (
              <div key={index}>
                <li className={itemClasses}>
                  <Link href={href}>{itemLink}</Link>
                </li>
                {pathNames.length !== index + 1 && <span> | </span>}
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Breadcrumb;
